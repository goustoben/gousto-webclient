import React from 'react'
import { shallow } from 'enzyme'
import actionTypes from 'actions/actionTypes'
import BoxSummaryMobileContainer from '../BoxSummaryMobileContainer'
import Immutable from 'immutable'

describe('BoxSummaryMobileContainer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<BoxSummaryMobileContainer />, {
      context: {
        store: {
          getState: () => ({
            basket: Immutable.fromJS({
              date: '',
              numPortions: 2,
              recipes: {
                671: 1,
                831: 1,
                1906: 1
              },
              slotId: 'slot',
              orderId: '',
            }),
            boxSummaryShow: Immutable.fromJS({
              show: false,
              view: 'mobile',
            }),
            user: Immutable.Map({
              orders: '',
            }),
            boxSummaryDeliveryDays: Immutable.Map({}),
            menuRecipes: Immutable.List([]),
            menuRecipeStock: Immutable.Map({}),
            recipes: Immutable.Map({}),
            auth: Immutable.Map({
              isAdmin: false
            }),
            pending: Immutable.Map({
              BASKET_CHECKOUT: true
            }),
            hasUnavailableRecipes: false,
            error: Immutable.Map({
              actionTypes: {
                ORDER_SAVE: actionTypes.ORDER_SAVE
              }
            }),
            tutorial: Immutable.fromJS({
              viewed: {}
            })
          }),
          subscribe: () => { },
          dispatch: () => { },
        },
      },
    })
  })

  test('should pass basketCheckedOut from state to component', () => {
    expect(wrapper.props().basketCheckedOut).toBe(true)
  })
})
