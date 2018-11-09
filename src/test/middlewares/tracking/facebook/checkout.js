import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-caps */
import * as checkoutTracking from 'middlewares/tracking/facebook/checkout'

describe('facebook checkout data getters', function() {
  let sandbox

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe('getAvailableUserData', function() {
    it('should return undefined if no state data is provided', function() {
      const result = checkoutTracking.getAvailableUserData()
      expect(result).to.equal(undefined)
    })

    it('should return correct email, first name, last name, and post code from state if email is available but delivry ppostcode is not', function() {
      const state = {
        form: {
          checkout: {
            values: {
              aboutyou: {
                email: 'TEST@email.com',
                firstName: 'Alice',
                lastName: 'Tester',
              },
            },
          },
        },
        basket: Immutable.fromJS({
          postcode: 'W3 7UP',
        }),
        request: Immutable.fromJS({}),
      }

      const result = checkoutTracking.getAvailableUserData(undefined, state)
      expect(result).to.deep.equal({
        em: 'test@email.com',
        fn: 'alice',
        ln: 'tester',
        zp: 'w37up',
      })
    })

    it('should return correct email, first name, last name, phone number, address, town, post code from form state if email is available and delivery postcode is available', function() {
      const state = {
        form: {
          checkout: {
            values: {
              aboutyou: {
                email: 'TEST@email.com',
                firstName: 'Alice',
                lastName: 'Tester',
              },
              delivery: {
                phone: '7474737373',
                town: 'City Name',
                houseNo: '3 Brick Ln',
                postcode: 'W6 7UP',
                county: 'County Name',
              },
            },
          },
        },
        basket: Immutable.fromJS({
          postcode: 'W3 7UP',
        }),
        request: Immutable.fromJS({}),
      }

      const result = checkoutTracking.getAvailableUserData(undefined, state)
      expect(result).to.deep.equal({
        em: 'test@email.com',
        fn: 'alice',
        ln: 'tester',
        ph: '447474737373',
        ct: 'cityname',
        st: 'countyname',
        zp: 'w67up',
      })
    })

    it('should return correct email, first name, last name, phone number, address, town, post code from mobile form state if email is available and delivery postcode is available', function() {
      const state = {
        form: {
          checkout: {
            values: {
              aboutyou: {
                email: 'TEST@email.com',
                firstName: 'Alice',
                lastName: 'Tester',
              },
              delivery: {
                phone: '777777777',
                town: 'City Name Mobile',
                houseNo: '8 Brick Ln',
                postcode: 'W6 7US',
                county: 'County Name Mobile',
              },
            },
          },
        },
        basket: Immutable.fromJS({
          postcode: 'W3 7UP',
        }),
        request: Immutable.fromJS({
          browser: 'mobile',
        }),
      }

      const result = checkoutTracking.getAvailableUserData(undefined, state)
      expect(result).to.deep.equal({
        em: 'test@email.com',
        fn: 'alice',
        ln: 'tester',
        ph: '44777777777',
        ct: 'citynamemobile',
        st: 'countynamemobile',
        zp: 'w67us',
      })
    })
  })
})
