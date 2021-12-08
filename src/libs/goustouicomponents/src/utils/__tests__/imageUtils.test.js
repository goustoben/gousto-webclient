import { transformSrcSet } from '../imageUtils'

const media = [
  {
    url: 'src',
    width: 10,
  },
  {
    url: 'another src',
    width: 20,
  },
]

describe('transformSrcSet', () => {
  const result = transformSrcSet(media)

  test('should return a string', () => {
    expect(typeof result).toBe('string')
  })

  test('should transform array into a string properly', () => {
    expect(result).toBe(`${media[0].url} ${media[0].width}w, ${media[1].url} ${media[1].width}w`)
  })
})
