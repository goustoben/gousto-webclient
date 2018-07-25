import React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import TenToTableBanner from 'routes/Menu/TenToTableBanner'
import FineDineInBanner from 'routes/Menu/FineDineInBanner'
import BoostAndBalanceBanner from 'routes/Menu/BoostAndBalanceBanner'

const startDate = '2018-03-13T12:00:00'
const Banner = require('inject-loader?config/menu!routes/Menu/Banner')({
	'config/menu': {
		tenToTableBanner: { startDate },
	},
}).default

describe('<Banner />', function() {
	let wrapper
	let clock

	describe('when not past the cutoff date', function() {
		beforeEach(function() {
			clock = sinon.useFakeTimers(new Date('2018-03-12T12:00:00'))
		})

		afterEach(function() {
			clock.restore()
		})

		it('should render a BoostAndBalanceBanner by default', function() {
			wrapper = shallow(<Banner />)

			expect(wrapper.find(BoostAndBalanceBanner).length).to.be.one
		})

		it('should render a FineDineInBanner when logged in', function() {
			wrapper = shallow(<Banner isAuthenticated />)

			expect(wrapper.find(FineDineInBanner).length).to.be.one
		})
	})

	describe('when past the cutoff date', function() {
		beforeEach(function() {
			clock = sinon.useFakeTimers(new Date('2018-03-14T12:00:00'))
		})

		afterEach(function() {
			clock.restore()
		})

		it('should render a TenToTableBanner', function() {
			wrapper = shallow(<Banner />)

			expect(wrapper.find(TenToTableBanner).length).to.be.one
		})

		it('should render a TenToTableBanner when logged in', function() {
			wrapper = shallow(<Banner isAuthenticated />)

			expect(wrapper.find(TenToTableBanner).length).to.be.one
		})
	})
})
