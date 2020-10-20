import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { ModalContent } from '../ModalContent'

jest.mock('../../MultiSkipScreen', () => ({
  // eslint-disable-next-line
  MultiSkipScreenContainer: ({ handleContinueToPause }) => <button type="button" onClick={handleContinueToPause}>Multi Skip Screen</button>
}))

jest.mock('../../SubscriptionPauseScreen', () => ({
  SubscriptionPauseScreenContainer: () => <div>SubscriptionsPauseScreen</div>
}))

const mockProps = {
  isMultiSkipEnabled: true
}

let wrapper
const mountWithProps = (props = {}) => {
  wrapper = mount(<ModalContent {...mockProps} {...props} />)
}

describe('Given ModalContent is rendered', () => {
  beforeEach(() => {
    mountWithProps()
  })

  describe('And isMultiSkipEnabled feature flag is enabled', () => {
    test('Then I should see MultiSkipScreen', () => {
      expect(wrapper.find('MultiSkipScreenContainer').exists()).toBeTruthy()
    })

    test('Then I should not see SubscriptionPauseScreen', () => {
      expect(wrapper.find('SubscriptionPauseScreenContainer').exists()).toBeFalsy()
    })

    describe('When I continue to pause subscription', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('button').simulate('click')
        })
        wrapper.update()
      })

      test('Then I should see SubscriptionPauseScreen', () => {
        expect(wrapper.find('SubscriptionPauseScreenContainer').exists()).toBeTruthy()
      })
    })
  })

  describe('And isMultiSkipEnabled feature flag is disabled', () => {
    beforeEach(() => {
      mountWithProps({ isMultiSkipEnabled: false })
    })

    test('Then I should not see MultiSkipScreen', () => {
      expect(wrapper.find('SubscriptionPauseScreenContainer').exists()).toBeTruthy()
    })

    test('Then I should see SubscriptionPauseScreen', () => {
      expect(wrapper.find('MultiSkipScreenContainer').exists()).toBeFalsy()
    })
  })
})
