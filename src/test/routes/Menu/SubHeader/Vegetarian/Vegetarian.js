import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Vegetarian from 'routes/Menu/SubHeader/Vegetarian'

describe('SubHeader', function () {
	it('should return a span', function () {
		const wrapper = shallow(
			<Vegetarian />
		)

		expect(wrapper.type()).to.equal('span')
	})

	it('should call onFilterVegetarianChange with opposite value when clicked', function () {
		const onFilterVegetarianChange = sinon.spy()
		const wrapper = shallow(
			<Vegetarian onFilterVegetarianChange={onFilterVegetarianChange} filterVegetarian />
		)
		wrapper.simulate('click')
		expect(onFilterVegetarianChange.getCall(0).args).to.deep.equal([false])

		wrapper.setProps({ filterVegetarian: false })
		wrapper.simulate('click')
		expect(onFilterVegetarianChange.getCall(1).args).to.deep.equal([true])

		expect(onFilterVegetarianChange).to.have.been.calledTwice
	})
})
