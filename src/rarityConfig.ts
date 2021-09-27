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
  contractAddress: '0x51Ae5e2533854495f6c587865Af64119db8F59b4',
  mainImageKey: 'image',
  headerText: 'Punkscapes',
  logoURL: 'https://punkscape.xyz/punkscape-profile.png',
  links: {
    website: 'https://punkscape.xyz/',
    etherscan:
      'https://etherscan.io/address/0x51Ae5e2533854495f6c587865Af64119db8F59b4',
    twitter: 'https://twitter.com/PunkScape_ETH',
    discord: 'https://discord.gg/aPS3Hre57D',
  },
}

export default config
