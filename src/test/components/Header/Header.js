import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow, mount } from 'enzyme'

import MobileMenu from 'Header/MobileMenu'
import Link from 'Link'
import PromoModal from 'PromoModal'
import CancelOrderModal from 'CancelOrderModal'
import ExpiredBillingModal from 'ExpiredBillingModal'
import DuplicateOrderModal from 'DuplicateOrderModal'
import SubscriptionPause from 'routes/Account/Subscription/SubscriptionPause'

describe('Header', function() {
	let Header = require('Header/Header').default

	it('should return a <span>', function() {
		const wrapper = shallow(<Header />)

		expect(wrapper.type()).to.equal('span')
	})

	it('should render one <MobileMenu />', function() {
		const wrapper = shallow(<Header />)

		expect(wrapper.find(MobileMenu)).to.have.length(1)
	})

	it('should render 5 <Link />', function() {
		const wrapper = shallow(<Header />)

		expect(wrapper.find(Link).length).to.equal(4)
	})

	it('should render 4 <Link /> if existing menu path is passed as prop', function() {
		const wrapper = shallow(<Header path="box-prices" />)

		expect(wrapper.find(Link).length).to.equal(3)
	})

	it('should alter homepage link when promocode is provided', function() {
		const promoCode = 'test'
		const wrapper = shallow(<Header promoCodeUrl={promoCode} />)

		expect(wrapper.find(Link).at(0).props().to).to.equal(`/${promoCode}`)
	})

	it('should alter homepage link to /menu when path contains "check-out"', function() {
		const wrapper = shallow(<Header path="check-out" />)

		expect(wrapper.find(Link).at(0).props().to).to.equal('/menu')
	})

	it('should not render a <MobileMenu /> when displaying the simple header', function() {
		const simple = true
		const wrapper = shallow(<Header simple={simple} />)
		expect(wrapper.find(MobileMenu).length).to.equal(0)
	})

	it('should render the JS enabled MobileMenu toggle by default', function() {
		const wrapper = shallow(<Header />)
		expect(wrapper.find('span').at(0).prop('id')).to.equal(null)
	})

	it('should render the fallback MobileMenu toggle if the serverError prop is true', function() {
		const wrapper = shallow(<Header serverError />)
		expect(wrapper.find('span').at(0).prop('id')).to.equal('mobileMenu')
	})

	it('should render referFriend in the menu if authenticated', function() {
		const isAuthenticated = true
		const wrapper = shallow(<Header isAuthenticated={isAuthenticated} />)
		expect(wrapper.find(Link).at(1).childAt(0)
			.text()).to.equal('Free Food')
	})

	it('should render boxPrices in the menu if not authenticated', function() {
		const isAuthenticated = false
		const wrapper = shallow(<Header isAuthenticated={isAuthenticated} />)
		expect(wrapper.find(Link).at(1).childAt(0)
			.text()).to.equal('Box Prices')
	})

	it('should render a PromoModal component', function() {
		const wrapper = shallow(<Header />)
		expect(wrapper.find(PromoModal)).to.have.length(1)
	})

	it('should render a CancelOrderModal component', function() {
		const wrapper = shallow(<Header />)
		expect(wrapper.find(CancelOrderModal)).to.have.length(1)
	})

	it('should render a ExpiredBillingModal component', function() {
		const wrapper = shallow(<Header />)
		expect(wrapper.find(ExpiredBillingModal)).to.have.length(1)
	})

	it('should render a DuplicateOrderModal component', function() {
		const wrapper = shallow(<Header />)
		expect(wrapper.find(DuplicateOrderModal)).to.have.length(1)
	})

	it('should render a SubscriptionPause component', function() {
		const wrapper = shallow(<Header />)
		expect(wrapper.find(SubscriptionPause)).to.have.length(1)
	})

	it('should not render the phone number if the noContactBar prop is set', function() {
		Header = require('inject-loader!Header/Header')({
			PromoModal: () => <span />,
			DuplicateOrderModal: () => <span />,
			CancelOrderModal: () => <span />,
			ExpiredBillingModal: () => <span />,
			'routes/Account/Subscription/SubscriptionPause': () => <span />,
		}).default

		const wrapper = shallow(<Header noContactBar />)
		expect(wrapper.html().includes('Free delivery')).to.equal(false)
	})

	describe('using the inject loader & mount', function() {
		it('should include the phone number', function() {
			const NewHeader = require('inject-loader!Header/Header')({
				PromoModal: () => <span />,
				DuplicateOrderModal: () => <span />,
				CancelOrderModal: () => <span />,
				ExpiredBillingModal: () => <span />,
				'routes/Account/Subscription/SubscriptionPause': () => <span />,
				config: {
					routes: {
						client: {
							blog: '/MOCK-blog',
							boxPrices: '/MOCK-box-prices',

							checkout: '/MOCK-checkout',
							contact: '/MOCK-contact',
							cookbook: '/MOCK-cookbook',

							help: '/MOCK-help',

							home: '/MOCK-',
							home2: '/MOCK-home',

							jobs: '/MOCK-jobs',
							join: '/MOCK-join',

							login: '/MOCK-login',
							logout: '/MOCK-logout',
							menu: '/MOCK-menu',

							myGousto: '/MOCK-my-gousto',

							nwr: '/MOCK-next-weeks-recipes',

							ourSuppliers: '/MOCK-our-suppliers',

							privacyPolicy: '/MOCK-privacy-statement',

							resetForm: '/MOCK-resetform',

							welcome: '/MOCK-welcome-to-gousto-2',

							orderSummary: '/MOCK-order/:orderId/summary',

							termsAndConditions: '/MOCK-terms-and-conditions',
							termsOfUse: '/MOCK-terms-of-use',
							twr: '/MOCK-this-weeks-recipes',

							weCare: '/MOCK-we-care',

							referFriend: '/MOCK-my-referrals',
						},
					},

					company: {
						telephone: {
							number: 'MOCK-123456677889',
						},
					},
				},
			}).default

			const wrapper = mount(<NewHeader />)

			expect(wrapper.debug()).to.contain('MOCK-123456677889')
		})
	})
})
