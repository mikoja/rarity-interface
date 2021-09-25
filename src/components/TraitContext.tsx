import { createContext, useMemo, useState } from 'react'
import { Attribute } from '../types'

interface TraitContextIterface {
  traits: Attribute[]
  add: (t: Attribute) => void
  remove: (t: Attribute) => void
  clear: () => void
  isSelected: (traitType: string, value: string | number) => boolean
  queryParams: { trait_type: string; value: string }[] | undefined
  counts: { [traitType: string]: number }
  tokenCount?: number
}

const init: TraitContextIterface = {
  traits: [],
  add: (t: Attribute) => {},
  remove: (t: Attribute) => {},
  clear: () => {},
  isSelected: (traitType: string, value: string | number) => false,
  queryParams: undefined,
  counts: {},
  tokenCount: undefined,
}

export const TraitContext = createContext<TraitContextIterface>(init)

export const SelectedTraitsProvider: React.FC<{ children: React.ReactNode }> =
  ({ children }) => {
    const [traits, setTraits] = useState<{
      [trait_type: string]: { [value: string]: Attribute }
    }>({})
    const add = (trait: Attribute) => {
      const updated = { ...traits[trait.trait_type], [trait.value]: trait }
      setTraits({ ...traits, [trait.trait_type]: updated })
    }
    const remove = (trait: Attribute) => {
      const newTraits = { ...traits }
      delete newTraits[trait.trait_type][trait.value]
      setTraits(newTraits)
    }
    const clear = () => setTraits({})
    const isSelected = (traitType: string, value: string | number) =>
      traitType in traits && value in traits[traitType]

    const counts = useMemo(
      () =>
        Object.fromEntries(
          Object.entries(traits).map(([k, v]) => [k, Object.values(v).length])
        ),
      [traits]
    )

    const traitArray = useMemo(
      () =>
        Object.values(traits)
          .map((v) => Object.values(v))
          .flat(),
      [traits]
    )

    const tokenCount = useMemo(
      () =>
        traitArray.length > 0
          ? Math.max(...traitArray.map((x) => x.count))
          : undefined,
      [traitArray]
    )

    return (
      <TraitContext.Provider
        value={{
          traits: traitArray,
          add,
          remove,
          clear,
          isSelected,
          queryParams: traitArray.map(({ trait_type, value }) => ({
            trait_type,
            value: String(value),
          })),
          counts,
          tokenCount,
        }}
      >
        {children}
      </TraitContext.Provider>
    )
  }
