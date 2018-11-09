import React from 'react'
import { shallow } from 'enzyme'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Login from 'Login/Login'
import TextInput from 'Form/Input'
import CheckBox from 'Form/CheckBox'
import { Button } from 'goustouicomponents'
import Form from 'Form'

describe('Login', () => {
  let wrapper
  const submitSpy = sinon.spy()
  const invalidSpy = sinon.spy()

  describe('rendering', function() {
    beforeEach(function() {
      wrapper = shallow(<Login />)
    })

    it('should return a <div>', function() {
      expect(wrapper.type()).to.equal('div')
    })

    it('should contain a <Button>', function() {
      expect(wrapper.find(Button).length).to.equal(1)
    })

    it('all <TextInput /> component(s) should have prop "mask"', function () {
      expect(wrapper.find(TextInput).at(0).prop('mask')).to.equal(true)
      expect(wrapper.find(TextInput).at(1).prop('mask')).to.equal(true)
    })

    it('should contain a <Form> if user is not authenticated', function() {
      expect(wrapper.find(Form).length).to.equal(1)
    })

    it('should not contain a <Form> if user is authenticated ', function() {
      const wrapperLocal = shallow(<Login onSubmit={submitSpy} isAuthenticated />)
      expect(wrapperLocal.find(Form).length).to.equal(0)
    })

    it('should contain a <h4>', function() {
      expect(wrapper.find('h4').length).to.equal(1)
    })

    it('should contain a <CheckBox>', function() {
      expect(wrapper.find(CheckBox).length).to.equal(1)
    })

    it('should contain 2 <TextInput>s', () => {
      expect(wrapper.find(TextInput).length).to.equal(2)
    })
  })

  describe('behaviour', function() {
    beforeEach(function() {
      wrapper = shallow(<Login onSubmit={submitSpy} onInvalid={invalidSpy} />)
    })

    it('should call submitHandler function when clicking the submit button', function() {
      wrapper.setState({ emailValid: true, passwordValid: true })
      wrapper.find(Button).simulate('click', { preventDefault: e => e })
      expect(submitSpy).to.have.been.calledOnce
    })
    it('should call onInvalid when clicking the submit button with an invalid email', function() {
      wrapper.setState({ emailValid: false })
      wrapper.find(Button).simulate('click', { preventDefault: e => e })
      expect(invalidSpy).to.have.been.called
    })
    it('should call onInvalid when clicking the submit button with invalid password', function() {
      wrapper.setState({ passwordValid: false })
      wrapper.find(Button).simulate('click', { preventDefault: e => e })
      expect(invalidSpy).to.have.been.called
    })
    it('should call onInvalid when clicking the submit button with invalid email/password', function() {
      wrapper.setState({ emailValid: false, passwordValid: false })
      wrapper.find(Button).simulate('click', { preventDefault: e => e })
      expect(invalidSpy).to.have.been.called
    })
  })
})
