import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { OnScreenRecovery } from '../OnScreenRecovery'

jest.mock('components/Overlay', () => 'Overlay')

describe('Order Skip Recovery Modal', () => {
  let wrapper
  const keepOrder = jest.fn()
  const cancelPendingOrder = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Initial Render', () => {
    const valueProposition = {
      title: 'value proposition title',
      message: 'value proposition message',
    }

    beforeAll(() => {
      wrapper = shallow(
        <OnScreenRecovery
          title="modal title"
          orderType="pending"
          onKeep={keepOrder}
          onConfirm={cancelPendingOrder}
          featureFlag
          valueProposition={valueProposition}
          onKeepCopy="keep"
          onConfirmCopy="confirm"
        />
      )
    })

    test('should render snapshot', () => {
      const tree = renderer.create(
        <OnScreenRecovery
          title="modal title"
          orderType="pending"
          onKeep={keepOrder}
          onConfirm={cancelPendingOrder}
          featureFlag
          valueProposition={valueProposition}
          onKeepCopy="keep"
          onConfirmCopy="confirm"
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    test('should display modal title', () => {
      const modalTitle = wrapper.find('Title')

      expect(modalTitle.length).toBe(1)
    })

    test('should pass correct props to title', () => {
      const modalTitle = wrapper.find('Title')

      expect(modalTitle.props().title).toBe('modal title')
    })

    test('should display modal value proposition', () => {
      const modalValueProposition = wrapper.find('ValueProposition')

      expect(modalValueProposition.length).toBe(1)
    })

    test('should pass correct props to value proposition', () => {
      const modalValueProposition = wrapper.find('ValueProposition')

      expect(modalValueProposition.props().valueProposition).toEqual(valueProposition)
    })

    test('should display modal footer', () => {
      const footer = wrapper.find('Footer')

      expect(footer.length).toBe(1)
    })

    test('should pass correct props to footer', () => {
      const footer = wrapper.find('Footer')

      expect(footer.props().onKeepCopy).toBe('keep')
      expect(footer.props().onConfirmCopy).toEqual('confirm')
      expect(typeof footer.props().onKeep).toBe('function')
      expect(typeof footer.props().onConfirm).toBe('function')
    })
  })

  describe('Alternative Render', () => {

    test('should call getSkipRecoveryContent with appropriate props', () => {
      const getSkipRecoveryContent = jest.fn()
      wrapper = shallow(
        <OnScreenRecovery
          orderId="14245"
          triggered={false}
          orderDate="2018-09-24T13:27:09.487Z"
          deliveryDayId="23001"
          orderType="pending"
          getRecoveryContent={getSkipRecoveryContent}
        />
      )

      const prevProps = wrapper.props()

      wrapper.setProps({
        triggered: true,
      })

      wrapper.instance().componentDidUpdate(prevProps)

      expect(getSkipRecoveryContent).toHaveBeenCalledWith({
        deliveryDayId: '23001',
        orderDate: '2018-09-24T13:27:09.487Z',
        orderId: '14245',
        status: 'pending',
      })
    })
  })
})
