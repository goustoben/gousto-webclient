import React from 'react'
import { mount } from 'enzyme'

import { MultiSkipResultScreen } from '../MultiSkipResultScreen'

const mockCloseModal = jest.fn()

const mockProps = {
  closeModal: mockCloseModal,
  nextDeliveryDate: '24th September 2020',
  isSuccess: true,
  skippedBoxesCount: 1
}

let wrapper

const mountWithProps = (props = {}) => {
  wrapper = mount(<MultiSkipResultScreen {...mockProps} {...props} />)
}

describe('MultiSkipResultScreen', () => {
  beforeEach(() => {
    mountWithProps()
  })

  describe('Given multi skip was successful', () => {
    test('Then the expected header text is rendered', () => {
      expect(
        wrapper.find('ModalHeader').text()
      ).toEqual('Skip successful')
    })

    describe('And there is no upcoming delivery', () => {
      beforeEach(() => {
        mountWithProps({
          nextDeliveryDate: null
        })
      })

      test('Then the next delivery text is not rendered', () => {
        expect(
          wrapper.find('[data-testing="multi-skip-next-delivery-message"]').exists()
        ).toEqual(false)
      })
    })

    describe('And there is an upcoming delivery', () => {
      test('Then the next delivery text is rendered as expected', () => {
        expect(
          wrapper.find('[data-testing="multi-skip-next-delivery-message"]').text()
        ).toEqual('We\'ll deliver your next box on 24th September 2020.')
      })
    })

    describe('And more than one box was skipped', () => {
      beforeEach(() => {
        mountWithProps({ skippedBoxesCount: 2 })
      })

      test('Then the expected text is rendered', () => {
        expect(
          wrapper.find('[data-testing="multi-skip-success-message"]').text()
        ).toEqual('You\'ve skipped 2 delivery days.')
      })
    })

    describe('And more a single box was skipped', () => {
      test('Then the expected text is rendered', () => {
        expect(
          wrapper.find('[data-testing="multi-skip-success-message"]').text()
        ).toEqual('You\'ve skipped 1 delivery day.')
      })
    })
  })

  describe('Given multi skip was not successful', () => {
    beforeEach(() => {
      mountWithProps({
        isSuccess: false,
        nextDeliveryDate: null,
        skippedBoxesCount: null
      })
    })

    test('Then the expected header text is rendered', () => {
      expect(
        wrapper.find('ModalHeader').text()
      ).toEqual('Oops, something went wrong')
    })

    test('Then the expected body text is rendered', () => {
      expect(
        wrapper.find('[data-testing="multi-skip-failure-message"]').exists()
      ).toEqual(true)
    })
  })

  describe('When I click the CTA', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      wrapper
        .find('[data-testing="multi-skip-result-cta"]')
        .simulate('click')
    })

    test('Then the closeModal handler is invoked', () => {
      expect(mockCloseModal).toHaveBeenCalledTimes(1)
    })
  })
})
