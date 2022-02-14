import Immutable from 'immutable'
import { trackUserFreeFoodLinkShare } from 'actions/loggingmanager'
import { trackingReferFriendSocialSharing } from 'actions/user'
import { actionTypes } from 'actions/actionTypes'
import { canUseWindow } from 'utils/browserEnvironment'
import {
  getMessage,
  getReferralLink,
  getWhatsappReferralLink,
  getTextMessageReferralLink,
  getMessengerReferralLink,
  getFacebookReferralLink,
  SOCIAL_TYPES,
} from '../socialReferralHelper'
import { mockWindowLocationAssign } from '../../../../jest/mockWindowLocationAssign'

jest.mock('utils/browserEnvironment')

jest.mock('actions/loggingmanager', () => ({
  trackUserFreeFoodLinkShare: jest.fn(),
}))

jest.mock('actions/user', () => ({
  trackingReferFriendSocialSharing: jest.fn(),
}))

jest.mock('config/globals', () => jest.fn().mockReturnValue(false))

const mockFB = {
  ui: jest.fn(),
}

let win

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
  const { location } = window.location

  beforeAll(() => {
    win = window
  })

  beforeEach(() => {
    jest.clearAllMocks()

    canUseWindow.mockReturnValue(true)

    global.window.open = jest.fn()
    global.window.FB = mockFB
  })

  afterAll(() => {
    window = win
  })

  describe('getMessage', () => {
    test('should return the correct referral code text', () => {
      expect(getMessage(offer)).toEqual(
        'I love Gousto and I think you will too! Use my link to get an exclusive 70% off your first box, PLUS 40% off for a whole month. \r\n'
      )
    })

    test('should return the correct referral code with default offer when no raf offer is provided', () => {
      expect(getMessage()).toEqual(
        'I love Gousto and I think you will too! Use my link to get an exclusive 60% off your first box, PLUS 30% off for a whole month. \r\n'
      )
    })
  })

  describe('getReferralLink', () => {
    test('should return correct referral link', () => {
      expect(getReferralLink(referralCode, firstName, UTM)).toEqual(
        'cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=test'
      )
    })

    test('should return correct referral link when first name and UTM not provided', () => {
      expect(getReferralLink(referralCode)).toEqual('cook.gousto.co.uk/raf/?promo_code=TEST')
    })
  })

  describe('getWhatsappReferralLink', () => {
    let mockAssign

    beforeEach(() => {
      mockAssign = mockWindowLocationAssign(location)

      getWhatsappReferralLink(
        referralCode,
        firstName,
        offer,
        mockTrackingFunc,
        trackUserFreeFoodLinkShare
      )
    })

    afterEach(() => {
      window.location = location
    })
    test('should return correct referral link', () => {
      const message = 'I love Gousto and I think you will too! Use my link to get an exclusive 70% off your first box, PLUS 40% off for a whole month. \r\n'
      + 'cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=whatsapp&utm_medium=sharebutton_raf_page&utm_campaign=raf_whatsapp_share'
      expect(mockAssign).toHaveBeenCalledWith(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`
      )
    })

    test('should call tracking event link', () => {
      expect(trackUserFreeFoodLinkShare).toHaveBeenCalledWith({ target: SOCIAL_TYPES.whatsapp })
    })
  })

  describe('getTextMessageReferralLink', () => {
    let mockAssign

    beforeEach(() => {
      mockAssign = mockWindowLocationAssign(location)

      getTextMessageReferralLink(
        referralCode,
        firstName,
        offer,
        mockTrackingFunc,
        trackUserFreeFoodLinkShare
      )
    })

    afterEach(() => {
      window.location = location
    })

    test('should return correct referral link', () => {
      const message = 'I love Gousto and I think you will too! Use my link to get an exclusive 70% off your first box, PLUS 40% off for a whole month. \r\n'
      + 'cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=text_message&utm_medium=sharebutton_raf_page&utm_campaign=raf_text_message_share'
      expect(mockAssign).toHaveBeenCalledWith(`sms:?&body=${encodeURIComponent(message)}`)
    })

    test('should call tracking event link', () => {
      expect(trackUserFreeFoodLinkShare).toHaveBeenCalledWith({ target: SOCIAL_TYPES.text })
    })
  })

  describe('getMessengerReferralLink', () => {
    test('should trigger tracking event', () => {
      getMessengerReferralLink(
        referralCode,
        firstName,
        trackingReferFriendSocialSharing,
        'whatever',
        trackUserFreeFoodLinkShare
      )

      expect(trackUserFreeFoodLinkShare).toHaveBeenCalledWith({ target: SOCIAL_TYPES.messenger })
    })

    describe('when window is available', () => {
      beforeEach(() => {
        canUseWindow.mockReturnValue(true)
      })

      describe('on a "desktop" or "tablet" device', () => {
        beforeEach(() => {
          getMessengerReferralLink(
            referralCode,
            firstName,
            trackingReferFriendSocialSharing,
            'desktop',
            trackUserFreeFoodLinkShare
          )
        })

        test('FB event is fired as expected', () => {
          expect(mockFB.ui).toHaveBeenCalledWith({
            method: 'send',
            mobile_iframe: true,
            link: 'cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=messenger&utm_medium=sharebutton_raf_page&utm_campaign=raf_messenger_share',
            redirect_uri:
              'cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=messenger&utm_medium=sharebutton_raf_page&utm_campaign=raf_messenger_share',
          })
        })
      })

      describe('on a "mobile" device', () => {
        beforeEach(() => {
          getMessengerReferralLink(
            referralCode,
            firstName,
            trackingReferFriendSocialSharing,
            'whatever',
            trackUserFreeFoodLinkShare
          )
        })

        test('window.open is invoked as expected', () => {
          expect(window.open).toHaveBeenCalledWith(
            'https://www.facebook.com/dialog/share?app_id=245584327705619&display=popup&href=cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=messenger&utm_medium=sharebutton_raf_page&utm_campaign=raf_messenger_share&redirect_uri=https://cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=messenger&utm_medium=sharebutton_raf_page&utm_campaign=raf_messenger_share'
          )
        })
      })
    })

    describe('when window is not available', () => {
      beforeEach(() => {
        canUseWindow.mockReturnValue(false)

        getMessengerReferralLink(
          referralCode,
          firstName,
          trackingReferFriendSocialSharing,
          'whatever',
          trackUserFreeFoodLinkShare
        )
      })

      test('then FB event is not fired', () => {
        expect(mockFB.ui).not.toHaveBeenCalled()
      })

      test('then window.open is not invoked', () => {
        expect(window.open).not.toHaveBeenCalled()
      })
    })
  })

  describe('getFacebookReferralLink', () => {
    describe('isomorphic behaviour', () => {
      beforeEach(() => {
        getFacebookReferralLink(
          referralCode,
          firstName,
          trackingReferFriendSocialSharing,
          trackUserFreeFoodLinkShare
        )
      })

      test('should trigger facebook tracking event', () => {
        expect(trackUserFreeFoodLinkShare).toHaveBeenCalledWith({ target: SOCIAL_TYPES.facebook })
      })

      test('should trigger refer a friend tracking event', () => {
        expect(trackingReferFriendSocialSharing).toHaveBeenCalledWith(
          actionTypes.REFER_FRIEND_LINK_SHARE,
          'ReferFriendLink Share',
          SOCIAL_TYPES.facebook
        )
      })
    })

    describe('if window is available', () => {
      beforeEach(() => {
        canUseWindow.mockReturnValue(true)

        getFacebookReferralLink(
          referralCode,
          firstName,
          trackingReferFriendSocialSharing,
          trackUserFreeFoodLinkShare
        )
      })

      test('FB event is fired as expected', () => {
        expect(mockFB.ui).toHaveBeenCalledWith({
          href: 'cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=facebook&utm_medium=sharebutton_raf_page&utm_campaign=raf_facebook_share',
          method: 'share',
          mobile_iframe: true,
          redirect_uri:
            'cook.gousto.co.uk/raf/?promo_code=TEST&name=FirstName&utm_source=facebook&utm_medium=sharebutton_raf_page&utm_campaign=raf_facebook_share',
        })
      })
    })

    describe('if window is not available', () => {
      beforeEach(() => {
        canUseWindow.mockReturnValue(false)

        getFacebookReferralLink(
          referralCode,
          firstName,
          trackingReferFriendSocialSharing,
          trackUserFreeFoodLinkShare
        )
      })

      test('FB event is not fired', () => {
        expect(mockFB.ui).not.toHaveBeenCalled()
      })
    })
  })
})
