import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import OrderDelivery from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDelivery'
import { Alert, Button } from 'goustouicomponents'
import recipesActions from 'actions/recipes'
import orderActions from 'actions/order'
import actions from 'actions/user'

describe('OrderDelivery', function() {
	let sandbox
	let wrapper
	const addressObjectMock = Immutable.Map({
		line1: 'Flat 10',
		line2: 'Morris House',
		line3: 'Swainson Road',
		town: 'London',
		postcode: 'W3 7UP',
		name: 'work',
	})
	const context = {
		store: {
			getState: () => ({
				orderPricing: Immutable.Map({}),
			}),
			subscribe: () => {},
			dispatch: () => {},
		},
	}
	let recipesLoadStockByDateSpy
	let orderGetDeliveryDaysSpy
	let userOpenCloseEditSectionSpy

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
	})
	afterEach(function() {
		sandbox.restore()
	})
	describe('rendering', function() {
		wrapper = shallow(<OrderDelivery
			date="Monday 17 August"
			timeStart="6am"
			timeEnd="3pm"
			shippingAddressObj={addressObjectMock}
			editDeliveryMode={false}
			orderState="scheduled"
			orderId={8}
		/>)

		it('should render a <div>', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should render "Delivery details"', function() {
			expect(wrapper.text()).to.contain('Delivery details')
		})

		it('should render the date passed', function() {
			expect(wrapper.text()).to.contain('Monday 17 August')
		})

		it('should format and render the start time and end time passed', function() {
			expect(wrapper.text()).to.contain('6am - 3pm')
		})

		it('should render the type of address passed', function() {
			expect(wrapper.text()).to.contain('work')
		})

		it('should render the address, extracted from the address object and formatted', function() {
			expect(wrapper.text()).to.contain('Flat 10, Morris House, Swainson Road, London W3 7UP')
		})

		it('should not render EditDelivery if editDeliveryMode is false', function() {
			expect(wrapper.text()).to.not.contain('<EditDelivery />')
		})

		it('should not render a button if state is scheduled', function() {
			expect(wrapper.text()).to.not.contain('Edit details')
		})

		it('should render a button if state is menu open', function() {
			wrapper = shallow(<OrderDelivery
				orderState="menu open"
			/>)
			expect(wrapper.text()).to.contain('<Button />')
		})

		it('should render EditDelivery if editDeliveryMode and fetchSuccess is true', function() {
			wrapper = shallow(<OrderDelivery
				editDeliveryMode
				fetchSuccess
			/>)
			expect(wrapper.text()).to.equal('<Connect(EditDelivery) />')
		})
		it('should not render EditDelivery if editDeliveryMode is false', function() {
			wrapper = shallow(<OrderDelivery
				editDeliveryMode={false}
				fetchSuccess
			/>)
			expect(wrapper.text()).to.not.contain('<Connect(EditDelivery) />')
		})
		it('should not render EditDelivery if fetchSuccess is false', function() {
			wrapper = shallow(<OrderDelivery
				fetchSuccess={false}
				editDeliveryMode
			/>)
			expect(wrapper.text()).to.not.contain('<Connect(EditDelivery) />')
		})
		it('should render Alert if recipesPeriodStockFetch fails', function() {
			wrapper = shallow(<OrderDelivery
				fetchSuccess={false}
				editDeliveryMode
				recipesPeriodStockFetchError="this error"
			/>)
			expect(wrapper.find(Alert).length).to.equal(1)
		})
		it('should render Alert if orderDeliverDaysFetch fails', function() {
			wrapper = shallow(<OrderDelivery
				fetchSuccess={false}
				editDeliveryMode
				orderDeliveryDaysFetchError="this error"
			/>)
			expect(wrapper.find(Alert).length).to.equal(1)
		})
		it('should not render Alert if one of the fetches error', function() {
			wrapper = shallow(<OrderDelivery
				fetchSuccess={false}
				editDeliveryMode
			/>)
			expect(wrapper.find(Alert).length).to.equal(0)
		})
		it('onClick it should dispatch fetches for getting delivery days and stock - finally it should dispatch an action to open a card', function() {
			const period = Immutable.Map({
				id: 23339,
				whenStart: '12',
				whenCutoff: '10',
			})
			wrapper = shallow(<OrderDelivery
				date="Monday 17 August"
				timeStart="6am"
				timeEnd="3pm"
				shippingAddressObj={addressObjectMock}
				editDeliveryMode={false}
				orderState="menu open"
				orderId={8}
				period={period}
			/>, { context })
			context.store.dispatch = sandbox.spy()
			orderGetDeliveryDaysSpy = sandbox.spy(orderActions, 'orderGetDeliveryDays')
			recipesLoadStockByDateSpy = sandbox.spy(recipesActions, 'recipesLoadStockByDate')
			userOpenCloseEditSectionSpy = sandbox.spy(actions, 'userOpenCloseEditSection')
			const detailsButton = wrapper.find(Button)
			detailsButton.simulate('click')
			expect(context.store.dispatch).to.have.been.calledThrice
			expect(orderGetDeliveryDaysSpy).to.have.been.calledOnce
			expect(recipesLoadStockByDateSpy).to.have.been.calledOnce
			expect(userOpenCloseEditSectionSpy).to.have.been.calledOnce
		})
	})
})
