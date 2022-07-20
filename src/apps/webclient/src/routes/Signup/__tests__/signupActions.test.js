import Immutable from 'immutable'
import { push } from 'react-router-redux'

import { actionTypes } from 'actions/actionTypes'
import { basketPostcodeChange } from 'actions/basket'
import loginActions from 'actions/login'
import { menuLoadBoxPrices } from 'actions/menu'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { fetchCountByPostcode } from 'apis/signup'
import {
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
  signupApplyVoucherGoToDeliveries,
  trackCuisineDeselected,
  trackCuisineSelected,
  trackSignupPersonalisationComplete,
  signupStepsReceive,
  signupCookForKidsChange,
  signupChangePostcode,
  signupTracking,
  signupNextStep,
  signupSetStep,
  signupGoToMenu,
  trackSignupWizardAction,
  trackSocialBelongingBannerAppearance,
  signupGetCountByPostcode,
} from 'routes/Signup/signupActions'
import { signupConfig } from 'routes/Signup/signupConfig'
import { stepByName } from 'routes/Signup/signupUtils'
import logger from 'utils/logger'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))

jest.mock('actions/basket', () => ({
  basketPostcodeChange: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn(),
}))

jest.mock('apis/signup')

jest.mock('react-router-redux', () => ({
  push: jest.fn(),
}))

jest.mock('config/routes', () => ({
  client: {
    signup: '/signup',
    menu: '/menu',
    myDeliveries: '/my-deliveries',
  },
}))

jest.mock('routes/Signup/signupUtils', () => ({
  stepByName: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn(),
}))

jest.mock('actions/login', () => ({
  loginVisibilityChange: jest.fn(),
}))

jest.mock('actions/menu', () => ({
  menuLoadBoxPrices: jest.fn(),
}))

describe('signupActions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('signupStepsReceive', () => {
    test('should return a SIGNUP_STEPS_RECEIVE action', () => {
      expect(signupStepsReceive(signupConfig.defaultSteps).type).toEqual(
        actionTypes.SIGNUP_STEPS_RECEIVE,
      )
    })

    test('should return a SIGNUP_STEPS_RECEIVE action with the steps argument mapped through to the steps property', () => {
      expect(signupStepsReceive(signupConfig.defaultSteps).stepNames).toEqual(
        signupConfig.defaultSteps,
      )
    })
  })

  describe('signupChangePostcode', () => {
    let postcode
    let nextStepName

    beforeEach(() => {
      postcode = 'w37un'
      nextStepName = 'delivery'
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('dispatch signup change postcode', async () => {
      getState.mockReturnValue({
        signup: Immutable.fromJS({
          wizard: {
            steps: ['welcome', 'then', 'something'],
            isLastStep: false,
          },
        }),
        error: Immutable.Map({}),
      })

      await signupChangePostcode(postcode, nextStepName)(dispatch, getState)

      expect(basketPostcodeChange).toHaveBeenCalledWith(postcode)
    })

    describe('with a boxSummaryDeliveryDaysError', () => {
      test('should not redirect the user to the next step', async () => {
        getState.mockReturnValue({
          error: Immutable.Map({
            [actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE]: 'do-not-deliver',
          }),
        })

        await signupChangePostcode(postcode, nextStepName)(dispatch, getState)

        expect(stepByName).not.toHaveBeenCalled()
      })
    })
  })

  describe('signupNextStep action', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        signup: Immutable.fromJS({
          wizard: {
            stepNames: [['delivery', 'welcome', 'finish']],
          },
        }),
        error: Immutable.Map({
          [actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE]: false,
        }),
      })
      stepByName.mockReturnValue(
        Immutable.Map({
          name: 'welcome',
          slug: 'welcome',
        }),
      )
    })

    test('should persist query parameters through signup', () => {
      const search = '?asource=awin&awc=5070_1532523479_c84435fcd1d056ea5d62d9f93e1398e3'
      getState.mockReturnValue({
        signup: Immutable.fromJS({
          wizard: {
            stepNames: [['delivery', 'welcome', 'finish']],
          },
        }),
        routing: {
          locationBeforeTransitions: {
            search,
          },
        },
      })

      signupNextStep('welcome')(dispatch, getState)

      expect(push).toHaveBeenCalledWith(`/signup/welcome${search}`)
    })

    describe('when not on the last step', () => {
      test('should dispatch a react-router-redux push', () => {
        signupNextStep('welcome')(dispatch, getState)

        expect(push).toHaveBeenCalledWith('/signup/welcome')
      })

      test('should not dispatch a tracking event with the correct properties', () => {
        getState.mockReturnValue({
          signup: Immutable.fromJS({
            wizard: {
              stepNames: [['delivery', 'welcome', 'finish']],
              isLastStep: false,
            },
          }),
        })

        signupNextStep('delivery')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(redirect).not.toHaveBeenCalled()
      })
    })

    describe('when on the last step', () => {
      test('should dispatch a tracking event and redirect to sell the proposition page', () => {
        getState.mockReturnValue({
          signup: Immutable.fromJS({
            wizard: {
              stepNames: ['delivery', 'welcome', 'finish'],
              isLastStep: true,
            },
          }),
        })
        stepByName.mockReturnValue(
          Immutable.Map({
            name: 'finish',
            slug: 'finish',
          }),
        )

        signupNextStep('finish')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(redirect).toHaveBeenCalledWith('/signup/about')
      })
    })
  })

  describe('signupCookForKidsChange action', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        signupSteps: Immutable.fromJS(['kidsCookFor']),
      })
    })

    test('should dispatch SIGNUP_COOK_FOR_KIDS action as first call', () => {
      signupCookForKidsChange(true)(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SIGNUP_COOK_FOR_KIDS,
        cookForKids: true,
        trackingData: {
          type: actionTypes.SIGNUP_COOK_FOR_KIDS,
          cookForKids: true,
        },
      })

      signupCookForKidsChange(false)(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SIGNUP_COOK_FOR_KIDS,
        cookForKids: false,
        trackingData: {
          type: actionTypes.SIGNUP_COOK_FOR_KIDS,
          cookForKids: false,
        },
      })
    })
  })

  describe('signupTracking action', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          postcode: 'w128nu',
          numAdults: 2,
          numPortions: 4,
          date: '2017-06-09',
          slotId: '95355fb4-01db-4169-abe2-04695ec451bc',
        }),
      })
    })

    test('should send tracking data', () => {
      signupTracking()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SIGNUP_TRACKING',
        trackingData: {
          actionType: 'SIGNUP_TRACKING',
          postcode: 'w128nu',
          numAdults: 2,
          numPortions: 4,
          date: '2017-06-09',
          slotId: '95355fb4-01db-4169-abe2-04695ec451bc',
        },
      })
    })
  })

  describe('signupSetStep action', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        signup: Immutable.fromJS({
          wizard: {
            stepNames: [['stepName', 'secondStepName']],
          },
        }),
      })
    })

    test('should dispatch the SIGNUP_STEP_SET action', () => {
      const step = Immutable.Map({
        name: 'stepName',
        slug: 'step-slug',
      })
      signupSetStep(step)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SIGNUP_STEP_SET',
        currentStepName: 'stepName',
        currentStepNumber: -1,
        isLastStep: false,
        trackingData: {
          type: 'SIGNUP_STEP_SET',
          step: 'step-slug',
          stepName: 'stepName',
        },
      })
    })
  })

  describe('given signupGoToMenu action is called', () => {
    beforeEach(() => {
      trackUTMAndPromoCode.mockReturnValue('track action')
      redirect.mockReturnValue('redirect action')
    })

    test('then it should redirect the user to the menu', async () => {
      signupGoToMenu()(dispatch, getState)

      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_see_this_weeks_menu')
      expect(dispatch).toHaveBeenNthCalledWith(1, 'track action')

      expect(redirect).toHaveBeenCalledWith('/menu')
      expect(dispatch).toHaveBeenNthCalledWith(2, 'redirect action')
    })
  })

  describe('given trackSignupWizardAction action is called', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        signup: Immutable.fromJS({}),
        error: Immutable.Map({}),
        basket: Immutable.fromJS({
          promoCode: 'promo1',
        }),
        tracking: Immutable.Map({
          utmSource: {
            referral: '123',
          },
        }),
      })
    })

    test('then it should send correct tracking data', async () => {
      trackSignupWizardAction('complete_wizard_box_size', { box_size: 2 })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'complete_wizard_box_size',
        trackingData: {
          actionType: 'complete_wizard_box_size',
          box_size: 2,
          promoCode: 'promo1',
          referral: '123',
        },
      })
    })
  })

  describe('given trackSocialBelongingBannerAppearance action is called', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        signup: Immutable.fromJS({
          wizard: {
            district: 'District',
            amountOfCustomers: 100,
          },
        }),
        basket: Immutable.fromJS({
          promoCode: 'promo1',
        }),
        tracking: Immutable.Map({
          utmSource: {
            referral: '123',
          },
        }),
      })
    })

    test('then it should send correct tracking properties', async () => {
      trackSocialBelongingBannerAppearance()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'community_customers_banner_displayed',
        trackingData: {
          actionType: 'community_customers_banner_displayed',
          promo_code: 'promo1',
          referral: '123',
          district: 'District',
          number_of_customers: 100,
        },
      })
    })
  })

  describe('given signupGetCountByPostcode is called', () => {
    describe('when count is successfully fetched', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.fromJS({
            accessToken: 'token',
          }),
        })
        fetchCountByPostcode.mockResolvedValue(
          new Promise((resolve) => {
            resolve({
              data: {
                count: 100,
                district: 'district',
              },
            })
          }),
        )
      })

      test('then it should dispatch correct data', async () => {
        await signupGetCountByPostcode('postcode')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SIGNUP_SET_SOCIAL_BELONGING_OPTIONS',
          count: 100,
          district: 'district',
        })
      })
    })

    describe('when count does not exist', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.fromJS({
            accessToken: 'token',
          }),
        })
        fetchCountByPostcode.mockRejectedValue({
          error: 'error',
          message: 'there are no people in current district',
        })
      })

      test('then logger error should be called', async () => {
        await signupGetCountByPostcode('postcode')(dispatch, getState)

        expect(logger.error).toHaveBeenCalledWith('No users found in current area')
      })
    })
  })

  describe('given signupCheckAccountGoToBoxPrices is dispatched', () => {
    beforeEach(() => {
      signupCheckAccountGoToBoxPrices()(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_god_new_customer')
      expect(redirect).toHaveBeenCalledWith('/signup/box-size')
      expect(menuLoadBoxPrices).toHaveBeenCalled()
    })
  })

  describe('given signupCheckAccountLogin is dispatched', () => {
    beforeEach(() => {
      signupCheckAccountLogin()(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_god_existing_customer')
      expect(loginActions.loginVisibilityChange).toHaveBeenCalledWith(true)
    })
  })

  describe('given signupApplyVoucherGoToDeliveries is dispatched', () => {
    test('then it should dispatch correct actions', () => {
      signupApplyVoucherGoToDeliveries()(dispatch)
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_apply_voucher_existing_account')
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })
  })

  describe('given trackCuisineSelected is called with a cuisine', () => {
    beforeEach(() => {
      trackCuisineSelected('American')(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'cuisine_selected',
          cuisineName: 'American',
        },
      })
    })
  })

  describe('given trackCuisineDeselected is called with a cuisine', () => {
    beforeEach(() => {
      trackCuisineDeselected('British')(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'cuisine_deselected',
          cuisineName: 'British',
        },
      })
    })
  })

  describe('given trackSignupPersonalisationComplete is called with cuisines', () => {
    beforeEach(() => {
      trackSignupPersonalisationComplete(['French', 'Asian'])(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'signup_personalisation_complete',
          selectedCuisines: ['French', 'Asian'],
        },
      })
    })
  })
})
