interface Config {
  tokenBackgroundColor?: string
  contractAddress: string
  headerText?: string
  headerTextStyle?: React.CSSProperties
  logoURL?: string
  logoStyle?: React.CSSProperties
  listImageKey?: 'image' | 'image_data'
  mainImageKey?: 'image' | 'image_data' | 'animation_url'
  links?: {
    website?: string
    twitter?: string
    discord?: string
    openSea?: string
    etherscan?: string
  }
}

const config: Config = {
  contractAddress: '',
}

export default config
