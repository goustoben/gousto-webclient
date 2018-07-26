import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Guide from 'components/Guide'
import HowItWorksOriginal from 'routes/Home/HowItWorks/HowItWorks'
const HowItWorks = require('inject-loader?config/home!routes/Home/HowItWorks/HowItWorks')({
	'config/home': {
		howItWorks: {
			steps: (numRecipes) => [
				{
					image: require('media/photos/quality.jpg'), // eslint-disable-line global-require
					title: 'Quality',
					description: 'Fresh ingredients, so you feel confident about every bite.',
				},
				{
					image: require('media/photos/simplicity.jpg'), // eslint-disable-line global-require
					title: 'Simplicity',
					description: 'Foolproof recipes, so anyone can cook a delicious meal. (Really.)',
				},
				{
					image: require('media/photos/variety.jpg'), // eslint-disable-line global-require
					title: 'Variety',
					description: 'Choose what you like: wholesome, adventurous, vegetarian, meat, fish.',
				},
			]
		},
	},
}).default

describe('HowItWorks', function () {
	let wrapper

	beforeEach(function() {
		wrapper = shallow(<HowItWorksOriginal />)
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
		const wrapper = shallow(<HowItWorks />)
		expect(wrapper.instance().props.steps()).to.have.length(3)
	})
})
