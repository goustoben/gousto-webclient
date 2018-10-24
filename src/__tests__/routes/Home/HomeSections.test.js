import React from 'react'
import { shallow } from 'enzyme'

import HomeSections from 'routes/Home/HomeSections'

let wrapper
describe('rendered output', () => {
	test('should render only specified modules', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'recipes']} />)
		expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
		expect(wrapper.find('Connect(Carousel)')).toHaveLength(1)
		expect(
			wrapper
				.find('span')
				.first()
				.children(),
		).toHaveLength(2)
	})

	test('should have a Hero element', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'recipes']} />)
		expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
	})
	test('should have a Carousel element', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'recipes']}/>)
		expect(wrapper.find('Connect(Carousel)')).toHaveLength(1)
	})
	test('should have a Testimonials element', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'testimonials']} />)
		expect(wrapper.find('Connect(Testimonials)')).toHaveLength(1)
	})
	test('should have a InYourBox element', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'whatsInYourBox']} />)
		expect(wrapper.find('Connect(InYourBox)')).toHaveLength(1)
	})
	test('should have a TestedLoved element', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'testedAndLovedBy']}/>)
		expect(wrapper.find('TestedLoved')).toHaveLength(1)
	})

	test('should not have a Storystream element', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'whatsInYourBox']}/>)
		expect(wrapper.find('Storystream')).toHaveLength(0)
	})

	test('should show only specified modules from the modules props', () => {
		wrapper = shallow(<HomeSections modules={['hero', 'testimonials']} />)
		expect(wrapper.find('Connect(Hero)')).toHaveLength(1)
		expect(wrapper.find('Connect(Testimonials)')).toHaveLength(1)
		expect(wrapper.find('Connect(InYourBox)')).toHaveLength(0)
		expect(wrapper.find('TestedLoved')).toHaveLength(0)
	})
})
