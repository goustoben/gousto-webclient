import React from 'react'

import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'

import CookingTime from 'Recipe/CookingTime'

describe('<CookingTime />', function() {

	it('should return a <div>', function() {
		const wrapper = shallow(<CookingTime time={1} />)
		expect(wrapper.type()).to.equal('div')
	})
	it('should have two span children', function() {
		const wrapper = shallow(<CookingTime time={1} />)
		wrapper.children().forEach(function(node) {
			expect(node.type()).to.equal('span')
		})
	})
})
