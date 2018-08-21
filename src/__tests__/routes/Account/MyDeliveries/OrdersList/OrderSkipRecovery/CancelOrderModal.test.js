import React from 'react'
import { shallow } from 'enzyme'

import { CancelOrderModal } from 'routes/Account/MyDeliveries/OrdersList/OrderSkipRecovery/CancelOrderModal'

describe('CancelPendingOrderModal', () => {
	const wrapper = shallow(
		<CancelOrderModal
			visible
			orderId={'123'}
			type={'pending'}
			dismiss={() => { }}
			cancelPendingOrder={() => { }}
			cancelProjectedOrder={() => { }}
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
})

describe('CancelProjectedOrderModal', () => {
	const wrapper = shallow(
		<CancelOrderModal
			visible
			dayId={'123'}
			type={'projected'}
			dismiss={() => { }}
			cancelPendingOrder={() => { }}
			cancelProjectedOrder={() => { }}
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
})