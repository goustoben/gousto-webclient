import React from 'react'
import {getMessage, getReferralLink, getWhatsappReferralLink, getTextMessageReferralLink} from 'routes/Account/Referral/socialReferralHelper'
import Immutable from 'immutable'

describe('Social Referral Helper', () => {
  const offer = Immutable.fromJS({
    creditFormatted: '£15',
    firstBoxDiscountFormatted: '70%',
    firstMonthDiscountFormatted: '40%',
  })

  const referralCode = 'TEST'
  const firstName = 'FirstName'
  const UTM = '&utm_source=test'
  const mockTrackingFunc = jest.fn()

  describe('getMessage', () => {
    test('should return the correct referral code text', () => {
      expect(getMessage(offer)).toEqual(`I love Gousto and I think you will too! Use my link to get an exclusive 70% off your first box, PLUS 40% off for a whole month. \r\n`)
    })

    test('should return the correct referral code with default offer when no raf offer is provided', () => {
      expect(getMessage()).toEqual(`I love Gousto and I think you will too! Use my link to get an exclusive 60% off your first box, PLUS 30% off for a whole month. \r\n`)
    })
  })

  describe('getReferralLink', () => {

    test('should return correct referral link', () => {
      expect(getReferralLink(referralCode, firstName, UTM )).toEqual(`https://cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=test`)
    })

    test('should return correct referral link when first name and UTM not provided', () => {
      expect(getReferralLink(referralCode )).toEqual('https://cook.gousto.co.uk/raf/?promo_code=TEST')
    })
  })

  describe('getWhatsappReferralLink', () => {
    const mockAssign = jest.fn()
    beforeEach(() => {
      window.location.assign = mockAssign
    })

    test('should return correct referral link', () => {
      getWhatsappReferralLink(referralCode, firstName, offer, mockTrackingFunc)

      const message ='I love Gousto and I think you will too! Use my link to get an exclusive 70% off your first box, PLUS 40% off for a whole month. \r\nhttps://cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=whatsapp&utm_medium=sharebutton_raf_page&utm_campaign=raf_whatsapp_share'
      expect(mockAssign).toHaveBeenCalledWith(`https://wa.me/?text=${encodeURIComponent(message)}`)
    })
  })

  describe('getTextMessageReferralLink', () => {
    const mockAssign = jest.fn()
    beforeEach(() => {
      window.location.assign = mockAssign
    })

    test('should return correct referral link', () => {
      getTextMessageReferralLink(referralCode, firstName, offer, mockTrackingFunc)

      const message ='I love Gousto and I think you will too! Use my link to get an exclusive 70% off your first box, PLUS 40% off for a whole month. \r\nhttps://cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=text_message&utm_medium=sharebutton_raf_page&utm_campaign=raf_text_message_share'
      expect(mockAssign).toHaveBeenCalledWith(`sms:?&body=${encodeURIComponent(message)}`)
    })
  })
})
