import React from 'react'
import Image from 'routes/Signup/Image'
import Button from 'routes/Signup/Button'
import TextInput from 'Form/Input'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { shallow } from 'enzyme'
import PostcodeStep from 'routes/Signup/Steps/Postcode/PostcodeStep'
chai.use(sinonChai)

describe('Signup/Steps/Postcode', function() {
  let wrapper
  let tempPostcode
  let postcodePending
  let deliveryDaysError
  let changeTempPostcodeSpy
  let changePostcodeSpy
  let nextStepName

  beforeEach(function() {
    postcodePending = false
    deliveryDaysError = false
    changeTempPostcodeSpy = sinon.spy()
    changePostcodeSpy = sinon.stub().returns(new Promise(resolve => resolve()))
    nextStepName = 3
    tempPostcode = 'w3 0df'

    wrapper = shallow(<PostcodeStep
      tempPostcode={tempPostcode}
      postcodePending={postcodePending}
      deliveryDaysError={deliveryDaysError}
      changeTempPostcode={changeTempPostcodeSpy}
      changePostcode={changePostcodeSpy}
      nextStepName={nextStepName}
    />)
  })

  it('should return a span', function() {
    expect(wrapper.type()).to.equal('span')
  })

  it('should render an image', function() {
    expect(wrapper.find(Image)).to.have.length(1)
  })

  it('should render a TextInput', function() {
    expect(wrapper.find(TextInput)).to.have.length(1)
  })

  it('should render two buttons with a segment each', function() {
    expect(wrapper.find(Button)).to.have.length(2)
  })

  it('should map the tempPostcode prop through to the TextInput', function() {
    expect(wrapper.find(TextInput).prop('value')).to.equal('W3 0DF')
  })

  it('should say "Free delivery available, 7 days a week"', function() {
    expect(wrapper.find('p').text()).to.equal('Free delivery available, 7 days a week')
  })

  it('should call changePostcode with tempPostcode and the nextStepName if either of the buttons are clicked 1/2', function(done) {
    wrapper.find(Button).at(0).simulate('click')
    expect(changePostcodeSpy).to.have.been.calledWith('w3 0df', 3)
    expect(changePostcodeSpy).to.have.been.calledOnce
    done()
  })

  it('should call changePostcode with tempPostcode and the nextStepName if either of the buttons are clicked 2/2', function(done) {
    wrapper.find(Button).at(1).simulate('click')
    expect(changePostcodeSpy).to.have.been.calledWith('w3 0df', 3)
    expect(changePostcodeSpy).to.have.been.calledOnce
    done()
  })

  describe('Props behaviour', function() {
    it("should focus input on desktop when nextStepName - 1 === currentStepName", function () {
      const PostCodeStepA = require('inject-loader!routes/Signup/Steps/Postcode/PostcodeStep')({
        'actual': () => 1025,
      }).default

      const clock = sinon.useFakeTimers()

      const wrapper = shallow(<PostCodeStepA
        tempPostcode={tempPostcode}
        postcodePending={postcodePending}
        deliveryDaysError={deliveryDaysError}
        changeTempPostcode={changeTempPostcodeSpy}
        changePostcode={changePostcodeSpy}
      />)
      expect(wrapper.state('postcodeAutoFocus')).to.be.false
      wrapper.setProps({
        active: true,
      })
      clock.tick( 700 )
      expect(wrapper.state('postcodeAutoFocus')).to.be.true
      clock.restore()
    })
  })

  describe('with a do not deliver error message', function() {
    beforeEach(function() {
      deliveryDaysError = 'do-not-deliver'

      wrapper = shallow(<PostcodeStep
        tempPostcode={tempPostcode}
        postcodePending={postcodePending}
        deliveryDaysError={deliveryDaysError}
        changeTempPostcode={changeTempPostcodeSpy}
        changePostcode={changePostcodeSpy}
        nextStepName={nextStepName}
      />)
    })

    it('should say the human readable error message', function() {
      expect(wrapper.find('p').text()).to.equal('Sorry, it looks like we don\'t currently deliver to your area.')
    })

    describe('Other error messages', function() {
      beforeEach(function() {
        deliveryDaysError = 'error'

        wrapper = shallow(<PostcodeStep
          tempPostcode={tempPostcode}
          postcodePending={postcodePending}
          deliveryDaysError={deliveryDaysError}
          changeTempPostcode={changeTempPostcodeSpy}
          changePostcode={changePostcodeSpy}
          nextStepName={nextStepName}
        />)
      })

      it('should the placeholder message', function() {
        expect(wrapper.find('p').text()).to.equal('Please enter a valid postcode')
      })
    })
  })
})
