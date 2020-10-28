import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { MultiSkipScreenContainer } from '../MultiSkipScreenContainer'

jest.mock('routes/Account/actions/multiSkip', () => ({
  multiSkipCloseModal: () => 'mock-close',
  multiSkipTrackContinueToPause: () => 'mock-track-continue-to-pause',
  skipMultipleBoxes: () => 'mock-multi-skip-boxes'
}))

jest.mock('selectors/user', () => ({
  getUserNewOrdersForMultiSkip: () => [{
    id: '123',
    isProjected: true,
    canSkip: true,
    deliveryDate: '23 September 2020',
    deliveryDayId: '456'
  }],
  getNextDeliveryDate: () => null,
  getIsMultiSkipSuccess: () => false,
  getIsMultiSkipError: () => false,
  getSkippedBoxesCount: () => null
}))

const mockDispatch = jest.fn()

const mockReduxContext = {
  context: {
    store: {
      dispatch: mockDispatch,
      getState: () => { },
      subscribe: () => { },
    }
  }
}

let wrapper

describe('Given I render the MultiSkipScreenContainer', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    wrapper = mount(<MultiSkipScreenContainer handleContinueToPause={() => { }} />, mockReduxContext)
  })

  test('Then the MultiSkipScreen displays the expected tiles', () => {
    expect(wrapper.find('[data-testing="input-check"] label').text()).toEqual('23 September 2020')
    expect(wrapper.find('[data-testing="input-check-input"]').prop('disabled')).toEqual(false)
  })

  describe('When I exit the modal', () => {
    beforeEach(() => {
      wrapper.find('[data-testing="modal-close-button"]').simulate('click')
    })

    test('Then the expected action is dispatched', () => {
      expect(mockDispatch).toHaveBeenCalledWith('mock-close')
    })
  })

  describe('When I continue to pause', () => {
    beforeEach(() => {
      wrapper.find('button.cta').at(1).simulate('click')
    })

    test('Then the expected actions are dispatched', () => {
      expect(mockDispatch).toHaveBeenCalledWith('mock-track-continue-to-pause')
    })
  })

  describe('When I skip boxes', () => {
    beforeEach(() => {
      act(() => {
        wrapper
          .find('[data-testing="input-check-input"]')
          .at(0)
          .simulate('change')
      })

      wrapper.find('button.cta').at(0).simulate('click')
    })

    test('Then the expected actions are dispatched', () => {
      expect(mockDispatch).toHaveBeenCalledWith('mock-multi-skip-boxes')
    })
  })
})
