import gql from 'graphql-tag'

export const GET_TOKENS = gql`
  query getTokens(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $id: Int
    $traits: [Trait]
  ) {
    tokens(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      id: $id
      traits: $traits
    ) {
      id
      name
      rarity_score
      rarity_score_normalized
      image
      image_data
      animation_url
      rank
      rank_normalized
      description
      background_color
      attributes {
        trait_type
        value
        rarity_score
        rarity_score_normalized
        percentile
        count
      }
    }
  }
`

export const GET_META = gql`
  {
    meta {
      numTokens
      traitTypes {
        trait_type
        attributes {
          trait_type
          rarity_score
          value
          percentile
          count
        }
        stats {
          max
        }
      }
    }
  }
`

export const GET_TOKEN = gql`
  query getToken($id: Int) {
    token(id: $id) {
      id
      name
      rarity_score
      rarity_score_normalized
      image
      image_data
      animation_url
      rank
      rank_normalized
      description
      background_color
      attributes {
        trait_type
        value
        rarity_score
        rarity_score_normalized
        percentile
        count
      }
    }
  }
`

export const GET_NUM_TOKENS = gql`
  {
    meta {
      numTokens
    }
  }
`
