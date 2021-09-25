import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { GET_META } from '../queries'
import { Meta } from '../types'

const useTraitData = () => {
  const { data, error } = useQuery<{ meta: Meta }>(GET_META)

  const attributes = useMemo(() => {
    if (!data) return
    const {
      meta: { traitTypes },
    } = data
    return Object.fromEntries(
      traitTypes.map(({ trait_type, attributes }) => [trait_type, attributes])
    )
  }, [data])

  return { attributes }
}

export default useTraitData
