import Immutable from 'immutable'
import { getSurcharge } from 'utils/recipe'
import { defaultMetaImageLink, perPortionPrice } from '../config.js'
import {
  getMetaImageLink,
  getPortionPrice,
} from '../utils'
jest.mock('utils/recipe', () => ({
  getSurcharge: jest.fn()
}))

describe('utils', () => {
  let recipe

  beforeEach(() => {

    recipe = Immutable.fromJS({
      id: '12345',
      title: 'test',
      description: 'test description',
      media: {
        images: [{
          urls: [
            { src: 'test url', width: 700 },
            { src: 'test url 2', width: 500 }
          ]
        }]
      },
      range: 'test range',
    })
  })

  describe('getPortionPrice', () => {

    it('should return the default price if no surcharge', () => {
      getSurcharge.mockReturnValue(null)

      const price = getPortionPrice(recipe)
      expect(price).toEqual(perPortionPrice)
    })

    it('should return the price + surcharge per portion if there is a surcharge', () => {
      const surcharge = 3
      getSurcharge.mockReturnValue(surcharge)

      const price = getPortionPrice(recipe)
      expect(price).toEqual(String(perPortionPrice + (surcharge / 4)))
    })

    it('should return the the default price if there is no recipe', () => {
      const surcharge = 3
      getSurcharge.mockReturnValue(surcharge)

      const price = getPortionPrice()
      expect(price).toEqual(perPortionPrice)
    })
  })

  describe('getMetaImageLink', () => {

    it('should get image link', () => {
      const imageLink = getMetaImageLink(recipe)
      expect(imageLink).toEqual('test url')
    })

    it('should return default image link if recipe is undefined', () => {
      const imageLink = getMetaImageLink()
      expect(imageLink).toEqual(defaultMetaImageLink)
    })

    it('should return default image link if media does not include 700px image', () => {
      recipe = Immutable.Map({
        id: '12345',
        title: 'test',
        description: 'test description',
        media: {
          images: [{
            urls: [
              { src: 'test url 2', width: 500 }
            ]
          }]
        },
        range: 'test range',
      })

      const imageLink = getMetaImageLink(recipe)
      expect(imageLink).toEqual(defaultMetaImageLink)
    })
  })

})
