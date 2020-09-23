import React from 'react'
import Immutable from 'immutable'
import { mount, shallow } from 'enzyme'

import { AppModalContainer } from '../AppModalContainer'

jest.mock('selectors/appBanner', () => ({
  getPlatformDetails: () => ({ name: 'iOS', ratings: '1234' })
}))

jest.mock('utils/window')

const mockDispatch = jest.fn()

const mockState = {
  request: Immutable.fromJS({
    browser: 'mobile'
  }),
  boxSummaryShow: Immutable.fromJS({
    dismissed: false
  }),
  basket: Immutable.fromJS({
    slotId: undefined,
    postCode: undefined
  }),
  auth: Immutable.fromJS({
    isAuthenticated: true
  }),
  features: Immutable.fromJS({
    isMobileMenuModalAppAwarenessEnabled: {
      value: true
    }
  })
}

const mockReduxContext = {
  context: {
    store: {
      getState: () => mockState,
      dispatch: mockDispatch,
      subscribe: () => { }
    }
  }
}

let wrapper

describe('AppModalContainer', () => {
  test('maps state to props as expected', () => {
    wrapper = shallow(<AppModalContainer />, mockReduxContext)

    const expectedStateProps = {
      isMobileViewport: true,
      boxSummaryDismissed: false,
      isBoxSummaryVisible: false,
      isAuthenticated: true,
      isAppAwarenessEnabled: true,
      name: 'iOS',
      ratings: '1234',
    }

    const { trackAppModalView, trackClickAppModalInstall, ...actualStateProps } = wrapper.props()

    expect(expectedStateProps).toEqual(actualStateProps)
  })

  test('dispatches expected action on view', () => {
    expect.assertions(1)

    jest.useFakeTimers()
    wrapper = mount(<AppModalContainer />, mockReduxContext)
    jest.runOnlyPendingTimers()
    wrapper.update()

    expect(mockDispatch).toHaveBeenCalledWith({ trackingData: { actionType: 'view_app_promotion_modal' }, type: 'TRACKING' })
  })

  test('dispatches expected action on clicking download button', () => {
    expect.assertions(1)

    jest.useFakeTimers()
    wrapper = mount(<AppModalContainer />, mockReduxContext)
    jest.runOnlyPendingTimers()
    wrapper.update()

    wrapper.find('[data-testing="download-link"]').simulate('click')

    expect(mockDispatch).toHaveBeenLastCalledWith({ trackingData: { actionType: 'click_app_modal_install' }, type: 'TRACKING' })
  })
})
