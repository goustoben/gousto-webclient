import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-caps */
import statusActions from 'actions/status'
import userActions from 'actions/user'

describe('userData actions', function() {
	let dispatchSpy
	let getStateSpy
	let sandbox
	let signupResponse
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		signupResponse = {
			data: {
				customer: {
					id: '34563456',
					email: 'test@gmail.com',
					authUserId: '342',
					nameFirst: 'john',
					nameLast: 'doe',
					goustoReference: 1234,
				},
				addresses: {
					shipping: {
						id: '687315',
					},
					billing: {
						id: '6873245',
					},
				},
				subscription: {
					id: '312412',
				},
			},
		}
		dispatchSpy = sinon.spy()
		getStateSpy = sinon.stub().returns({
			auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
			user: Immutable.fromJS({ orders: [], newOrders: [] }),
			form: {
				checkout: {
					values: {
						aboutyou: {
							title: 'mrs',
							firstName: 'john',
							lastName: 'doe',
							email: 'test@example.com',
							password: 'testpassword',
							allowEmail: true,
							allowThirdPartyEmail: false,
						},

						delivery: {
							companyName: '',
							houseNo: 'Flat 4',
							street: '67 Cloister Road',
							town: 'London',
							county: 'Greater London',
							postcode: 'W3 0DF',
							phone: '023456789',

							addressType: 'home',
							deliveryInstruction: 'Front Porch',
						},

						payment: {
							cardType: 'VISA',
							cardNumber: '4929 0000 0000 6',
							cv2: '123',
							cardName: 'asdfasdf',
							cardExpiryMonth: '02',
							cardExpiryYear: '13',

							isBillingAddressDifferent: false,
						},
					},
				},
			},
			basket: Immutable.fromJS({
				promocode: '',
				previewOrderId: '123',
				boxId: '9',
				slotId: '1823',
				tariffId: null,
			}),
			request: Immutable.fromJS({
				browser: 'desktop',
			}),
			features: Immutable.fromJS({}),
			error: Immutable.fromJS({
			}),
		})
	})

	afterEach(function(done) {
		sandbox.restore()
		done()
	})

	describe('userLoadData', function() {
		it('should return with USER_LOAD_DATA action user and email', async function() {
			const fetchUser = sinon.stub().returns(new Promise(resolve => { resolve({ data: { user: { id: '1234', email: 'test@email.com' } } }) }))
			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUser },
			}).default

			await actions.userLoadData()(dispatchSpy, getStateSpy)
			expect(fetchUser).to.have.been.calledOnce
			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: actionTypes.USER_LOAD_DATA,
				user: { id: '1234', email: 'test@email.com' },
			})
		})
	})

	describe('userFetchShippingAddresses', function() {
		it('should dispatch a USER_SHIPPING_ADDRESSES_RECEIVE action', async function() {
			const shippingAddresses = Immutable.fromJS([{
				id: '321250',
				deleted: false,
				userId: '77213',
				name: 'Home',
				companyname: '',
				line1: 'Flat 4',
				line2: '67 Cloister Road',
				line3: '',
				town: 'London',
				county: 'Greater London',
				postcode: 'W3 0DF',
				deliveryInstructions: 'Front Porch',
				shippingDefault: true,
				billingDefault: false,
				state: 'valid',
				premiumDelivery: true,
			}, {
				id: '325007',
				deleted: false,
				userId: '77213',
				name: 'work',
				companyname: '',
				line1: 'Unit 2 Issigonis House',
				line2: 'Cowley Road',
				line3: '',
				town: 'London',
				county: 'Greater London',
				postcode: 'W3 7UN',
				deliveryInstructions: 'Front Porch',
				shippingDefault: false,
				billingDefault: false,
				state: 'valid',
				premiumDelivery: true,
			}])

			const fetchShippingAddresses = sinon.stub().returns({ data: shippingAddresses })

			const basketAddressChange = sinon.spy()
			const basketChosenAddressChange = sinon.spy()
			const basketPostcodeChangePure = sinon.stub().returns(new Promise(resolve => { resolve() }))

			const actions = require('inject-loader?apis/user&./basket!actions/user')({
				'apis/user': { fetchShippingAddresses },
				'./basket': { basketAddressChange, basketChosenAddressChange, basketPostcodeChangePure },
			}).default

			await actions.userFetchShippingAddresses()(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(6)


			let dispatchSpyArgs = dispatchSpy.getCall(0)
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({ type: actionTypes.USER_SHIPPING_ADDRESSES_PENDING, pending: true })

			dispatchSpyArgs = dispatchSpy.getCall(1)
			expect(dispatchSpyArgs.args[0]).to.deep.equal({ type: actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE, shippingAddresses })

			expect(basketAddressChange).to.have.been.calledOnce
			expect(basketChosenAddressChange).to.have.been.calledOnce
			expect(basketPostcodeChangePure).to.have.been.calledOnce
			expect(basketPostcodeChangePure.getCall(0).args[0]).to.equal('W3 0DF')

			dispatchSpyArgs = dispatchSpy.getCall(5)
			expect(dispatchSpyArgs.args[0]).to.deep.equal({ type: actionTypes.USER_SHIPPING_ADDRESSES_PENDING, pending: false })
		})
	})

	describe('userClearData', function() {
		it('should dispatch a USER_CLEAR_DATA, basketAddressChange, basketChosenAddressChange, and basketPostcodeChangePure', async function() {
			await userActions.userClearData()(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(4)

			let dispatchSpyArgs = dispatchSpy.getCall(0)
			expect(dispatchSpyArgs.args[0]).to.deep.equal({
				type: actionTypes.USER_CLEAR_DATA,
			})

			dispatchSpyArgs = dispatchSpy.getCall(1)
			expect(dispatchSpyArgs.args[0]).to.deep.equal({
				type: actionTypes.BASKET_ADDRESS_CHANGE,
				address: null,
			})

			dispatchSpyArgs = dispatchSpy.getCall(2)
			expect(dispatchSpyArgs.args[0]).to.deep.equal({
				type: actionTypes.BASKET_CHOSEN_ADDRESS_CHANGE,
				address: null,
			})
		})
	})

	describe('userLoadOrder', function() {
		it('should dispatch USER_LOAD_ORDERS action with fetched orders along with status pending actions for USER_LOAD_ORDERS before & after load attempt', async function() {
			const fetchOrder = sinon.stub().returns({ data: { id: '1234', email: 'test@email.com' } })

			const actions = require('inject-loader?apis/orders!actions/user')({
				'apis/orders': { fetchOrder },
			}).default

			await actions.userLoadOrder('1234')(dispatchSpy, getStateSpy)
			expect(fetchOrder).to.have.been.calledOnce

			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: true,
			})

			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: actionTypes.USER_LOAD_ORDERS,
				orders: [{ id: '1234', email: 'test@email.com' }],
			})

			expect(dispatchSpy.getCall(3).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: false,
			})
		})

		it('should dispatch error for USER_LOAD_ORDERS & log error if load attempt fails', async function() {
			const error = new Error('error!')
			const fetchOrder = sinon.stub().returns(error)
			const loggerErrorSpy = sinon.stub().returns()

			const actions = require('inject-loader?apis/orders&utils/logger!actions/user')({
				'apis/orders': { fetchOrder },
				'utils/logger': { error: loggerErrorSpy },
			}).default

			try {
				await actions.userLoadOrder('1234')(dispatchSpy, getStateSpy)
			} catch (err) {
				expect(fetchOrder).to.have.been.calledOnce
				expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
					type: 'ERROR',
					key: 'USER_LOAD_ORDERS',
					value: error.message,
				})

				expect(loggerErrorSpy).to.have.been.calledOnce
				expect(err).to.deep.equal(error)
			}
		})

		it('should not fetch order by default if order is already loaded', async function() {
			const fetchOrder = sinon.stub().returns({})

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [{ id: '1234' }] }),
			})

			const actions = require('inject-loader?apis/orders!actions/user')({
				'apis/orders': { fetchOrder },
			}).default

			await actions.userLoadOrder('1234')(dispatchSpy, getStateSpy)

			expect(fetchOrder).to.have.not.been.called
			expect(dispatchSpy).to.have.been.calledThrice

			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: true,
			})

			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: false,
			})
		})

		it('should fetch order even if order is already loaded if forceRefresh is true', async function() {
			const fetchOrder = sinon.stub().returns({ data: { id: '1234', email: 'test@email.com' } })

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [{ id: '1234' }] }),
			})

			const actions = require('inject-loader?apis/orders!actions/user')({
				'apis/orders': { fetchOrder },
			}).default

			await actions.userLoadOrder('1234', true)(dispatchSpy, getStateSpy)
			expect(fetchOrder).to.have.been.calledOnce

			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: actionTypes.USER_LOAD_ORDERS,
				orders: [{ id: '1234', email: 'test@email.com' }],
			})
		})
	})

	describe('userLoadOrders', function() {
		const ordersSample = Immutable.List(Immutable.fromJS([
			{ id: '1234', email: 'test@email.com' },
			{ id: '5678', email: 'test@email.com' },
		]))
		const ordersMapSample = Immutable.Map(ordersSample.map(order => [order.get('id'), order]))

		it('should return with USER_LOAD_ORDERS action with fetched orders along with status pending actions for USER_LOAD_ORDERS before & after load attempt', async function() {
			const fetchUserOrders = sinon.stub().returns(new Promise(resolve => { resolve({ data: ordersMapSample }) }))
			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrders },
			}).default

			await actions.userLoadOrders()(dispatchSpy, getStateSpy)
			expect(fetchUserOrders).to.have.been.calledOnce
			expect(dispatchSpy).to.have.been.calledThrice

			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: true,
			})

			expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
				type: actionTypes.USER_LOAD_ORDERS,
				orders: ordersMapSample,
			})

			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: false,
			})
		})

		it('should dispatch error for USER_LOAD_ORDERS & log error if load attempt fails', async function() {
			const error = new Error('error!')
			const fetchUserOrders = sinon.stub().returns(error)
			const loggerErrorSpy = sinon.stub().returns()

			const actions = require('inject-loader?apis/user&utils/logger!actions/user')({
				'apis/user': { fetchUserOrders },
				'utils/logger': { error: loggerErrorSpy },
			}).default

			try {
				await actions.userLoadOrders()(dispatchSpy, getStateSpy)
			} catch (err) {
				expect(fetchUserOrders).to.have.been.calledOnce
				expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
					type: 'ERROR',
					key: 'USER_LOAD_ORDERS',
					value: error.message,
				})

				expect(loggerErrorSpy).to.have.been.calledOnce
				expect(err).to.deep.equal(error)
			}
		})

		it('should not fetch orders by default if orders have already been loaded', async function() {
			const fetchUserOrders = sinon.stub().returns({})

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [{ id: '1234' }] }),
			})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrders },
			}).default

			await actions.userLoadOrders()(dispatchSpy, getStateSpy)
			expect(fetchUserOrders).to.have.not.been.calledOnce
			expect(dispatchSpy).to.have.been.calledTwice

			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: true,
			})

			expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS',
				value: false,
			})
		})

		it('should fetch orders even if orders have already been loaded if forceRefresh is true', async function() {
			const fetchUserOrders = sinon.stub().returns(new Promise(resolve => { resolve({ data: ordersMapSample }) }))

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [{ id: '1234' }] }),
			})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrders },
			}).default

			await actions.userLoadOrders(true)(dispatchSpy, getStateSpy)
			expect(fetchUserOrders).to.have.been.calledOnce

			expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
				type: actionTypes.USER_LOAD_ORDERS,
				orders: ordersMapSample,
			})
		})

		it('should pass orderType and number through to fetchUserOrders', async function() {
			const fetchUserOrders = sinon.stub().returns(new Promise(resolve => { resolve({ data: ordersMapSample }) }))

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [{ id: '1234' }] }),
			})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrders },
			}).default

			await actions.userLoadOrders(true, 'something', 15)(dispatchSpy, getStateSpy)
			expect(fetchUserOrders).to.have.been.calledOnce

			expect(fetchUserOrders.getCall(0).args[1]).to.deep.equal({
				limit: 15,
				sort_order: 'desc',
				state: 'something',
				includes: ['shipping_address'],
			})
		})
	})

	describe('userFetchOrders', function() {
		const ordersSample = Immutable.List(Immutable.fromJS([
			{ id: '1234', email: 'test@email.com' },
			{ id: '5678', email: 'test@email.com' },
		]))
		const orders = Immutable.Map(ordersSample.map(order => [order.get('id'), order]))

		it('should return with USER_LOAD_ORDERS_NEW action with fetched orders along with status pending actions for USER_LOAD_ORDERS_NEW before & after load attempt', async function() {
			const fetchUserOrdersNew = sinon.stub().returns(new Promise(resolve => { resolve({ data: orders }) }))
			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrdersNew },
			}).default

			await actions.userFetchOrders()(dispatchSpy, getStateSpy)
			expect(fetchUserOrdersNew).to.have.been.calledOnce

			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS_NEW',
				value: true,
			})

			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: actionTypes.USER_LOAD_ORDERS_NEW,
				orders,
			})

			expect(dispatchSpy.getCall(3).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS_NEW',
				value: false,
			})
		})

		it('should dispatch error for USER_LOAD_ORDERS_NEW & log error if load attempt fails', async function() {
			const error = new Error('error!')
			const fetchUserOrdersNew = sinon.stub().returns(new Promise(function() { throw error }))

			const actions = require('inject-loader?apis/user&utils/logger!actions/user')({
				'apis/user': { fetchUserOrdersNew },
			}).default

			try {
				await actions.userFetchOrders()(dispatchSpy, getStateSpy)
			} catch (err) {
				expect(fetchUserOrdersNew).to.have.been.calledOnce
				expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
					type: 'ERROR',
					key: 'USER_LOAD_ORDERS_NEW',
					value: error.message,
				})
				expect(err).to.deep.equal(error)
			}
		})

		it('should not fetch orders by default if orders have already been loaded', async function() {
			const fetchUserOrdersNew = sinon.stub().returns(new Promise(resolve => { resolve({}) }))

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ newOrders: [{ id: '1234' }] }),
			})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrdersNew },
			}).default

			await actions.userFetchOrders()(dispatchSpy, getStateSpy)

			expect(fetchUserOrdersNew).to.have.not.been.calledOnce
			expect(dispatchSpy).to.have.been.calledThrice
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS_NEW',
				value: true,
			})
			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_LOAD_ORDERS_NEW',
				value: false,
			})
		})

		it('should fetch orders even if orders have already been loaded if forceRefresh is true', async function() {
			const fetchUserOrdersNew = sinon.stub().returns(new Promise(resolve => { resolve({ data: orders }) }))

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [{ id: '1234' }] }),
			})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrdersNew },
			}).default

			await actions.userFetchOrders(true)(dispatchSpy, getStateSpy)

			expect(fetchUserOrdersNew).to.have.been.calledOnce
			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: actionTypes.USER_LOAD_ORDERS_NEW,
				orders,
			})
		})

		it('should pass userID through to fetchUserOrdersNew and use the mocked query parameter', async function() {
			const fetchUserOrdersNew = sinon.stub().returns(new Promise(resolve => { resolve({ data: orders }) }))

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ id: 15 }),
			})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { fetchUserOrdersNew },
			}).default

			await actions.userFetchOrders(true, 'something', 15)(dispatchSpy, getStateSpy)
			expect(fetchUserOrdersNew).to.have.been.calledOnce

			expect(fetchUserOrdersNew.getCall(0).args[1].userId).to.equal(15)
		})
	})


	describe('userPromoApplyCode', function() {
		it('should call awaitPromo', async function() {
			const promoCode = 'testCode'
			const applyPromo = sinon.stub().returns({})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { applyPromo },
			}).default

			await actions.userPromoApplyCode(promoCode)(dispatchSpy, getStateSpy)
			expect(applyPromo).to.have.been.calledOnce
		})
	})

	describe('userVerifyAge', function() {
		it('should dispatch USER_AGE_VERIFY action along with status pending actions for USER_AGE_VERIFY before & after verification attempt', async function() {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah' }),
				user: Immutable.fromJS({ id: '222' }),
			})

			const verifyAgeSpy = sinon.stub().returns()

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { verifyAge: verifyAgeSpy },
			}).default

			await actions.userVerifyAge(true)(dispatchSpy, getStateSpy)
			expect(dispatchSpy).to.have.been.calledThrice

			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_AGE_VERIFY',
				value: true,
			})

			expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
				type: 'USER_AGE_VERIFY',
				verified: true,
			})

			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_AGE_VERIFY',
				value: false,
			})
		})

		it('should dispatch error for USER_AGE_VERIFY, log error if verification attempt fails, & rethrow the error', async function() {
			const error = new Error('error!')
			const verifyAgeSpy = sinon.stub().returns(error)
			const loggerErrorSpy = sinon.stub().returns()

			const actions = require('inject-loader?apis/user&utils/logger!actions/user')({
				'apis/user': { verifyAge: verifyAgeSpy },
				'utils/logger': { error: loggerErrorSpy },
			}).default

			try {
				await actions.userVerifyAge(true, true)(dispatchSpy, getStateSpy)
			} catch (err) {
				expect(verifyAgeSpy).to.have.been.calledOnce
				expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
					type: 'ERROR',
					key: 'USER_AGE_VERIFY',
					value: error.message,
				})

				expect(loggerErrorSpy).to.have.been.calledOnce
				expect(err).to.deep.equal(error)
			}
		})

		it('should call verifyAge with accessToken & userId "current" if hardSave is true', async function() {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah' }),
				user: Immutable.fromJS({ id: '222' }),
			})

			const verifyAgeSpy = sinon.stub().returns({})

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { verifyAge: verifyAgeSpy },
			}).default

			await actions.userVerifyAge(true, true)(dispatchSpy, getStateSpy)
			expect(verifyAgeSpy).to.have.been.calledOnce
			expect(verifyAgeSpy.getCall(0).args[0]).to.equal('blah')
			expect(verifyAgeSpy.getCall(0).args[1]).to.equal('current')
		})
	})

	describe('userSubscribe', function() {
		let basketPreviewOrderChange
		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			signupResponse = {
				data: {
					orderId: '123',
					customer: {
						id: '34563456',
						email: 'test@gmail.com',
						authUserId: '342',
						nameFirst: 'john',
						nameLast: 'doe',
						goustoReference: 1234,
					},
					addresses: {
						shipping: {
							id: '687315',
						},
						billing: {
							id: '6873245',
						},
					},
					subscription: {
						id: '312412',
					},
				},
			}
			basketPreviewOrderChange = sinon.spy()
			dispatchSpy = sinon.spy()
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [] }),
				form: {
					checkout: {
						values: {
							aboutyou: {
								title: 'mrs',
								firstName: 'john',
								lastName: 'doe',
								email: 'test@example.com',
								password: 'testpassword',
								allowEmail: false,
								allowThirdPartyEmail: true,
							},

							delivery: {
								companyName: '',
								houseNo: 'Flat 4',
								street: '67 Cloister Road',
								town: 'London',
								county: 'Greater London',
								postcode: 'W3 0DF',
								phone: '023456789',

								addressType: 'home',
								deliveryInstruction: 'Front Porch',
							},

							payment: {
								cardType: 'VISA',
								cardNumber: '4929 0000 0000 6',
								cv2: '123',
								cardName: 'asdfasdf',
								cardExpiryMonth: '02',
								cardExpiryYear: '13',

								isBillingAddressDifferent: false,
							},
						},
					},
				},
				basket: Immutable.fromJS({
					promocode: '',
					previewOrderId: '123',
					boxId: '9',
					slotId: '1823',
					tariffId: null,
				}),
				request: Immutable.fromJS({
					browser: 'desktop',
				}),
				features: Immutable.fromJS({}),
			})
		})

		afterEach(function(done) {
			sandbox.restore()
			done()
		})

		it('should dispatch USER_SUBSCRIBE action along with status pending actions', async function() {
			const customerSignup = sinon.stub().returns(signupResponse)

			const actions = require('inject-loader?apis/customers&./basket!actions/user')({
				'apis/customers': { customerSignup },
				'./basket': { basketPreviewOrderChange },
			}).default
			await actions.userSubscribe()(dispatchSpy, getStateSpy)

			expect(dispatchSpy.callCount).to.equal(5)
			expect(customerSignup).to.have.been.calledOnce
			expect(basketPreviewOrderChange).to.have.been.calledOnce
			expect(customerSignup.args[0][1]).to.deep.equal({
				order_id: '123',
				promocode: '',
				tariff_id: null,
				customer: {
					phone_number: '0023456789',
					email: 'test@example.com',
					name_first: 'john',
					name_last: 'doe',
					promo_code: '',
					password: 'testpassword',
					age_verified: 0,
					salutation_id: 'mrs',
					marketing_do_allow_email: 0,
					marketing_do_allow_thirdparty: 1,
				},
				payment_method: {
					is_default: 1,
					type: 'card',
					name: 'My Card',
					card: {
						type: 'VISA',
						number: '4929 0000 0000 6',
						cvv2: '123',
						holder: 'asdfasdf',
						expiry_month: '02',
						expiry_year: '2013',
						active: 1
					}
				},
				addresses: {
					shipping_address: {
						type: 'shipping',
						name: '',
						line1: 'Flat 4',
						line2: '67 Cloister Road',
						line3: '',
						town: 'London',
						county: 'Greater London',
						postcode: 'W3 0DF',
						delivery_instructions: 'Front Porch'
					},
					billing_address: {
						type: 'billing',
						name: '',
						line1: 'Flat 4',
						line2: '67 Cloister Road',
						line3: '',
						town: 'London',
						county: 'Greater London',
						postcode: 'W3 0DF'
					}
				},
				subscription: {
					interval_id: 1,
					delivery_slot_id: '1823',
					box_id: '9'
				}
			})
			expect(Immutable.is(dispatchSpy.args[2][1]), Immutable.fromJS({
				...signupResponse.customer,
				...signupResponse.addresses,
				subscription: signupResponse.subscription,
			})).to.be.true
			expect(dispatchSpy.getCall(4)).to.be.calledWithExactly({
				key: actionTypes.USER_SUBSCRIBE,
				type: 'PENDING',
				value: false,
			})
		})

		it('should include tariff_id if available in basket', async function() {
			const customerSignup = sinon.stub().returns(signupResponse)
			const actions = require('inject-loader?apis/customers&./basket!actions/user')({
				'apis/customers': { customerSignup },
				'./basket': { basketPreviewOrderChange },
			}).default
			getStateSpy.returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [] }),
				form: {
					checkout: {
						values: {
							aboutyou: {},

							delivery: {},

							payment: {},
						},
					},
				},
				basket: Immutable.fromJS({
					tariffId: 2,
				}),
				request: Immutable.fromJS({
					browser: 'desktop',
				}),
				features: Immutable.fromJS({}),
			})
			await actions.userSubscribe()(dispatchSpy, getStateSpy)
			expect(customerSignup.firstCall.args[1].tariff_id).to.equal(2)
			expect(dispatchSpy.getCall(4)).to.be.calledWithExactly({
				key: actionTypes.USER_SUBSCRIBE,
				type: 'PENDING',
				value: false,
			})
		})

		it('should error for USER_SUBSCRIBE & log error if load attempt fails', async function() {
			const error = new Error('error!')
			const customerSignup = sinon.stub().throws(error)
			const loggerErrorSpy = sinon.stub().returns()
			const actions = require('inject-loader?apis/customers&utils/logger&./basket!actions/user')({
				'apis/customers': { customerSignup },
				'utils/logger': { error: loggerErrorSpy },
				'./basket': { basketPreviewOrderChange },
			}).default

			try {
				await actions.userSubscribe()(dispatchSpy, getStateSpy)
			} catch (err) {
				expect(err).to.deep.equal(error)
				expect(dispatchSpy.callCount).to.equal(4)
				expect(customerSignup).to.have.been.calledOnce
				expect(dispatchSpy.args[2][0]).to.deep.equal({
					key: actionTypes.USER_SUBSCRIBE,
					type: 'ERROR',
					value: 'error!',
				})
				expect(dispatchSpy.args[3][0]).to.deep.equal({
					key: actionTypes.USER_SUBSCRIBE,
					type: 'PENDING',
					value: false,
				})
			}
		})
	})

	describe('userSubscribe on MOBILE', function() {
		let basketPreviewOrderChange
		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			basketPreviewOrderChange = sinon.spy()
			dispatchSpy = sinon.spy()
			signupResponse = {
				data: {
					orderId: '123',
					customer: {
						id: '34563456',
						email: 'test@gmail.com',
						authUserId: '342',
						nameFirst: 'john',
						nameLast: 'doe',
						goustoReference: 1234,
					},
					addresses: {
						shipping: {
							id: '687315',
						},
						billing: {
							id: '6873245',
						},
					},
					subscription: {
						id: '312412',
					},
				},
			}
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [] }),
				form: {
					checkout: {
						values: {
							aboutyou: {
								title: 'mrs',
								firstName: 'john',
								lastName: 'doe',
								email: 'test@example.com',
								password: 'testpassword',
								allowEmail: true,
								allowThirdPartyEmail: false,
							},

							delivery: {
								companyName: '',
								houseNo: 'Flat 4',
								street: '67 Cloister Road',
								town: 'London',
								county: 'Greater London',
								postcode: 'W3 0DF',
								phone: '023456789',

								addressType: 'home',
								deliveryInstruction: 'Front Porch',
								interval_id: 2,
							},

							payment: {
								cardType: 'VISA',
								cardNumber: '4929 0000 0000 6',
								cv2: '123',
								cardName: 'asdfasdf',
								cardExpiryMonth: '02',
								cardExpiryYear: '13',

								isBillingAddressDifferent: false,
							},
						},
					},
				},
				basket: Immutable.fromJS({
					promocode: '',
					previewOrderId: '123',
					boxId: '9',
					slotId: '1823',
					tariffId: null,
				}),
				request: Immutable.fromJS({
					browser: 'mobile',
				}),
				features: Immutable.fromJS({}),
			})
		})

		it('should dispatch USER_SUBSCRIBE action along with status pending actions', async function() {
			const customerSignup = sinon.stub().returns(signupResponse)
			const actions = require('inject-loader?apis/customers&./basket!actions/user')({
				'apis/customers': { customerSignup },
				'./basket': { basketPreviewOrderChange },
			}).default
			await actions.userSubscribe()(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(5)
			expect(customerSignup).to.have.been.calledOnce
			expect(customerSignup.args[0][1]).to.deep.equal({
				order_id: '123',
				promocode: '',
				tariff_id: null,
				customer: {
					phone_number: '0023456789',
					email: 'test@example.com',
					name_first: 'john',
					name_last: 'doe',
					promo_code: '',
					password: 'testpassword',
					age_verified: 0,
					salutation_id: 'mrs',
					marketing_do_allow_email: 1,
					marketing_do_allow_thirdparty: 0,
				},
				payment_method: {
					is_default: 1,
					type: 'card',
					name: 'My Card',
					card: {
						type: 'VISA',
						number: '4929 0000 0000 6',
						cvv2: '123',
						holder: 'asdfasdf',
						expiry_month: '02',
						expiry_year: '2013',
						active: 1
					}
				},
				addresses: {
					shipping_address: {
						type: 'shipping',
						name: '',
						line1: 'Flat 4',
						line2: '67 Cloister Road',
						line3: '',
						town: 'London',
						county: 'Greater London',
						postcode: 'W3 0DF',
						delivery_instructions: 'Front Porch'
					},
					billing_address: {
						type: 'billing',
						name: '',
						line1: 'Flat 4',
						line2: '67 Cloister Road',
						line3: '',
						town: 'London',
						county: 'Greater London',
						postcode: 'W3 0DF'
					}
				},
				subscription: {
					interval_id: 2,
					delivery_slot_id: '1823',
					box_id: '9'
				}
			})
			expect(Immutable.is(dispatchSpy.args[2][1]), Immutable.fromJS({
				...signupResponse.customer,
				...signupResponse.addresses,
				subscription: signupResponse.subscription,
			})).to.be.true
			expect(dispatchSpy.getCall(4)).to.be.calledWithExactly({
				key: actionTypes.USER_SUBSCRIBE,
				type: 'PENDING',
				value: false,
			})
		})

		it('should include tariff_id if available in basket', async function() {
			const customerSignup = sinon.stub().returns(signupResponse)
			const actions = require('inject-loader?apis/customers&./basket!actions/user')({
				'apis/customers': { customerSignup },
				'./basket': { basketPreviewOrderChange },
			}).default
			getStateSpy.returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [] }),
				form: {
					checkout: {
						values: {
							aboutyou: {},

							delivery: {},

							payment: {},
						},
					},
				},
				basket: Immutable.fromJS({
					tariffId: 2,
				}),
				request: Immutable.fromJS({
					browser: 'mobile',
				}),
				features: Immutable.fromJS({}),
			})
			await actions.userSubscribe()(dispatchSpy, getStateSpy)
			expect(customerSignup.firstCall.args[1].tariff_id).to.equal(2)
		})

		it('should error for USER_SUBSCRIBE & log error if load attempt fails', async function() {
			const error = new Error('error!')
			const customerSignup = sinon.stub().returns(new Promise(function() { throw error }))
			const loggerErrorSpy = sinon.stub().returns()
			const actions = require('inject-loader?apis/customers&./basket!actions/user')({
				'apis/customers': { customerSignup },
				'utils/logger': { error: loggerErrorSpy },
				'./basket': { basketPreviewOrderChange },
			}).default

			try {
				await actions.userSubscribe()(dispatchSpy, getStateSpy)
			} catch (err) {
				expect(err).to.deep.equal(error)
				expect(dispatchSpy.callCount).to.equal(4)
				expect(customerSignup).to.have.been.calledOnce
				expect(dispatchSpy.getCall(2)).to.be.calledWithExactly({
					key: actionTypes.USER_SUBSCRIBE,
					type: 'ERROR',
					value: 'error!',
				})
				expect(dispatchSpy.getCall(3)).to.be.calledWithExactly({
					key: actionTypes.USER_SUBSCRIBE,
					type: 'PENDING',
					value: false,
				})
			}
		})
	})

	describe('userRecipeRatings', function() {
		it('should return with USER_RATE_COUNT action rateCount', async function() {
			const userRateCount = sinon.stub().returns(new Promise(resolve => { resolve({ data: { count: 2 } }) }))
			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { userRateCount },
			}).default

			await actions.userRecipeRatings()(dispatchSpy, getStateSpy)
			expect(userRateCount).to.have.been.calledOnce
			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: actionTypes.USER_RATE_COUNT,
				rateCount: 2,
			})
		})
	})

	describe('userProspect', function() {
		let state
		let storeProspect
		let loggerErrorSpy
		let actions

		beforeEach(function(){
			state = {
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ orders: [] }),
				form: {
					checkout: {
						values: {
							aboutyou: {
								title: 'mrs',
								firstName: 'john',
								lastName: 'doe',
								email: 'test@example.com',
								password: 'testpassword',
								allowEmail: true,
								allowThirdPartyEmail: false,
							},

							delivery: {
								companyName: '',
								houseNo: 'Flat 4',
								street: '67 Cloister Road',
								town: 'London',
								county: 'Greater London',
								postcode: 'W3 0DF',
								phone: '023456789',

								addressType: 'home',
								deliveryInstruction: 'Front Porch',
							},

							payment: {
								cardType: 'VISA',
								cardNumber: '4929 0000 0000 6',
								cv2: '123',
								cardName: 'asdfasdf',
								cardExpiryMonth: '02',
								cardExpiryYear: '13',

								isBillingAddressDifferent: false,
							},
						},
					},
				},
				basket: Immutable.fromJS({
					promocode: 'PPP',
					previewOrderId: '123',
					tariffId: null,
				}),
				request: Immutable.fromJS({
					browser: 'desktop',
				}),
				features: Immutable.fromJS({}),
				routing: {
					locationBeforeTransitions: {
						pathname: 'check-out/aboutyou',
					}
				}
			}

			getStateSpy = sinon.stub().returns(state)
			storeProspect = sinon.stub().returns(new Promise(resolve => { resolve({}) }))
			loggerErrorSpy = sinon.stub().returns()
			actions = require('inject-loader?apis/prospect&utils/logger!actions/user')({
				'apis/prospect': { storeProspect },
				'utils/logger': { error: loggerErrorSpy },
			}).default
		})

		it('should successfully send data and set USER_PROSPECT pending and error statuses', async function() {
			await actions.userProspect()(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(3)
			expect(dispatchSpy.firstCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.USER_PROSPECT,
				value: true,
			})
			expect(dispatchSpy.getCall(1)).to.be.calledWithExactly({
				type: actionTypes.ERROR,
				key: actionTypes.USER_PROSPECT,
				value: false,
			})
			expect(dispatchSpy.lastCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.USER_PROSPECT,
				value: false,
			})
		})

		it('should unsuccessfully send data and set USER_PROSPECT pending and error statuses', async function() {
			state.routing = {}
			const error = {
				message: 'Cannot read property \'pathname\' of undefined'
			}
			const errorLoad = sandbox.stub(statusActions, 'errorLoad')
			getStateSpy = sinon.stub().returns(state)

			try {
				await actions.userProspect()(dispatchSpy, getStateSpy)
				expect(storeProspect).to.have.been.calledOnce
			} catch (err) {
				expect(errorLoad.firstCall.args[0]).to.equal(actionTypes.USER_PROSPECT)
				expect(errorLoad.firstCall.args[1].message).to.include(error.message)
			}
		})
	})

	describe('userOpenCloseEditSection', function() {
		const orderId = 'skdjfhs'

		it('fire USER_ORDER_EDIT_OPEN_CLOSE with orderId and a bool', async function() {
			const editDeliveryMode = false
			await userActions.userOpenCloseEditSection(orderId, editDeliveryMode)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(1)
			expect(dispatchSpy.firstCall).to.be.calledWithExactly({
				type: actionTypes.USER_ORDER_EDIT_OPEN_CLOSE,
				orderId,
				editDeliveryMode,
			})
		})
	})

	describe('jobs action', function() {
		let userLoadAddressesSpy
		const userApi = require('apis/user')

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			dispatchSpy = sinon.spy()
			userLoadAddressesSpy = sandbox.stub(userApi, 'fetchUserAddresses').returns(new Promise((resolve) => {
				resolve({ results: { address1: 'a', address2: 'b' } })
			}))
		})

		afterEach(() => {
			sandbox.restore()
		})

		it('should fetch jobs', async function() {
			await userActions.userLoadAddresses()(dispatchSpy, getStateSpy)
			// eslint-disable-next-line no-unused-expressions
			expect(userLoadAddressesSpy).to.have.been.called.once
			// eslint-disable-next-line no-unused-expressions
			expect(dispatchSpy).to.have.been.called.once
		})
	})

	describe('userToggleExpiredBillingModal', function() {
		it('fire EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE with a bool for visibility', async function() {
			const visibility = false
			userActions.userToggleExpiredBillingModal(visibility)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(1)
			expect(dispatchSpy.firstCall).to.be.calledWithExactly({
				type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
				visibility,
			})
		})
	})

	describe('userAddPaymentMethod', function() {
		it('should dispatch USER_POST_PAYMENT_METHOD action with fetched orders along with status pending actions for USER_POST_PAYMENT_METHOD', async function() {
			const addPaymentMethodSpy = sinon.stub().returns()
			const paymentMethodData = {
				payment_type: 'CARD',
				card_type: 'VISA',
				card_number: 293785629,
				card_cvv2: 123,
				card_holder: 'Mr Test',
				card_expires: '1218',
			}

			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { addPaymentMethod: addPaymentMethodSpy },
			}).default

			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
				user: Immutable.fromJS({ id: '1234' }),
			})

			await actions.userAddPaymentMethod(paymentMethodData)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(5)

			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: 'ERROR',
				key: 'USER_POST_PAYMENT_METHOD',
				value: null,
			})

			expect(dispatchSpy.getCall(2).args[0]).to.deep.equal({
				type: 'USER_POST_PAYMENT_METHOD',
				userId: '1234',
			})

			expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_POST_PAYMENT_METHOD',
				value: true,
			})

			expect(dispatchSpy.getCall(4).args[0]).to.deep.equal({
				type: 'PENDING',
				key: 'USER_POST_PAYMENT_METHOD',
				value: false,
			})
		})

		it('should dispatch error for USER_POST_PAYMENT_METHOD & log error if load attempt fails', async function() {
			const error = new Error('error!')
			const addPaymentMethodSpy = sinon.stub().returns(error)
			const loggerErrorSpy = sinon.stub().returns()
			const paymentMethodData = {
				payment_type: 'CARD',
				card_type: 'VISA',
				card_number: 293785629,
				card_cvv2: 123,
				card_holder: 'Mr Test',
				card_expires: '1218',
			}
			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { addPaymentMethod: addPaymentMethodSpy },
				'utils/logger': { error: loggerErrorSpy },
			}).default

			try {
				await actions.userAddPaymentMethod(paymentMethodData)(dispatchSpy, getStateSpy)
			} catch (err) {
				expect(addPaymentMethodSpy).to.have.been.calledOnce
				expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
					type: 'ERROR',
					key: 'USER_POST_PAYMENT_METHOD',
					value: error.message,
				})

				expect(loggerErrorSpy).to.have.been.calledOnce
				expect(err).to.deep.equal(error)
			}
		})

		describe('checkCardExpiry', function() {
			it('fire EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE with visibility: true if the card is expired', async function() {
				getStateSpy = sinon.stub().returns({
					auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
					user: Immutable.fromJS({ card: { expiryDate: '2017-02' } }),
					features: Immutable.fromJS({ newBillingModal: { value: true } }),
				})
				userActions.checkCardExpiry()(dispatchSpy, getStateSpy)
				expect(dispatchSpy.callCount).to.equal(1)
				expect(dispatchSpy.firstCall).to.be.calledWithExactly({
					type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
					visibility: true,
				})
			})

			it('fire EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE with visibility: false if the card is not expired', async function() {
				getStateSpy = sinon.stub().returns({
					auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
					user: Immutable.fromJS({ card: { expiryDate: '2019-02' } }),
					features: Immutable.fromJS({ newBillingModal: { value: true } }),
				})
				userActions.checkCardExpiry()(dispatchSpy, getStateSpy)
				expect(dispatchSpy.callCount).to.equal(1)
				expect(dispatchSpy.firstCall).to.be.calledWithExactly({
					type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
					visibility: false,
				})
			})
		})
	})

	describe('modalAddressLookup', function() {
		const addressApi = require('apis/addressLookup')
		let modalAddressLookupSpy
		let postcode
		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			dispatchSpy = sinon.spy()
			modalAddressLookupSpy = sandbox.stub(addressApi, 'fetchAddressByPostcode').returns(new Promise((resolve) => {
				resolve({ results: { address1: 'a', address2: 'b' } })
			}))
		})

		afterEach(() => {
			sandbox.restore()
		})

		it('should fetch address in a given postcode', async function() {
			await userActions.modalAddressLookup(postcode)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.callCount).to.equal(4)
			expect(modalAddressLookupSpy).to.have.been.called.once
			expect(dispatchSpy.firstCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.MODAL_ADDRESSES_RECEIVE,
				value: true,
			})
			expect(dispatchSpy.getCall(1)).to.be.calledWithExactly({
				type: actionTypes.ERROR,
				key: actionTypes.MODAL_ADDRESSES_RECEIVE,
				value: false,
			})
			expect(dispatchSpy.lastCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.MODAL_ADDRESSES_RECEIVE,
				value: false,
			})
		})
	})

	describe('userAddNewAddress', function() {
		it('should dispatch to add new address and dismiss the modal', async function() {
			const addNewAddress = sinon.stub().returns(new Promise(resolve => { resolve({ data: {} }) }))
			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { addNewAddress },
			}).default

			await actions.userAddNewAddress()(dispatchSpy, getStateSpy)
			expect(addNewAddress).to.have.been.calledOnce
			expect(dispatchSpy.callCount).to.equal(5)
		})
	})

	describe('userPendingAddressFormData', function() {

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			dispatchSpy = sinon.spy()
		})

		afterEach(() => {
			sandbox.restore()
		})

		it('should fetch dispatch SELECTED_ADDRESS_IN_NEW_ADDRESS_MODAL', async function() {
			await userActions.userPendingAddressFormData(23, 54)(dispatchSpy, getStateSpy)
			expect(dispatchSpy).to.have.been.called.once
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				type: actionTypes.SELECTED_ADDRESS_IN_NEW_ADDRESS_MODAL,
				orderId: 54,
				shippingAddressesId: 23,
			})
		})
	})

	describe('userUnsubscribe', function() {
		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			dispatchSpy = sandbox.spy()
		})

		afterEach(() => {
			sandbox.restore()
		})

		it('should dispatch an action of type UNSUBSCRIBED_USER', async function() {
			const deleteMarketingSubscription = sandbox.stub().returns(new Promise(resolve => { resolve({ data: {} }) }))
			const actions = require('inject-loader?apis/user!actions/user')({
				'apis/user': { deleteMarketingSubscription },
			}).default
			await actions.userUnsubscribe({
				authUserId: 'auth-user-id',
				marketingType: 'marketing-type',
				marketingUnsubscribeToken: 'marketing-unsubscribe-token',
			})(dispatchSpy)

			expect(dispatchSpy).to.be.calledWithExactly({
				type: actionTypes.UNSUBSCRIBED_USER,
			})
		})
	})
})
