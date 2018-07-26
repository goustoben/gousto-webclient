import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import ReduxFormInput from 'Form/ReduxFormInput'
import Label from 'Form/Label'
import InputError from 'Form/InputError'
import Dropdown from 'Form/Dropdown'
import TextInput from 'Form/Input/TextInput'

describe('ReduxFormInput', function() {
	let wrapper

	it('should return a <div> tag', function() {
		wrapper = shallow(<ReduxFormInput />)
		expect(wrapper.type()).to.equal('div')
	})

	it('should include <Label> if label is provided', function() {
		wrapper = shallow(<ReduxFormInput label="test label" subLabel="test subLabel" />)
		expect(wrapper.find(Label).get(0).props.label).to.equal('test label')
		expect(wrapper.find(Label).get(0).props.subLabel).to.equal('test subLabel')
	})

	it('should include inputPrefix', function() {
		const inputPrefix = <div>prefix</div>
		wrapper = shallow(<ReduxFormInput inputPrefix={inputPrefix} />)
		expect(wrapper.containsMatchingElement(inputPrefix)).to.equal(true)
	})

	it('should include inputSuffix', function() {
		const inputSuffix = <div>suffix</div>
		wrapper = shallow(<ReduxFormInput inputSuffix={inputSuffix} />)
		expect(wrapper.containsMatchingElement(inputSuffix)).to.equal(true)
	})

	it('should show an <InputError> if error is provided', function() {
		const meta = {
			touched: true,
			error: 'invalid name',
		}
		wrapper = shallow(<ReduxFormInput label="test label" subLabel="test subLabel" meta={meta} />)
		expect(wrapper.find(InputError)).to.have.length(1)
	})

	it('should show an <DropDown> if Dropdown is provided', function() {
		wrapper = shallow(<ReduxFormInput inputType="DropDown" />)
		expect(wrapper.find(Dropdown)).to.have.length(1)
	})

	it('should apply onChange, debounced', function() {
		const meta = {
			dispatch: sinon.spy(),
		}

		const input = {
			name: 'test input field',
			onChange: sinon.spy(),
		}

		const clock = sinon.useFakeTimers(new Date(Date.UTC(2016, 12, 26, 8, 30, 50, 0)).getTime())

		wrapper = shallow(<ReduxFormInput meta={meta} input={input} />)
		wrapper.find(TextInput).simulate('change', 'value..')

		clock.tick(3000)

		expect(input.onChange).to.have.been.calledOnce
		expect(meta.dispatch).to.have.been.calledOnce

		clock.restore()
	})

	it('should apply onChange, debounced only when there is a value change', function() {
		const meta = {
			dispatch: sinon.spy(),
		}

		const input = {
			name: 'test input field',
			onChange: sinon.spy(),
		}

		const clock = sinon.useFakeTimers(new Date(Date.UTC(2016, 12, 26, 8, 30, 50, 0)).getTime())

		wrapper = shallow(<ReduxFormInput meta={meta} input={input} />)
		wrapper.find(TextInput).simulate('change')

		clock.tick(3000)

		expect(input.onChange).to.have.been.calledOnce
		expect(meta.dispatch).not.to.have.been.called

		clock.restore()
	})
})
