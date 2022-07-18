import React from 'react'

import { render } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { Signup } from 'routes/Signup/Signup'
import { signupConfig } from 'routes/Signup/signupConfig'

// In the ideal world the tests in Signup.js should be replaced.  In their
// current form they don't work, because with the way enzyme passes the
// context, the expression `this.context` yields `undefined`.  Hence all of
// those tests above raise an exception at the `componentDidMount` call because
// of accessing properties of `undefined`.  You'd think an exception would fail
// the tests, but our way of invoking jest just leads to a warning in the
// console.
//
// The scope of the current task doesn't include fixing this long-standing
// issue; on the other hand compare-code-health forces one to increase the unit
// test coverage; so here is a minimal test to address that.
// NOTE: to check tests mentioned above, look into git blame of that line. Tests are removed for now due to prettier
// and eslint errors.
describe('Signup (newer tests)', () => {
  const mockStore = configureMockStore()
  const mockedStore = mockStore({
    pending: Immutable.fromJS({}),
    menuBoxPrices: Immutable.fromJS({}),
    basket: Immutable.fromJS({}),
    promoStore: Immutable.fromJS({}),
    signup: Immutable.fromJS({
      wizard: {
        isLastStep: false,
      },
    }),
    ribbon: Immutable.fromJS({}),
    auth: Immutable.fromJS({}),
  })

  describe('given Signup is rendered', () => {
    const signupStepsReceive = jest.fn()
    beforeEach(() => {
      render(
        <Provider store={mockedStore}>
          <Signup promoModalVisible={false} signupStepsReceive={signupStepsReceive} />
        </Provider>,
      )
    })

    test('then it should set correct step names', () => {
      expect(signupStepsReceive).toHaveBeenCalledWith(Immutable.List(signupConfig.defaultSteps))
    })
  })
})
