import React from 'react'
import { shallow } from 'enzyme'

import ExpectationsCarousel from 'routes/Welcome/ExpectationsCarousel'
import Circle from 'routes/Welcome/ExpectationsCarousel/Circle'
import SectionHeader from 'SectionHeader'
import Carousel from 'Carousel'
import Image from 'Image'

describe('ExpectationsCarousel', () => {
	const wrapper = shallow(<ExpectationsCarousel />)

	test('should return article', () => {
		expect(wrapper.type()).toBe('article')
	})

	test('should display 1 section', () => {
		expect(wrapper.find('section')).toHaveLength(1)
	})
})

describe('ExpectationsCarousel section', () => {
	const wrapper = shallow(<ExpectationsCarousel />)
	const section = wrapper.find('section')

	test('should display 1 SectionHeader', () => {
		expect(section.find(SectionHeader)).toHaveLength(1)
	})

	test('should display 1 Carousel', () => {
		expect(section.find(Carousel)).toHaveLength(1)
	})

	test('should have 1 Image', () => {
		expect(section.find(Image)).toHaveLength(1)
	})
})

describe('ExpectationsCarousel SectionHeader', () => {
	const sectionHeader = shallow(<ExpectationsCarousel />)
		.find('section')
		.find(SectionHeader)

	test('should have title "Here\'s what you\'ll get."', () => {
		expect(sectionHeader.prop('title')).toBe("Here's what you'll get.")
	})

	test('should have type "article"', () => {
		expect(sectionHeader.prop('type')).toBe('article')
	})

	test('should have 1 p', () => {
		expect(sectionHeader.find('p')).toHaveLength(1)
	})
})

describe('ExpectationsCarousel Carousel', () => {
	const carousel = shallow(<ExpectationsCarousel />)
		.find('section')
		.find(Carousel)

	test('should have 5 panels', () => {
		expect(carousel.children()).toHaveLength(5)
	})

	test('should have 1 p in each panel', () => {
		expect(carousel.childAt(0).find('p')).toHaveLength(1)
		expect(carousel.childAt(1).find('p')).toHaveLength(1)
		expect(carousel.childAt(2).find('p')).toHaveLength(1)
		expect(carousel.childAt(3).find('p')).toHaveLength(1)
	})
})

describe('Interactivity with the carousel', () => {
	test('will change slide when clicking on any navigation Circle', () => {
		const expectationCarousel = shallow(<ExpectationsCarousel />)

		expect(expectationCarousel.state('currentSlide')).toBe(0)

		// find third circle navigation
		const thirdNavigationCircle = expectationCarousel.find(Circle).at(2)
		thirdNavigationCircle.simulate('click')

		expect(expectationCarousel.state('currentSlide')).toBe(2)

		const carousel = expectationCarousel.find('section').find(Carousel)

		expect(carousel.prop('slickGoTo')).toBe(2)
	})
})
