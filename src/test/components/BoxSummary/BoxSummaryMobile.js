import { shallow, mount } from 'enzyme'
import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { Provider } from 'react-redux'

chai.use(sinonChai)
import Immutable from 'immutable' // eslint-disable-line no-caps
import BoxSummary from 'BoxSummary/BoxSummary'
import BoxSummaryButton from 'BoxSummary/BoxSummaryButton'
import RecipeList from 'BoxSummary/RecipeList'
import Description from 'BoxSummary/Description'
import Overlay from 'Overlay'
import css from 'BoxSummary/BoxSummaryMobile/BoxSummaryMobile.css'
import BrowseCTAButton from 'BoxSummary/BrowseCTAButton'
import BrowseCTA from 'BoxSummary/BrowseCTA'

/* eslint-disable global-require */

describe('BoxSummaryMobile', function() {
	let sandbox
	let store
	let BoxSummaryMobile
	let boxDetailsVisibilityChange
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		boxDetailsVisibilityChange = sandbox.spy()
		store = {
			getState: () => ({
				user: Immutable.Map({}),
				auth: Immutable.Map({}),
				basket: Immutable.Map({}),
				pricing: Immutable.Map({}),
			}),
			subscribe: () => {},
		}
		BoxSummaryMobile = require('inject-loader?&utils/DOMHelper!BoxSummary/BoxSummaryMobile/BoxSummaryMobile')({
			'utils/DOMHelper': {
				getBoundingClientRect: {
					width: 100,
				},
			},
		}).default
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})

	const recipes = Immutable.Map({}) // eslint-disable-line new-cap

	it('should render no BoxSummary components', function() {
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(BoxSummary).length).to.equal(0)
	})

	it('should render 1 BoxSummaryButton components', function() {
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(BoxSummaryButton).length).to.equal(1)
	})

	it('should render 1 <Description /> component', function() {
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(Description).length).to.equal(0)
	})

	it('should render 1 RecipeList components', function() {
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(RecipeList).length).to.equal(1)
	})

	it('should return a div if view is mobile', function() {
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false}  boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.type()).to.equal('div')
	})

	it('should render an Overlay if on mobile', function() {
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" postcode="w3" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(Overlay).length).to.equal(1)
	})

	it('should call the boxDetailsVisibilityChange function prop if clicked on mobile', function() {
		const clickSpy = sandbox.spy()
		const basketRestorePreviousValuesSpy = sandbox.spy()
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={clickSpy}  basketRestorePreviousValues={basketRestorePreviousValuesSpy} />)

		const ButtonWrapper = wrapper.find(`.${css.barmobile.split(' ').join('.')}`)
			.children()
			.first()

		ButtonWrapper.simulate('click', { preventDefault: function() {}, target: { className: '' } })
		expect(clickSpy).to.have.been.called
	})

	it('should have an overlay on mobile which is closed by default', function() {
		const clickSpy = sandbox.spy()
		const basketRestorePreviousValuesSpy = sandbox.spy()
		const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy}  boxDetailsVisibilityChange={clickSpy} />)

		expect(wrapper.find(Overlay).prop('open')).to.equal(false)
	})

	it('should close the overlay on mobile on second click on mobile', function() {
		const clickSpy = sandbox.spy()
		const basketRestorePreviousValuesSpy = sandbox.spy()

		const BoxSummaryMobileWithMock = require('inject-loader?utils/overlayOpen!BoxSummary/BoxSummaryMobile/BoxSummaryMobile')({
			'utils/overlayOpen': () => false,
		}).default

		const wrapper = shallow(<BoxSummaryMobileWithMock date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy}  boxDetailsVisibilityChange={clickSpy} />)

		const ButtonWrapper = wrapper.find(`.${css.barmobile.split(' ').join('.')}`)
			.children()
			.first()

		ButtonWrapper.simulate('click', { preventDefault: function() {}, target: { className: '' } })
		ButtonWrapper.simulate('click', { preventDefault: function() {}, target: { className: '' } })

		expect(wrapper.find(Overlay).prop('open')).to.equal(false)
	})

	it('should map the basketCheckedOut prop through to the BoxSummaryButtons checkoutPending prop', function() {
		const clickSpy = sandbox.spy()
		const basketRestorePreviousValuesSpy = sandbox.spy()
		let wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy}  boxDetailsVisibilityChange={clickSpy} basketCheckedOut />)
		expect(wrapper.find(BoxSummaryButton).prop('checkoutPending')).to.equal(true)

		wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} basketRestorePreviousValues={basketRestorePreviousValuesSpy}  boxDetailsVisibilityChange={clickSpy} showDetails={false} />)
		expect(wrapper.find(BoxSummaryButton).prop('checkoutPending')).to.equal(false)
	})

	it('should render a close button which when clicked closes the BoxSummary', function() {
		const basketRestorePreviousValuesSpy = sandbox.spy()
		const clickSpy = sandbox.spy()

		const BoxSummaryMobileWithMock = require('inject-loader?utils/overlayOpen!BoxSummary/BoxSummaryMobile/BoxSummaryMobile')({
			'utils/overlayOpen': () => true,
		}).default

		const wrapper = shallow(<BoxSummaryMobileWithMock date="2016-06-26" numPortions={2} recipes={recipes} showDetails basketRestorePreviousValues={basketRestorePreviousValuesSpy}  boxDetailsVisibilityChange={clickSpy} basketCheckedOut />)
		wrapper.find('div').at(6).simulate('click')
		expect(basketRestorePreviousValuesSpy.callCount).to.equal(1)
		expect(clickSpy.callCount).to.equal(1)
		expect(clickSpy.getCall(0).args[0]).to.equal(false)
	})

	it('should render BrowseCTAButton and BrowseCTA if no date is selected and the overlay is closed', function() {
		const BoxSummaryMobileWithMock = require('inject-loader?utils/overlayOpen!BoxSummary/BoxSummaryMobile/BoxSummaryMobile')({
			'utils/overlayOpen': () => false,
		}).default
		const wrapper = shallow(<BoxSummaryMobileWithMock date="" numPortions={2} recipes={recipes} showDetails basketRestorePreviousValues={function() {}} boxSummaryUpdateDeliveryDay={function() {}} boxDetailsVisibilityChange={function() {}} showDetails={false} />)
		expect(wrapper.find(BrowseCTAButton).length).to.equal(1)
		expect(wrapper.find(BrowseCTA).length).to.equal(1)
	})

	describe('out of stock', function() {
		it('should NOT call boxDetailsVisibilityChange when hasUnavailableRecipes = false', function() {
			mount(
				<Provider store={store}>
					<BoxSummaryMobile
						date="2016-06-26"
						numPortions={2}
						recipes={recipes}
						showDetails={false}
						hasUnavailableRecipes={false}
						orderSaveError="no-stock"
						boxDetailsVisibilityChange={boxDetailsVisibilityChange}
					/>
				</Provider>
			)

			expect(boxDetailsVisibilityChange).to.have.not.been.called
		})

		it('should NOT call boxDetailsVisibilityChange when there is no stock error msg', function() {
			mount(
				<Provider store={store}>
					<BoxSummaryMobile
						date="2016-06-26"
						numPortions={2}
						recipes={recipes}
						showDetails={false}
						hasUnavailableRecipes
						orderSaveError="some other error message"
						boxDetailsVisibilityChange={boxDetailsVisibilityChange}
					/>
				</Provider>
			)

			expect(boxDetailsVisibilityChange).to.have.not.been.called
		})

		xit('should call boxDetailsVisibilityChange when no-stock and have not ok recipes', function() {
			mount(
				<Provider store={store}>
					<BoxSummaryMobile
						date="2016-06-26"
						numPortions={2}
						recipes={recipes}
						showDetails={false}
						hasUnavailableRecipes
						orderSaveError="no-stock"
						boxDetailsVisibilityChange={boxDetailsVisibilityChange}
					/>
				</Provider>
			)

			expect(boxDetailsVisibilityChange.callCount).to.equal(1)
			expect(boxDetailsVisibilityChange.getCall(0).args).to.deep.equal([true, 'desktop'])
		})
	})
})
