import React from 'react'
import { shallow } from 'enzyme'

import { OrderSkipRecovery } from 'routes/Account/MyDeliveries/OrdersList/OrderSkipRecovery/OrderSkipRecovery'

describe('OrderSkipRecovery pending order', () => {
	const wrapper = shallow(
		<OrderSkipRecovery
			visible
			orderId={'123'}
			orderType={'pending'}
			boxNumber={1}
			skipRecovery
			keepOrder={() => {}}
			cancelPendingOrder={() => {}}
			cancelProjectedOrder={() => {}}
		/>
	)

	test('should render content cancelOrder', () => {
		const contentChild = wrapper.find('.orderSkipRecoveryMessage').text()
		expect(contentChild).toEqual('Are you sure you want to cancel?')
	})

	test('should render content cancelOrder keepBox', () => {
		const keepButton = wrapper.find('.keepButton').text()
		expect(keepButton).toEqual('Keep Box')
	})

	test('should render content cancelOrder skipAnyWay', () => {
		const skipAnyWayButton = wrapper.find('.skipAnyWay').text()
		expect(skipAnyWayButton).toEqual('Cancel anyway')
	})
	test('should render value proposition title for cancel order', () => {
		const valuePropTitle = wrapper.find('.valuePropositionTitle')
		expect(valuePropTitle.length).toBe(1)
	})

	test('should render value proposition description for cancel order', () => {
		const valuePropDescription = wrapper.find('.valuePropositionDescription')
		expect(valuePropDescription.length).toBe(1)
	})
})

describe('OrderSkipRecovery projected order', () => {
	const wrapper = shallow(
		<OrderSkipRecovery
			visible
			dayId={'123'}
			boxNumber={1}
			orderType={'projected'}
			skipRecovery
			keepOrder={() => {}}
			cancelPendingOrder={() => {}}
			cancelProjectedOrder={() => {}}
		/>
	)

	test('should render content cancelOrder', () => {
		const contentChild = wrapper.find('.orderSkipRecoveryMessage').text()
		expect(contentChild).toEqual('Are you sure you want to skip?')
	})

	test('should render content cancelOrder keepBox', () => {
		const keepButton = wrapper.find('.keepButton').text()
		expect(keepButton).toEqual('Keep Box')
	})

	test('should render content cancelOrder skipAnyWay', () => {
		const skipAnyWayButton = wrapper.find('.skipAnyWay').text()
		expect(skipAnyWayButton).toEqual('Skip anyway')
	})

	test('should render value proposition title for skip order', () => {
		const valuePropTitle = wrapper.find('.valuePropositionTitle')
		expect(valuePropTitle.length).toBe(1)
	})

	test('should render value proposition description for skip order', () => {
		const valuePropDescription = wrapper.find('.valuePropositionDescription')
		expect(valuePropDescription.length).toBe(1)
	})
})
