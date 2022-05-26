import Immutable from 'immutable'

import { basketPromoCodeChange } from 'actions/basket'
import { promoGet, promoChange } from 'actions/promos'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { clickEnterPromoCodeManuallyContinue } from 'actions/trackingKeys'

import {
  getPromoCodeCampaignTextHtml,
  checkPromoCode,
  proceedWithPromoCode,
} from '../enterPromoCodeManuallyUtils'

jest.mock('actions/promos', () => ({
  promoGet: jest.fn(),
  promoChange: jest.fn(),
}))

jest.mock('actions/basket', () => ({
  basketPromoCodeChange: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

const makeFakePromoStoreEntry = (rawHtml: string) =>
  Immutable.fromJS({
    codeData: {
      campaign: {
        modalText: rawHtml,
      },
    },
  })

describe('enterPromoCodeManuallyUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given getPromoCodeCampaignTextHtml is called', () => {
    describe('when promoStoreEntry does not exist', () => {
      test('then it should return null', () => {
        const promoStoreEntry = null
        const actual = getPromoCodeCampaignTextHtml(promoStoreEntry)
        expect(actual).toBeNull()
      })
    })

    describe('when promoStoreEntry describes an error', () => {
      test('then it should return null', () => {
        const promoStoreEntry = Immutable.fromJS({
          errorText: 'not-exist',
        })
        const actual = getPromoCodeCampaignTextHtml(promoStoreEntry)
        expect(actual).toBeNull()
      })
    })

    describe('when promoStoreEntry describes a valid promo code', () => {
      test('then it should return the html with stripped style tags', () => {
        const rawHtml = `<p class="lead" style="font-family: Lato, Helvetica, sans-serif;">You have a voucher</p>
<p class="lead" style="font-family: Lato, Helvetica, sans-serif;">Happy cooking!</p>`

        const promoStoreEntry = makeFakePromoStoreEntry(rawHtml)
        const actual = getPromoCodeCampaignTextHtml(promoStoreEntry)
        expect(actual).toBe(`<p class="lead" >You have a voucher</p>
<p class="lead" >Happy cooking!</p>`)
      })
    })
  })

  describe('given checkPromoCode is called', () => {
    const dispatch = jest.fn()
    const setStatus = jest.fn()
    const setCampaignTextHtml = jest.fn()
    const promoStore = Immutable.fromJS({
      JOEWICKSGOUSTO: makeFakePromoStoreEntry('joe-wicks-html'),
      ZZ: Immutable.fromJS({ errorText: 'not-exist' }),
    })

    describe('when promoCode is empty', () => {
      test('then it should clear the status', () => {
        checkPromoCode('', false, dispatch, promoStore, setStatus, setCampaignTextHtml)
        expect(setStatus).toHaveBeenCalledWith('empty')
      })
    })

    describe('when promoCode is non-empty but any "promocode" request is pending', () => {
      test('then it should do nothing', () => {
        checkPromoCode('JOEWICKSGOUSTO', true, dispatch, promoStore, setStatus, setCampaignTextHtml)
        expect(setStatus).not.toHaveBeenCalled()
        expect(setCampaignTextHtml).not.toHaveBeenCalled()
      })
    })

    describe('when promoCode is non-empty, there is no pending request, but no entry for this promo code is loaded', () => {
      test('then it should request the promo code data', () => {
        checkPromoCode('DTI', false, dispatch, promoStore, setStatus, setCampaignTextHtml)
        expect(promoGet).toHaveBeenCalledWith('DTI')
      })
    })

    describe('when promoCode is non-empty, there is no pending request, and this promo code is loaded', () => {
      test('then it should report success', () => {
        checkPromoCode(
          'JOEWICKSGOUSTO',
          false,
          dispatch,
          promoStore,
          setStatus,
          setCampaignTextHtml,
        )
        expect(setCampaignTextHtml).toHaveBeenCalledWith('joe-wicks-html')
        expect(setStatus).toHaveBeenCalledWith('success')
      })
    })

    describe('when promoCode is non-empty, there is no pending request, and this promo code is loaded with error', () => {
      test('then it should report error', () => {
        checkPromoCode('ZZ', false, dispatch, promoStore, setStatus, setCampaignTextHtml)
        expect(setCampaignTextHtml).not.toHaveBeenCalled()
        expect(setStatus).toHaveBeenCalledWith('error')
      })
    })
  })

  describe('given proceedWithPromoCode is called', () => {
    const dispatch = jest.fn()

    test('then it should dispatch the relevant async actions', () => {
      proceedWithPromoCode(dispatch, 'JOEWICKSGOUSTO', clickEnterPromoCodeManuallyContinue, {
        accepted: true,
      })

      expect(promoChange).toHaveBeenCalledWith('JOEWICKSGOUSTO')
      expect(basketPromoCodeChange).toHaveBeenCalledWith('JOEWICKSGOUSTO')
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith(clickEnterPromoCodeManuallyContinue, {
        accepted: true,
      })
      expect(redirect).toHaveBeenCalledWith('/signup')
    })
  })
})
