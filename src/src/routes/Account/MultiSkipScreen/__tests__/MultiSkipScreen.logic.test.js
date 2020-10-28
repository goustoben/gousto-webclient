import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { MultiSkipScreenLogic } from '../MultiSkipScreen.logic'
import { flushPromises } from '../../../../_testing/utils'

let shallowWrapper
let mountWrapper

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

const defaultProps = {
  newOrders: mockNewOrders,
  handleSkipBoxes: mockHandleSkipBoxes,
  handleContinueToPause: mockHandleContinueToPause,
  trackContinueToPause: mockTrackContinueToPause,
  closeModal: () => { },
  alreadySkippedBoxesCount: 1,
  nextDeliveryDate: null,
  isMultiSkipSuccess: false,
  isMultiSkipError: false,
  multiSkippedBoxesCount: null,
}

const shallowWithProps = (props = {}) => {
  shallowWrapper = shallow(
    <MultiSkipScreenLogic
      {...defaultProps}
      {...props}
    />
  )
}

const mountWithProps = (props = {}) => {
  mountWrapper = mount(
    <MultiSkipScreenLogic
      {...defaultProps}
      {...props}
    />
  )
}

const clickBoxAtIndex = (idx = 0) => {
  mountWrapper
    .find('input[type="checkbox"]')
    .at(idx)
    .simulate('change')
}

const getCTA = (ctaName) => mountWrapper
  .find(`[data-testing="multi-skip-${ctaName}"]`)

describe('MultiSkipScreenLogic', () => {
  beforeEach(() => {
    shallowWithProps()
    mountWithProps()

    jest.resetAllMocks()
  })

  describe('Given skipping multiple boxes has not yet happened', () => {
    test('Then MultiSkipScreen is rendered', () => {
      expect(shallowWrapper.find('MultiSkipScreen').exists()).toEqual(true)
    })
  })

  describe('Given skipping multiple boxes was successful', () => {
    beforeEach(() => {
      shallowWithProps({
        isMultiSkipSuccess: true,
        multiSkippedBoxesCount: 1,
        nextDeliveryDate: '24 September 2020'
      })
    })

    test('Then MultiSkipResultScreen is rendered', () => {
      expect(shallowWrapper.find('MultiSkipResultScreen').exists()).toEqual(true)
    })
  })

  describe('Given skipping multiple boxes was not successful', () => {
    beforeEach(() => {
      shallowWithProps({
        isMultiSkipError: true,
      })
    })

    test('Then MultiSkipResultScreen is rendered', () => {
      expect(shallowWrapper.find('MultiSkipResultScreen').exists()).toEqual(true)
    })
  })

  describe('When I select a box to skip', () => {
    beforeEach(() => {
      act(() => {
        clickBoxAtIndex(1)
      })
    })

    describe('And I click skip boxes', () => {
      beforeEach(async () => {
        await act(async () => {
          getCTA('skip-boxes').simulate('click')

          await flushPromises()

          mountWrapper.update()
        })
      })

      test('Then handleSkipBoxes is invoked as expected', () => {
        expect(mockHandleSkipBoxes).toHaveBeenCalledWith({
          selectedOrders: [{
            canSkip: true,
            deliveryDate: 'Saturday, 20 June 2020',
            deliveryDayId: '11',
            id: 'mock-order-2',
            isProjected: true
          }]
        })
      })

      test('Then the skip boxes CTA is disabled', () => {
        expect(
          getCTA('skip-boxes')
            .prop('disabled')
        ).toEqual(true)
      })
    })

    describe('And I deselect a box to skip', () => {
      beforeEach(() => {
        clickBoxAtIndex(1)
      })

      test('Then the skip boxes CTA is disabled', () => {
        expect(
          getCTA('skip-boxes').prop('disabled')
        ).toEqual(true)
      })
    })

    describe('And I select another box to skip', () => {
      beforeEach(() => {
        act(() => {
          clickBoxAtIndex(2)
        })
      })

      describe('And I click skip boxes', () => {
        beforeEach(async () => {
          await act(async () => {
            getCTA('skip-boxes').simulate('click')

            await flushPromises()

            mountWrapper.update()
          })
        })

        test('Then handleSkipBoxes is invoked as expected', () => {
          expect(mockHandleSkipBoxes).toHaveBeenCalledWith({
            selectedOrders: [
              {
                canSkip: true,
                deliveryDate: 'Saturday, 20 June 2020',
                deliveryDayId: '11',
                id: 'mock-order-2',
                isProjected: true
              }, {
                canSkip: true,
                deliveryDate: 'Saturday, 27 June 2020',
                deliveryDayId: '12',
                id: 'mock-order-3',
                isProjected: false
              }]
          })
        })
      })
    })
  })

  describe('When I click continue to pause', () => {
    beforeEach(() => {
      getCTA('continue-to-pause').simulate('click')
    })

    test('Then trackContinueToPause is invoked', () => {
      expect(mockTrackContinueToPause).toHaveBeenCalled()
    })

    test('Then handleContinueToPause is invoked', () => {
      expect(mockHandleContinueToPause).toHaveBeenCalled()
    })
  })
})
