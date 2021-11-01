import React from 'react'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { IneligibleIngredientsSameDayContainer } from '../IneligibleIngredientsSameDayContainer'

describe('<IneligibleIngredientsSameDayContainer />', () => {
  let wrapper

  const mockStore = configureMockStore()
  const store = mockStore({
    features: Immutable.fromJS({
      ssrTwoComplaintsSameDay: {
        value: false,
      }
    })
  })

  beforeEach(() => {
    wrapper = mount(<IneligibleIngredientsSameDayContainer store={store} />)
  })

  test('passes the correct props', () => {
    expect(wrapper.find('IneligibleIngredientsSameDay').props()).toMatchObject({
      ssrTwoComplaintsSameDay: false,
      trackIngredientsGoToMyGousto: expect.any(Function),
      trackIngredientsGetInTouchClick: expect.any(Function),
      trackViewCreditClick: expect.any(Function),
    })
  })
})
