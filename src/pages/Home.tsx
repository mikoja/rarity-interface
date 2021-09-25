import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import ReactPaginate from 'react-paginate'
import queryString, { parse } from 'query-string'
import { Meta, OpenSeaOrder, Token } from '../types'
import config from '../rarityConfig'
import { useQuery } from '@apollo/client'
import { GET_META, GET_TOKENS } from '../queries'
import useOpenSeaOrders from '../hooks/useOpenSeaOrders'
import { formatURL } from '../utils'
import { TraitContext } from '../components/TraitContext'
import { RarityModeContext } from '../components/RarityModeContext'
import Loader from '../components/Loader'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'

const tokensPerPage = 15

function Home() {
  const history = useHistory()
  const { page: pageParam } = parse(history.location.search)

  const [page, setPage] = useState(pageParam ? Number(pageParam) - 1 : 0)

  useEffect(() => {
    history.push(`?${queryString.stringify({ page: page + 1 })}`)
  }, [page, history])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) setPage(0)
  }, [search])

  const { queryParams: traitQueryParams, tokenCount } = useContext(TraitContext)

  const { normalized } = useContext(RarityModeContext)

  const { data: tokenData } = useQuery<{ tokens: Token[] }>(GET_TOKENS, {
    variables: {
      orderBy: normalized ? 'rarity_score_normalized' : 'rarity_score',
      first: tokensPerPage,
      skip: page * tokensPerPage,
      ...(search ? { id: Number(search) } : {}),
      ...(traitQueryParams && traitQueryParams.length > 0
        ? { traits: traitQueryParams }
        : {}),
    },
  })

  const { data: metadata } = useQuery<{ meta: Meta }>(GET_META)

  useQuery(GET_META)

  const tokenIds = useMemo(
    () => (tokenData ? tokenData.tokens.map((token) => token.id) : undefined),
    [tokenData]
  )
  const orders = useOpenSeaOrders(tokenIds)

  const pageCount = useMemo(() => {
    if (search) return 1
    const numTokens = tokenCount ?? metadata?.meta.numTokens
    return numTokens ? Math.ceil(numTokens / tokensPerPage) : undefined
  }, [metadata, search, tokenCount])

  return (
    <div className="h-full">
      <main className="flex flex-col h-full items-center mx-4 md:mx-6 lg:mx-8 xl:mx-10">
        <div className="w-full flex justify-end">
          <Search search={search} setSearch={setSearch} />
        </div>
        <TokenList
          tokens={tokenData?.tokens}
          meta={metadata?.meta}
          orders={orders}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
        />
      </main>
    </div>
  )
}

export default Home

interface SearchProps {
  search: string
  setSearch: (s: string) => void
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      className="rounded-lg focus:ring-purple-400 text-sm my-3 border-gray-400"
      placeholder="Search by id"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

interface TokenListProps {
  tokens: Token[] | undefined
  meta: Meta | undefined
  orders: Record<number, OpenSeaOrder>
  page: number
  setPage: (page: number) => void
  pageCount?: number
}

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  meta,
  orders,
  page,
  setPage,
  pageCount,
}) => {
  if (!tokens || !meta)
    return (
      <div className="w-full mt-6">
        <Loader />
      </div>
    )
  return (
    <div className="grid min-h-full sm:grid-cols-3 gap-6 content-start sm:gap-4 md:gap-4 lg:gap-10 xl:gap-12 mb-8">
      {tokens.map((token) => (
        <Card key={token.id} token={token} order={orders[token.id]} />
      ))}
      <Pagination
        className="md:col-span-3 flex items-center justify-center gap-3 text-gray-600 text-xl font-light"
        initialPage={page}
        setPage={setPage}
        pageCount={pageCount}
      />
    </div>
  )
}

interface PaginationProps {
  initialPage: number
  setPage: (page: number) => void
  pageCount?: number
  className?: string
}

const Pagination: React.FC<PaginationProps> = ({
  initialPage,
  setPage,
  pageCount,
  className,
}) => {
  if (!pageCount) return null
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      initialPage={initialPage}
      previousLabel={
        <ChevronDoubleLeftIcon className="h-6 w-6 text-gray-500" />
      }
      nextLabel={<ChevronDoubleRightIcon className="h-6 w-6 text-gray-500" />}
      onPageChange={(page) => setPage(page.selected)}
      breakClassName=""
      breakLinkClassName=""
      containerClassName={`${className}`}
      pageClassName=""
      pageLinkClassName=""
      activeClassName="text-black font-normal"
      previousClassName=""
      nextClassName=""
      previousLinkClassName=""
      nextLinkClassName=""
      disabledClassName=""
    />
  )
}

interface CardProps {
  token: Token
  order: OpenSeaOrder
}

const Card: React.FC<CardProps> = ({ token, order }) => {
  const history = useHistory()
  const { name, id, image, image_data, background_color } = token
  const src = config.listImageKey
    ? token[config.listImageKey]
    : image_data ?? formatURL(image ?? '')
  return (
    <div className="">
      <div
        className="flex rounded-md"
        style={{
          backgroundColor:
            config.tokenBackgroundColor ??
            '#' + background_color ??
            'transparent',
        }}
      >
        <button onClick={() => history.push(`/token?id=${token.id}`)}>
          <a href={`/token?id=${token.id}`}>
            <img
              loading="lazy"
              className="rounded w-full"
              src={src}
              alt={name ?? 'Token #' + id}
              style={{ minWidth: 200, minHeight: 200 }}
            />
          </a>
        </button>
      </div>
      <div className="text-xl lg:text-lg flex font-gray-700 whitespace-nowrap flex-wrap justify-between tracking-tight">
        {name}
        <Order order={order} />
      </div>
    </div>
  )
}

interface OrderProps {
  order: OpenSeaOrder | undefined
}

const Order: React.FC<OrderProps> = ({ order }) => {
  if (!order) return null
  return (
    <a
      className="text-xl lg:text-base text-blue-700"
      href={`https://opensea.io/assets/${config.contractAddress}/${order.asset.token_id}`}
      rel="noreferrer"
      target="_blank"
    >
      {order.base_price / 1e18} ETH
    </a>
  )
}
