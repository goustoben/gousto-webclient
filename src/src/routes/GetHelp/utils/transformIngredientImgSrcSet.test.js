import { transformIngredientImgSrcSet } from './transformIngredientImgSrcSet'

const urls = [
  {
    url: 'https://production-media.gousto.co.uk/cms/ingredient-image/Echalion-Shallot-x50.jpg',
    width: 50
  },
  {
    url: 'https://production-media.gousto.co.uk/cms/ingredient-image/Echalion-Shallot-x200.jpg',
    width: 100
  },
]

describe('transformIngredientImgSrcSet', () => {
  test('transforms an array of urls into a string with url and width', () => {
    const result = transformIngredientImgSrcSet(urls)
    expect(typeof result).toEqual('string')
    expect(result).toBe(`${urls[0].url} ${urls[0].width}w, ${urls[1].url} ${urls[1].width}w`)
  })
})
