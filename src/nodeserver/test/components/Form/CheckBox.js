import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'

import { CheckBox } from 'Form/CheckBox/CheckBox'

describe('CheckBox', function() {
	let wrapper

	beforeEach(function() {
		wrapper = shallow(<CheckBox label="test" />)
	})

	it('should return a <span>', function() {
		expect(wrapper.type()).to.equal('span')
	})

	it('should contain an <input>', function() {
		expect(wrapper.find('input').length).to.equal(1)
	})

	it('should contain a <label> with 2 <span>', function() {
		const label = wrapper.find('label')
		expect(label.length).to.equal(1)
		expect(label.find('span').length).to.equal(2)
	})

	it('should display correct text given prop "label"', function() {
		wrapper = shallow(<CheckBox label="Test Label" />)
		expect(wrapper.find('label')
			.find('span')
			.last()
			.text()
		).to.equal('Test Label')
	})

	it('should have checkbox type prop for input', function() {
		expect(wrapper.find('input').prop('type')).to.equal('checkbox')
	})

	it('should pass on name to input', function() {
		wrapper = shallow(<CheckBox name="test.name" />)
		expect(wrapper.find('input').prop('name')).to.equal('test.name')
	})

	it('should pass on each item in additionalProps to input', function() {
		const additionalProps = {
			someKey: 1,
			'something-else': false,
			somethingThird: 'string value',
		}
		wrapper = shallow(<CheckBox label="test" additionalProps={additionalProps} />)
		const input = wrapper.find('input')

		expect(input.prop('someKey')).to.equal(1)
		expect(input.prop('something-else')).to.equal(false)
		expect(input.prop('somethingThird')).to.equal('string value')
	})

	it('should default to not be checked', function() {
		expect(wrapper.find('input').prop('checked')).to.equal(undefined)
	})

	it('should populate the checked attribute with the given checked prop', function() {
		wrapper = shallow(<CheckBox label="test" checked />)
		expect(wrapper.find('input').prop('checked')).to.equal(true)
	})

	it('should default to not required', function() {
		expect(wrapper.find('input').prop('required')).to.equal(undefined)
	})

	it('should populate the required attribute with the given required prop', function() {
		wrapper = shallow(<CheckBox label="test" required />)
		expect(wrapper.find('input').prop('required')).not.to.equal(undefined)
	})

	it('should default to not disabled', function() {
		expect(wrapper.find('input').prop('disabled')).to.equal(undefined)
	})

	it('should populate the disabled attribute with the given disabled prop', function() {
		wrapper = shallow(<CheckBox label="test" disabled />)
		expect(wrapper.find('input').prop('disabled')).not.to.equal(undefined)
	})

	it('should call the onChange prop function when the value is changed', function() {
		const onChangeSpy = sinon.spy()
		wrapper = shallow(<CheckBox onChange={onChangeSpy} label="test" />)
		wrapper.find('input').simulate('change', { target: { checked: true } })
		expect(onChangeSpy).to.have.been.calledOnce
		expect(onChangeSpy.getCall(0).args[0]).to.equal(true)
	})
})
