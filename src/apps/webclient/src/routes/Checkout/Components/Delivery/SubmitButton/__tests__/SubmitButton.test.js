import React from 'react'
import { shallow } from 'enzyme'
import { SubmitButton } from '../SubmitButton'

describe('SubmitButton', () => {
  let wrapper

  const onStepChange = jest.fn()
  const manualSubmit = jest.fn()

  const formValues = {
    delivery: {
      confirmed: true,
    },
  }

  beforeEach(() => {
    wrapper = shallow(
      <SubmitButton
        nextStepName="Proceed to delivery"
        onStepChange={onStepChange}
        manualSubmit={manualSubmit}
        formValues={formValues}
      />,
    )

    jest.clearAllMocks()
  })

  test('renders correctly', () => {
    expect(wrapper.find('withRouter(Connect(ErrorMessage))').exists()).toBe(true)

    const button = wrapper.find('Connect(CheckoutButton)')
    expect(button.exists()).toBe(true)
    expect(button.prop('children')).toBe('Proceed to delivery')
  })

  describe('when button is clicked', () => {
    describe('when there are no errors on mobile', () => {
      beforeEach(() => {
        wrapper.find('Connect(CheckoutButton)').simulate('click')
      })

      test('then it should invoke the proper callbacks', () => {
        expect(manualSubmit).toHaveBeenNthCalledWith(1, 'delivery')
        expect(manualSubmit).toHaveBeenNthCalledWith(2, 'yourdetails')
        expect(onStepChange).toHaveBeenCalled()
      })
    })

    describe('when there are no errors on desktop', () => {
      beforeEach(() => {
        wrapper.setProps({
          browser: 'desktop',
        })
        wrapper.find('Connect(CheckoutButton)').simulate('click')
      })

      test('then it should invoke the proper callbacks', () => {
        expect(manualSubmit).toHaveBeenNthCalledWith(1, 'delivery')
        expect(manualSubmit).not.toHaveBeenNthCalledWith(2, 'yourdetails')
        expect(onStepChange).toHaveBeenCalled()
      })
    })

    describe('when there is checkoutMobileInvalid on mobile', () => {
      beforeEach(() => {
        wrapper.setProps({
          checkoutMobileInvalid: true,
        })
        wrapper.find('Connect(CheckoutButton)').simulate('click')
      })

      test('then it should invoke the proper callbacks', () => {
        expect(manualSubmit).toHaveBeenNthCalledWith(1, 'delivery')
        expect(manualSubmit).toHaveBeenNthCalledWith(2, 'yourdetails')
        expect(onStepChange).not.toHaveBeenCalled()
      })
    })

    describe('when there is checkoutInvalid on desktop', () => {
      beforeEach(() => {
        wrapper.setProps({
          checkoutInvalid: true,
          browser: 'desktop',
        })
        wrapper.find('Connect(CheckoutButton)').simulate('click')
      })

      test('then it should invoke the proper callbacks', () => {
        expect(manualSubmit).toHaveBeenNthCalledWith(1, 'delivery')
        expect(manualSubmit).not.toHaveBeenNthCalledWith(2, 'yourdetails')
        expect(onStepChange).not.toHaveBeenCalled()
      })
    })
  })
})
