import { textReducer, replaceWithValues } from 'utils/text'

describe('text utils', () => {
  describe('textReducer', () => {
    test('when nothing is passed should return an empty string ', () => {
      expect(textReducer()).toEqual('')
    })

    test('when item is passed should return the item', () => {
      expect(textReducer('', 'c')).toEqual('c')
    })

    test('when text is passed should return the text', () => {
      expect(textReducer('a, b', '')).toEqual('a, b')
    })

    test('when both text and item are passed should return the text appended with the item ', () => {
      expect(textReducer('a, b', 'c')).toEqual('a, b, c')
    })
  })

  describe('replaceWithValues', () => {
    test('the values are replaced', () => {
      const string = 'String with a {{dynamicValue}}, and a {{anotherDynamicValue}}'
      const values = { dynamicValue: 5, anotherDynamicValue: 'six' }

      expect(replaceWithValues(string, values)).toBe('String with a 5, and a six')
    })

    test('all the occurrences of a value are replaced', () => {
      const string = `Please {{verb}} them. You have {{howMany}} ({{howMany}}), yes,
				{{howMany}} messages. Please {{verb}} them.`
      const values = { howMany: 3, verb: 'read' }
      const expectedResult = `Please read them. You have 3 (3), yes,
				3 messages. Please read them.`

      expect(replaceWithValues(string, values)).toBe(expectedResult)
    })

    test('non provided values are not replaced', () => {
      const string = 'String with a {{dynamicValue}}, and {{notPassedValue}}'
      const values = { dynamicValue: 'B' }

      expect(replaceWithValues(string, values)).toBe('String with a B, and {{notPassedValue}}')
    })

    test('provided values that are not in the string do not cause issues', () => {
      const string = 'String with a {{dynamicValue}}'
      const values = { dynamicValue: '7', unnecessaryKey: 'value' }

      expect(replaceWithValues(string, values)).toBe('String with a 7')
    })
  })
})
