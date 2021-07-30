import { getDataForSocialBelonging } from '../signupUtils'

describe('given signup utils', () => {
  describe('when getDataForSocialBelonging is called', () => {
    let output
    const postcode = 'W3 7UP'

    beforeEach(() => {
      output = getDataForSocialBelonging(postcode)
    })

    test('then it should return proper response', () => {
      expect(output).toEqual({ amountOfCustomers: 1378, district: 'Ealing' })
    })
  })
})
