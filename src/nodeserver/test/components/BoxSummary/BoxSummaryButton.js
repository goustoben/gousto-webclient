import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Button from 'Button'
import BoxSummaryButton from 'BoxSummary/BoxSummaryButton/BoxSummaryButton'
import CheckoutButton from 'BoxSummary/CheckoutButton'
import Segment from 'Button/Segment'
import { boxSummaryViews } from 'utils/boxSummary'

describe('BoxSummaryButton', function() {
	let openSpy
	beforeEach(function() {
		openSpy = sinon.spy()
	})
	it('should show CheckoutButton if boxSummaryCurrentView is set', function() {
		const wrapper = shallow(<BoxSummaryButton boxSummaryCurrentView={boxSummaryViews.DETAILS} open={openSpy} />)
		expect(wrapper.find(CheckoutButton).length).to.equal(1)
	})

	it('should not show a CheckoutButton if boxSummaryCurrentView is not set', function() {
		const wrapper = shallow(<BoxSummaryButton open={openSpy} />)
		expect(wrapper.find(CheckoutButton).length).to.equal(0)
	})

	it('should show me a next button which opens the box summary if I haven\'t put my postcode or delivery slot in on desktop', function() {
		const wrapper = shallow(<BoxSummaryButton open={openSpy} />)
		expect(wrapper.find(Segment).first().children().first().text()).to.equal('Next')
		wrapper.find(Segment).first().simulate('click')
		expect(openSpy).to.have.been.called
	})

	it('should show CheckoutButton on mobile with the view prop as "mobileNextButton"', function() {
		const wrapper = shallow(<BoxSummaryButton view="mobile" boxSummaryCurrentView={boxSummaryViews.DETAILS} />)
		expect(wrapper.find(CheckoutButton).length).to.equal(1)
		expect(wrapper.find(CheckoutButton).prop('view')).to.equal('mobileNextButton')
	})

	it('should show CheckoutButton on mobile with the view prop as "mobileNextButton"', function() {
		const wrapper = shallow(<BoxSummaryButton view="desktop" boxSummaryCurrentView={boxSummaryViews.DETAILS} />)
		expect(wrapper.find(CheckoutButton).length).to.equal(1)
		expect(wrapper.find(CheckoutButton).prop('view')).to.equal('desktopNextButton')
	})

	it('should show a pending Button if checkoutPending prop is set to true', function() {
		const wrapper = shallow(<BoxSummaryButton view="desktop" boxSummaryCurrentView={boxSummaryViews.DETAILS} checkoutPending />)
		expect(wrapper.find(Button).prop('pending')).to.equal(true)
	})

	it('should show a not pending Button if checkoutPending prop is set to false', function() {
		const wrapper = shallow(<BoxSummaryButton view="desktop" boxSummaryCurrentView={boxSummaryViews.DETAILS} />)
		expect(wrapper.find(Button).prop('pending')).to.equal(false)
	})
	it('should disable the checkout button if the number of ok recipes is < min number', function() {
		const okRecipesMock = () => 10
		const basketSumMock = () => 10

		const BoxSummaryButton = require('inject-loader?utils/basket&config/basket!BoxSummary/BoxSummaryButton/BoxSummaryButton')({
			'utils/basket': {
				basketSum: basketSumMock,
				okRecipes: okRecipesMock,
			},
			'config/basket': {
				minRecipesNum: 900,
			},
		}).default
		const wrapper = shallow(<BoxSummaryButton view="desktop" boxSummaryCurrentView={boxSummaryViews.DETAILS} />)
		expect(wrapper.find(Button).prop('disabled')).to.equal(true)
	})

	it('should enable the checkout button if the number of ok recipes is > min number', function() {
		const okRecipesMock = () => 1000
		const basketSumMock = () => 1000

		const BoxSummaryButton = require('inject-loader?utils/basket&config/basket!BoxSummary/BoxSummaryButton/BoxSummaryButton')({
			'utils/basket': {
				basketSum: basketSumMock,
				okRecipes: okRecipesMock,
			},
			'config/basket': {
				minRecipesNum: 10,
			},
		}).default
		const wrapper = shallow(<BoxSummaryButton view="desktop" boxSummaryCurrentView={boxSummaryViews.DETAILS} checkoutPending={false} />)
		expect(wrapper.find(Button).prop('disabled')).to.equal(false)
	})

	it('should disable the checkout button if the checkoutPending prop is true', function() {
		const okRecipesMock = () => 10
		const basketSumMock = () => 10

		const BoxSummaryButton = require('inject-loader?utils/basket&config/basket!BoxSummary/BoxSummaryButton/BoxSummaryButton')({
			'utils/basket': {
				basketSum: basketSumMock,
				okRecipes: okRecipesMock,
			},
			'config/basket': {
				minRecipesNum: 1,
			},
		}).default
		const wrapper = shallow(<BoxSummaryButton view="desktop" boxSummaryCurrentView={boxSummaryViews.DETAILS} checkoutPending />)
		expect(wrapper.find(Button).prop('disabled')).to.equal(true)
	})

	describe('with pricingPending', function() {
		let wrapper

		it('should show the Button as not pending by default', function() {
			wrapper = shallow(<BoxSummaryButton />)

			expect(wrapper.find(Button).prop('pending')).to.equal.false
		})

		it('should show the Button as pending when set to true', function() {
			wrapper = shallow(<BoxSummaryButton pricingPending />)

			expect(wrapper.find(Button).prop('pending')).to.equal.true
		})

		it('should show the Button as pending in the Details View when set to true', function() {
			wrapper = shallow(<BoxSummaryButton pricingPending view={boxSummaryViews.DETAILS} />)

			expect(wrapper.find(Button).prop('pending')).to.equal.true
		})
	})
})
