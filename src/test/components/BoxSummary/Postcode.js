import { shallow, mount } from 'enzyme'
import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Postcode from 'BoxSummary/Postcode/Postcode'
import TextInput from 'Form/Input'
import Form from 'Form'
import DropdownInput from 'Form/Dropdown'
import css from 'BoxSummary/Postcode/Postcode.css'
import Button from 'Button'
import Segment from 'Button/Segment'
import Immutable from 'immutable'

describe('Postcode', function() {
	let wrapper
	let addresses
	let setTempPostcodeSpy

	beforeEach(function() {
		setTempPostcodeSpy = sinon.spy()
		wrapper = shallow(<Postcode setTempPostcode={setTempPostcodeSpy} />)
	})

	it('should return a Form', function() {
		expect(wrapper.type()).to.equal(Form)
	})

	it('should render a TextInput', function() {
		expect(wrapper.find(TextInput).length).to.equal(1)
	})

	it('should render a Button', function() {
		expect(wrapper.find(Button).length).to.equal(1)
	})

	describe('by default', function() {
		it('should ask me to enter my postcode', function() {
			expect(wrapper.find('p').at(2).text()).to.equal('Enter your Postcode:')
		})
		it('should have a secondary colored TextInput', function() {
			expect(wrapper.find(TextInput).prop('color')).to.equal('secondary')
		})
		it('should not change the className of the leading text to be .errorText', function() {
			expect(wrapper.find('p').at(2).prop('className')
				.indexOf(css.errorText)).to.equal(-1)
		})
		it('should not show the button to be pending', function() {
			expect(wrapper.find(Button).prop('pending')).to.equal(false)
		})
		it('should call the boxSummaryNext function prop when the button is clicked', function() {
			const boxSummaryNextSpy = sinon.spy()
			wrapper = shallow(<Postcode tempPostcode="w30df" boxSummaryNext={boxSummaryNextSpy} setTempPostcode={setTempPostcodeSpy} />)
			wrapper.find(Button).simulate('click')
			expect(boxSummaryNextSpy).to.have.been.called
		})
		it('should show "continue" text on the button', function() {
			wrapper = mount(<Postcode setTempPostcode={setTempPostcodeSpy} />)
			expect(wrapper.find(Segment).at(1).text()).to.equal('Continue')
		})
		it('should show the button as disabled', function() {
			expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(true)
		})
		it('should call the boxSummaryNextSpy function prop when the Form is submitted', function() {
			const boxSummaryNextSpy = sinon.spy()
			wrapper = shallow(<Postcode boxSummaryNext={boxSummaryNextSpy} tempPostcode="w30df" setTempPostcode={setTempPostcodeSpy} />)
			wrapper.find(Form).simulate('submit')
			expect(boxSummaryNextSpy).to.have.been.called
		})

		it('should not show the cancel link', function() {
			expect(wrapper.find('a').length).to.equal(0)
		})
	})

	describe('when the deliveryDaysError prop is set', function() {
		beforeEach(function() {
			wrapper = shallow(<Postcode deliveryDaysError setTempPostcode={setTempPostcodeSpy} />)
		})

		it('should show me error text', function() {
			expect(wrapper.find('p').at(2).text()).to.equal('Please enter a valid postcode')
		})
		it('should change the color of the TextInput to be primary', function() {
			expect(wrapper.find(TextInput).prop('color')).to.equal('primary')
		})
		it('should change the className of the error text to be .errorText', function() {
			expect(wrapper.find('p').at(2).prop('className')
				.indexOf(css.errorText)).not.to.equal(-1)
		})
	})

	describe('when the postcodePending prop is set', function() {
		beforeEach(function() {
			wrapper = shallow(<Postcode postcodePending setTempPostcode={setTempPostcodeSpy} />)
		})

		it('should show the button to be pending', function() {
			expect(wrapper.find(Button).prop('pending')).to.equal(true)
		})
	})

	describe('when the prevPostcode prop is set', function() {
		beforeEach(function() {
			wrapper = mount(<Postcode prevPostcode="w30df" setTempPostcode={setTempPostcodeSpy} />)
		})

		it('should show different text on the button', function() {
			expect(wrapper.find(Segment).at(1).text()).to.equal('Show Delivery Slots')
		})

		it('should render a link with "Cancel" in it which calls the basketRestorePreviousValues prop on click', function() {
			const basketRestorePreviousValuesSpy = sinon.spy()
			wrapper = shallow(<Postcode basketRestorePreviousValues={basketRestorePreviousValuesSpy} prevPostcode="w30df" setTempPostcode={setTempPostcodeSpy} />)
			expect(wrapper.find('a').text()).to.equal('Cancel')
			wrapper.find('a').simulate('click')
			expect(basketRestorePreviousValuesSpy).to.have.been.called
		})
	})

	describe('with no postcode', function() {
		beforeEach(function() {
			wrapper = mount(<Postcode setTempPostcode={setTempPostcodeSpy} />)
		})

		it('should disable the button', function() {
			expect(wrapper.find(Button).prop('disabled')).to.equal(true)
		})
	})

	describe('when the addresses prop is set', function() {
		let basketChosenAddressChangeSpy
		beforeEach(function() {
			addresses = Immutable.fromJS([
				{
					id: '321250',
					deleted: false,
					user_id: '77213',
					name: 'Home',
					companyname: '',
					line1: 'Flat 4',
					line2: '67 Cloister Road',
					line3: '',
					town: 'London',
					county: 'Greater London',
					postcode: 'W3 0DF',
					delivery_instructions: 'Front Porch',
					shipping_default: true,
					billing_default: false,
					state: 'valid',
					premium_delivery: true,
				}, {
					id: '325007',
					deleted: false,
					user_id: '77213',
					name: 'work',
					companyname: '',
					line1: 'Unit 2 Issigonis House',
					line2: 'Cowley Road',
					line3: '',
					town: 'London',
					county: 'Greater London',
					postcode: 'W3 7UN',
					delivery_instructions: 'Front Porch',
					shipping_default: false,
					billing_default: false,
					state: 'valid',
					premium_delivery: true,
				}])
			basketChosenAddressChangeSpy = sinon.spy()
			wrapper = shallow(<Postcode addresses={addresses} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
		})

		it('should not show me a textinput', function() {
			expect(wrapper.find(TextInput).length).to.equal(0)
		})

		it('should instead show me a dropdowninput', function() {
			expect(wrapper.find(DropdownInput).length).to.equal(1)
		})

		it('should have a dropdowninput with the addresses mapped to it', function() {
			const actual = wrapper.find(DropdownInput).prop('options')
			const expected = addresses.map(address => ({
				label: `${address.get('name')}, ${address.get('postcode')}`,
				value: address.get('id'),
			})).toArray()
			expect(actual).to.deep.equal(expected)
		})

		it('should call the basketChosenAddressChange on dropdown change', function() {
			const address = addresses.get(1)
			const changePostcodeSpy = sinon.spy()
			const changeAddressSpy = sinon.spy()

			wrapper = shallow(<Postcode addresses={addresses} changePostcode={changePostcodeSpy} basketChosenAddressChange={basketChosenAddressChangeSpy} changeAddress={changeAddressSpy} setTempPostcode={setTempPostcodeSpy} />)
			wrapper.find(DropdownInput).simulate('change', address.get('id'))

			expect(basketChosenAddressChangeSpy.callCount).to.equal(1)
			const changeAddressArgs = basketChosenAddressChangeSpy.getCall(0).args
			expect(changeAddressArgs[0]).to.deep.equal(address)
		})

		it('should have a button which calls the boxSummaryNext', function() {
			const boxSummaryNextSpy = sinon.spy()
			const changePostcodeSpy = sinon.spy()
			const address = addresses.get(1)

			wrapper = shallow(<Postcode addresses={addresses} boxSummaryNext={boxSummaryNextSpy} changePostcode={changePostcodeSpy} chosenAddress={address} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
			wrapper.find(DropdownInput).simulate('change', address.get('id'))
			wrapper.find(Button).simulate('click')

			expect(boxSummaryNextSpy.callCount).to.equal(1)
		})

		it('should enable the continue button when the user has chosen an option', function() {
			const address = addresses.get(1)
			wrapper = shallow(<Postcode addresses={addresses} chosenAddress={address} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
			wrapper.find(DropdownInput).simulate('change', address.get('id'))
			expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(false)
		})

		it('should disable the next button if the chosenAddress prop is not set', function() {
			wrapper = shallow(<Postcode addresses={addresses} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
			expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(true)
		})
	})
})
