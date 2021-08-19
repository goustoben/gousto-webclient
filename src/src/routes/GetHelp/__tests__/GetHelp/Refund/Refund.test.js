import React from 'react'
import { mount } from 'enzyme'
import { client as routes } from 'config/routes'

import { Refund } from 'routes/GetHelp/Refund/Refund'

jest.mock('apis/getHelp')

describe('<Refund />', () => {
  const content = {
    title: 'test title',
    infoBody: 'we\'d like to give you £{{refundAmount}} credit',
    confirmationBody: 'Confirmation body',
    errorBody: 'Error body',
    button1: 'button1 copy',
    button2: 'button2 £{{refundAmount}} copy',
  }

  const loadRefundAmount = jest.fn()
  const createComplaint = jest.fn()
  const PROPS = {
    compensation: {
      amount: 7.77,
      type: 'credit'
    },
    content,
    createComplaint,
    isAnyError: false,
    isAnyPending: true,
    loadRefundAmount,
    user: { id: '999', accessToken: '123' },
    trackRejectRefund: () => {},
  }

  let wrapper
  let getHelpLayout

  beforeAll(() => {
    wrapper = mount(
      <Refund {...PROPS} />
    )
    getHelpLayout = wrapper.find('GetHelpLayout')
  })

  describe('when isAnyPending is true', () => {
    beforeAll(() => {
      wrapper.setProps({isAnyPending: true})
    })
    test('should render Loading', () => {
      expect(wrapper.find('Loading').exists()).toBe(true)
    })
  })

  describe('when isAnyPending is false', () => {
    beforeAll(() => {
      wrapper.setProps({isAnyPending: false})
    })

    test('layout is rendering correctly', async () => {
      const BottomBar = wrapper.find('BottomFixedContentWrapper')
      const confirmationBody = wrapper.find('.confirmationBody')
      getHelpLayout = wrapper.find('GetHelpLayout')

      expect(getHelpLayout).toHaveLength(1)
      expect(confirmationBody.text()).toContain('we\'d like to give you £7.77 credit')
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('BottomButton')).toHaveLength(1)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('bottom bar buttons are rendering correctly', async () => {
      await wrapper.setState({
        isFetching: false,
      })
      const BottomBar = wrapper.find('BottomFixedContentWrapper')
      const Button1 = BottomBar.find('BottomButton')
      const Button2 = BottomBar.find('Button').at(1)
      const { index, contact } = routes.getHelp

      expect(Button1.prop('url')).toContain(`${index}/${contact}`)
      expect(Button2.text()).toBe('button2 £7.77 copy')
    })

    test('should call loadRefundAmount', () => {
      expect(loadRefundAmount).toHaveBeenCalled()
    })

    test('Button has createComplaint as onClick attribute', () => {
      expect(wrapper.find('Button').at(1).prop('onClick')).toBe(createComplaint)
    })
  })

  describe('when isAnyError is true', () => {
    beforeAll(() => {
      wrapper.setProps({ isAnyError: true })
    })

    test('confirmationBody contains empty string', () => {
      expect(wrapper.find('.confirmationBody').text()).toEqual('')
    })

    test('confirmationQuestion contains errorBody', () => {
      expect(wrapper.find('.confirmationQuestion').text()).toEqual(content.errorBody)
    })

    test('BottomFixedContentWrapper has not render acceptButton', () => {
      expect(wrapper.find('BottomFixedContentWrapper').children).toHaveLength(1)
    })
  })
})
