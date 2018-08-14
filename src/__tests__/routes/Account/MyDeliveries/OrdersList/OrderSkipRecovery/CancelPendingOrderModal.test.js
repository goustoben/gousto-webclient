import React from 'react'
import { shallow } from 'enzyme'

import CancelPendingOrderModal from 'routes/Account/MyDeliveries/OrdersList/OrderSkipRecovery/CancelPendingOrderModal'

describe('CancelPendingOrderModal', () => {
	const wrapper = shallow(
		<CancelPendingOrderModal
			visible
			orderId={'123'}
			dismiss={() => { }}
			orderCancel={() => { }}
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
