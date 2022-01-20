import Immutable from 'immutable'
import { getStepFromPathname } from '../signup'

describe('signup utils',() => {
  describe('given getStepFromPathname is called', () => {
    let output
    const pathname = '/signup/delivery-options'

    beforeEach(() => {
      output = getStepFromPathname(pathname)
    })

    test('then proper response should be returned', () => {
      const expected = Immutable.Map({ name: 'delivery', slug: 'delivery-options'})
      expect(output).toEqual(expected)
    })
  })
})
