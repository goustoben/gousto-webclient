import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { Alert, Button } from 'goustouicomponents'
import EditDelivery from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/EditDelivery'
import css from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/EditDelivery.css'
import util from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/util'
import Address from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/Address/Address'
import userActions from 'actions/user'
import orderActions from 'actions/order'
import DropdownInput from 'components/Form/Dropdown/DropdownInput'
import { DEFAULT_MESSAGE_ID } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/util.js'

describe('EditDelivery', function() {
	const addresses = Immutable.fromJS({
		23: {
			id: '23',
			line1: '2 Morris House',
			name: 'Home',
			type: 'shipping',
			postcode: 'N17 8LY',
		},
		122: {
			id: '122',
			line1: '4 Boris House',
			name: 'Work',
			type: 'shipping',
			postcode: 'N17 8LY',
		},
		183: {
			id: '183',
			line1: '3 Cabbage House',
			name: 'shipping',
			type: 'shipping',
			postcode: 'N17 8LY',
		},
		423: {
			id: '423',
			line1: '6 House House',
			name: 'Other',
			type: 'shipping',
			postcode: 'N19 3LF',
		},
	})

	const addressesAllAvailable = Immutable.fromJS({
		183: {
			id: '183',
			line1: '3 Cabbage House',
			name: 'shipping',
			type: 'shipping',
			postcode: 'N17 8LY',
		},
		423: {
			id: '423',
			line1: '6 House House',
			name: 'Other',
			type: 'shipping',
			postcode: 'N19 3LF',
		},
	})

	const period = Immutable.Map({
		id: 23,
		whenStart: 'then',
		whenEnd: 'end',
	})
	const deliveryDays = Immutable.fromJS({
		aaa: { coreDayId: '45' },
		bbb: { coreDayId: '46' },
	})
	const recipes = Immutable.fromJS(['x', 'y', 'z'])
	const recipesStock = Immutable.fromJS(['a', 'b'])
	const orders = Immutable.fromJS({
		7: { coreDeliveryDayId: '44' },
		8: { coreDeliveryDayId: '45' },
	})

	const sandbox = sinon.sandbox.create()
	let getDeliveryDaysAndSlotsOptionsStub
	let wrapper
	let dispatchSpy

	beforeEach(function() {
		getDeliveryDaysAndSlotsOptionsStub = sandbox.stub(util, 'getDeliveryDaysAndSlotsOptions')
		getDeliveryDaysAndSlotsOptionsStub.returns({ deliveryDaysOptions: [], slotsOptions: {} })
		dispatchSpy = sandbox.spy()
		wrapper = shallow(<EditDelivery
			editDeliveryMode
			orderId="ab23"
			shippingAddressId="423"
			addresses={addresses}
			portionsCount={3}
			period={period}
			deliveryDays={deliveryDays}
			coreDeliveryDayId="8"
			deliverySlotId="de03"
			recipes={recipes}
			recipesStock={recipesStock}
			orders={orders}
			formSelectedAddress="423"
		/>, { context: { store: { dispatch: dispatchSpy } } })
	})

	afterEach(function() {
		sandbox.restore()
		sandbox.reset()
	})

	describe('rendering', function() {
		it('should render a <div>', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should render 2 dropdown inputs', function() {
			expect(wrapper.find(DropdownInput).length).to.equal(2)
		})

		it('should render the number of addresses passed', function() {
			expect(wrapper.find(Address).length).to.equal(4)
		})

		it('should render 2 buttons', function() {
			expect(wrapper.find(Button).length).to.equal(2)
		})

		it('should render the cancel button with the correct text', function() {
			expect(wrapper.find(Button)
				.first()
				.children()
				.text()).to.contain('Cancel changes')
		})

		it('should render the submit button with the correct text', function() {
			expect(wrapper.find(Button)
				.last()
				.children()
				.text()).to.contain('Save changes')
		})

		it('should render the submit button enabled when the selected address has changed', function() {
			wrapper = shallow(<EditDelivery
				editDeliveryMode
				orderId="ab23"
				shippingAddressId="111111"
				addresses={addresses}
				portionsCount={3}
				period={period}
				deliveryDays={deliveryDays}
				coreDeliveryDayId="8"
				deliverySlotId="de03"
				recipes={recipes}
				recipesStock={recipesStock}
				orders={orders}
				formSelectedAddress="423"
			/>)
			expect(wrapper.find(Button).last().prop('disabled')).to.be.false
		})

		it('should render the submit button enabled when the selected slot has changed', function() {
			wrapper.instance().onSlotChange('fg04')
			expect(wrapper.update()
				.find(Button)
				.last()
				.prop('disabled')
			).to.be.false
		})

		it('should render the submit button disabled when the selected address and selected slot has not changed', function() {
			expect(wrapper.find(Button).last().prop('disabled')).to.be.true
		})

		it('should render the submit button disabled when the selected day is the default message', function() {
			wrapper.instance().onSlotChange('fg04')
			wrapper.setState({ selectedDeliveryDayId: DEFAULT_MESSAGE_ID })
			expect(wrapper.update()
				.find(Button)
				.last()
				.prop('disabled')
			).to.be.true
		})

		it('should render the submit button disabled when the selected slot is the default message', function() {
			wrapper.instance().onSlotChange(DEFAULT_MESSAGE_ID)
			expect(wrapper.update()
				.find(Button)
				.last()
				.prop('disabled')
			).to.be.true
		})
	})

	describe('receive new props', function() {
		const newDeliveryDays = deliveryDays.set('ccc', { coreDayId: '47' })
		const daysOptionsSample = [{
			value: 'default-message',
			label: 'Please select a delivery date',
			disabled: false,
			icon: '',
		}, {
			value: '1241',
			label: '2018-02-11',
			disabled: false,
			icon: '',
		}]
		const slotsOptionsSample = {
			1241: [{
				value: 'default-message',
				coreSlotId: null,
				label: 'Please select a delivery slot',
				subLabel: '',
				isDefaultSlot: false,
			}, {
				value: 'dafa1c2e-12d1-11e6-b5f6-06ddb628bdc5',
				coreSlotId: '3',
				label: '8am - 7pm',
				subLabel: 'Free',
				isDefaultSlot: true,
			}],
			'default-message': [{
				value: 'default-message',
				coreSlotId: null,
				label: 'Please select a delivery slot',
				subLabel: '',
				isDefaultSlot: false,
			}],
		}

		it('should call getDeliveryDaysAndSlotsOptions when deliveryDays prop is updated', function() {
			wrapper.setProps({ deliveryDays: newDeliveryDays })
			expect(getDeliveryDaysAndSlotsOptionsStub).to.have.been.calledOnce
			expect(getDeliveryDaysAndSlotsOptionsStub).to.have.been.calledWithExactly(newDeliveryDays, recipes, recipesStock, 3, '8', 'de03', orders)
		})

		it('should call getDeliveryDaysAndSlotsOptions when recipesStock prop is updated', function() {
			const newRecipesStock = recipesStock.push('c')
			wrapper.setProps({ recipesStock: newRecipesStock })
			expect(getDeliveryDaysAndSlotsOptionsStub).to.have.been.calledOnce
			expect(getDeliveryDaysAndSlotsOptionsStub).to.have.been.calledWithExactly(deliveryDays, recipes, newRecipesStock, 3, '8', 'de03', orders)
		})

		it('should change the selected day to the first option when current selection is not available in the new props', function() {
			const constructDropdownOptionsStub = sandbox.stub(wrapper.instance(), 'constructDropdownOptions')
			constructDropdownOptionsStub.returns({ deliveryDaysOptions: daysOptionsSample, slotsOptions: slotsOptionsSample })
			wrapper.setProps({ deliveryDays: newDeliveryDays })
			expect(wrapper.state('selectedDeliveryDayId')).to.be.equal(DEFAULT_MESSAGE_ID)
		})

		it('should change the selected slot to the first option when current selection is not available in the new props', function() {
			const constructDropdownOptionsStub = sandbox.stub(wrapper.instance(), 'constructDropdownOptions')
			constructDropdownOptionsStub.returns({ deliveryDaysOptions: daysOptionsSample, slotsOptions: slotsOptionsSample })
			wrapper.setProps({ deliveryDays: newDeliveryDays })
			expect(wrapper.state('selectedDeliverySlotId')).to.be.equal(DEFAULT_MESSAGE_ID)
		})
	})

	describe('add new address button', function() {
		it('should call showNewAddressModal when clicking the button', function() {
			const showNewAddressModalStub = sandbox.stub(EditDelivery.prototype, 'showNewAddressModal')
			const className = `.${css.addAddressSection.split(' ').join('.')}`
			expect(wrapper.find(className)).to.have.length(1)
			wrapper.find(className).first().simulate('click')
			expect(showNewAddressModalStub).to.have.been.calledOnce
		})

		it('should dispatch userOpenCloseEditSection action when clicking the button', function() {
			const userToggleNewAddressModalStub = sandbox.stub(userActions, 'userToggleNewAddressModal')
			userToggleNewAddressModalStub.returns('userToggleNewAddressModal result')
			const className = `.${css.addAddressSection.split(' ').join('.')}`
			wrapper.find(className).first().simulate('click')
			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy).to.have.been.calledWithExactly('userToggleNewAddressModal result')
			expect(userToggleNewAddressModalStub).to.have.been.calledOnce
			expect(userToggleNewAddressModalStub).to.have.been.calledWithExactly(true, 'ab23')
		})
	})

	describe('handleSelectAddress', function() {
		it('should dispatch userOpenCloseEditSection action when clicking the button', function() {
			const userPendingAddressFormDataStub = sandbox.stub(userActions, 'userPendingAddressFormData')
			userPendingAddressFormDataStub.returns('userPendingAddressFormData result')
			const orderGetDeliveryDaysStub = sandbox.stub(orderActions, 'orderGetDeliveryDays')
			orderGetDeliveryDaysStub.returns('orderGetDeliveryDays result')
			wrapper.instance().handleSelectAddress(23)
			expect(dispatchSpy).to.have.been.calledTwice
			expect(dispatchSpy).to.have.been.calledWithExactly('userPendingAddressFormData result')
			expect(dispatchSpy).to.have.been.calledWithExactly('orderGetDeliveryDays result')
			expect(userPendingAddressFormDataStub).to.have.been.calledOnce
			expect(userPendingAddressFormDataStub).to.have.been.calledWithExactly(23, 'ab23')
		})
	})

	describe('cancel button', function() {
		it('should call onCancelFunction when clicking the button', function() {
			const onCancelFunctionStub = sandbox.stub(EditDelivery.prototype, 'onCancelFunction')
			wrapper.find(Button).first().simulate('click')
			expect(onCancelFunctionStub).to.have.been.calledOnce
		})

		it('should dispatch userOpenCloseEditSection action when clicking the button', function() {
			const userOpenCloseEditSectionStub = sandbox.stub(userActions, 'userOpenCloseEditSection')
			userOpenCloseEditSectionStub.returns('userOpenCloseEditSection result')
			wrapper.find(Button).first().simulate('click')
			expect(dispatchSpy).to.have.been.calledTwice
			expect(userOpenCloseEditSectionStub).to.have.been.calledOnce
			expect(userOpenCloseEditSectionStub).to.have.been.calledWithExactly('ab23', false)
			expect(dispatchSpy).to.have.been.calledWithExactly('userOpenCloseEditSection result')
		})
	})

	describe('submit button', function() {
		it('should call onSubmitFunction when clicking the submit button', function () {
			const onSubmitFunctionStub = sandbox.stub(EditDelivery.prototype, 'onSubmitFunction')
			wrapper.setState({ selectedDeliveryDayId: '1', selectedDeliverySlotId: 'lm07' })
			wrapper.find(Button).last().simulate('click')
			expect(onSubmitFunctionStub).to.have.been.calledOnce
			expect(onSubmitFunctionStub).to.have.been.calledWithExactly('ab23', '423', '1', 'lm07')
		})

		it('should dispatch orderUpdateDayAndSlot action when clicking the button if the deliverySlot changed', function() {
			const orderUpdateDayAndSlotStub = sandbox.stub(orderActions, 'orderUpdateDayAndSlot')
			orderUpdateDayAndSlotStub.returns('orderUpdateDayAndSlot result')
			const slotsOptions = {
				100: [
					{ value: 'jk06', coreSlotId: '777' },
					{ value: 'whatever', coreSlotId: '888' },
				],
			}
			wrapper.setState({ selectedDeliveryDayId: '100', selectedDeliverySlotId: 'jk06', slotsOptions })
			wrapper.find(Button).last().simulate('click')
			expect(dispatchSpy).to.have.been.calledOnce
			expect(orderUpdateDayAndSlotStub).to.have.been.calledOnce
			expect(orderUpdateDayAndSlotStub).to.have.been.calledWithExactly('ab23', '100', '777', 'jk06')
			expect(dispatchSpy).to.have.been.calledWithExactly('orderUpdateDayAndSlot result')
		})

		it('should NOT dispatch orderUpdateDayAndSlot action when the deliverySlot remains unchanged', function() {
			const orderUpdateDayAndSlotStub = sandbox.stub(orderActions, 'orderUpdateDayAndSlot')
			orderUpdateDayAndSlotStub.returns('orderUpdateDayAndSlot result')
			wrapper.setState({ selectedDeliverySlotId: 'de03' })
			wrapper.find(Button).last().simulate('click')
			expect(orderUpdateDayAndSlotStub).to.not.have.been.called
		})

		it('should dispatch orderAddressChange action when clicking the button if the address changed', function() {
			wrapper = shallow(<EditDelivery
				editDeliveryMode
				orderId="ab23"
				shippingAddressId="423"
				addresses={addresses}
				portionsPerRecipe={3}
				portionsCount={3}
				period={period}
				deliveryDays={deliveryDays}
				coreDeliveryDayId="8"
				deliverySlotId="de03"
				recipes={recipes}
				recipesStock={recipesStock}
				orders={orders}
				formSelectedAddress="200"
			/>, { context: { store: { dispatch: dispatchSpy } } })
			const orderAddressChangeStub = sandbox.stub(orderActions, 'orderAddressChange')
			orderAddressChangeStub.returns('orderAddressChange result')
			wrapper.setState({ selectedAddressId: '200' })
			wrapper.find(Button).last().simulate('click')
			expect(dispatchSpy).to.have.been.calledOnce
			expect(orderAddressChangeStub).to.have.been.calledOnce
			expect(orderAddressChangeStub).to.have.been.calledWithExactly('ab23', '200')
			expect(dispatchSpy).to.have.been.calledWithExactly('orderAddressChange result')
		})

		it('should NOT dispatch orderUpdateDayAndSlot action when the address remains unchanged', function() {
			const orderAddressChangeStub = sandbox.stub(orderActions, 'orderAddressChange')
			orderAddressChangeStub.returns('orderAddressChange result')
			wrapper.setState({ selectedAddressId: '423' })
			wrapper.find(Button).last().simulate('click')
			expect(orderAddressChangeStub).to.not.have.been.called
		})

		it('should not render an alert by default', function() {
			wrapper = shallow(<EditDelivery
				editDeliveryMode
				period={period}
				coreDeliveryDayId="8"
				deliverySlotId="de03"
				portionsPerRecipe
			/>)
			expect(wrapper.find(Alert).length).to.equal(0)
		})

		it('should display the Alert section if the updatedDaySlot POST fails', function() {
			wrapper = shallow(<EditDelivery
				editDeliveryMode
				period={period}
				coreDeliveryDayId="8"
				deliverySlotId="de03"
				isPendingUpdateDayAndSlot
				isPendingUpdateAddress
				portionsCount={3}
			/>, { context: { store: { dispatch: dispatchSpy } } })
			wrapper.setProps({
				isPendingUpdateDayAndSlot: false,
				isPendingUpdateAddress: false,
				isErrorUpdateDayAndSlot: 'omg error',
				isErrorUpdateAddress: null,
			})
			expect(wrapper.find(Alert).length).to.equal(1)
		})

		it('should display the Alert section if the UpdateAddress POST fails', function() {
			wrapper = shallow(<EditDelivery
				editDeliveryMode
				period={period}
				coreDeliveryDayId="8"
				deliverySlotId="de03"
				isPendingUpdateDayAndSlot
				isPendingUpdateAddress
				portionsCount={3}
			/>, { context: { store: { dispatch: dispatchSpy } } })
			wrapper.setProps({
				isPendingUpdateDayAndSlot: false,
				isPendingUpdateAddress: false,
				isErrorUpdateDayAndSlot: null,
				isErrorUpdateAddress: 'omg error',
			})
			expect(wrapper.find(Alert).length).to.equal(1)
		})
	})
})
