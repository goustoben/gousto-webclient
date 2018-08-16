import Immutable from 'immutable'

import { keepOrder, cancelPendingOrder } from 'actions/orderSkipRecovery'
import { orderCancel } from 'actions/order'
import { redirect } from 'actions/redirect'
import actionTypes from '../../src/actions/actionTypes';

jest.mock('actions/order', () => ({
		orderCancel: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
		redirect: jest.fn(),
}))

describe('orderSkipRecovery', () => {
		const dispatchSpy = jest.fn()
		const getStateSpy = jest.fn()

		afterEach(() => {
				dispatchSpy.mockClear()
				getStateSpy.mockClear()
		})

		describe('keepOrder', () => {
			getStateSpy.mockReturnValue({
					orderSkipRecovery: Immutable.Map({
							modalVisibility: true,
							orderId: '',
					}),
			})

			test('should set modal cancelOrder visibility to false', async () => {
				keepOrder({ orderId: '83632', status: 'pending' })(dispatchSpy)
					expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
						type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
						modalVisibility: false,
						orderId: '83632',
					}))
			})

			test('should set modal cancelOrder visibility to false', async () => {
				keepOrder({ orderId: '23214', status: 'projected' })(dispatchSpy)
					expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
						trackingData: {
							type: 'Order Kept',
							order_id: '23214',
							order_state: 'projected',
							recovery_reasons: [],
						}
					}))
			})
		})

		describe('cancelOrder', () => {
				test('should call the order cancel action with the orderId', () => {
					cancelPendingOrder('64521')(dispatchSpy)
						expect(orderCancel).toHaveBeenCalledWith('64521')
				})

				test('should toggle the cancel order modal visibility', () => {
					cancelPendingOrder('64521')(dispatchSpy)
						expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
								type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
								modalVisibility: false,
								orderId: '64521',
						}))
				})

				test('should redirect to my-deliveries', () => {
						cancelPendingOrder('64521')(dispatchSpy)
						expect(redirect).toHaveBeenCalledWith('/my-deliveries')
				})
		})
})
