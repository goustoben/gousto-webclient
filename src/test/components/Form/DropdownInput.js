import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import Select from 'react-select'
import { DropdownInput } from 'Form/Dropdown/DropdownInput'

describe('DropdownInput', function() {
	let wrapper

	const mutableOptions = [
		{ label: 'hi', subLabel: ' - £1.99', value: 1432, disabled: true },
		{ label: '2hi', subLabel: ' - Free!', value: 2432 },
		{ label: '3hi', subLabel: ' - £1.99', value: 3432 },
		{ label: '4hi', subLabel: ' - Free!', value: 4432 },
		{ label: '5hi', subLabel: ' - £1.99', value: 5432 },
		{ label: '6hi', subLabel: ' - £1.99', value: 6432 },
	]

	beforeEach(function() {
		wrapper = shallow(<DropdownInput />)
	})

	it('should return a <div>', function() {
		expect(wrapper.type()).to.equal('div')
	})

	it('should contain a <Select> and a <select>', function() {
		expect(wrapper.find(Select).length).to.equal(1)
		expect(wrapper.find('select').length).to.equal(1)
	})

	it('should pass on each item in additionalProps to select & Select', function() {
		const additionalProps = {
			someKey: 1,
			'something-else': false,
			somethingThird: 'string value',
		}
		wrapper = shallow(<DropdownInput additionalProps={additionalProps} />)
		const select = wrapper.find('select')
		const otherSelect = wrapper.find(Select)

		expect(select.prop('someKey')).to.equal(1)
		expect(select.prop('something-else')).to.equal(false)
		expect(select.prop('somethingThird')).to.equal('string value')
		expect(otherSelect.prop('someKey')).to.equal(1)
		expect(otherSelect.prop('something-else')).to.equal(false)
		expect(otherSelect.prop('somethingThird')).to.equal('string value')
	})

	it('should default to no options', function() {
		expect(wrapper.find(Select).prop('options').length).to.equal(0)
		expect(wrapper.find('select').children().length).to.equal(0)
	})

	it('should default to not required', function() {
		expect(wrapper.find(Select).prop('required')).to.equal(false)
		expect(wrapper.find('select').prop('required')).to.equal(false)
	})

	it('should map through the required prop to both selects', function() {
		wrapper = shallow(<DropdownInput required />)
		expect(wrapper.find(Select).prop('required')).not.to.equal(false)
		expect(wrapper.find('select').prop('required')).not.to.equal(undefined)
	})

	it('should map through the given mutable options to the Selects', function() {
		wrapper = shallow(<DropdownInput options={mutableOptions} />)
		expect(wrapper.find(Select).prop('options').length).to.equal(mutableOptions.length)
		expect(wrapper.find('select').children().length).to.equal(mutableOptions.length)
	})

	it('should call the onChange function if the mutable option is changed', function() {
		const onChangeSpy = sinon.spy()
		const newValue = mutableOptions[0].value
		wrapper = shallow(<DropdownInput options={mutableOptions} onChange={onChangeSpy} />)
		expect(wrapper.find(Select).prop('options').length).to.equal(mutableOptions.length)
		expect(wrapper.find('select').children().length).to.equal(mutableOptions.length)
		wrapper.find(Select).simulate('change', { value: newValue })
		expect(onChangeSpy).to.have.been.calledOnce
		expect(onChangeSpy.getCall(0).args[0]).to.equal(newValue)
	})

	it('should map through allowed props to the react Select component', function() {
		const somethingRandom = 'someRandomValue'
		wrapper = shallow(<DropdownInput options={mutableOptions} somethingRandom={somethingRandom} />)
		expect(wrapper.find(Select).prop('somethingRandom')).to.equal(somethingRandom)
	})

	it('should not map through disallowed props to the react Select component', function() {
		wrapper = shallow(<DropdownInput options={mutableOptions} color={"blue"} />)
		expect(wrapper.find(Select).prop('color')).to.equal(undefined)
	})

	it('should map through value prop, stringified, to both the native and Select component', function() {
		const value = 4
		wrapper = shallow(<DropdownInput options={mutableOptions} value={value} />)
		expect(JSON.parse(wrapper.find(Select).prop('value'))).to.equal(value)
		expect(JSON.parse(wrapper.find('select').prop('value'))).to.equal(value)
	})

	it('should render fine with null options', function() {
		wrapper = shallow(<DropdownInput options={null} />)
		expect(wrapper.find(Select).length).to.equal(1)
		expect(wrapper.find('select').length).to.equal(1)
	})

	it('should render fine with undefined options', function() {
		wrapper = shallow(<DropdownInput />)
		expect(wrapper.find(Select).length).to.equal(1)
		expect(wrapper.find('select').length).to.equal(1)
	})

	it('should render disabled options as disabled', function() {
		wrapper = shallow(<DropdownInput options={mutableOptions} />)
		expect(wrapper.find('option[disabled]').length).to.equal(1)
	})
})
