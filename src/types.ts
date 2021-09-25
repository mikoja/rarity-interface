export interface Token {
  id: number
  name: string
  rarity_score: number
  rarity_score_normalized: number
  rank: number
  rank_normalized: number
  attributes: Attribute[]
  image?: string
  image_data?: string
  description?: string
  external_url?: string
  animation_url?: string
  background_color?: string
}

export interface Attribute {
  trait_type: string
  value: string
  rarity_score: number
  rarity_score_normalized: number
  percentile: number
  count: number
}

export interface Meta {
  numTokens: number
  traitTypes: TraitsMeta[]
  stats: Stats
}

export interface TraitsMeta {
  trait_type: string
  attributes: Attribute[]
  stats: Stats
  numValues: number
}

interface Stats {
  mean: number
  std: number
  min: number
  max: number
}

export interface OpenSeaOrder {
  asset: {
    token_id: 'string'
  }
  base_price: number
  side: number
  payment_token_contract: {
    symbol: string
  }
}
