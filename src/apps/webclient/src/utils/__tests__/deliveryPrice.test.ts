// eslint-disable-next-line import/no-unresolved
import { formatDeliveryPrice } from '../deliveryPrice'

describe('utils/deliveryPrice', () => {
  describe('formatDeliveryPrice', () => {
    it('should return "Free" by default when price is 0.00', () => {
      const price = '0.00'
      expect(formatDeliveryPrice(price)).toEqual('Free')
    })
    it('should return a zeroPiceLabel when price is 0.00 and zeroPiceLabel parameter is set', () => {
      const price = '0.00'
      expect(formatDeliveryPrice(price, '')).toEqual('')
      expect(formatDeliveryPrice(price, 'some text')).toEqual('some text')
    })
    it('should return the formatted numeric value when price is not 0.00', () => {
      const price = '1.99'
      expect(formatDeliveryPrice(price)).toEqual('£1.99')
    })
  })
})
