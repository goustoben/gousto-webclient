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
import { Segment, Tooltip } from 'goustouicomponents'
import BrowseCTAButton from 'BoxSummary/BrowseCTAButton'
import BrowseCTA from 'BoxSummary/BrowseCTA'

let BoxSummaryDesktop
let sandbox
describe('BoxSummaryDesktop', function() {

	let store
	let boxDetailsVisibilityChange
	let loadPricesSpy
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		boxDetailsVisibilityChange = sandbox.spy()
		store = {
			getState: () => ({
				address: Immutable.Map({}),
				auth: Immutable.Map({}),
				basket: Immutable.Map({}),
				boxSummaryShow: Immutable.Map({}),
				chosenAddress: Immutable.Map({}),
				error: Immutable.Map({}),
				pending: Immutable.Map({}),
				pricing: Immutable.Map({}),
				temp: Immutable.Map({}),
				user: Immutable.Map({}),
			}),
			subscribe: () => {},
		}
		const okRecipesMock = () => Immutable.Map([['123', 1], ['456', 1]])
		const basketSum = () => 1

		loadPricesSpy = sinon.spy()
		const BoxSummaryContainer = (props) => <BoxSummary loadPrices={loadPricesSpy} {...props} />

		BoxSummaryDesktop = require('inject-loader?&utils/DOMHelper&utils/basket&BoxSummary!BoxSummary/BoxSummaryDesktop/BoxSummaryDesktop')({
			'utils/DOMHelper': {
				getBoundingClientRect: {
					width: 100,
				},
			},
			'utils/basket': {
				okRecipes: okRecipesMock,
				basketSum,
			},
			BoxSummary: BoxSummaryContainer,
		}).default
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	const recipes = Immutable.Map({}) // eslint-disable-line new-cap

	it('should render no BoxSummary components', function() {
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(BoxSummary).length).to.equal(0)
	})

	it('should render 1 BoxSummaryButton components', function() {
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(BoxSummaryButton).length).to.equal(1)
	})

	it('should render 1 RecipeList components', function() {
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(RecipeList).length).to.equal(1)
	})

	it('should return a span if view is desktop', function() {
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.type()).to.equal('div')
	})

	it('should toggle BoxSummary if clicked', function() {
		const clickSpy = sandbox.spy()
		const basketRestorePreviousValuesSpy = sandbox.spy()

		let wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={clickSpy} basketRestorePreviousValues={basketRestorePreviousValuesSpy} />)

		let segment = wrapper.find(Segment).first()

		segment.simulate('click')
		expect(clickSpy).to.be.calledWith(true)

		wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails boxDetailsVisibilityChange={clickSpy} basketRestorePreviousValues={basketRestorePreviousValuesSpy} />)
		segment = wrapper.find(Segment).first()

		segment.simulate('click')
		expect(clickSpy).to.be.calledWith(false)
	})

	it('should restore basket values only if hidden', function() {
		const clickSpy = sandbox.spy()
		const basketRestorePreviousValuesSpy = sandbox.spy()

		let wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} />)

		let segment = wrapper.find(Segment).first()

		segment.simulate('click')

		wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} />)
		segment = wrapper.find(Segment).first()

		segment.simulate('click')
		expect(basketRestorePreviousValuesSpy).to.be.calledOnce
	})

	it('should toggle BoxSummary if clicked', function() {
		const basketRestorePreviousValuesSpy = sandbox.spy()

		let wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={boxDetailsVisibilityChange} basketRestorePreviousValues={basketRestorePreviousValuesSpy} />)

		let segment = wrapper.find(Segment).first()

		segment.simulate('click')
		expect(boxDetailsVisibilityChange).to.be.calledWith(true)

		wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails boxDetailsVisibilityChange={boxDetailsVisibilityChange} basketRestorePreviousValues={basketRestorePreviousValuesSpy} />)
		segment = wrapper.find(Segment).first()

		segment.simulate('click')
		expect(boxDetailsVisibilityChange).to.be.calledWith(false)
	})

	it('should render 1 <Description /> component', function() {
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(Description).length).to.equal(1)
	})

	it('should map the number of ok recipes through to the <Description /> components', function() {
		const okRecipesMock = () => Immutable.Map([['123', 1], ['456', 1]])
		const basketSum = (items) => Array.from(items.values()).reduce((sum, qty) => sum + qty, 0)
		BoxSummaryDesktop = require('inject-loader?utils/basket!BoxSummary/BoxSummaryDesktop/BoxSummaryDesktop')({
			'utils/basket': {
				okRecipes: okRecipesMock,
				basketSum,
			},
		}).default
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} />)
		expect(wrapper.find(Description).length).to.equal(1)
		expect(wrapper.find(Description).at(0).prop('numRecipes')).to.equal(2)
	})

	it('should map the basketCheckedOut prop through to the BoxSummaryButtons checkoutPending prop', function() {
		const clickSpy = sandbox.spy()
		const basketRestorePreviousValuesSpy = sandbox.spy()

		let wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} basketCheckedOut />)
		expect(wrapper.find(BoxSummaryButton).at(0).prop('checkoutPending')).to.equal(true)

		wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} showDetails={false} />)
		expect(wrapper.find(BoxSummaryButton).at(0).prop('checkoutPending')).to.equal(false)
	})

	it('should render a close button which when clicked closes the BoxSummary', function() {
		const basketRestorePreviousValuesSpy = sandbox.spy()
		const clickSpy = sandbox.spy()
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} basketCheckedOut />)
		wrapper.find('div').at(6).simulate('click')
		expect(basketRestorePreviousValuesSpy).to.be.calledOnce
		expect(clickSpy).to.be.calledOnce
		expect(clickSpy).to.be.calledWith(false)
	})

	it('should render BrowseCTAButton and BrowseCTA if no date is selected', function() {
		const wrapper = shallow(<BoxSummaryDesktop date="" numPortions={2} recipes={recipes} showDetails basketRestorePreviousValues={function() {}} boxDetailsVisibilityChange={function() {}} basketCheckedOut />)
		expect(wrapper.find(BrowseCTAButton).length).to.equal(1)
		expect(wrapper.find(BrowseCTA).length).to.equal(1)
	})

	it('with no ok recipes and menuFetchPending prop set to true it should map Description warning as false', function() {
		const wrapper = shallow(<BoxSummaryDesktop date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={function() {}} menuFetchPending />)
		expect(wrapper.find(Description).prop('warning')).to.equal(false)
	})

	describe('out of stock', function() {
		it('should NOT call boxDetailsVisibilityChange when hasUnavailableRecipes = false', function() {
			mount(
				<Provider store={store}>
					<BoxSummaryDesktop
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
					<BoxSummaryDesktop
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
					<BoxSummaryDesktop
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

			expect(boxDetailsVisibilityChange).to.be.calledOnce
			expect(boxDetailsVisibilityChange).to.be.calledWith(true, 'desktop')
		})

		it('should show an error tooltip if an ORDER_SAVE error', () => {
			const wrapper = shallow(<BoxSummaryDesktop
				date="2016-06-26"
				numPortions={2}
				recipes={recipes}
				showDetails={false}
				hasUnavailableRecipes
				orderSaveError="basket-expired"
				boxDetailsVisibilityChange={() => {}}
			/>)
			expect(wrapper.find(Tooltip).prop('visible')).to.equal(true)
		})

		it('should show an error tooltip if an ORDER_SAVE error and dissmiss it after 15s', () => {
			const timer = sandbox.useFakeTimers()
			const wrapper = mount(
				<Provider store={store}>
					<BoxSummaryDesktop
						date="2016-06-26"
						numPortions={2}
						recipes={recipes}
						showDetails={false}
						hasUnavailableRecipes
						orderSaveError="basket-expired"
						boxDetailsVisibilityChange={() => {}}
					/>
				</Provider>
			)
			expect(wrapper.find(Tooltip).prop('visible')).to.equal(true)
			timer.tick(15100)
			expect(wrapper.find(Tooltip).prop('visible')).to.equal(false)
			timer.restore()
		})
	})
})
