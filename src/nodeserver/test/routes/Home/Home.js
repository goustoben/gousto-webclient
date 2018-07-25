import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { mount, shallow } from 'enzyme'
import Immutable from 'immutable'
import HomeComponent from 'routes/Home/Home'
import HomeSections from 'routes/Home/HomeSections'
import home from 'config/home'
import routes from 'config/routes'

describe('Home', function() {
	let Home
	let menuFetchData
	let store
	let wrapper
	let homeLoadCarouselSpy
	let dispatchSpy
	let promoChangeSpy
	let promoModalSpy
	let queryStringStub
	let loggerStub

	beforeEach(function() {
		dispatchSpy = sinon.spy()
		homeLoadCarouselSpy = sinon.stub().returns('returned from homeLoadCarouselSpy')
		menuFetchData = sinon.spy()
		promoChangeSpy = sinon.stub().returns('returned from promoChangeSpy')
		promoModalSpy = sinon.stub().returns('returned from promoModalSpy')
		queryStringStub = {
			parse: sinon.stub().returns({}),
		}
		loggerStub = {
			warning: sinon.stub(),
		}
		Home = require('inject-loader!routes/Home/Home')({ // eslint-disable-line global-require
			'routes/Menu/fetchData': menuFetchData,
			'./HomeSections': () => <div></div>,
			actions: {
				homeLoadCarousel: homeLoadCarouselSpy,
			},

		}).default
		store = {
			getState: () => ({
				homeCarouselRecipes: Immutable.OrderedMap({
					a: Immutable.fromJS({availability: [], title: "title"}),
					b: Immutable.fromJS({availability: [], title: "title"}),
					c: Immutable.fromJS({availability: [], title: "title"}),
					d: Immutable.fromJS({availability: [], title: "title"}),
					e: Immutable.fromJS({availability: [], title: "title"}),
					f: Immutable.fromJS({availability: [], title: "title"}),
					g: Immutable.fromJS({availability: [], title: "title"}),
					h: Immutable.fromJS({availability: [], title: "title"}),
					i: Immutable.fromJS({availability: [], title: "title"}),
				}),
				persist: { get: () => {} },
				auth: { get: () => {} },
				basket: { get: () => {} },
			}),
			subscribe: () => () => ({}),
			unsubscribe: () => ({}),
			dispatch: dispatchSpy,
		}
	})

	describe('fetchData', function() {
		it('should dispatch the result of a actions.homeLoadCarousel', function() {
			Home.fetchData({ store })
			expect(dispatchSpy).to.have.been.calledOnce
			expect(homeLoadCarouselSpy).to.have.been.calledOnce
			expect(dispatchSpy.getCall(0).args[0]).to.equal('returned from homeLoadCarouselSpy')
		})
	})

	describe('componentDidMount', function() {
		it('should call menu fetch data after 2.5 seconds', function() {
			const clock = sinon.useFakeTimers()
			wrapper = mount(<Home />, { context: { store } })
			expect(menuFetchData).not.to.have.been.called
			clock.tick(3500)
			expect(menuFetchData).to.have.been.calledOnce
			clock.restore()
		})
	})

	describe('componentWillUnmount', function() {
		it('should not call menu fetch data if unmounted within 2.5 seconds', function() {
			const clock = sinon.useFakeTimers()
			wrapper = mount(<Home />, { context: { store } })
			expect(menuFetchData).not.to.have.been.called
			wrapper.unmount()
			clock.tick(3500)
			expect(menuFetchData).not.to.have.been.called
			clock.restore()
		})
	})

	describe('rendered Home sections', function() {
		it('should display default HomeSections component with emailForm when logged-out', function() {
			wrapper = shallow(<HomeComponent isAuthenticated={false} />)
			expect(wrapper.find(HomeSections)).to.have.length(1)
			expect(wrapper.find(HomeSections).prop('modules')).to.be.deep.equal([
				'hero', 'howItWorks', 'subscription', 'recipes',
				'whatsInYourBox', 'emailForm', 'testimonials',
				'testedAndLovedBy',
			])
		})
		it('should display default HomeSections component without emailForm when logged-in', function() {
			wrapper = shallow(<HomeComponent isAuthenticated />)
			expect(wrapper.find(HomeSections)).to.have.length(1)
			expect(wrapper.find(HomeSections).prop('modules')).to.be.deep.equal([
				'hero', 'howItWorks', 'subscription', 'recipes',
				'whatsInYourBox', 'testimonials',
				'testedAndLovedBy',
			])
		})
	})

	describe('cta uri & text passed to HomeSections by default', function() {
		let homeSectionsWrapper
		const expectedCtaUri = routes.client.signup
		const expectedCtaText = home.CTA.main

		beforeEach(function() {
			wrapper = shallow(<HomeComponent />)
			homeSectionsWrapper = wrapper.find(HomeSections)
		})

		it('should pass correct ctaUri & ctaText to testimonials', function() {
			expect(homeSectionsWrapper.prop('testimonials').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('testimonials').ctaText).to.equal(expectedCtaText)
		})

		it('should pass correct ctaUri & ctaText to hero', function() {
			expect(homeSectionsWrapper.prop('hero').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('hero').ctaText).to.equal(expectedCtaText)
		})

		it('should pass correct ctaUri & ctaText to recipes', function() {
			expect(homeSectionsWrapper.prop('recipes').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('recipes').ctaText).to.equal(expectedCtaText)
		})

		it('should pass correct ctaUri & ctaText to whatsInYourBox', function() {
			expect(homeSectionsWrapper.prop('whatsInYourBox').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('whatsInYourBox').ctaText).to.equal(expectedCtaText)
		})
	})

	describe('cta uri & text passed to HomeSections when user is authenticated', function() {
		let homeSectionsWrapper
		const expectedCtaUri = routes.client.menu
		const expectedCtaText = home.CTA.loggedIn.main

		beforeEach(function() {
			wrapper = shallow(<HomeComponent isAuthenticated />)
			homeSectionsWrapper = wrapper.find(HomeSections)
		})

		it('should pass correct ctaUri & ctaText to testimonials', function() {
			expect(homeSectionsWrapper.prop('testimonials').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('testimonials').ctaText).to.equal(expectedCtaText)
		})

		it('should pass correct ctaUri & ctaText to hero', function() {
			expect(homeSectionsWrapper.prop('hero').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('hero').ctaText).to.equal(expectedCtaText)
		})

		it('should pass correct ctaUri & ctaText to recipes', function() {
			expect(homeSectionsWrapper.prop('recipes').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('recipes').ctaText).to.equal(expectedCtaText)
		})

		it('should pass correct ctaUri & ctaText to whatsInYourBox', function() {
			expect(homeSectionsWrapper.prop('whatsInYourBox').ctaUri).to.equal(expectedCtaUri)
			expect(homeSectionsWrapper.prop('whatsInYourBox').ctaText).to.equal(expectedCtaText)
		})
	})
})
