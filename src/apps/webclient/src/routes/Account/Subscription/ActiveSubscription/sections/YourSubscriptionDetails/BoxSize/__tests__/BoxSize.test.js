import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { SubscriptionContext } from '../../../../../context/index'
import { BoxSize } from '../BoxSize'

import { getNumPortions, getIsBoxLoaded, getSelectedBoxSize } from '../../../../../context/selectors/box'
import { useUpdateSubscription } from '../../../../../hooks/useUpdateSubscription'
import * as trackingSubscription from '../../../../../tracking'
import * as subscriptionToast from '../../../../../hooks/useSubscriptionToast'

jest.mock('../../../../../tracking')
jest.mock('../../../../../context/selectors/box')
jest.mock('../../../../../hooks/useUpdateSubscription')

const useSubscriptionToastSpy = jest.spyOn(subscriptionToast, 'useSubscriptionToast')
const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')
const dispatch = jest.fn().mockResolvedValue()

let wrapper

const mountWithProps = (props, state = {}) => {
  wrapper = mount(
    <BoxSize accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state, dispatch } }
    }
  )

  wrapper.update()
}

const clickEdit = () => {
  act(() => {
    wrapper
      .find('[data-testing="box-size-cta"]')
      .simulate('click')
  })

  wrapper.update()
}

const mockBoxSize = '2'
const mockSelectedBoxSize = '4'

const EXPECTED_RADIOS = ['2 people', '4 people']

describe('BoxSize', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getIsBoxLoaded.mockReturnValue(false)
      useUpdateSubscription.mockReturnValue([])
      getNumPortions.mockReturnValue(undefined)
      getSelectedBoxSize.mockReturnValue(undefined)

      mountWithProps()
    })

    describe('And I browse on a mobile device', () => {
      beforeEach(() => {
        mountWithProps({ isMobile: true })
      })

      describe('And I click "edit"', () => {
        beforeEach(() => {
          clickEdit()
        })

        test('Then I should see the expanded text', () => {
          expect(
            wrapper
              .find('[data-testing="expanded-text"]')
              .exists()
          ).toBeTruthy()
        })
      })
    })

    describe('And I don\'t browse on a mobile device', () => {
      describe('And I click "edit"', () => {
        beforeEach(() => {
          clickEdit()
        })

        test('Then I should not see the expanded text', () => {
          expect(
            wrapper
              .find('[data-testing="expanded-text"]')
              .exists()
          ).toBeFalsy()
        })

        test('Then the Radios are not rendered', () => {
          expect(wrapper.find('RadioGroup').exists()).toBeFalsy()
        })
      })
    })
  })

  describe('Given data is loaded', () => {
    beforeEach(() => {
      getIsBoxLoaded.mockReturnValue(true)
      useUpdateSubscription.mockReturnValue([false, true, false])
      getNumPortions.mockReturnValue(mockBoxSize)
      getSelectedBoxSize.mockReturnValue(mockBoxSize)

      mountWithProps()
    })

    test('Then I should see the box size', () => {
      expect(
        wrapper
          .find('[data-testing="current-box-size"]')
          .text()
      ).toEqual('2 people')
    })

    describe('And I click "edit"', () => {
      beforeEach(() => {
        act(() => {
          clickEdit()
        })
      })

      test('Then the CTA should be disabled by default', () => {
        expect(
          wrapper
            .find('[data-testing="box-size-save-cta"]')
            .prop('disabled')
        ).toBeTruthy()
      })

      test('Then I can see the current selected radio', () => {
        const selectedRadioText = wrapper.find(`input[value="${mockBoxSize}"]`).closest('label').text().trim()

        expect(selectedRadioText).toEqual('2 peopleChoose 2 to 5 recipes')
      })

      test('Then the expected Radios are rendered', () => {
        const renderedRadios = wrapper.find('[data-testing="box-size-radios"]')

        renderedRadios.forEach((radio, idx) => {
          const expectedText = EXPECTED_RADIOS[idx]

          expect(radio.closest('label').text()).toEqual(expectedText)
        })
      })

      describe('And I select a Radio', () => {
        test('Then the dispatch function is invoked with selected radio button value', () => {
          wrapper
            .find('input[value="4"]')
            .simulate('change', {
              target: {
                value: '4'
              }
            })
          wrapper.update()

          expect(dispatch).toHaveBeenCalledWith({
            type: 'UPDATE_SELECTED_BOX_SIZE',
            data: {
              numPortions: '4',
            },
          })
        })
      })
    })
  })

  describe('Given state has changed', () => {
    beforeEach(() => {
      getIsBoxLoaded.mockReturnValue(true)
      getNumPortions.mockReturnValue(mockBoxSize)
      getSelectedBoxSize.mockReturnValue(mockSelectedBoxSize)
    })

    describe('When response is successful', () => {
      beforeEach(() => {
        useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])
        mountWithProps()
        wrapper
          .find('[data-testing="box-size-save-cta"]')
          .simulate('click')
      })

      test('Then useUpdateSubscription should be invoked', () => {
        const mockCalls = useUpdateSubscription.mock.calls
        const [lastMockArgs] = mockCalls[mockCalls.length - 1]

        expect(lastMockArgs.data).toEqual({
          num_portions: '4'
        })
        expect(lastMockArgs.trigger.shouldRequest).toBeTruthy()
      })

      test('Then useSubscriptionToast is invoked', () => {
        expect(useSubscriptionToastSpy).toHaveBeenCalledWith({ data: '123' }, false)
      })

      test('Then the trackSubscriptionSettingsChange is invoked as expected', () => {
        expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
          action: 'update', settingName: 'box_size'
        })
      })
    })

    describe('When response is not successful', () => {
      beforeEach(() => {
        useUpdateSubscription.mockReturnValue([false, false, true])
      })

      test('Then useSubscriptionToast is invoked', () => {
        mountWithProps()
        wrapper
          .find('[data-testing="box-size-save-cta"]')
          .simulate('click')

        expect(useSubscriptionToastSpy).toHaveBeenCalledWith(false, true)
      })
    })
  })
})
