import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import ContentMask from 'ContentMask'
import colors from 'styles/colors.css'

describe('ContentMask', function() {
	let wrapper

	it('should return an svg', function() {
		wrapper = shallow(<ContentMask />)
		expect(wrapper.type()).to.equal('svg')
	})

	it('should contain 1 path', function() {
		wrapper = shallow(<ContentMask />)
		expect(wrapper.find('path')).to.have.length(1)
	})

	it('should have style fill set to White from theme colors by default', function() {
		const whiteStub = sinon.stub(colors, 'White').get(function() { return '#FFFFF' })
		wrapper = shallow(<ContentMask />)
		expect(wrapper.prop('style')).to.contain({ fill: '#FFFFF' })
		whiteStub.reset()
	})

	it('should have style fill set to specified color from theme colors if found', function() {
		const otherColorStub = sinon.stub(colors, 'OtherColor').get(function() { return '#GGG' })
		wrapper = shallow(<ContentMask fillColor="OtherColor" />)
		expect(wrapper.prop('style')).to.contain({ fill: '#GGG' })
		otherColorStub.reset()
	})
})
