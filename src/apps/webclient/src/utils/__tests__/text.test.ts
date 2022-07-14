import { capitalizeFirstLetter } from 'utils/text'

describe('text utils', () => {
  describe('capitalizeFirstLetter', () => {
    it('Capitalizes the first letter of an n+1 length string', () => {
      expect(capitalizeFirstLetter('foo')).toBe('Foo')
    })
  })
})
