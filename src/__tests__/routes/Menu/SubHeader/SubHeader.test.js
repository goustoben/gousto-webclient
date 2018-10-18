import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import SubHeader from 'routes/Menu/SubHeader/SubHeader'
import Vegetarian from 'routes/Menu/SubHeader/Vegetarian'
import InfoToggle from 'routes/Menu/SubHeader/InfoToggle'
import config from 'config/menu'

describe('SubHeader', () => {
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<SubHeader />)
		})

		test('should return a div', () => {
			expect(wrapper.type()).toBe('div')
		})

		test('should have vegetarian filters', () => {
			expect(wrapper.find(Vegetarian)).toHaveLength(2)
		})

		test('should 2 InfoToggles', () => {
			expect(wrapper.find(InfoToggle)).toHaveLength(2)
		})

		test('should render Vegetarian showVegetarianFilter by default', () => {
			expect(wrapper.find(Vegetarian)).toHaveLength(2)
		})

		test('should not render any Vegetarian showVegetarianFilter = false', () => {
			const wrapper = shallow(<SubHeader showVegetarianFilter={false} />)
			expect(wrapper.find(Vegetarian)).toHaveLength(0)
		})
	})

	describe('with the orderRecipesNo prop set to 0', () => {
		test('the h1 should say choose recipes', () => {
			const wrapper = shallow(<SubHeader orderRecipesNo={0} />)
			expect(wrapper.find('h1').text()).toBe('Choose Recipes')
		})
	})

	describe('with the orderRecipesNo prop set to > 0', () => {
		test('the h1 should say edit recipes', () => {
			const wrapper = shallow(<SubHeader orderRecipesNo={1} />)
			expect(wrapper.find('h1').text()).toBe('Edit Recipes')
		})
	})

	describe('notificationBanner', () => {
		let sandbox, clock, notifications

		beforeEach(() => {
			sandbox = sinon.sandbox.create()
			notifications = [
				{
					isAfter: '2017-05-15',
					isBefore: '2017-05-29',
					title: 'Delivery changes for 29th May Bank Holiday',
					line1: 'Our delivery schedule is changing over the Bank Holiday.',
					line2: [
						"If you're expecting a box on Monday 29th May, your delivery will move to Tuesday 30th May.",
					],
					notifyGuests: false,
				},
			]
		})

		afterEach(() => {
			clock.restore()
			sandbox.restore()
		})

		test('should return 2 delivery infotoggles for non loggedin users when notifyGuests is false', () => {
			clock = sinon.useFakeTimers(new Date(2017, 4, 21).getTime())
			sandbox.stub(config, 'notification', notifications)
			const wrapper = shallow(<SubHeader />)
			expect(wrapper.find(InfoToggle).length).toBe(2)
		})

		test('should return 2 delivery infotoggles for authenticated user even when notifyGuests is false', () => {
			clock = sinon.useFakeTimers(new Date(2017, 3, 25).getTime())
			sandbox.stub(config, 'notification', notifications)
			const wrapper = shallow(<SubHeader isAuthenticated />)
			expect(wrapper.find(InfoToggle).length).toBe(2)
		})

		test('should return 2 delivery and 2 notifcation infotoggles for authenticated user even when notifyGuests is false', () => {
			clock = sinon.useFakeTimers(new Date(2017, 4, 25).getTime())
			sandbox.stub(config, 'notification', notifications)
			const wrapper = shallow(<SubHeader isAuthenticated />)
			expect(wrapper.find(InfoToggle).length).toBe(4)
		})

		test('should return 2 delivery and 2 notifcation infotoggles when notifyGuests is true even for non logged in user', () => {
			clock = sinon.useFakeTimers(new Date(2017, 5, 20).getTime())
			notifications.push({
				isAfter: '2017-06-15',
				isBefore: '2017-06-29',
				title: 'Delivery changes for 29th May Bank Holiday',
				line1: 'Our delivery schedule is changing over the Bank Holiday.',
				line2: [
					"If you're expecting a box on Monday 29th May, your delivery will move to Tuesday 30th May.",
				],
				notifyGuests: true,
			})
			sandbox.stub(config, 'notification', notifications)
			const wrapper = shallow(<SubHeader />)
			expect(wrapper.find(InfoToggle).length).toBe(4)
		})
	})
})
