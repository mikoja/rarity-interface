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
  contractAddress: '0xeb113c5d09bfc3a7b27a75da4432fb3484f90c6a',
  headerText: 'Kinesis: Atlanta',
  links: {
    website: 'https://kinesis.art/',
    twitter: 'https://twitter.com/_kinesisart',
    discord: 'https://discord.gg/xvWNSBZA7J',
    etherscan:
      'https://etherscan.io/address/0xeb113c5d09bfc3a7b27a75da4432fb3484f90c6a',
    openSea: 'https://opensea.io/collection/kinesisart',
  },
  mainImageKey: 'animation_url',
  logoURL: 'https://lh3.googleusercontent.com/FeiRpf4rUf6ITYZb6b311aANPff_d_POCiIHpJkA9sRQUav-S0zNlqgs90xkwUNkJUlc6se1pDCvFjyLmxZ2KSOei_MC7UHjuXzE=s130',
}

export default config
