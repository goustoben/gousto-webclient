import sinon from 'sinon'

import { inferCardType } from 'utils/checkout'

describe('utils/checkout', () => {
  describe('inferCardType', () => {
    // http://www.sagepay.co.uk/support/12/36/test-card-details-for-your-test-transactions
    test('should identify VISA', () => {
      expect(inferCardType('4929000000006')).toEqual('VISA')
      expect(inferCardType('4929000005559')).toEqual('VISA')
      expect(inferCardType('4929000000014')).toEqual('VISA')
      expect(inferCardType('4929000000022')).toEqual('VISA')
      expect(inferCardType('4484000000002')).toEqual('VISA')
      expect(inferCardType('4462000000000003')).toEqual('VISA')
    })
    test('should identify MC', () => {
      expect(inferCardType('5404000000000001')).toEqual('MC')
      expect(inferCardType('5404000000000043')).toEqual('MC')
      expect(inferCardType('5404000000000084')).toEqual('MC')
      expect(inferCardType('5404000000000068')).toEqual('MC')
      expect(inferCardType('5573470000000001')).toEqual('MC')
    })
    test('should identify MAESTRO', () => {
      expect(inferCardType('6759000000005')).toEqual('MAESTRO')
      expect(inferCardType('6705000000008')).toEqual('MAESTRO')
      expect(inferCardType('6777000000007')).toEqual('MAESTRO')
      expect(inferCardType('6766000000000')).toEqual('MAESTRO')
    })
    test('should identify UKE', () => {
      expect(inferCardType('4917300000000008')).toEqual('UKE')
    })
    test('should identify AMEX', () => {
      expect(inferCardType('374200000000004')).toEqual('AMEX')
    })
  })
})
