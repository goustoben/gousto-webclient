import { getFrequencyVariant } from '../frequency'

describe('frequency', () => {
  describe('Given a user in the first variant', () => {
    test('Then the correct frequency mapping is returned', () => {
      expect(getFrequencyVariant({ currentUserId: 3 })).toEqual({
        frequency: {
          1: 'Weekly',
          2: 'Fortnightly',
          4: 'Monthly',
        },
        variation: 'A'
      })
    })
  })

  describe('Given a user in the second variant', () => {
    test('Then the correct frequency mapping is returned', () => {
      expect(getFrequencyVariant({ currentUserId: 4 })).toEqual({
        frequency: {
          1: 'Weekly',
          2: 'Fortnightly',
        },
        variation: 'B'
      })
    })
  })

  describe('Given a user in the third variant', () => {
    test('Then the correct frequency mapping is returned', () => {
      expect(getFrequencyVariant({ currentUserId: 5 })).toEqual({
        frequency: {
          1: 'Weekly'
        },
        variation: 'C'
      })
    })
  })
})
