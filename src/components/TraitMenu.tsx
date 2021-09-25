import { useQuery } from '@apollo/client'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { createRef, forwardRef, useContext, useEffect, useMemo } from 'react'
import { GET_META } from '../queries'
import { Attribute, Meta, TraitsMeta } from '../types'
import { TraitContext } from './TraitContext'

const TraitMenu: React.FC = () => {
  const { traits, add, remove, clear, counts } = useContext(TraitContext)
  const { data } = useQuery<{ meta: Meta }>(GET_META)
  const count = traits.length
  const refs = useMemo(
    () => data?.meta.traitTypes.map(() => createRef<any>()),
    [data?.meta.traitTypes]
  )
  // When traits are added, open disclosure if closed
  useEffect(() => {
    traits.forEach((trait) => {
      const ref = refs?.find(
        (x) => x.current?.outerText.split(' (')[0] === trait.trait_type
      )
      if (ref && ref.current?.ariaExpanded === 'false') ref.current.click()
    })
  }, [traits, refs])
  if (!data) return null
  return (
    <div className="grid gap-3 w-full py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 text-lg flex items-center">
          Traits
          <span className="text-sm pl-2 font-light">
            {count ? `(${count})` : ''}
          </span>
        </h2>

        <button
          className="text-sm gap-2 mr-3 text-gray-700 py-1 px-2 rounded-lg hover:border border-gray-400 hover:scale-105"
          onClick={() => {
            clear()
            refs?.forEach((ref) => {
              if (!ref.current) return
              if (ref.current.ariaExpanded === 'true') {
                ref.current.click()
              }
            })
          }}
        >
          Clear
        </button>
      </div>

      {data.meta.traitTypes.map((trait, i) => (
        <Item
          key={trait.trait_type}
          ref={refs ? refs[i] : undefined}
          {...{ trait, add, remove }}
          count={counts[trait.trait_type]}
        />
      ))}
    </div>
  )
}

export default TraitMenu

interface ItemProps {
  trait: TraitsMeta
  add: (t: Attribute) => void
  remove: (t: Attribute) => void
  count: number | undefined
}

const Item = forwardRef<HTMLButtonElement, ItemProps>(
  ({ trait, add, remove, count }, ref) => {
    if (!trait) throw new Error('no trait')
    return (
      <div className="w-full text-sm">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                ref={ref}
                className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              >
                <span>
                  {trait.trait_type}{' '}
                  <span className="text-xs font-light">
                    {count ? `(${count})` : ''}
                  </span>
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <Values attributes={trait.attributes} />
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    )
  }
)

interface ValuesProps {
  attributes: Attribute[]
}

const Values: React.FC<ValuesProps> = ({ attributes }) => {
  const { add, remove, isSelected } = useContext(TraitContext)
  return (
    <div className="flex flex-col items-start gap-1">
      {attributes.map((attribute) => (
        <button
          key={attribute.value}
          onClick={() => {
            if (!isSelected(attribute.trait_type, attribute.value))
              add(attribute)
            else remove(attribute)
          }}
          className={`${
            isSelected(attribute.trait_type, attribute.value)
              ? 'text-gray-700 font-semibold'
              : ''
          }
            text-left w-full grid grid-cols-6 hover:text-gray-700 hover:font-bold`}
        >
          <div className="col-span-5 pr-1">{attribute.value}</div>
          <div>{attribute.count}</div>
        </button>
      ))}
    </div>
  )
}
