import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'
import { actionTypes } from 'actions/actionTypes'
import { MenuRecipesPageContainer } from '../MenuRecipesPageContainer'

describe('Test MenuRecipesPageContainer', () => {
  let wrapper
  let state
  let dispatch
  let context
  let subscribe
  let getState

  beforeEach(() => {
    state = {
      boxSummaryShow: Immutable.fromJS({
        show: ''
      }),
      menuBrowseCTAShow: Immutable.fromJS({}),
      pending: Immutable.fromJS({
        [actionTypes.MENU_FETCH_DATA]: false,
        [actionTypes.OPTIMIZELY_ROLLOUT_LOADING]: false,
      }),
      menu: Immutable.fromJS({
        forceLoad: false,
      }),
      basket: Immutable.fromJS({}),
      menuCollections: Immutable.fromJS([]),
      recipes: Immutable.fromJS([]),
      user: Immutable.fromJS({}),
      auth: Immutable.fromJS({}),
      boxSummaryDeliveryDays: Immutable.fromJS([])
    }
    getState = () => (state)
    dispatch = jest.fn()
    subscribe = jest.fn()
    context = {
      store: {
        getState,
        dispatch,
        state,
        subscribe,
        ownProperties: { location: {} },
        ownProps: { location: {} },
        props: { location: {} },
      }
    }
    const location = {}
    const params = {}

    wrapper = shallow(
      <MenuRecipesPageContainer params={params} location={location} />,
      { context }
    )
  })

  describe('MenuRecipesPageContainer', () => {
    test('should not fail, empty test', () => {
      expect(wrapper.props().isLoading).toBe(false)
    })
  })
})
