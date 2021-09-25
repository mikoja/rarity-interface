import numbro from 'numbro'

export const formatURL = (url: string) => {
  if (url.substring(0, 7) === 'ipfs://')
    return 'https://ipfs.io/ipfs/' + url.substring(7)
  else return url
}

export const formatNumber = (score: number) =>
  numbro(score).format({
    optionalMantissa: true,
    mantissa: 1,
  })
