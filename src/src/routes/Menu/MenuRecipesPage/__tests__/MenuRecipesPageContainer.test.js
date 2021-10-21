import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'
import { actionTypes } from 'actions/actionTypes'
import configureMockStore from 'redux-mock-store'
import { MenuRecipesPageContainer } from '../MenuRecipesPageContainer'

describe('Test MenuRecipesPageContainer', () => {
  let wrapper

  beforeEach(() => {
    const mockStore = configureMockStore()
    const store = mockStore({
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
      boxSummaryDeliveryDays: Immutable.fromJS([]),
      request: Immutable.fromJS({
        browser: 'mobile',
      }),
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'foo'
          }
        }
      }
    })
    const location = {}
    const params = {}

    wrapper = shallow(
      <MenuRecipesPageContainer params={params} location={location} store={store} />,
    )
  })

  describe('MenuRecipesPageContainer', () => {
    test('should not fail, empty test', () => {
      expect(wrapper.find('MenuRecipesPage').props().isLoading).toBe(false)
    })
  })
})
