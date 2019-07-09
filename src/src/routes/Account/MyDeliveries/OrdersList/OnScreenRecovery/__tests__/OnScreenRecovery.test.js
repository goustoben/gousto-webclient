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
          keepCopy="keep"
          confirmCopy="confirm"
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
          keepCopy="keep"
          confirmCopy="confirm"
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

      expect(footer.props().keepCopy).toBe('keep')
      expect(footer.props().confirmCopy).toEqual('confirm')
      expect(typeof footer.props().onKeep).toBe('function')
      expect(typeof footer.props().onConfirm).toBe('function')
    })
  })

  describe('Alternative Render', () => {

    test('should call getRecoveryContent', () => {
      const getRecoveryContent = jest.fn()
      wrapper = shallow(
        <OnScreenRecovery
          orderId="14245"
          triggered={false}
          orderDate="2018-09-24T13:27:09.487Z"
          deliveryDayId="23001"
          orderType="pending"
          getRecoveryContent={getRecoveryContent}
        />
      )

      const prevProps = wrapper.props()

      wrapper.setProps({
        triggered: true,
      })

      wrapper.instance().componentDidUpdate(prevProps)

      expect(getRecoveryContent).toHaveBeenCalled()
    })
  })
})
