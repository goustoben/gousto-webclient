import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Guide from 'components/Guide'
import SubscriptionOriginal from 'routes/Home/Subscription/Subscription'
const Subscription = require('inject-loader?config/home!routes/Home/Subscription/Subscription')({
	'config/home': {
		subscription: {
			steps: (numRecipes) => [
				{
					path: 'icon-choose',
					title: 'You choose',
					description: 'From over 20 recipes a week. You can pause or skip boxes whenever you like.',
				}, {
					path: 'icon-pause',
					title: 'We deliver',
					description: 'Perfectly measured ingredients, any day of the week (to fit in with your life).',
				}, {
					path: 'icon-no-problem',
					title: 'You cook',
					description: 'Tasty, impressive meals you’re proud to share with the people you love.',
				}
			]
		},
	},
}).default

describe('Subscription', function () {
	let wrapper

	beforeEach(function() {
		wrapper = shallow(<SubscriptionOriginal />)
	})

	describe('rendering', function() {

		it('should return a div with no props', function () {
			expect(wrapper.type()).to.equal('div')
		})

		it('should render 1 <Guide> component(s)', function () {
			expect(wrapper.find(Guide).length).to.equal(1)
		})
	})

	it('should have default steps from config', function () {
		const wrapper = shallow(<Subscription />)
		expect(wrapper.instance().props.steps()).to.have.length(3)
	})
})
