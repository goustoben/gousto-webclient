import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import moment from 'moment'
import boxSummary from 'actions/boxSummary'

describe('boxSummary actions', function () {
  describe('boxSummaryVisibilityChange', function () {
    it('should return with BOXSUMMARY_VISIBILITY_CHANGE action type and date', function () {
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          recipes: Immutable.Map({ 123: 1 }),
          numPortions: 2,
          limitReached: false,
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
      })
      boxSummary.boxSummaryVisibilityChange(true, 'mobile')(dispatchSpy, getStateSpy)
      expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
        type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
        show: true,
        view: 'mobile',
        trackingData: {
          actionType: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
          show: true,
          view: 'mobile',
        },
      })
    })

    it('should call basketRecipeRemove with each recipe serving count thats returned by utils/basket okRecipes if show is false', function () {
      const okRecipesMock = () => Immutable.Map()
      const basketRecipeRemoveSpy = sinon.spy()
      const actions = require('inject-loader?utils/basket&./basket!actions/boxSummary')({
        'utils/basket': {
          okRecipes: okRecipesMock,
        },
        './basket': {
          basketRecipeRemove: basketRecipeRemoveSpy,
        },
      }).default
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          recipes: Immutable.Map({ 123: 3, 456: 1 }),
          numPortions: 2,
          limitReached: false,
        }),
      })
      actions.boxSummaryVisibilityChange(false, 'desktop')(dispatchSpy, getStateSpy)
      expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
        type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
        show: false,
        view: 'desktop',
        trackingData: {
          actionType: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
          show: false,
          view: 'desktop',
        },
      })
      expect(basketRecipeRemoveSpy.callCount).to.equal(4)
      expect(basketRecipeRemoveSpy.getCall(0).args[0]).to.deep.equal('123')
      expect(basketRecipeRemoveSpy.getCall(1).args[0]).to.deep.equal('123')
      expect(basketRecipeRemoveSpy.getCall(2).args[0]).to.deep.equal('123')
      expect(basketRecipeRemoveSpy.getCall(3).args[0]).to.deep.equal('456')
    })

    it('should call basketRecipeRemove with each recipe thats returned by utils/basket okRecipes if show is false', function () {
      const okRecipesMock = () => Immutable.Map()
      const basketRecipeRemoveSpy = sinon.spy()
      const actions = require('inject-loader?utils/basket&./basket!actions/boxSummary')({
        'utils/basket': {
          okRecipes: okRecipesMock,
        },
        './basket': {
          basketRecipeRemove: basketRecipeRemoveSpy,
        },
      }).default
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          recipes: Immutable.Map({ 123: 3, 456: 1 }),
          numPortions: 2,
          limitReached: false,
        }),
        auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
      })
      actions.boxSummaryVisibilityChange(false, 'desktop')(dispatchSpy, getStateSpy)
      expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
        type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
        show: false,
        view: 'desktop',
        trackingData: {
          actionType: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
          show: false,
          view: 'desktop',
        },
      })
      expect(basketRecipeRemoveSpy.callCount).to.equal(4)
    })

    it('should not call basketRecipeRemove with each recipe thats returned by utils/basket okRecipes if show is true', function () {
      const okRecipesMock = () => Immutable.Map()
      const basketRecipeRemoveSpy = sinon.spy()
      const actions = require('inject-loader?utils/basket&./basket!actions/boxSummary')({
        'utils/basket': {
          okRecipes: okRecipesMock,
        },
        './basket': {
          basketRecipeRemove: basketRecipeRemoveSpy,
        },
      }).default
      const dispatchSpy = sinon.spy()
      const getStateSpy = sinon.stub().returns({
        basket: Immutable.Map({
          recipes: Immutable.Map({ 123: 1 }),
          numPortions: 2,
          limitReached: false,
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
      })
      actions.boxSummaryVisibilityChange(true, 'desktop')(dispatchSpy, getStateSpy)
      expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
        type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
        show: true,
        view: 'desktop',
        trackingData: {
          actionType: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
          show: true,
          view: 'desktop',
        },
      })
      expect(basketRecipeRemoveSpy).to.have.not.been.called
    })
  })

  describe('boxSummaryDeliverySlotChosen', function () {
    let args
    let basketDateChange
    let basketSlotChange
    let pending
    let actions
    let getStateSpy
    let dispatchSpy
    let menuLoadMenuSpy
    let menuLoadStockSpy
    let auth

    beforeEach(function () {
      args = {
        slotId: 'big-long-uuid-here-123',
        date: '2017-01-01',
      }
      basketDateChange = sinon.spy()
      basketSlotChange = sinon.spy()
      pending = sinon.spy()
      menuLoadStockSpy = sinon.spy()
      menuLoadMenuSpy = sinon.spy()
      auth = Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' })
      actions = require('inject-loader?./basket&./status&./menu!actions/boxSummary')({
        './basket': {
          basketDateChange,
          basketSlotChange,
        },
        './status': {
          pending,
        },
        './menu': {
          menuLoadMenu: menuLoadMenuSpy,
          menuLoadStock: menuLoadStockSpy,
        },
      }).default
      getStateSpy = sinon.stub().returns({
        auth,
        basket: Immutable.fromJS({}),
      })
      dispatchSpy = sinon.spy()
    })

    it('should call 6 dispatches', async function () {
      await actions.boxSummaryDeliverySlotChosen(args)(dispatchSpy, getStateSpy)

      expect(dispatchSpy.callCount).to.equal(6)
    })

    it('should dispatch basket.basketDateChange, passing it\'s date arg', async function () {
      await actions.boxSummaryDeliverySlotChosen(args)(dispatchSpy, getStateSpy)

      const basketDateChangeSpyArgs = basketDateChange.args[0]
      expect(basketDateChangeSpyArgs[0]).to.deep.equal('2017-01-01')
    })

    it('should dispatch basket.basketSlotChange, passing it\'s slotId arg', async function () {
      await actions.boxSummaryDeliverySlotChosen(args)(dispatchSpy, getStateSpy)

      const basketSlotChangeArgs = basketSlotChange.args[0]
      expect(basketSlotChangeArgs[0]).to.deep.equal('big-long-uuid-here-123')
    })

    it('should dispatch menu.menuLoadMenu and menu.menuLoadStock', async function () {
      actions.boxSummaryDeliverySlotChosen(args)(dispatchSpy, getStateSpy)

      const dispatchSpyArgs = dispatchSpy.args[3]
      expect(dispatchSpyArgs.length).to.deep.equal(1)
      expect(menuLoadMenuSpy).to.have.been.calledOnce
      expect(menuLoadStockSpy).to.have.been.calledOnce
    })

    it('should mark MENU_FETCH_DATA as pending', async function () {
      await actions.boxSummaryDeliverySlotChosen(args)(dispatchSpy, getStateSpy)

      expect(pending).to.have.been.calledTwice
    })
  })
})
