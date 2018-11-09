import sinon from 'sinon'

import pauseSubscriptionTracking from 'middlewares/tracking/snowplow/pauseSubscription'
import seActions from 'middlewares/tracking/snowplow/pauseSubscription/seActions'
import seRecoveryAttemptTypesByModalType from 'middlewares/tracking/snowplow/pauseSubscription/seRecoveryAttemptTypesByModalType'

describe('snowplow pauseSubscription Tracking', () => {
  const action = {
    metaData: { meta: 'data' },
    selectedCategory: 'category-a',
    selectedReason: 'reason-a',
  }
  const seCategory = 'PauseSubscription'
  const recoveryTypesExpected = [
    'promo',
    'contact_cc',
    'generic',
    'change_delivery_date',
    'skip_next',
    'skip_boxes',
    'promo_reminder',
    'changed_mind',
  ]
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('pauseAttempt', () => {
    test('should return the correct properties', () => {
      expect(pauseSubscriptionTracking.pauseAttempt(action)).toEqual({
        type: seActions.SUBSCRIPTION_PAUSE_ATTEMPT,
        data: action.metaData,
        seCategory,
      })
    })
  })

  describe('startModalViewed', () => {
    test('should return the correct properties', () => {
      expect(pauseSubscriptionTracking.startModalViewed()).toEqual({
        type: seActions.START_MODAL_VIEWED,
        seCategory,
      })
    })
  })

  describe('reasonCategoryModalViewed', () => {
    test('should return the correct properties', () => {
      expect(pauseSubscriptionTracking.reasonCategoryModalViewed()).toEqual({
        type: seActions.REASON_CATEGORY_MODAL_VIEWED,
        seCategory,
      })
    })
  })

  describe('reasonCategorySelected', () => {
    test('should return the correct properties', () => {
      expect(pauseSubscriptionTracking.reasonCategorySelected(action)).toEqual({
        type: seActions.REASON_CATEGORY_SELECTED,
        data: { selected_category: action.selectedCategory },
        seCategory,
      })
    })
  })

  describe('reasonListModalViewed', () => {
    test('should return the correct properties', () => {
      expect(pauseSubscriptionTracking.reasonListModalViewed(action)).toEqual({
        type: seActions.REASON_LIST_MODAL_VIEWED,
        data: { selected_category: action.selectedCategory },
        seCategory,
      })
    })
  })

  describe('reasonSelected', () => {
    test('should return the correct properties', () => {
      expect(pauseSubscriptionTracking.reasonSelected(action)).toEqual({
        type: seActions.REASON_SELECTED,
        data: { reason: action.selectedReason },
        seCategory,
      })
    })
  })

  describe('recoveryAttemptModalViewed', () => {
    test('should return the correct properties and recovery_attempt_type when called with each possible action.modalType', () => {
      const modalToRecoveryAttemptTypeMap = Object.entries(
        seRecoveryAttemptTypesByModalType,
      )
      modalToRecoveryAttemptTypeMap.forEach((mapEntry, index) => {
        expect(
          pauseSubscriptionTracking.recoveryAttemptModalViewed({
            modalType: mapEntry[0],
          }),
        ).toEqual({
          type: seActions.RECOVERY_ATTEMPT_MODAL_VIEWED,
          data: { recovery_attempt_type: recoveryTypesExpected[index] },
          seCategory,
        })
      })
    })
  })

  describe('subscriptionKeptActive', () => {
    test('should return the seRecoveryType passed in the action if any', () => {
      const result = pauseSubscriptionTracking.subscriptionKeptActive({
        seRecoveryType: 'passed-type',
      })
      expect(result.data.recovery_attempt_type).toBe('passed-type')
    })

    test('should return the correct recovery_attempt_type when called with each possible action.modalType if no seRecoveryType passed in the action', () => {
      let otherAction
      let result
      const modalToRecoveryAttemptTypeMap = Object.entries(
        seRecoveryAttemptTypesByModalType,
      )
      modalToRecoveryAttemptTypeMap.forEach((mapEntry, index) => {
        otherAction = Object.assign({}, { modalType: mapEntry[0] }, action)
        result = pauseSubscriptionTracking.subscriptionKeptActive(otherAction)
        expect(result.data.recovery_attempt_type).toBe(
          recoveryTypesExpected[index],
        )
      })
    })

    test('should return the seModal passed in the action if any', () => {
      const result = pauseSubscriptionTracking.subscriptionKeptActive({
        seModal: 'passed-modal',
      })
      expect(result.data.modal).toBe('passed-modal')
    })

    test('should return the correct modal depending on action.modalType passed if no action.seModal was passed', () => {
      const seModalsByModalType = [
        ['startOsr', 'StartModal'],
        ['copy', 'RecoveryAttemptModal'],
        ['contact', 'RecoveryAttemptModal'],
        ['promo', 'RecoveryAttemptModal'],
        ['quote', 'RecoveryAttemptModal'],
        ['skipBox', 'RecoveryAttemptModal'],
        ['changeDeliveryDate', 'RecoveryAttemptModal'],
        ['quoteSkipNext', 'RecoveryAttemptModal'],
        ['recovered', 'EndModal'],
        ['recoveredPromo', 'EndModal'],
        ['recoveredSkipped', 'EndModal'],
        ['other', 'OtherModal'],
        ['categories', 'ReasonCategoryModal'],
        ['reasons', 'ReasonListModal'],
        ['not-in-the-logic', 'not-in-the-logic'],
      ]
      seModalsByModalType.forEach(modalMapEntry => {
        const result = pauseSubscriptionTracking.subscriptionKeptActive({
          modalType: modalMapEntry[0],
        })
        expect(result.data.modal).toBe(modalMapEntry[1])
      })
    })

    test('should return the rest of the expected properties', () => {
      const otherAction = {
        categorySlug: 'category-slug',
        reasonSlug: 'reason-slug',
        promoCode: 'abc1',
      }
      const result = pauseSubscriptionTracking.subscriptionKeptActive(
        otherAction,
      )
      expect(result.type).toBe(seActions.SUBSCRIPTION_KEPT_ACTIVE)
      expect(result.data.reason_category).toBe(otherAction.categorySlug)
      expect(result.data.reason).toBe(otherAction.reasonSlug)
      expect(result.data.recovery_attempt_value).toBe(otherAction.promoCode)
      expect(result.seCategory).toBe(seCategory)
    })
  })

  describe('subscriptionPaused', () => {
    test('should return the correct properties and recovery_attempt_type when called with each possible action.modalType', () => {
      let otherAction
      const modalToRecoveryAttemptTypeMap = Object.entries(
        seRecoveryAttemptTypesByModalType,
      )
      modalToRecoveryAttemptTypeMap.forEach((mapEntry, index) => {
        otherAction = Object.assign({}, { modalType: mapEntry[0] }, action)
        expect(
          pauseSubscriptionTracking.subscriptionPaused(otherAction),
        ).toEqual({
          type: seActions.SUBSCRIPTION_PAUSED,
          data: {
            reason: otherAction.reason,
            recovery_attempt_type: recoveryTypesExpected[index],
          },
          seCategory,
        })
      })
    })
  })

  describe('endModalViewed', () => {
    test('should return the correct properties', () => {
      expect(pauseSubscriptionTracking.endModalViewed()).toEqual({
        type: seActions.END_MODAL_VIEWED,
        seCategory,
      })
    })
  })
})
