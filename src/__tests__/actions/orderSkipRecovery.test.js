import Immutable from 'immutable'

import { orderCancel, projectedOrderCancel } from 'actions/order'
import { fetchOrderSkipContent } from 'apis/orderSkipRecovery'
import { redirect } from 'actions/redirect'
import actionTypes from 'actions/actionTypes';

import {
  modalVisibilityChange,
	keepOrder,
	cancelPendingOrder,
	cancelProjectedOrder,
	getSkipRecoveryContent,
} from 'actions/orderSkipRecovery'

jest.mock('actions/order', () => ({
	orderCancel: jest.fn(),
	projectedOrderCancel: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
	redirect: jest.fn(),
}))

jest.mock('apis/orderSkipRecovery', () => ({
	fetchOrderSkipContent: jest.fn(),
}))

describe('orderSkipRecovery', () => {
	const dispatchSpy = jest.fn()
	const getStateSpy = jest.fn()

	afterEach(() => {
		dispatchSpy.mockClear()
		getStateSpy.mockClear()
    })

    describe('modalVisibilityChange', () => {
        test('should show order skip recovery modal', async () => {
            const orderId = '234234'
            const status = 'pending'
            const actionTriggered = null // used for tracking
            const title = 'Are you sure you want to skip?'
            const valueProposition = {
                title: 'value proposition title',
                message: 'value proposition message',
            }
            const callToActions = {
                confirm: 'confirm',
                keep: 'keep',
						}
						const data = {
								title,
                value_proposition: valueProposition,
                call_to_actions: callToActions,
						}

            modalVisibilityChange({
                orderId,
                status,
                actionTriggered,
                data
            })(dispatchSpy)

            expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
                type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
                modalVisibility: true,
                orderId,
                title: 'Are you sure you want to skip?',
                valueProposition,
                callToActions,
            }))
        })
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
				type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
				modalVisibility: false,
				orderId: '83632',
			}))
		})

		test('should set modal cancelOrder visibility to false', async () => {
			keepOrder({ orderId: '23214', status: 'projected' })(dispatchSpy)
			expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
				trackingData: {
					actionType: 'Order Kept',
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
			setTimeout(() => {
				expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
					type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
					modalVisibility: false,
				}))
			}, 500)
		})

		test('should redirect to my-deliveries', () => {
			cancelPendingOrder('64521')(dispatchSpy)
			expect(redirect).toHaveBeenCalledWith('/my-deliveries')
		})
	})

	describe('cancelProjectedOrder', () => {
		getStateSpy.mockReturnValue({
			orderSkipRecovery: Immutable.Map({
				modalVisibility: true,
				orderId: '',
				dayId: '',
				orderType: '',
			}),
		})

		test('should call the skip cancel action with the dayId', () => {
			cancelProjectedOrder('1234')(dispatchSpy)
			expect(projectedOrderCancel).toHaveBeenCalledWith('1234', '1234')
		})

		test('should toggle the skip order modal visibility', () => {
			cancelProjectedOrder('1234')(dispatchSpy)
			setTimeout(() => {
				expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
					type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
					modalVisibility: false,
				}))
			}, 500)
		})

		test('should redirect to my-deliveries', () => {
			cancelProjectedOrder('1234')(dispatchSpy)
			expect(redirect).toHaveBeenCalledWith('/my-deliveries')
		})
	})

	describe('getSkipRecoveryContent', () => {
		getStateSpy.mockReturnValue({
			auth: Immutable.Map({
				accessToken: 'token',
			}),
		})

		test('should dispatch a fetchOrderSkipContent request', () => {
			getSkipRecoveryContent({
				orderId: '31520',
			})(dispatchSpy, getStateSpy)

			expect(fetchOrderSkipContent).toHaveBeenCalled()
		})

		describe('when the response is to intervene', () => {
			test('display the modal', async () => {
				fetchOrderSkipContent.mockReturnValue(Promise.resolve({
					data: {
						intervene: true,
					},
				}))

				await getSkipRecoveryContent({
					orderId: '31520',
				})(dispatchSpy, getStateSpy)

				expect(dispatchSpy).toHaveBeenCalled()
			})
		})

		describe('when the response is to *not* intervene', () => {
			describe('and status is pending', () => {
				test('should cancel the pending order', async () => {
					fetchOrderSkipContent.mockReturnValue(Promise.resolve({
						data: {
							intervene: false,
						},
					}))

					await getSkipRecoveryContent({
						orderId: '12223',
						status: 'pending',
					})(dispatchSpy, getStateSpy)

					expect(orderCancel).toHaveBeenCalled()
				})
			})

			describe('and status is projected', () => {
				test('should skip the projected order', async () => {
					fetchOrderSkipContent.mockReturnValue(Promise.resolve({
						data: {
							intervene: false,
						},
					}))

					await getSkipRecoveryContent({
						orderId: '92839',
						dayId: '582651',
						status: 'pending',
					})(dispatchSpy, getStateSpy)

					expect(projectedOrderCancel).toHaveBeenCalled()
				})
			})
		})
	})
})
