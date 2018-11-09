import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow, mount } from 'enzyme'
import CheckoutButton from 'routes/Checkout/Components/CheckoutButton/CheckoutButton'
import { Button } from 'goustouicomponents'

describe('CheckoutButton', function() {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<CheckoutButton />)
  })

  describe('rendering', function() {
    it('should render 1 <Button>', function() {
      expect(wrapper.find(Button).length).to.equal(1)
    })
  })

  describe('when clicked', function() {
    let handleStepChange
    let onClick

    beforeEach(function() {
      handleStepChange = sinon.spy()
      onClick = sinon.spy()
      wrapper = mount(<CheckoutButton checkoutPending={false} onClick={onClick} handleStepChange={handleStepChange} />)
    })

    it('should call onClick', function() {
      wrapper.find('div').forEach(function(node) { node.simulate('click') })
      expect(onClick).to.have.been.called
      expect(handleStepChange).to.have.not.been.called
    })

    it('should do nothing if disabled', function() {
      wrapper = mount(<CheckoutButton checkoutPending onClick={onClick} handleStepChange={handleStepChange} submitting />)
      wrapper.find('div').forEach(function(node) { node.simulate('click') })
      expect(onClick).to.have.not.been.called
      expect(handleStepChange).to.have.not.been.called
    })
  })
})
