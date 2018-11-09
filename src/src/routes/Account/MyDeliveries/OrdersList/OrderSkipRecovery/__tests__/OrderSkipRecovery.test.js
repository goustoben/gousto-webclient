import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { OrderSkipRecovery } from '../OrderSkipRecovery'

jest.mock('components/Overlay', () => 'Overlay') // don't want to be testinng this

jest.mock('../Title', () => 'Title')
jest.mock('../Offer', () => 'Offer')
jest.mock('../ValueProposition', () => 'ValueProposition')
jest.mock('../Footer', () => 'Footer')

describe('Order Skip Recovery Modal', () => {
  let wrapper
  const keepOrder = jest.fn()
  const cancelPendingOrder = jest.fn()
  const cancelProjectedOrder = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Initial Render', () => {
    const valueProposition = {
      title: 'value proposition title',
      message: 'value proposition message',
    }
    const callToActions = {
      keep: 'keep',
      confirm: 'confirm',
    }

    beforeAll(() => {
      wrapper = shallow(
				<OrderSkipRecovery
				  title="modal title"
				  orderType="pending"
				  keepOrder={keepOrder}
				  cancelPendingOrder={cancelPendingOrder}
				  cancelProjectedOrder={cancelProjectedOrder}
				  featureFlag
				  valueProposition={valueProposition}
				  callToActions={callToActions}
				/>
      )
    })

    test('should render snapshot', () => {
      const tree = renderer.create(
				<OrderSkipRecovery
				  featureFlag
				  keepOrder={keepOrder}
				  cancelPendingOrder={cancelPendingOrder}
				  cancelProjectedOrder={cancelProjectedOrder}
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
      expect(modalTitle.props().orderType).toBe('pending')
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

      expect(footer.props().orderType).toBe('pending')
      expect(footer.props().callToActions).toEqual(callToActions)
      expect(typeof footer.props().onClickKeepOrder).toBe('function')
      expect(typeof footer.props().onClickSkipCancel).toBe('function')
    })
  })

  describe('Alternative Render', () => {
    test('should not render modal content if featureflag is false', () => {
      wrapper = shallow(
				<OrderSkipRecovery
				  keepOrder={keepOrder}
				  cancelPendingOrder={cancelPendingOrder}
				  cancelProjectedOrder={cancelProjectedOrder}
				/>
      )

      const modalValueProposition = wrapper.find('ValueProposition')

      expect(modalValueProposition.length).toBe(0)
    })

    test('should only call cancel pending order when order type is pending', () => {
      wrapper = shallow(
				<OrderSkipRecovery
				  keepOrder={keepOrder}
				  cancelPendingOrder={cancelPendingOrder}
				  cancelProjectedOrder={cancelProjectedOrder}
				/>
      )

      wrapper.instance().skipCancelOrder('13123', '123123', 'pending', cancelPendingOrder, cancelProjectedOrder)

      expect(cancelProjectedOrder).toHaveBeenCalledTimes(0)
      expect(cancelPendingOrder).toHaveBeenCalledTimes(1)
    })

    test('should only call cancel projected order when order type is projected', () => {
      wrapper = shallow(
				<OrderSkipRecovery
				  keepOrder={keepOrder}
				  cancelPendingOrder={cancelPendingOrder}
				  cancelProjectedOrder={cancelProjectedOrder}
				/>
      )

      wrapper.instance().skipCancelOrder('13123', '123123', 'projected', cancelPendingOrder, cancelProjectedOrder)

      expect(cancelPendingOrder).toHaveBeenCalledTimes(0)
      expect(cancelProjectedOrder).toHaveBeenCalledTimes(1)
    })

    test('should call getSkipRecoveryContent with appropriate props', () => {
      const getSkipRecoveryContent = jest.fn()
      wrapper = shallow(
				<OrderSkipRecovery
				  orderId="14245"
				  triggered={false}
				  orderDate="2018-09-24T13:27:09.487Z"
				  dayId="23001"
				  orderType="pending"
				  getSkipRecoveryContent={getSkipRecoveryContent}
				/>
      )

      const prevProps = wrapper.props()

      wrapper.setProps({
        triggered: true,
      })

      wrapper.instance().componentDidUpdate(prevProps)

      expect(getSkipRecoveryContent).toHaveBeenCalledWith({
        actionTriggered: 'Cancel',
        dayId: '23001',
        orderDate: '2018-09-24T13:27:09.487Z',
        orderId: '14245',
        status: 'pending',
      })
    })
  })
})
