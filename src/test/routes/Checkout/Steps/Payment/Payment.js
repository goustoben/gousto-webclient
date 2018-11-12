import chai, { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Immutable from 'immutable'
import sinonChai from 'sinon-chai'
import { stubComponent } from 'utils/testHelper'
import { FormSection, Field } from 'redux-form'
chai.use(sinonChai)
import React from 'react'

import Svg from 'Svg'
import Payment from 'routes/Checkout/Components/Payment/Payment'
import PaymentSecurityCode from 'routes/Checkout/Components/Payment/PaymentSecurityCode'
import PaymentExpiryDate from 'routes/Checkout/Components/Payment/PaymentExpiryDate'

describe('Payment', function() {
  let wrapper
  let checkoutStepValidation
  let checkoutPayment
  let sandbox

  beforeEach(function() {
    checkoutStepValidation = sinon.spy()
    checkoutPayment = sinon.spy()
    wrapper = shallow(<Payment />)
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return div', function() {
    expect(wrapper.type()).to.equal('div')
  })

  describe('rendering', function() {
    beforeEach(function() {
      checkoutStepValidation = sinon.spy()
      checkoutPayment = sinon.spy()

      wrapper = shallow(<Payment
        checkoutStepValidation={checkoutStepValidation}
        checkoutPayment={checkoutPayment}
      />)
    })
    it('should render 1 <FormSection> component(s)', function() {
      expect(wrapper.find(FormSection)).to.have.length(1)
    })
    it('should render 1 <PaymentSecurityCode> component(s)', function() {
      expect(wrapper.find(PaymentSecurityCode)).to.have.length(1)
    })
    it('should render 1 <PaymentExpiryDate> component(s)', function() {
      expect(wrapper.find(PaymentExpiryDate)).to.have.length(1)
    })
    it('should render 3 <Svg> component(s)', function() {
      expect(wrapper.find(Svg)).to.have.length(3)
    })
  })

  describe('Sensitive data masking', function() {
    it('all payment <Field /> component(s) should have prop "mask"', function () {
      expect(wrapper.find(Field).at(0).prop('mask')).to.equal(true)
      expect(wrapper.find(Field).at(1).prop('mask')).to.equal(true)
      expect(wrapper.find(Field).at(2).prop('mask')).to.equal(true)
    })
  })

  describe('Life cycle events', function() {

    let stubber
    let changeSpy
    let untouchSpy
    let checkoutBillingAddressToggleSpy
    let checkoutBillingAddressesRecieveSpy
    let setSubmitErrorSpy
    beforeEach(() => {
      stubber = stubComponent(sandbox)

      stubber(Field, {
        render: () => <span></span>
      })
      stubber(FormSection, {
        render: () => <span></span>
      })

      changeSpy = sandbox.spy()
      untouchSpy = sandbox.spy()
      checkoutBillingAddressToggleSpy = sandbox.spy()
      checkoutBillingAddressesRecieveSpy = sandbox.spy()
      setSubmitErrorSpy = sandbox.spy()

      const context = {
        store: {
          getState: sandbox.spy(),
        },
        _reduxForm: {}
      }

      wrapper = mount(
				<Payment
				  form="checkout"
				  formSection="payment"
				  change={changeSpy}
				  untouch={untouchSpy}
				  checkoutBillingAddressToggle={checkoutBillingAddressToggleSpy}
				  checkoutBillingAddressesRecieve={checkoutBillingAddressesRecieveSpy}
				  setSubmitError={setSubmitErrorSpy}
				  nextStepName={null}
				/>, {
				  context,
				  childContextTypes: context
				})
    })

    it('should clear sensitive information when componentDidMount', function() {
      const clearFields = ['cardName', 'cardType', 'cardNumber', 'cv2', 'cardExpiryMonth', 'cardExpiryYear']
      clearFields.forEach(field => {
        const fieldName = `payment.${field}`
        expect(changeSpy).to.be.calledWith('checkout', fieldName, '')
        expect(untouchSpy).to.be.calledWith('checkout', fieldName)
      })
    })
  })

  describe('Behaviour', () => {

    let wrapper
    let checkoutBillingAddressToggleSpy
    let checkoutBillingAddressesRecieveSpy
    let setSubmitErrorSpy
    beforeEach(() => {
      checkoutBillingAddressToggleSpy = sandbox.spy()
      checkoutBillingAddressesRecieveSpy = sandbox.spy()
      setSubmitErrorSpy = sandbox.spy()

      wrapper = shallow(
				<Payment
				  checkoutBillingAddressToggle={checkoutBillingAddressToggleSpy}
				  checkoutBillingAddressesRecieve={checkoutBillingAddressesRecieveSpy}
				  setSubmitError={setSubmitErrorSpy}
				/>
      )
    })

    it('should toggle delivery address')

    it('handle card number updates')

    it('handle submit prop')
  })
})
