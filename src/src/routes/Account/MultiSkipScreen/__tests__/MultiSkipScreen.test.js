import React from 'react'
import { shallow, mount } from 'enzyme'

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
const mockToggleSkipBox = jest.fn()

const mockProps = {
  alreadySkippedBoxesCount: 1,
  closeModal: mockCloseModal,
  handleContinueToPause: mockHandleContinueToPause,
  isSkipBoxesDisabled: false,
  handleSkipBoxes: mockHandleSkipBoxes,
  newOrders: mockNewOrders,
  trackContinueToPause: mockTrackContinueToPause,
  toggleSkipBox: mockToggleSkipBox
}

let mountWrapper
let shallowWrapper

const shallowWithProps = (props = {}) => {
  shallowWrapper = shallow(<MultiSkipScreen {...mockProps} {...props} />)
}

const mountWithProps = (props = {}) => {
  mountWrapper = mount(<MultiSkipScreen {...mockProps} {...props} />)
}

const getCTA = (ctaName, isShallow = false) =>
  (isShallow
    ? shallowWrapper
    : mountWrapper)
    .find(`[data-testing="multi-skip-${ctaName}"]`)

const clickBoxAtIndex = (idx = 0, isShallow = false) => {
  (isShallow
    ? shallowWrapper
    : mountWrapper)
    .find('input[type="checkbox"]')
    .at(idx)
    .simulate('change')
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
      getCTA('continue-to-pause').simulate('click')
    })

    test('Then the continue to pause handler is invoked as expected', () => {
      expect(mockHandleContinueToPause).toHaveBeenCalled()
    })
  })

  describe('When I select a single box', () => {
    beforeEach(async () => {
      clickBoxAtIndex(1)
    })

    test('Then toggleSkipBox to be invoked as expected', () => {
      expect(mockToggleSkipBox).toHaveBeenCalledWith('mock-order-2', true)
    })

    describe('And I click SKIP BOXES', () => {
      beforeEach(() => {
        getCTA('skip-boxes').simulate('click')
      })

      test('Then the SKIP BOXES button should be disabled', () => {
        expect(
          getCTA('skip-boxes').props('disabled')
        ).toBeTruthy()
      })

      test('Then the skip boxes handler should be invoked as expected', () => {
        expect(mockHandleSkipBoxes).toHaveBeenCalledTimes(1)
      })
    })

    describe('And I deselect the box', () => {
      beforeEach(async () => {
        clickBoxAtIndex(1)
      })

      test('Then the SKIP BOXES button should be disabled', () => {
        expect(
          getCTA('skip-boxes').props('disabled')
        ).toBeTruthy()
      })

      test('Then toggleSkipBox is invoked as expected', () => {
        expect(mockToggleSkipBox).toHaveBeenCalledWith('mock-order-2', false)
      })
    })
  })

  describe('When I select and deselect multiple boxes', () => {
    beforeEach(() => {
      clickBoxAtIndex(1)
      clickBoxAtIndex(1)
      clickBoxAtIndex(1)

      mountWrapper.update()
    })

    describe('And I click SKIP BOXES', () => {
      beforeEach(() => {
        getCTA('skip-boxes').simulate('click')
      })

      test('Then the skip boxes handler should be invoked as expected', () => {
        expect(mockHandleSkipBoxes).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('And I select no boxes', () => {
    test('Then the SKIP BOXES button should be disabled', () => {
      expect(getCTA('skip-boxes').props('disabled')).toBeTruthy()
    })
  })
})
