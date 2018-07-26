import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'
import windowUtils from 'utils/window'
import snowplowV2 from 'middlewares/tracking/snowplow/V2'
import basketTracking from 'middlewares/tracking/snowplow/basket'
import pauseSubscriptionTracking from 'middlewares/tracking/snowplow/pauseSubscription'
import recipesTracking from 'middlewares/tracking/snowplow/recipes'
import trackingUtils from 'middlewares/tracking/snowplow/utils'

describe('snowplowV2', function() {
	let snowplow
	let dataScienceDataLayer
	let sandbox

	beforeEach(function() {
		dataScienceDataLayer = []
		sandbox = sinon.sandbox.create()
		snowplow = sandbox.spy()
		sandbox.stub(windowUtils, 'getWindow').returns({ snowplow, dataScienceDataLayer })
		sandbox.stub(trackingUtils, 'getPathname').returns('/test-path')
	})

	afterEach(function() {
		sandbox.restore()
	})

	describe('auth tracking', function() {
		it('should call userIdentifiedTracking with actionTypes.USER_IDENTIFIED with user', function() {
			snowplowV2({
				type: actionTypes.USER_IDENTIFIED,
				user: {
					id: 'test-user',
				},
			})
			expect(snowplow).to.have.been.calledWith('setUserId', 'test-user')
		})

		it('should not call userIdentifiedTracking with actionTypes.USER_IDENTIFIED without user', function() {
			snowplowV2({
				type: actionTypes.USER_IDENTIFIED,
			})
			expect(snowplow).to.not.have.been.called
		})

		it('should call userLoggedOut with actionTypes.USER_LOGGED_OUT', function() {
			snowplowV2({
				type: actionTypes.USER_LOGGED_OUT,
			})
			expect(snowplow).to.have.been.calledWith('setUserId', null)
			expect(dataScienceDataLayer[0]).to.deep.equal({
				category: undefined,
				action: undefined,
				event: 'userAction',
				actionType: actionTypes.USER_LOGGED_OUT,
				actionValue: JSON.stringify({}),
				pathname: undefined,
				version: 1,
			})
		})
	})

	describe('pageChange', function () {
		it('should call snowplow "trackPageView" when chaging page', function () {
			snowplowV2({
				type: '@@router/LOCATION_CHANGE',
			})
			expect(snowplow).to.have.been.calledWith('trackPageView')
		})
	})

	describe('login tracking', function() {
		it('should call trackEventWithData with LOGIN_ATTEMPT', function () {
			snowplowV2({
				type: actionTypes.LOGIN_ATTEMPT,
			})
			expect(dataScienceDataLayer[0]).to.deep.equal({
				category: undefined,
				action: undefined,
				event: 'userAction',
				actionType: actionTypes.LOGIN_ATTEMPT,
				actionValue: JSON.stringify({}),
				pathname: '/test-path',
				version: 1,
			})
		})

		it('should call trackEventWithData with LOGIN_FAILED', function () {
			snowplowV2({
				type: actionTypes.LOGIN_FAILED,
			}, {
				error: Immutable.fromJS({
					[actionTypes.USER_LOGIN]: 'user error!',
				}),
			})
			expect(dataScienceDataLayer[0]).to.deep.equal({
				category: undefined,
				action: undefined,
				event: 'userAction',
				actionType: actionTypes.LOGIN_FAILED,
				actionValue: JSON.stringify({
					reason: 'user error!',
				}),
				pathname: '/test-path',
				version: 1,
			})
		})

		it('should call trackEventWithData with LOGIN_REMEMBER_ME', function () {
			snowplowV2({
				type: actionTypes.LOGIN_REMEMBER_ME,
			})
			expect(dataScienceDataLayer[0]).to.deep.equal({
				category: undefined,
				action: undefined,
				event: 'userAction',
				actionType: actionTypes.LOGIN_REMEMBER_ME,
				actionValue: JSON.stringify({}),
				pathname: '/test-path',
				version: 1,
			})
		})

		it('should call trackEventWithData with LOGIN_VISIBILITY_CHANGE', function () {
			snowplowV2({
				type: actionTypes.LOGIN_VISIBILITY_CHANGE,
			}, {
				loginVisibility: true,
			})
			expect(dataScienceDataLayer[0]).to.deep.equal({
				category: undefined,
				action: undefined,
				event: 'userAction',
				actionType: actionTypes.LOGIN_VISIBILITY_CHANGE,
				actionValue: JSON.stringify({
					visible: true,
				}),
				pathname: '/test-path',
				version: 1,
			})
		})
	})

	describe('basket tracking', function() {
		it('should call trackEventWithData with basketOrderLoaded when action type is BASKET_ORDER_LOADED', function () {
			const basketOrderLoaded = sinon.stub(basketTracking, 'basketOrderLoaded').returns({ a: 1, b: 2 })
			const action = {
				type: actionTypes.BASKET_ORDER_LOADED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(basketOrderLoaded).to.have.been.calledOnce
			expect(basketOrderLoaded).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with menuBoxPricesReceive when action type is BASKET_ORDER_LOADED', function () {
			const menuBoxPricesReceive = sinon.stub(basketTracking, 'menuBoxPricesReceive').returns({})
			const action = {
				type: actionTypes.MENU_BOX_PRICES_RECEIVE,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(menuBoxPricesReceive).to.have.been.calledOnce
			expect(menuBoxPricesReceive).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with appliedPromocode when action type is BASKET_ORDER_LOADED', function () {
			const appliedPromocode = sinon.stub(basketTracking, 'appliedPromocode').returns({})
			const action = {
				type: actionTypes.BASKET_PROMO_CODE_APPLIED_CHANGE,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(appliedPromocode).to.have.been.calledOnce
			expect(appliedPromocode).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with promocodeChange when action type is BASKET_ORDER_LOADED', function () {
			const promocodeChange = sinon.stub(basketTracking, 'promocodeChange').returns({})
			const action = {
				type: actionTypes.BASKET_PROMO_CODE_CHANGE,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(promocodeChange).to.have.been.calledOnce
			expect(promocodeChange).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})
	})

	describe('OSR tracking', function() {
		it('should call trackEventWithData with pauseAttempt when action type is PS_SUBSCRIPTION_PAUSE_ATTEMPT', function () {
			const pauseAttempt = sinon.spy(pauseSubscriptionTracking, 'pauseAttempt')
			const action = {
				type: actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(pauseAttempt).to.have.been.calledOnce
			expect(pauseAttempt).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with startModalViewed when action type is PS_START_MODAL_VIEWED', function () {
			const startModalViewed = sinon.spy(pauseSubscriptionTracking, 'startModalViewed')
			const action = {
				type: actionTypes.PS_START_MODAL_VIEWED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(startModalViewed).to.have.been.calledOnce
			expect(startModalViewed).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with reasonCategoryModalViewed when action type is PS_REASON_CATEGORY_MODAL_VIEWED', function () {
			const reasonCategoryModalViewed = sinon.spy(pauseSubscriptionTracking, 'reasonCategoryModalViewed')
			const action = {
				type: actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(reasonCategoryModalViewed).to.have.been.calledOnce
			expect(reasonCategoryModalViewed).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with reasonCategorySelected when action type is PS_REASON_CATEGORY_SELECTED', function () {
			const reasonCategorySelected = sinon.spy(pauseSubscriptionTracking, 'reasonCategorySelected')
			const action = {
				type: actionTypes.PS_REASON_CATEGORY_SELECTED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(reasonCategorySelected).to.have.been.calledOnce
			expect(reasonCategorySelected).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with reasonListModalViewed when action type is PS_REASON_LIST_MODAL_VIEWED', function () {
			const reasonListModalViewed = sinon.spy(pauseSubscriptionTracking, 'reasonListModalViewed')
			const action = {
				type: actionTypes.PS_REASON_LIST_MODAL_VIEWED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(reasonListModalViewed).to.have.been.calledOnce
			expect(reasonListModalViewed).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with reasonSelected when action type is PS_REASON_SELECTED', function () {
			const reasonSelected = sinon.spy(pauseSubscriptionTracking, 'reasonSelected')
			const action = {
				type: actionTypes.PS_REASON_SELECTED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(reasonSelected).to.have.been.calledOnce
			expect(reasonSelected).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with recoveryAttemptModalViewed when action type is PS_RECOVERY_ATTEMPT_MODAL_VIEWED', function () {
			const recoveryAttemptModalViewed = sinon.spy(pauseSubscriptionTracking, 'recoveryAttemptModalViewed')
			const action = {
				type: actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(recoveryAttemptModalViewed).to.have.been.calledOnce
			expect(recoveryAttemptModalViewed).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with subscriptionKeptActive when action type is PS_SUBSCRIPTION_KEPT_ACTIVE', function () {
			const subscriptionKeptActive = sinon.spy(pauseSubscriptionTracking, 'subscriptionKeptActive')
			const action = {
				type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(subscriptionKeptActive).to.have.been.calledOnce
			expect(subscriptionKeptActive).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with subscriptionPaused when action type is PS_SUBSCRIPTION_PAUSED', function () {
			const subscriptionPaused = sinon.spy(pauseSubscriptionTracking, 'subscriptionPaused')
			const action = {
				type: actionTypes.PS_SUBSCRIPTION_PAUSED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(subscriptionPaused).to.have.been.calledOnce
			expect(subscriptionPaused).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with endModalViewed when action type is PS_END_MODAL_VIEWED', function () {
			const endModalViewed = sinon.spy(pauseSubscriptionTracking, 'endModalViewed')
			const action = {
				type: actionTypes.PS_END_MODAL_VIEWED,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(endModalViewed).to.have.been.calledOnce
			expect(endModalViewed).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with recipeListViewed when action type is RECIPES_DISPLAYED_ORDER_TRACKING', function () {
			const recipeListViewed = sinon.spy(recipesTracking, 'recipeListViewed')
			const action = {
				type: actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(recipeListViewed).to.have.been.calledOnce
			expect(recipeListViewed).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with recipeFiltersOpen when action type is RECIPE_FILTERS_OPEN_TRACKING', function () {
			const recipeFiltersOpen = sinon.spy(recipesTracking, 'recipeFiltersOpen')
			const action = {
				type: actionTypes.RECIPE_FILTERS_OPEN_TRACKING,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(recipeFiltersOpen).to.have.been.calledOnce
			expect(recipeFiltersOpen).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with recipeFiltersClose when action type is RECIPE_FILTERS_CLOSE_TRACKING', function () {
			const recipeFiltersClose = sinon.spy(recipesTracking, 'recipeFiltersClose')
			const action = {
				type: actionTypes.RECIPE_FILTERS_CLOSE_TRACKING,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(recipeFiltersClose).to.have.been.calledOnce
			expect(recipeFiltersClose).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with recipeFiltersApply when action type is RECIPE_FILTERS_APPLY_TRACKING', function () {
			const recipeFiltersApply = sinon.spy(recipesTracking, 'recipeFiltersApply')
			const action = {
				type: actionTypes.RECIPE_FILTERS_APPLY_TRACKING,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(recipeFiltersApply).to.have.been.calledOnce
			expect(recipeFiltersApply).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})

		it('should call trackEventWithData with recipeCollectionSelect when action type is RECIPE_COLLECTION_SELECT_TRACKING', function () {
			const recipeCollectionSelect = sinon.spy(recipesTracking, 'recipeCollectionSelect')
			const action = {
				type: actionTypes.RECIPE_COLLECTION_SELECT_TRACKING,
			}
			snowplowV2(action, 'state', 'prevState')
			expect(recipeCollectionSelect).to.have.been.calledOnce
			expect(recipeCollectionSelect).to.have.been.calledWithExactly(action, 'state', 'prevState', '/test-path')
		})
	})
})
