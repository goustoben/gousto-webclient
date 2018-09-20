import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { OrderSkipRecovery } from '../OrderSkipRecovery'

jest.mock('components/Overlay', () => 'Overlay') // don't want to be testinng this

jest.mock('../Title', () => 'Title')
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

			expect(modalValueProposition.props().featureFlag).toBe(true)
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
		test('should only call cancel pending order when order type is pending', () => {
			wrapper = shallow(
				<OrderSkipRecovery
					keepOrder={keepOrder}
					cancelPendingOrder={cancelPendingOrder}
					cancelProjectedOrder={cancelProjectedOrder}
				/>
			)

			wrapper.instance().skipCancelOrder('13123', '123123', 'pending', cancelPendingOrder, cancelProjectedOrder)

			expect(cancelPendingOrder).toHaveBeenCalledTimes(1)
			expect(cancelProjectedOrder).toHaveBeenCalledTimes(0)
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
	})
})
