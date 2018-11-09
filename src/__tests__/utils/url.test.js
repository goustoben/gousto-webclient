import sinon from 'sinon'

import { slugify } from 'utils/url'

describe('utils/url', () => {
  describe('slugify', () => {
    test('should return a lower case string with & and \' and " and spaces removed', () => {
      expect(slugify("Dave's Fish & Chips")).toEqual('daves-fish-chips')
      expect(slugify('Dave says "hi"')).toEqual('dave-says-hi')
    })
  })
})
