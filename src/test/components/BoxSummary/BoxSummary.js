import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'

import React from 'react'

import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable' // eslint-disable-line no-caps
import BoxSummary from 'BoxSummary/BoxSummary'
import Details from 'BoxSummary/Details'
import Postcode from 'BoxSummary/Postcode'
import DeliverySlot from 'BoxSummary/DeliverySlot'

import { boxSummaryViews } from 'utils/boxSummary'

describe('BoxSummary', function() {
	const recipes = Immutable.Map() // eslint-disable-line new-cap

	it('should ask me to enter my postcode if boxSummaryCurrentView is boxSummaryViews.POSTCODE', function() {
		const wrapper = shallow(<BoxSummary view="desktop" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} boxSummaryCurrentView={boxSummaryViews.POSTCODE} />)
		expect(wrapper.find(Postcode).length).to.equal(1)
		expect(wrapper.find(DeliverySlot).length).to.equal(0)
		expect(wrapper.find(Details).length).to.equal(0)
	})

	it('should ask me to enter my delivery slot if boxSummaryCurrentView is boxSummaryViews.DELIVERY_SLOT', function() {
		const deliveryDays = Immutable.fromJS([
				{ date: '2017-01-01', slots: [] },
		])
		const wrapper = shallow(<BoxSummary view="desktop" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} postcode="W37UN" deliveryDays={deliveryDays} boxSummaryCurrentView={boxSummaryViews.DELIVERY_SLOT} />)
		expect(wrapper.find(Postcode).length).to.equal(0)
		expect(wrapper.find(DeliverySlot).length).to.equal(1)
		expect(wrapper.find(Details).length).to.equal(0)
	})

	it('should show me my basket if boxSummaryCurrentView is boxSummaryViews.DETAILS', function() {
		const wrapper = shallow(<BoxSummary view="desktop" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} postcode="W37UN" slotId="slotId" boxSummaryCurrentView={boxSummaryViews.DETAILS} />)
		expect(wrapper.find(Postcode).length).to.equal(0)
		expect(wrapper.find(DeliverySlot).length).to.equal(0)
		expect(wrapper.find(Details).length).to.equal(1)
	})

	it('should load prices on componentDidMount', function() {
		const loadPrices = sinon.spy()
		const wrapper = mount(
			<BoxSummary
				view="desktop"
				numPortions={2}
				recipes={recipes}
				showDetails={false}
				boxDetailsVisibilityChange={function() {}}
				postcode="W37UN"
				slotId="slotId"
				loadPrices={loadPrices}
			/>
		)

		expect(loadPrices).to.be.calledOnce
	})

	it('should load prices when one of the observable props changes', function() {
		const loadPrices = sinon.spy()
		const wrapper = mount(
			<BoxSummary
				view="desktop"
				numPortions={2}
				recipes={recipes}
				showDetails={false}
				boxDetailsVisibilityChange={function() {}}
				postcode="W37UN"
				slotId="slotId"
				loadPrices={loadPrices}
			/>
		)

		expect(loadPrices).to.be.calledOnce

		wrapper.setProps({ date: '2017-10-23' })

		expect(loadPrices).to.be.calledTwice

		wrapper.setProps({ numPortions: 4 })

		expect(loadPrices.callCount).to.be.equal(3)

		wrapper.setProps({ orderId: '4' })

		expect(loadPrices.callCount).to.be.equal(4)

		wrapper.setProps({ recipes: Immutable.Map({ 1: 123 }) })

		expect(loadPrices.callCount).to.be.equal(5)

		wrapper.setProps({ date: '2017-10-21', numPortions: 2, orderId: '3', recipes: Immutable.Map({ 2: 43 }) })

		expect(loadPrices.callCount).to.be.equal(6)
	})
})
