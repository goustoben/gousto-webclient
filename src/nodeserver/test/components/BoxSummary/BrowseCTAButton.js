import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Button from 'Button'
import Segment from 'Button/Segment'
import BrowseCTAButton from 'BoxSummary/BrowseCTAButton/BrowseCTAButton'

describe('BrowseCTAButton', function() {
	let boxSummaryShow, boxDetailsVisibilityChange, menuBrowseCTAVisibilityChange
	const view = 'desktop'

	beforeEach(function() {
		boxDetailsVisibilityChange = sinon.stub().returns(function() {})
		menuBrowseCTAVisibilityChange = sinon.stub().returns(function() {})
	})

	it('should return a div', function() {
		const wrapper = shallow(
			<BrowseCTAButton
				boxSummaryShow={false}
				boxDetailsVisibilityChange={boxDetailsVisibilityChange}
				menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
				view={view}
			/>
		)

		expect(wrapper.type()).to.equal(Button)
	})

	it('should call boxDetailsVisibilityChange & menuBrowseCTAVisibilityChange when box summary is not shown', function() {
		const wrapper = shallow(
			<BrowseCTAButton
				boxSummaryShow={false}
				boxDetailsVisibilityChange={boxDetailsVisibilityChange}
				menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
				view={view}
			/>
		)
		wrapper.find(Segment).simulate('click')

		expect(menuBrowseCTAVisibilityChange.callCount).to.equal(1)
		expect(menuBrowseCTAVisibilityChange.getCall(0).args[0]).to.deep.equal(false)

		expect(boxDetailsVisibilityChange.callCount).to.equal(1)
		expect(boxDetailsVisibilityChange.getCall(0).args[0]).to.deep.equal(true)
		expect(boxDetailsVisibilityChange.getCall(0).args[1]).to.deep.equal(view)
	})

	it('should call boxDetailsVisibilityChange with false when box summary is showing', function() {
		const wrapper = shallow(
			<BrowseCTAButton
				boxSummaryShow
				boxDetailsVisibilityChange={boxDetailsVisibilityChange}
				menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
				view={view}
			/>
		)
		wrapper.find(Segment).simulate('click')

		expect(menuBrowseCTAVisibilityChange).to.have.not.been.called

		expect(boxDetailsVisibilityChange.callCount).to.equal(1)
		expect(boxDetailsVisibilityChange.getCall(0).args[0]).to.deep.equal(false)
	})
})
