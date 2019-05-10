import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import SubmitButton from 'routes/Checkout/Components/Delivery/SubmitButton/SubmitButton'
import ErrorMessage from 'routes/Checkout/Components/ErrorMessage'
import CheckoutButton from 'routes/Checkout/Components/CheckoutButton'

describe('SubmitButton', function() {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<SubmitButton />)
  })

  describe('rendering', function() {
    it('should return div', function() {
      expect(wrapper.type()).to.equal('div')
    })

    it('should render 1 <ErrorMessage> components', function() {
      expect(wrapper.find(ErrorMessage)).to.have.length(1)
    })

    it('should render 1 <CheckoutButton> components', function() {
      wrapper = shallow(<SubmitButton formValues={{ delivery: {
        confirmed: true
      }}}
      />)
      expect(wrapper.find(CheckoutButton)).to.have.length(1)
    })
  })

  describe('Behaviour', function() {
    let manualSubmit
    let onStepChange

    beforeEach(function() {
      manualSubmit = sinon.spy()
      onStepChange = sinon.spy()
    })

    it('should call manualSubmit and onStepChange because form is valid', function() {
      const wrapper = shallow(
        <SubmitButton
          formValues={{ delivery: {
            confirmed: true
          }}}
          manualSubmit={manualSubmit}
          onStepChange={onStepChange}
        />
      )
      wrapper.find(CheckoutButton).simulate('click')
      expect(manualSubmit.callCount).to.equal(1)
      expect(onStepChange.callCount).to.equal(1)
    })

    describe('on mobile', function() {
      it('should call manualSubmit only, checkout form is invalid', function() {
        const wrapper = shallow(
          <SubmitButton
            browser='mobile'
            formValues={{ delivery: {
              confirmed: true
            }}}
            manualSubmit={manualSubmit}
            onStepChange={onStepChange}
            checkoutInvalid
          />
        )
        wrapper.find(CheckoutButton).simulate('click')
        expect(manualSubmit.callCount).to.equal(2)
        expect(manualSubmit.firstCall).to.be.calledWithExactly('checkout')
        expect(manualSubmit.secondCall).to.be.calledWithExactly('checkout-mobile')
        expect(onStepChange.callCount).to.equal(0)
      })

      it('should call manualSubmit only, checkoutMobile form is invalid', function() {
        const wrapper = shallow(
          <SubmitButton
            browser='mobile'
            formValues={{ delivery: {
              confirmed: true
            }}}
            manualSubmit={manualSubmit}
            onStepChange={onStepChange}
            checkoutMobileInvalid
          />
        )
        wrapper.find(CheckoutButton).simulate('click')
        expect(manualSubmit.callCount).to.equal(2)
        expect(manualSubmit.firstCall).to.be.calledWithExactly('checkout')
        expect(manualSubmit.secondCall).to.be.calledWithExactly('checkout-mobile')
        expect(onStepChange.callCount).to.equal(0)
      })

      it('should call manualSubmit and onStepChange, forms are valid', function() {
        const wrapper = shallow(
          <SubmitButton
            browser='mobile'
            formValues={{ delivery: {
              confirmed: true
            }}}
            manualSubmit={manualSubmit}
            onStepChange={onStepChange}
          />
        )
        wrapper.find(CheckoutButton).simulate('click')
        expect(manualSubmit.callCount).to.equal(2)
        expect(manualSubmit.firstCall).to.be.calledWithExactly('checkout')
        expect(manualSubmit.secondCall).to.be.calledWithExactly('checkout-mobile')
        expect(onStepChange.callCount).to.equal(1)
      })
    })

    describe('on desktop', function() {
      it('should call manualSubmit only, form is invalid', function() {
        const wrapper = shallow(
          <SubmitButton
            formValues={{ delivery: {
              confirmed: true
            }}}
            manualSubmit={manualSubmit}
            onStepChange={onStepChange}
            checkoutInvalid
          />
        )
        wrapper.find(CheckoutButton).simulate('click')
        expect(manualSubmit.callCount).to.equal(1)
        expect(manualSubmit.firstCall).to.be.calledWithExactly('checkout')
        expect(onStepChange.callCount).to.equal(0)
      })

      it('should call manualSubmit and onStepChange, form is valid', function() {
        const wrapper = shallow(
          <SubmitButton
            formValues={{ delivery: {
              confirmed: true
            }}}
            manualSubmit={manualSubmit}
            onStepChange={onStepChange}
          />
        )
        wrapper.find(CheckoutButton).simulate('click')
        expect(manualSubmit.callCount).to.equal(1)
        expect(manualSubmit.firstCall).to.be.calledWithExactly('checkout')
        expect(onStepChange.callCount).to.equal(1)
      })
    })
  })
})
