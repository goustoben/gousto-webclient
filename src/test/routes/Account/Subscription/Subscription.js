import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import config from 'config/routes'

import Link from 'Link'
import LinkButton from 'LinkButton'
import Subscription from 'routes/Account/Subscription/Subscription'
import Introduction from 'routes/Account/Subscription/Introduction'
import Preference from 'routes/Account/Subscription/Preference'

describe('Subscription', function() {
	let wrapper
	let buttonClickSpy

	beforeEach(function() {
		buttonClickSpy = sinon.spy()
		wrapper = shallow(<Subscription startSubscriptionPause={buttonClickSpy} />)
	})

	describe('rendering', function() {
		it('should render a <div>', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should render one <Introduction> component', function() {
			expect(wrapper.find(Introduction).length).to.equal(1)
		})

		it('should render one <Preference> component', function() {
			expect(wrapper.find(Preference).length).to.equal(1)
		})

		it('should render one <LinkButton> component', function() {
			expect(wrapper.find(LinkButton).length).to.equal(1)
		})

		it('should render one <Link> component', function() {
			expect(wrapper.find(Link).length).to.equal(1)
		})
	})

	describe('SubscriptionPause description', function () {
		it('should link to /my-deliveries', function () {
			expect(wrapper.find(LinkButton).at(0).prop('to')).to.equal(config.client.myDeliveries)
		})

		it('should call pauseSubscription when clicked', function() {
			wrapper.find(Link).at(0).simulate('click')

			expect(buttonClickSpy).to.be.calledOnce
		})
	})
})
