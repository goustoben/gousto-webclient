import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { MultiSkipScreen } from '../MultiSkipScreen'

const mockNewOrders = [
  {
    id: 'mock-order-1',
    isProjected: true,
    canSkip: false,
    deliveryDate: 'Saturday, 13 June 2020',
    deliveryDayId: '10'
  },
  {
    id: 'mock-order-2',
    isProjected: true,
    canSkip: true,
    deliveryDate: 'Saturday, 20 June 2020',
    deliveryDayId: '11'
  },
  {
    id: 'mock-order-3',
    isProjected: false,
    canSkip: true,
    deliveryDate: 'Saturday, 27 June 2020',
    deliveryDayId: '12'
  },
]

const mockHandleSkipBoxes = jest.fn()
const mockHandleContinueToPause = jest.fn()
const mockTrackContinueToPause = jest.fn()
const mockCloseModal = jest.fn()

const mockProps = {
  newOrders: mockNewOrders,
  alreadySkippedBoxesCount: 1,
  handleSkipBoxes: mockHandleSkipBoxes,
  handleContinueToPause: mockHandleContinueToPause,
  trackContinueToPause: mockTrackContinueToPause,
  closeModal: mockCloseModal,
}

let mountWrapper
let shallowWrapper

const shallowWithProps = (props = {}) => {
  shallowWrapper = shallow(<MultiSkipScreen {...mockProps} {...props} />)
}

const mountWithProps = (props = {}) => {
  mountWrapper = mount(<MultiSkipScreen {...mockProps} {...props} />)
}

describe('Given the MultiSkipScreen is rendered', () => {
  beforeEach(() => {
    shallowWithProps()
    mountWithProps()
    jest.resetAllMocks()
  })

  describe('And the user has already skipped multiple boxes', () => {
    beforeEach(() => {
      shallowWithProps({
        alreadySkippedBoxesCount: 2
      })
    })

    test('Then I should see the expected subheading text', () => {
      const subHeadingText = shallowWrapper.find('[data-testing="multi-skip-subheading"]').text()
      expect(subHeadingText).toEqual("You've already skipped 2 boxes")
    })

    test('Then the skipped boxes are disabled', () => {
      const tile = shallowWrapper.find('InputCheck').at(0)

      expect(tile.prop('disabled')).toBeTruthy()
    })
  })

  describe('And the user has already skipped a single box', () => {
    test('Then I should see the expected subheading text', () => {
      const subHeadingText = shallowWrapper.find('[data-testing="multi-skip-subheading"]').text()

      expect(subHeadingText).toEqual("You've already skipped 1 box")
    })
  })

  describe('And the user hasn\'t already skipped boxes', () => {
    beforeEach(() => {
      shallowWithProps({ alreadySkippedBoxesCount: 0 })
    })

    test('Then I should see the expected subheading text', () => {
      const subHeadingElement = shallowWrapper.find('[data-testing="multi-skip-subheading"]')
      expect(subHeadingElement.exists()).toBeFalsy()
    })
  })

  test.each(mockNewOrders)('Then I should see the expected tiles', ({ canSkip, deliveryDate }) => {
    const tile = mountWrapper.findWhere(el =>
      el.text() === deliveryDate
      && el.prop('disabled') === !canSkip
    )

    expect(tile.exists()).toBeTruthy()
  })

  describe('When I click on the modal X', () => {
    test('Then the handler is invoked as expected', () => {
      mountWrapper.find('[data-testing="modal-close-button"]').simulate('click')

      expect(mockCloseModal).toHaveBeenCalled()
    })
  })

  describe('When I click on CONTINUE TO PAUSE', () => {
    beforeEach(() => {
      const continueToPause = mountWrapper.find('CTA').at(1)
      continueToPause.simulate('click')
    })

    test('Then the tracking function is invoked as expected', () => {
      expect(mockTrackContinueToPause).toHaveBeenCalled()
    })

    test('Then the continue to pause handler is invoked as expected', () => {
      expect(mockHandleContinueToPause).toHaveBeenCalled()
    })
  })

  describe('When I select a single box', () => {
    beforeEach(async () => {
      const boxes = mountWrapper
        .find('input[type="checkbox"]')

      act(() => {
        boxes.at(1).simulate('change')
      })
    })

    describe('And I click SKIP BOXES', () => {
      beforeEach(() => {
        const skipBoxes = mountWrapper.find('CTA').at(0)
        skipBoxes.simulate('click')
      })

      test('Then the SKIP BOXES button should be disabled', () => {
        expect(shallowWrapper.find('CTA').at(0).props('disabled')).toBeTruthy()
      })

      test('Then the skip boxes handler should be invoked as expected', () => {
        expect(mockHandleSkipBoxes).toHaveBeenCalledWith({ selectedOrders: [{ canSkip: true, deliveryDate: 'Saturday, 20 June 2020', deliveryDayId: '11', id: 'mock-order-2', isProjected: true }] })
      })
    })

    describe('And I deselect the box', () => {
      beforeEach(async () => {
        const boxes = mountWrapper
          .find('input[type="checkbox"]')

        act(() => {
          boxes.at(1).simulate('change')
        })
      })

      test('Then the SKIP BOXES button should be disabled', () => {
        expect(shallowWrapper.find('CTA').at(0).props('disabled')).toBeTruthy()
      })
    })
  })

  describe('When I select and deselect multiple boxes', () => {
    beforeEach(() => {
      const boxes = mountWrapper
        .find('input[type="checkbox"]')

      act(() => {
        boxes.at(1).simulate('change')
        boxes.at(1).simulate('change')
        boxes.at(2).simulate('change')

        mountWrapper.update()
      })
    })

    describe('And I click SKIP BOXES', () => {
      beforeEach(() => {
        const skipBoxes = mountWrapper.find('CTA').at(0)
        skipBoxes.simulate('click')
      })

      test('Then the skip boxes handler should be invoked as expected', () => {
        expect(mockHandleSkipBoxes).toHaveBeenCalledWith({ selectedOrders: [{ canSkip: true, deliveryDate: 'Saturday, 27 June 2020', deliveryDayId: '12', id: 'mock-order-3', isProjected: false }] })
      })
    })
  })

  describe('And I select no boxes', () => {
    test('Then the SKIP BOXES button should be disabled', () => {
      expect(shallowWrapper.find('CTA').at(0).props('disabled')).toBeTruthy()
    })
  })
})
