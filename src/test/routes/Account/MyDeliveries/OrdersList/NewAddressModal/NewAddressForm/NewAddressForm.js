import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import actions from 'actions/user.js'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { shallow, mount } from 'enzyme'
import Input from 'Form/Input'
import { Alert, Button } from 'goustouicomponents'
import Dropdown from 'Form/Dropdown'

import NewAddressForm from 'routes/Account/MyDeliveries/OrdersList/NewAddressModal/NewAddressForm/NewAddressForm'
import css from 'routes/Account/MyDeliveries/OrdersList/NewAddressModal/NewAddressForm/NewAddressForm.css'
import config from 'routes/Account/MyDeliveries/OrdersList/NewAddressModal/NewAddressForm/NewAddressFormErrorsConfig.js'


describe('NewAddressForm Render', function() {
	let wrapper
	let store
	let dispatchSpy
	let sandbox
	let getStateSpy
	const addresses = Immutable.fromJS([
		{ id: '28353569', count: 1, labels: ['W3 0AP', '2 Westfields Road, London'] },
		{ id: '28353570', count: 1, labels: ['W3 0AP', '3 Westfields Road, London'] },
		{ id: '28353571', count: 1, labels: ['W3 0AP', '4 Westfields Road, London'] },
	])

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		dispatchSpy = sandbox.spy()
		store = {}
		getStateSpy = sandbox.stub().returns(store)
		wrapper = shallow(<NewAddressForm />)
	})

	afterEach(function(done) {
		sandbox.restore()
		done()
	})

	it('should return all the relevant inputs', function() {
		expect(wrapper.find(Input)).to.have.length(3)
		expect(wrapper.find(Dropdown)).to.have.length(2)
		expect(wrapper.find('p')).to.have.length(6)
		expect(wrapper.find('p').at(0).text()).contains('Address name')
		expect(wrapper.find('p').at(1).text()).contains('Postcode')
		expect(wrapper.find('p').at(2).text()).contains('Address details')
		expect(wrapper.find('p').at(3).text()).contains('Safe place')
		expect(wrapper.find('p').at(4).text()).contains('If you are not in, where should we leave your box?')
		expect(wrapper.find('p').at(5).text()).contains('Where do you want us to leave your box?')
	})

	it('should contain 3 Buttons', function() {
		expect(wrapper.find('Button').length).to.equal(3)
	})

	it('should have the class closed applied to the details dropdown if there are no addresses', function() {
		const className = `.${css.closed.split(' ').join('.')}`
		expect(wrapper.find(className)).to.have.length(2)
	})

	it('should NOT have the class closed applied to the details dropdown if there are addresses', function() {
		wrapper = shallow(<NewAddressForm
			addresses={addresses}
		/>)
		const className = `.${css.closed.split(' ').join('.')}`
		expect(wrapper.find(className)).to.have.length(1)
		expect(wrapper.find(className).html()).to.not.contain('Address details')
	})

	it('should have the class closed applied to the other safe place input if safe place isnt other', function() {
		const className = `.${css.closed.split(' ').join('.')}`
		expect(wrapper.find(className)).to.have.length(2)
	})
	it('should NOT have the class closed applied to the safe place', function() {
		wrapper = shallow(<NewAddressForm />)
		wrapper.instance().handleInputChange('selectedSafePlace', 'Other')
		const className = `.${css.closed.split(' ').join('.')}`
		wrapper.update()
		expect(wrapper.find(className)).to.have.length(1)
		expect(wrapper.find(className).html()).to.contain('Address details')
	})
})

describe('NewAddressForm handleInputChange', function() {
	let wrapper
	let sandbox
	const context = {
		store: {
			getState: () => ({
				orderPricing: Immutable.Map({}),
			}),
			subscribe: () => {},
			dispatch: () => {},
		},
	}

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		wrapper = shallow(<NewAddressForm />, { context })
		context.store.dispatch = sandbox.spy()
	})

	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	it('should store the value in state against the label given', function() {
		wrapper = shallow(<NewAddressForm />)
		wrapper.instance().handleInputChange('addressName', 'CARD')
		expect(wrapper.state('addressName')).to.equal('CARD')
	})
	it('should store the value in state against the label given', function() {
		wrapper = shallow(<NewAddressForm />)
		wrapper.instance().handleInputChange('selectedSafePlace', 'Porch')
		expect(wrapper.state('selectedSafePlace')).to.equal('Porch')
	})
})


describe('NewAddressForm handleLookItUp', function() {
	let wrapper
	let sandbox
	let modalAddressLookupSpy
	const context = {
		store: {
			getState: () => ({
				orderPricing: Immutable.Map({}),
			}),
			subscribe: () => {},
			dispatch: () => {},
		},
	}
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		wrapper = shallow(<NewAddressForm />, { context })
		context.store.dispatch = sandbox.spy()
		modalAddressLookupSpy = sandbox.spy(actions, 'modalAddressLookup')
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	it('should dispatch AddressLookup action when called', function() {
		wrapper.instance().handleLookItUp('N17 8LY')
		expect(context.store.dispatch).to.have.been.calledOnce
		expect(modalAddressLookupSpy).to.have.been.calledOnce
	})
})

describe('NewAddressForm handleKeyPress', function() {
	let wrapper
	let sandbox
	let modalAddressLookupSpy
	const context = {
		store: {
			getState: () => ({
				orderPricing: Immutable.Map({}),
			}),
			subscribe: () => {},
			dispatch: () => {},
		},
	}
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		wrapper = shallow(<NewAddressForm />, { context })
		context.store.dispatch = sandbox.spy()
		modalAddressLookupSpy = sandbox.spy(actions, 'modalAddressLookup')
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	it('shouild not dispatch anything on a keypress that ISNT Enter', function() {
		wrapper.instance().handleKeyPress('this')
		expect(context.store.dispatch).to.not.have.been.called
		expect(modalAddressLookupSpy).to.not.have.been.called
	})
	it('shouild dispatch modalAddressLookup on a keypress that is Enter', function() {
		wrapper.instance().handleKeyPress({ key: 'Enter' })
		expect(context.store.dispatch).to.have.been.calledOnce
		expect(modalAddressLookupSpy).to.have.been.calledOnce
	})
})

describe('NewAddressForm handleSubmit', function() {
	let wrapper
	let sandbox
	let userAddNewAddressSpy
	const addresses = Immutable.fromJS([
		{ id: '28353569', count: 1, labels: ['W3 0AP', '2 Westfields Road, London'] },
		{ id: '28353570', count: 1, labels: ['W3 0AP', '3 Westfields Road, London'] },
		{ id: '28353571', count: 1, labels: ['W3 0AP', '4 Westfields Road, London'] },
	])
	const context = {
		store: {
			getState: () => ({
				orderPricing: Immutable.Map({}),
			}),
			subscribe: () => {},
			dispatch: () => {},
		},
	}
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		wrapper = shallow(<NewAddressForm addresses={addresses} />, { context })
		context.store.dispatch = sandbox.spy()
		userAddNewAddressSpy = sandbox.spy(actions, 'userAddNewAddress')
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	it('should call userAddNewAddress', function() {
		wrapper.instance().handleSubmit('this')
		expect(context.store.dispatch).to.have.been.calledOnce
		expect(userAddNewAddressSpy).to.have.been.calledOnce
	})
})


describe('component methods', function() {
	let wrapper
	let sandbox
	let modalAddressLookupSpy
	let userAddNewAddressSpy
	const addresses = Immutable.fromJS([
		{ id: '28353569', count: 1, labels: ['W3 0AP', '2 Westfields Road, London'] },
		{ id: '28353570', count: 1, labels: ['W3 0AP', '3 Westfields Road, London'] },
		{ id: '28353571', count: 1, labels: ['W3 0AP', '4 Westfields Road, London'] },
	])
	const context = {
		store: {
			getState: () => ({
				orderPricing: Immutable.Map({}),
				content: Immutable.Map({}),
			}),
			subscribe: () => {},
			dispatch: () => {},
		},
	}
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		wrapper = shallow(<NewAddressForm addresses={addresses} />, { context })
		context.store.dispatch = sandbox.spy()
		modalAddressLookupSpy = sandbox.spy(actions, 'modalAddressLookup')
		userAddNewAddressSpy = sandbox.spy(actions, 'userAddNewAddress')
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	it('Should fetch address upon click of the button', function() {
		wrapper.find(Button).first().simulate('click')
		expect(context.store.dispatch).to.have.been.calledOnce
		expect(modalAddressLookupSpy).to.have.been.calledOnce
	})

	it('Should submit to add new address on click or the submit button', function() {
		wrapper.find(Button).at(2).simulate('click')
		expect(context.store.dispatch).to.have.been.calledOnce
		expect(userAddNewAddressSpy).to.have.been.calledOnce
	})

	// FIXME: this functionality has been broken by https://gousto.atlassian.net/browse/TECH-7254
	it.skip('Should disable the button by default and then enable it when the correct data is available in the state', function() {
		wrapper = mount(<NewAddressForm fullAddressId='2'/>, { context })
		const button = wrapper.find(Button).at(2)
		expect(button.prop('disabled')).to.be.true
		wrapper.instance().handleInputChange('selectedAddress', '4')
		expect(button.prop('disabled')).to.be.true
		wrapper.instance().handleInputChange('addressName', 'Home')
		expect(button.prop('disabled')).to.be.true
		wrapper.instance().handleInputChange('addressPostcode', 'w3 rtt')
		wrapper.instance().handleInputChange('selectedAddress', '1')
		expect(button.prop('disabled')).to.be.false
	})

	it('Should display the correct error message when lookup from CraftyClicks fails', function () {
		wrapper = mount(<NewAddressForm addressesFetchError='Iamerror' />, { context })
		expect(wrapper.find(Alert).length).to.equal(1)
		expect(wrapper.find(Alert).at(0).text()).to.contain(config.errorMessages.CCerror)
	})

	it('Should display the correct error message when CraftyClicks succeeds and returns an empty object', function () {
		wrapper = mount(<NewAddressForm isFetchingAddresses />, { context })
		wrapper.setProps({ addresses: Immutable.Map([]) })
		expect(wrapper.find(Alert).length).to.equal(1)
		expect(wrapper.find(Alert).at(0).text()).to.contain(config.errorMessages.CCAddressesEmpty)
	})

	it('Should display the correct error message when we fail to fetch the full address from CraftyClicks', function () {
		wrapper = mount(<NewAddressForm addressFetchError='Iamerror' />, { context })
		expect(wrapper.find(Alert).length).to.equal(1)
		expect(wrapper.find(Alert).at(0).text()).to.contain(config.errorMessages.CCAddressEmpty)
	})

	it('Should display the correct error message when we fail to POST the new address to Customer service', function () {
		wrapper = mount(<NewAddressForm newAddressPostError='Iamerror' />, { context })
		expect(wrapper.find(Alert).length).to.equal(1)
		expect(wrapper.find(Alert).at(0).text()).to.contain(config.errorMessages.PostError)
	})
})
