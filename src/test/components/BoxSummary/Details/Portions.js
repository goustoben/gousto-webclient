import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Portions from 'BoxSummary/Details/Portions'
import { Segment } from 'goustouicomponents'

describe('Portions', function() {
	it('should not have filled Segment if portion is not 2 nor 4', function() {
		const wrapper = shallow(<Portions numPortions={0} onNumPortionChange={function() {}} />)

		expect(wrapper.find(Segment).length).to.equal(2)
		expect(wrapper.find(Segment).at(0).prop('fill')).to.equal(false)
		expect(wrapper.find(Segment).at(1).prop('fill')).to.equal(false)
	})

	it('should have filled Segment for the right portion size', function() {
		let wrapper = shallow(<Portions numPortions={4} onNumPortionChange={function() {}} />)

		expect(wrapper.find(Segment).length).to.equal(2)
		expect(wrapper.find(Segment).at(0).prop('fill')).to.equal(false)
		expect(wrapper.find(Segment).at(1).prop('fill')).to.equal(true)

		wrapper = shallow(<Portions numPortions={2} onNumPortionChange={function() {}} />)

		expect(wrapper.find(Segment).length).to.equal(2)
		expect(wrapper.find(Segment).at(0).prop('fill')).to.equal(true)
		expect(wrapper.find(Segment).at(1).prop('fill')).to.equal(false)
	})

	it('should call callback function with right portion number', function() {
		const onClickSpy = sinon.spy()
		const wrapper = shallow(<Portions numPortions={2} onNumPortionChange={onClickSpy} />)

		wrapper.find(Segment).at(0).simulate('click')
		expect(onClickSpy.getCall(0).args[0]).to.equal(2)

		wrapper.find(Segment).at(1).simulate('click')
		expect(onClickSpy.getCall(1).args[0]).to.equal(4)
	})
})
