import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import config from 'config/checkout'
import { Button } from 'goustouicomponents'
import Input from 'Form/Input'

import BillingForm from 'ExpiredBillingModal/BillingForm/BillingForm.js'
import css from 'ExpiredBillingModal/BillingForm/BillingForm.css'

describe('BillingForm Render', function() {
	let wrapper

	beforeEach(function() {
		wrapper = shallow(<BillingForm />)
	})

	it('should return all the relevant input fields + titles', function() {
		let className = `.${css.inputTitle.split(' ').join('.')}`
		expect(wrapper.find(className).at(0).text()).contains('Name')
		expect(wrapper.find('formCardName').first()).length(1)
		className = `.${css.inputTitle.split(' ').join('.')}`
		expect(wrapper.find(className).at(1).text()).contains('Card number')
		expect(wrapper.find('formCardNumber').first()).length(1)
		className = `.${css.inputTitle.split(' ').join('.')}`
		expect(wrapper.find(className).at(2).text()).contains('Card type')
		expect(wrapper.find('formCardType').first()).length(1)
		className = `.${css.inputTitle.split(' ').join('.')}`
		expect(wrapper.find(className).at(3).text()).contains('Security code')
		expect(wrapper.find('formSecurityCode').first()).length(1)
		className = `.${css.inputTitle.split(' ').join('.')}`
		expect(wrapper.find(className).at(4).text()).contains('Card expiry')
		expect(wrapper.find('cardExpiryMonth').first()).length(1)
		expect(wrapper.find('cardExpiryYear').first()).length(1)
	})

	it('should return all the relevant input fields + titles', function() {
		expect(wrapper.find('icon-Maestro-dark').first()).length(1)
		expect(wrapper.find('icon-MasterCard-dark').first()).length(1)
		expect(wrapper.find('icon-Visa-dark').first()).length(1)
	})

	it('should contain a Button', function() {
		expect(wrapper.find('Button').length).to.equal(1)
	})
})

describe('BillingForm submit button', function() {
	it('should call onSubmitFunction when clicking the button', function() {
		const onSubmitFunctionStub = sinon.stub()
		const wrapper = shallow(<BillingForm submitCardDetails={onSubmitFunctionStub} />)
		wrapper.find(Button).first().simulate('click')
		expect(onSubmitFunctionStub).to.have.been.calledOnce
	})
})

describe('BillingForm validateFormSubmit', function() {
	let wrapper
	beforeEach(function() {
		wrapper = shallow(<BillingForm />)
	})
	it('should return false if a field is missing', function() {
		const formInput = {
			payment_type: 'CARD',
			card_holder: null,
			card_number: '23497563',
			card_type: 'VISA',
			card_cvv2: '123',
			formCardExpiryYear: '',
			formCardExpiryMonth: '',
		}
		const result = BillingForm.validateFormSubmit(formInput)
		expect(result).to.equal(false)
	})

	it('should return false if CVV2 is not 3 characters', function() {
		const formInput = {
			payment_type: 'CARD',
			card_holder: 'Mr Nullington',
			card_number: '23497563',
			card_type: 'VISA',
			card_cvv2: '1',
			formCardExpiryYear: '12',
			formCardExpiryMonth: '33',
		}
		const result = BillingForm.validateFormSubmit(formInput)
		expect(result).to.equal(false)
	})

	it('should return true if all fields are present', function() {
		const formInput = {
			payment_type: 'CARD',
			card_holder: 'Mr Nullington',
			card_number: '23497563',
			card_type: 'VISA',
			card_cvv2: '123',
			formCardExpiryYear: '12',
			formCardExpiryMonth: '33',
		}
		const result = BillingForm.validateFormSubmit(formInput)
		expect(result).to.equal(true)
	})
})

describe('BillingForm validateOnBlur', function() {
	let wrapper
	beforeEach(function() {
		wrapper = shallow(<BillingForm />)
	})
	it('should return true if the value is empty', function() {
		wrapper.instance().validateOnBlur('securityCodeError', null)
		expect(wrapper.state('securityCodeError')).to.equal(true)
	})
	it('should return true if the cardNumberError value is < 9', function() {
		wrapper.instance().validateOnBlur('cardNumberError', '868376')
		expect(wrapper.state('cardNumberError')).to.equal(true)
	})
	it('should return false if the value is not empty (and valid)', function() {
		wrapper.instance().validateOnBlur('cardNumberError', '8632348376')
		expect(wrapper.state('cardNumberError')).to.equal(false)
	})
	it('should return false if the value is not empty (and valid)', function() {
		wrapper.instance().validateOnBlur('cardTypeError', 'VISA')
		expect(wrapper.state('cardTypeError')).to.equal(false)
	})
})

describe('BillingForm handleInputChange', function() {
	let wrapper
	beforeEach(function() {
		wrapper = shallow(<BillingForm />)
	})
	it('should store the value in state against the label given', function() {
		wrapper.instance().handleInputChange('payment_type', 'CARD')
		expect(wrapper.state('payment_type')).to.equal('CARD')
	})
	it('should store the value in state against the label given', function() {
		wrapper.instance().handleInputChange('card_type', 'VISA')
		expect(wrapper.state('card_type')).to.equal('VISA')
	})
	it('should store the value in state against the label given', function() {
		wrapper.instance().handleInputChange('card_cvv2', '123')
		expect(wrapper.state('card_cvv2')).to.equal('123')
	})
	it('should autodetect card_type when card_number is given', function() {
		wrapper.instance().handleInputChange('card_number', '4929 0000 0002 2')
		expect(wrapper.state('card_type')).to.equal('VISA')
	})
	it('should remove non digits when card_number is given', function() {
		wrapper.instance().handleInputChange('card_number', '4929 0000 0002 2')
		expect(wrapper.state('card_number')).to.equal('4929000000022')
	})
	it('should construct card_expires when month and/or year are entered', function() {
		wrapper.instance().handleInputChange('formCardExpiryYear', '11')
		expect(wrapper.state('formCardExpiryYear')).to.equal('11')
		expect(wrapper.state('card_expires')).to.equal('11')
		wrapper.instance().handleInputChange('formCardExpiryMonth', '04')
		expect(wrapper.state('formCardExpiryMonth')).to.equal('04')
		expect(wrapper.state('card_expires')).to.equal('0411')
	})
	it('should construct card_expires when month and/or year are entered', function() {
		wrapper.instance().handleInputChange('formCardExpiryMonth', '11')
		expect(wrapper.state('formCardExpiryMonth')).to.equal('11')
		expect(wrapper.state('card_expires')).to.equal('11')
		wrapper.instance().handleInputChange('formCardExpiryYear', '04')
		expect(wrapper.state('formCardExpiryYear')).to.equal('04')
		expect(wrapper.state('card_expires')).to.equal('1104')
	})
})

describe('BillingForm paymentOptions', function() {
	let wrapper
	beforeEach(function() {
		wrapper = shallow(<BillingForm />)
	})
	it('should process config giving giving the same number of cards as the config file', function() {
		const result = wrapper.instance().paymentOptions()
		expect(result.length).to.equal(config.cardTypeOptions.length)
	})
})

describe('BillingForm input fields', function() {
	it('should call onSubmitFunction when input changes', function() {
		const handleInputChangeStub = sinon.stub(BillingForm.prototype, 'handleInputChange')
		const wrapper = shallow(<BillingForm />)
		wrapper.find(Input).first().simulate('change')
		expect(handleInputChangeStub).to.have.been.calledOnce
	})
	it('should call validateOnBlur onBlur', function() {
		const validateOnBlurStub = sinon.stub(BillingForm.prototype, 'validateOnBlur')
		const wrapper = shallow(<BillingForm />)
		wrapper.find(Input).first().simulate('blur')
		expect(validateOnBlurStub).to.have.been.calledOnce
	})
})
