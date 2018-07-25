import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { mount } from 'enzyme'
import Form from 'Form'

describe('Form', function() {
	let wrapper
	const submitSpy = sinon.stub()

	beforeEach(function() {
		wrapper = mount(<Form onSubmit={submitSpy}>Test</Form>)
	})

	it('should return a <form>', function() {
		expect(wrapper.find('form').length).to.equal(1)
	})

	it('should contain an <input>', function() {
		expect(wrapper.find('input').length).to.equal(1)
	})

	it('should contain a submit <input>', function() {
		expect(wrapper.find('input').props().type).to.equal('submit')
	})

	it('should call the submitHandler function the form is submitted', function() {
		wrapper.find('form').simulate('submit')
		expect(submitSpy).to.have.been.calledOnce
	})
	it('should default to http method post', function() {
		expect(wrapper.find('form').props().method).to.equal('post')
	})
	it('should allow default http method post to be overridden', function() {
		wrapper = mount(<Form onSubmit={submitSpy} method={'get'}>Test</Form>)
		expect(wrapper.find('form').props().method).to.equal('get')
	})
})
