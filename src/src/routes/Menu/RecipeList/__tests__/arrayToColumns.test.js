import { arrayToColumns } from '../arrayToColumns'

describe('arrayToColumns', () => {
  describe('when splitting into 3 columns', () => {
    test('should split array correctly', () => {
      const input = [1, 2, 3, 4, 5, 6]
      const expected = [
        [ { index: 0, value: 1 }, { index: 3, value: 4 } ],
        [ { index: 1, value: 2 }, { index: 4, value: 5 } ],
        [ { index: 2, value: 3 }, { index: 5, value: 6 } ]
      ]

      const result = arrayToColumns(input, 3)

      expect(result).toEqual(expected)
    })
  })
})
