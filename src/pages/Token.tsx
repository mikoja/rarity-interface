import { useHistory, useLocation } from 'react-router'
import queryString from 'query-string'
import { useSprings, animated } from 'react-spring'
import { Attribute, Token as TokenInterface } from '../types'
import './Token.css'
import { formatNumber, formatURL } from '../utils'
import { TraitContext } from '../components/TraitContext'
import { useCallback, useContext, useEffect } from 'react'
import useMeta from '../hooks/useMeta'
import { RarityModeContext } from '../components/RarityModeContext'
import config from '../rarityConfig'
import { useQuery } from '@apollo/client'
import { GET_TOKEN } from '../queries'
import Loader from '../components/Loader'
import { useOpenSeaOrder } from '../hooks/useOpenSeaOrders'

const Token: React.FC = () => {
  const { search } = useLocation<{ token: TokenInterface }>()
  const history = useHistory()
  const { id } = queryString.parse(search)
  const { normalized } = useContext(RarityModeContext)

  const { data } = useQuery(GET_TOKEN, {
    variables: {
      id: Number(id),
    },
  })

  const order = useOpenSeaOrder(Number(id))

  const token = data?.token

  if (!id) {
    history.replace('/')
    return null
  }

  if (!token)
    return (
      <div className="w-full flex justify-center pt-10">
        <Loader />
      </div>
    )

  return (
    <div className="container bg-gray-200">
      <div className="h-full w-screen lg:w-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full h-full flex justify-center items-center">
          <div
            style={{ width: 440 }}
            className="flex flex-col items-center justify-start"
          >
            <h1 className="text-4xl font-extralight m-4">{token.name}</h1>
            <Image token={token} />
            <p className="m-1 text-gray-800">
              {token.description}
            </p>
          </div>
        </div>

        <div className="w-full h-full lg:overflow-auto bg-gray-200 flex justify-center items-center">
          <div className="lg:h-5/6 my-6 overflow-x-auto lg:overflow-auto p-2 bg-gray-100 shadow rounded">
            <div className="text-gray-800 text-2xl font-light w-80 lg:w-72 mt-8 mx-2 md:mx-8 px-2 flex justify-between items-center">
              <div className="">
                <div>
                  Rank: #{normalized ? token?.rank_normalized : token?.rank}
                </div>
              </div>
              <div className="text-green-800">
                +
                {formatNumber(
                  normalized
                    ? token?.rarity_score_normalized
                    : token?.rarity_score
                )}
              </div>
            </div>

            {order ? (
              <a
                className="text-base mx-2 md:mx-8 px-2 text-blue-700"
                href={`https://opensea.io/assets/${config.contractAddress}/${order.asset.token_id}`}
              >
                {order.base_price / 1e18} ETH
              </a>
            ) : null}
            <Attributes attributes={token?.attributes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Token

interface AttributesProps {
  attributes?: Attribute[]
}

const Attributes: React.FC<AttributesProps> = ({ attributes }) => {
  const { max } = useMeta()

  const percentage = useCallback(
    (attribute: Attribute, normalized: boolean) => {
      const highest = max(attribute.trait_type)
      const score = normalized ? attribute.rarity_score_normalized : attribute.rarity_score
      return highest ? Math.round((score / highest) * 100) : 0
    },
    [max]
  )

  const { normalized } = useContext(RarityModeContext)

  const [springs, api] = useSprings(
    attributes?.length ?? 0,
    (index) => ({ width: '0%' })
  )

  useEffect(() => {
    if (!attributes) return
    api.start(i => ({ width: `${percentage(attributes[i], normalized)}%` }))
  }, [normalized, percentage, attributes, api])

  if (!attributes || !max) return null
  return (
    <div className="w-80 max-w-screen lg:w-72 h-auto m-2 md:m-8 px-2 text-sm grid grid-cols-1 gap-8 items-center">
      {attributes.map((attribute, i) => (
        <div
          key={`${attribute.trait_type}-${attribute.value}`}
          className="w-full"
        >
          <div className="flex w-full items-center flex-wrap justify-between pb-2">
            <div className="w-full flex flex-wrap items-center justify-between mb-2">
              <div>
                <Trait trait={attribute} />
              </div>
              <div className="text-green-700 text-lg text-right">
                +
                {formatNumber(
                  normalized
                    ? attribute.rarity_score_normalized
                    : attribute.rarity_score
                )}
              </div>
            </div>

            <div className="w-full h-3 flex justify-start items shadow-xl bg-gray-300 rounded-lg transition-all ease-out delay-100 transform hover:scale-y-110">
              <animated.div
                style={springs[i]}
                className="h-full rounded-lg bg-gray-600"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface TraitProps {
  trait: Attribute
}

const Trait: React.FC<TraitProps> = ({ trait }) => {
  const { add, remove, isSelected } = useContext(TraitContext)
  const selected = isSelected(trait.trait_type, trait.value)
  return (
    <button
      className={`${selected ? 'ring ring-gray-600' : ''
        } flex whitespace-nowrap rounded-md`}
      onClick={() => (selected ? remove(trait) : add(trait))}
    >
      <div className="bg-purple-300 p-2 rounded-l-md text-gray-800">
        {trait.trait_type}
      </div>
      <div className="bg-purple-200 p-2 text-gray-800">{trait.value}</div>
      <div className="bg-purple-100 p-2 rounded-r-md text-gray-800">
        {trait.count}
      </div>
    </button>
  )
}

interface ImageProps {
  token: TokenInterface
}

const Image: React.FC<ImageProps> = ({ token }) => {
  if (!token) return null
  const src = token[config.mainImageKey ?? 'image']
  if (token.animation_url && config.mainImageKey === 'animation_url') {
    return (
      <div className="rounded overflow-hidden flex">
        <iframe
          style={{ height: 450, minWidth: 375 }}
          title="animation"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          src={formatURL(token.animation_url)}
        />
      </div>
    )
  }
  return (
    <img
      style={{
        width: 450,
        backgroundColor:
          config.tokenBackgroundColor ??
          '#' + token.background_color ??
          'transparent',
      }}
      className="rounded"
      src={formatURL(src ?? '')}
      alt={token.name ?? 'Token #' + token.id}
    />
  )
}
