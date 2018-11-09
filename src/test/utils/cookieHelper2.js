import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('cookieHelper2', function () {
  let cookieHelper2
  let logger
  let cookieString
  let cookies
  let cookiesGetSpy
  let cookiesSetSpy
  let loggerErrorSpy
  let clock

  beforeEach(function () {
    cookiesGetSpy = sinon.spy()
    cookiesSetSpy = sinon.spy()
    cookies = {
      get: cookiesGetSpy,
      set: cookiesSetSpy,
    }
    cookieString = () => '_hjIncludedInSample=1; ajs_anonymous_id=%22d2c57a73-b11d-439a-8a46-c7f04dfdf2e2%22; PRUM_EPISODES=s=1476899312363&r=https%3A//staging-frontend.gousto.info/order/1574818/summary%3Forder_action%3Drecipe-choice; optimizelySegments=%7B%223692190446%22%3A%22gc%22%2C%223698571258%22%3A%22false%22%2C%223731020200%22%3A%22direct%22%2C%224140340910%22%3A%22none%22%2C%224571341215%22%3A%22true%22%2C%224560712321%22%3A%22true%22%2C%226451200834%22%3A%22true%22%2C%226193071531%22%3A%22true%22%2C%224551680822%22%3A%22true%22%7D; optimizelyBuckets=%7B%7D; optimizelyEndUserId=oeu1476793296696r0.0022593125675545167; ajs_user_id=%22173701%22; ajs_group_id=null; _hp2_id.3408999299=%7B%22userId%22%3A%228767254096015077%22%2C%22pageviewId%22%3A%224015732425021587%22%2C%22sessionId%22%3A%225626329169314812%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%223.0%22%7D; _hp2_ses_props.3408999299=%7B%22ts%22%3A1476957652163%2C%22d%22%3A%22staging-frontend.gousto.info%22%2C%22h%22%3A%22%2Fmenu%22%7D; __zlcmid=d9fvpvRQBP4sc8; _ga=GA1.3.1725641449.1476793298; v1_goustoStateStore_basket_postcode=%22w3%22; v1_goustoStateStore_basket_date=%222016-10-24%22; v1_goustoStateStore_basket_numPortions=2; v1_goustoStateStore_basket_slotId=%22daf6ce02-12d1-11e6-8486-06ddb628bdc5%22'.split(';')
    loggerErrorSpy = sinon.spy()
    logger = {
      error: loggerErrorSpy,
      notice: sinon.spy(),
    }
    cookieHelper2 = require('inject-loader?./logger&./cookieString!utils/cookieHelper2')({ // eslint-disable-line global-require
      './cookieString': cookieString,
      './logger': logger,
    })
  })

  describe('encode', function () {
    it('should return the JSON stringified value', function () {
      const result = cookieHelper2.encode({ something: 'here' })
      const expected = '{"something":"here"}'
      expect(result).to.deep.equal(expected)
    })
    it('should return an empty string for undefined values', function () {
      const result = cookieHelper2.encode()
      const expected = ''
      expect(result).to.deep.equal(expected)
    })
  })
  describe('decode', function () {
    it('should return the JSON parsed value', function () {
      const result = cookieHelper2.decode('{"something":"here"}')
      const expected = { something: 'here' }
      expect(result).to.deep.equal(expected)
    })
    it('should return undefined for undefined values', function () {
      const result = cookieHelper2.decode()
      expect(result).to.deep.equal(undefined)
    })
  })
  describe('get', function () {
    it('should return undefined if no cookies are passed in', function () {
      const result = cookieHelper2.get()
      expect(result).to.deep.equal(undefined)
    })
    it('should log an error and return undefined if the value is unparsable', function () {
      cookiesGetSpy = sinon.stub().returns('{something : very wrong]')
      cookies = {
        get: cookiesGetSpy,
        set: cookiesSetSpy,
      }
      const result = cookieHelper2.get(cookies)
      expect(result).to.deep.equal(undefined)
      expect(loggerErrorSpy).to.have.been.calledOnce
      expect(loggerErrorSpy.getCall(0).args[0].indexOf('un-parsable cookie')).not.to.equal(-1)
    })
    it('should return null without logging an error if oauth_token value is `deleted`', function () {
      cookiesGetSpy = sinon.stub()
      cookiesGetSpy.withArgs('oauth_token').returns('deleted')
      cookies = {
        get: cookiesGetSpy,
      }
      const result = cookieHelper2.get(cookies, 'oauth_token')
      expect(result).to.equal(null)
      expect(loggerErrorSpy).to.have.not.been.called
    })
    it('should return null without logging an error if oauth_token value is `deleted`', function () {
      cookiesGetSpy = sinon.stub()
      cookiesGetSpy.withArgs('oauth_refresh').returns('deleted')
      cookies = {
        get: cookiesGetSpy,
      }
      const result = cookieHelper2.get(cookies, 'oauth_refresh')
      expect(result).to.equal(null)
      expect(loggerErrorSpy).to.have.not.been.called
    })
    it('should return null without logging an error if v1_oauth_token value is `deleted`', function () {
      cookiesGetSpy = sinon.stub()
      cookiesGetSpy.withArgs('v1_oauth_token').returns('deleted')
      cookies = {
        get: cookiesGetSpy,
      }
      const result = cookieHelper2.get(cookies, 'oauth_token')
      expect(result).to.equal(null)
      expect(loggerErrorSpy).to.have.not.been.called
    })
    it('should return null without logging an error if v1_oauth_refresh value is `deleted`', function () {
      cookiesGetSpy = sinon.stub()
      cookiesGetSpy.withArgs('v1_oauth_refresh').returns('deleted')
      cookies = {
        get: cookiesGetSpy,
      }
      const result = cookieHelper2.get(cookies, 'oauth_refresh')
      expect(result).to.equal(null)
      expect(loggerErrorSpy).to.have.not.been.called
    })
    it('should return undefined if the value cant be found in the cookie', function () {
      const result = cookieHelper2.get(cookies)
      expect(result).to.deep.equal(undefined)
    })
    it('should return the value found in the cookie', function () {
      cookiesGetSpy = sinon.stub().returns('"a value"')
      cookies = {
        get: cookiesGetSpy,
        set: cookiesSetSpy,
      }
      const result = cookieHelper2.get(cookies)
      expect(result).to.deep.equal('a value')
    })
  })
  describe('set', function () {
    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date('2000-01-01').getTime())
    })

    afterEach(function() {
      clock.restore()
    })

    it('should log an error if no cookies are passed in', function () {
      cookieHelper2.set()
      expect(loggerErrorSpy).to.have.been.calledOnce
      expect(loggerErrorSpy.getCall(0).args[0]).to.deep.equal('no cookies to set on')
    })
    it('should set the cookie to the encoded value', function () {
      cookieHelper2.set(cookies, 'key', 'value', null, false)
      expect(cookiesSetSpy).to.have.been.calledOnce
      expect(cookiesSetSpy.getCall(0).args).to.deep.equal(['key', '"value"', { httpOnly: false }])
    })
    describe('with days passed in', function () {
      it('should set the cookie to the encoded value with an expiry date of now + the number of days', function () {
        const expires = new Date('2000-01-02')
        cookieHelper2.set(cookies, 'key', 'value', 1, false)
        expect(cookiesSetSpy).to.have.been.calledOnce
        expect(cookiesSetSpy.getCall(0).args).to.deep.equal(['key', '"value"', { expires, httpOnly: false }])
      })
    })
  })
  describe('unset', function () {
    it('should log an error if no cookies are passed in', function () {
      cookieHelper2.unset()
      expect(loggerErrorSpy).to.have.been.calledOnce
      expect(loggerErrorSpy.getCall(0).args[0]).to.deep.equal('no cookies to delete on')
    })
    it('should set a cookie with an expiry date in the past and a null value', function () {
      cookieHelper2.unset(cookies, 'key', false)
      const expires = new Date('1970-01-01')
      expect(cookiesSetSpy.getCall(0).args).to.deep.equal(['key', null, { expires, httpOnly: false, path: '/' }])
    })
  })
  describe('getNamesWithPrefix', function () {
    it('should return an array of cookie names that start with the given argument', function () {
      const result = cookieHelper2.getNamesWithPrefix(null, 'goustoStateStore')
      const expected = ['goustoStateStore_basket_postcode', 'goustoStateStore_basket_date', 'goustoStateStore_basket_numPortions', 'goustoStateStore_basket_slotId']
      expect(result).to.deep.equal(expected)
    })
    it('should return an empty array if no matches are found', function () {
      const result = cookieHelper2.getNamesWithPrefix(null, 'something not there')
      const expected = []
      expect(result).to.deep.equal(expected)
    })
  })
})
