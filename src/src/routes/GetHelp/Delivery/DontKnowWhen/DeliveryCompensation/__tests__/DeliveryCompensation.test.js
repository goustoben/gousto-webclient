import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { DeliveryCompensation } from '../DeliveryCompensation'

describe('DeliveryCompensation', () => {
  const COMPENSATION_AMOUNT = 3.6
  const BACK_URL = 'get-help/userId/123/orderId/111/delivery'
  const USER_ID = '1234'
  const ORDER_ID = '5678'
  const ERROR_MESSAGE_REGEX = /.*credit.*Customer Care/
  const applyDeliveryRefundMock = jest.fn()
  const setErrorStatusMock = jest.fn()
  browserHistory.push = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <DeliveryCompensation
        applyDeliveryRefund={applyDeliveryRefundMock}
        backUrl={BACK_URL}
        compensationAmount={COMPENSATION_AMOUNT}
        isApplyCompensationError={false}
        isApplyCompensationPending={false}
        orderId={ORDER_ID}
        setErrorStatus={setErrorStatusMock}
        userId={USER_ID}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {})

  describe('when there is not an error in applying the compensation', () => {
    beforeEach(() => {
      wrapper.setProps({ isApplyCompensationError: false })
    })

    test('renders GetHelpLayout2 passing the backUrl prop', () => {
      expect(wrapper.find('GetHelpLayout2').prop('backUrl')).toBe(BACK_URL)
    })

    test('renders a Heading', () => {
      expect(wrapper.find('Heading').exists()).toBe(true)
    })

    test('the Heading is an h2', () => {
      expect(wrapper.find('Heading').prop('type')).toBe('h2')
    })

    test('the Heading copy is relevant', () => {
      expect(wrapper.find('Heading').html()).toMatch(/sorry.*arrive/)
    })

    test('renders a paragraph with the compensation amount formatted', () => {
      expect(wrapper.find('p').at(1).text()).toContain('£3.60')
    })

    test('it does not render an error message', () => {
      expect(wrapper.find('.mainText').text()).not.toMatch(ERROR_MESSAGE_REGEX)
    })

    test('renders a secondary CTA inside BottomFixedContent', () => {
      const ctas = wrapper.find('BottomFixedContent').find('CTA')
      expect(ctas.at(0).prop('variant')).toBe('secondary')
    })

    test('renders a primary CTA inside BottomFixedContent', () => {
      const ctas = wrapper.find('BottomFixedContent').find('CTA')
      expect(ctas.at(1).prop('variant')).toBe('primary')
    })

    describe('when the secondary CTA is clicked', () => {
      beforeEach(() => {
        const secondaryCTA = wrapper.find('BottomFixedContent').find('CTA').at(0)
        secondaryCTA.simulate('click')
      })

      test('redirects to GetHelp - Contact page', () => {
        const { index, contact } = client.getHelp

        expect(browserHistory.push).toHaveBeenCalledWith(`${index}/${contact}`)
      })
    })

    describe('when the primary CTA is clicked', () => {
      beforeEach(() => {
        const primaryCTA = wrapper.find('BottomFixedContent').find('CTA').at(1)
        primaryCTA.simulate('click')
      })

      test('applyDeliveryRefund action is called with the right parameters', () => {
        const DELIVERY_COMPLAINT_CATEGORY_ID = '113'

        expect(applyDeliveryRefundMock).toHaveBeenCalledWith(
          USER_ID,
          ORDER_ID,
          DELIVERY_COMPLAINT_CATEGORY_ID,
        )
      })
    })
  })

  describe('when there was an error applying the compensation', () => {
    beforeEach(() => {
      wrapper.setProps({
        isApplyCompensationError: true,
      })
    })

    test('renders a paragraph with an error message', () => {
      expect(wrapper.find('p').text()).toMatch(ERROR_MESSAGE_REGEX)
    })

    test('renders only a primary CTA inside BottomFixedContent', () => {
      expect(wrapper.find('BottomFixedContent').find('CTA').prop('variant'))
        .toBe('primary')
    })

    describe('when the CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('BottomFixedContent').find('CTA').simulate('click')
      })

      test('redirects to GetHelp - Contact page', () => {
        const { index, contact } = client.getHelp

        expect(browserHistory.push).toHaveBeenCalledWith(`${index}/${contact}`)
      })
    })
  })

  describe('when the action of applying the compensation is not pending', () => {
    beforeEach(() => {
      wrapper.setProps({ isApplyCompensationPending: false })
    })

    test('the Contact CTA is not disabled', () => {
      expect(wrapper.find('CTA').at(0).prop('isDisabled')).toBe(false)
    })

    test('the Accept Credit CTA is not in the loading state', () => {
      expect(wrapper.find('CTA').at(1).prop('isLoading')).toBe(false)
    })
  })

  describe('when the action of applying the compensation is pending', () => {
    beforeEach(() => {
      wrapper.setProps({ isApplyCompensationPending: true })
    })

    test('the Contact CTA is disabled', () => {
      expect(wrapper.find('CTA').at(0).prop('isDisabled')).toBe(true)
    })

    test('the Accept Credit CTA is in the loading state', () => {
      expect(wrapper.find('CTA').at(1).prop('isLoading')).toBe(true)
    })
  })

  describe('when the component unmounts', () => {
    beforeEach(() => {
      wrapper.unmount()
    })

    test('resets the error status of the action GET_HELP_APPLY_DELIVERY_COMPENSATION', () => {
      expect(setErrorStatusMock).toHaveBeenCalledWith('GET_HELP_APPLY_DELIVERY_COMPENSATION', null)
    })
  })
})
