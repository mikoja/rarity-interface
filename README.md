## Rarity interface

User interface for [rarity-analyser](https://github.com/mikko-o/rarity-analyser) data.

### Getting started

Create an .env.local file and add your rarity-analyser server URL

```
REACT_APP_API_URL=http://localhost:4000
```

Start the app with `yarn start`.

### Configuration

The app can be configured according to the following structure in `src/rarityConfig.ts`.

Setting `contractAddress` is required to get order data from OpenSea.

```typescript
interface Config {
  contractAddress: string
  tokenBackgroundColor?: string
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
```
