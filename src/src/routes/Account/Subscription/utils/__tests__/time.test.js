import { formatCutoffTime } from '../time'

describe('formatCutoffTime', () => {
  describe('Given an expected cutoff time', () => {
    test('Then the associated word is returned', () => {
      expect(formatCutoffTime('11:59:59')).toEqual('noon')
    })
  })

  describe('Given an unexpected cutoff time', () => {
    test('Then a formatted time is returned', () => {
      expect(formatCutoffTime('15:59:59')).toEqual('4pm')
    })
  })
})
