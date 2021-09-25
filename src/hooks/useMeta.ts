import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { GET_META } from '../queries'
import { Meta } from '../types'

const useMeta = () => {
  const { data } = useQuery<{ meta: Meta }>(GET_META)

  const datamap = useMemo(() => {
    if (!data) return undefined

    return data.meta.traitTypes.reduce(
      (acc, type) => ({
        ...acc,
        [type.trait_type]: type.stats.max,
      }),
      {} as { [traitType: string]: number }
    )
  }, [data])

  const getMax = (traitType: string) =>
    datamap ? datamap[traitType] : undefined

  return { max: getMax }
}

export default useMeta
