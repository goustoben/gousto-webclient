import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { CreateAccount } from '../CreateAccount'

describe('CreateAccount', () => {
  const userProspect = jest.fn()
  const receiveRef = jest.fn()
  const submit = jest.fn()
  const trackUTMAndPromoCode = jest.fn()
  const onLoginClick = jest.fn()
  const props = {
    submit,
    userProspect,
    receiveRef,
    checkoutValid: false,
    trackUTMAndPromoCode,
    onLoginClick,
  }

  const mockStore = configureMockStore()
  const store = mockStore({
    form: {},
    request: Immutable.fromJS({
      browser: 'mobile',
    }),
    checkout: Immutable.fromJS({
      errors: {},
    }),
    ribbon: Immutable.fromJS({}),
  })

  test('should render CreateAccount component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreateAccount {...props} />
      </Provider>,
    )

    expect(wrapper).toBeDefined()
  })
})
