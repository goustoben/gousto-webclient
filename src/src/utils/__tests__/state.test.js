import Immutable from 'immutable'
import { defineTag } from 'utils/state'

describe('given state util', () => {
  let tag
  const cases = [
    [ {}, 'isObject' ],
    [ null, 'isPlain' ],
    [ undefined, 'isPlain' ],
    [ 'boolean', 'isPlain' ],
    [ 'number', 'isPlain' ],
    [ 'string', 'isPlain' ],
    [ [], 'isArray' ],
    [ Immutable.Map(), 'isMap' ],
    [ Immutable.List(), 'isList' ],
    [ Immutable.OrderedMap(), 'isOrderedMap' ],
  ]

  describe.each(cases)('when defineTag is called', (value, expected) => {
    beforeEach(() => {
      tag = defineTag(value)
    })

    test(`then should return proper tag ${expected} for passed value`, () => {
      expect(tag).toEqual(expected)
    })
  })
})
