import Immutable from 'immutable'
import { set, unset, getNamesWithPrefix } from 'utils/cookieHelper2'
import { persist } from '../persistStore'

// unfortunately, using this value inside jest.mock just results in it being imported as undefined
const mockCookiePrefix = 'prefix'
jest.mock('config/storePersistence', () => ({
  cookiePrefix: 'prefix',
  cookieExpiries: {
    default: 2 / 24,
    features: 7,
    tracking: 30,
    basket_date: 7,
    basket_numPortions: 7,
    basket_postcode: 7,
    basket_recipes: 7,
    basket_promoCode: 60,
    basket_shortlist_shortlistRecipes: 7,
    basket_shortlist_shortlistRecipesPositions: 7,
    basket_shortlist_shortlistFeedbackViewed: 30,
  }
}))
jest.mock('utils/cookieHelper2')

fdescribe('persistStore', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    getNamesWithPrefix.mockReset()
    getNamesWithPrefix.mockReturnValue([`${mockCookiePrefix}_cookie1`, `${mockCookiePrefix}_cookie2`])
  })

  describe('persist', () => {
    let genWhitelist
    let state
    let whitelist
    const cookies = {
      [`${mockCookiePrefix}_cookie1`]: 'cookie1-value',
      [`${mockCookiePrefix}_cookie2`]: 'cookie2-value',
    }
    beforeEach(() => {
      whitelist = {
        something: false,
        nested: {
          obj: true,
        },
        emptyVal: true,
        emptyArray: false,
        emptyObj: false,
        emptyNested: { nestedEmtpyVal: true },
        emptyImmutable: false,
      }
      genWhitelist = jest.fn().mockReturnValue(whitelist)
      state = {
        something: [
          'so', 'many', 'things',
        ],
        nested: {
          obj: 'hello',
        },
        emptyVal: '',
        emptyArray: [],
        emptyObj: {},
        emptyNested: { nestedEmtpyVal: '' },
        emptyImmutable: Immutable.fromJS({}),
      }
    })

    describe('with whitelist', () => {
      it('should call genWhitelist, serialiseStore, persistStore and saveStoreAsCookie with right values', () => {
        persist(state, genWhitelist, cookies)

        expect(genWhitelist).toHaveBeenCalledTimes(1)
        expect(genWhitelist).toHaveBeenCalledWith(state)

        expect(getNamesWithPrefix).toHaveBeenCalledTimes(1)
        expect(getNamesWithPrefix).toHaveBeenCalledWith(cookies, mockCookiePrefix)

        expect(unset).toHaveBeenCalledTimes(2)
        expect(unset).toHaveBeenCalledWith(cookies, `${mockCookiePrefix}_cookie1`)
        expect(unset).toHaveBeenCalledWith(cookies, `${mockCookiePrefix}_cookie2`)

        expect(set).toHaveBeenCalledTimes(2)
        expect(set).toHaveBeenCalledWith(cookies, 'prefix_something', JSON.stringify(['so', 'many', 'things']), 2 / 24)
        expect(set).toHaveBeenCalledWith(cookies, 'prefix_nested_obj', 'hello', 2 / 24)
      })
    })

    describe('with a features cookie', () => {
      beforeEach(() => {
        state = {
          features: {
            a: { value: 'b' },
            c: { value: 'd' },
          },
        }
        whitelist = {
          features: false,
        }
        genWhitelist = jest.fn().mockReturnValue(whitelist)
      })
      it('should set it for 7 days', () => {
        persist(state, genWhitelist, cookies)
        expect(set).toHaveBeenCalledTimes(1)
        expect(set).toHaveBeenCalledWith(cookies, 'prefix_features', JSON.stringify({ a: { value: 'b' }, c: { value: 'd' } }), 7)
      })
    })

    describe('with a tracking cookie', () => {
      beforeEach(() => {
        state = {
          tracking: {
            a: 'b',
            c: 'd',
          },
        }
        whitelist = {
          tracking: false,
        }
        genWhitelist = jest.fn().mockReturnValue(whitelist)
      })
      it('should set it for 30 days', () => {
        persist(state, genWhitelist, cookies)
        expect(set).toHaveBeenCalledTimes(1)
        expect(set).toHaveBeenCalledWith(cookies, 'prefix_tracking', JSON.stringify({ a: 'b', c: 'd' }), 30)
      })
    })
  })
})

