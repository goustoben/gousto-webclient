import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import WelcomeCarousel from 'routes/Welcome/WelcomeCarousel'
import SectionHeader from 'SectionHeader'
import Carousel from 'Carousel'
import Image from 'Image'

describe('WelcomeCarousel', () => {
	const wrapper = shallow(<WelcomeCarousel />)

	test('should return article', () => {
		expect(wrapper.type()).toEqual('article')
	})

	test('should display 1 section', () => {
		expect(wrapper.find('section').length).toEqual(1)
	})
})

describe('WelcomeCarousel section', () => {
	const wrapper = shallow(<WelcomeCarousel />)
	const section = wrapper.find('section')

	test('should display 1 SectionHeader', () => {
		expect(section.find(SectionHeader).length).toEqual(1)
	})

	test('should display 1 Carousel', () => {
		expect(section.find(Carousel).length).toEqual(1)
	})
})

describe('WelcomeCarousel SectionHeader', () => {
	const sectionHeader = shallow(<WelcomeCarousel />)
		.find('section')
		.find(SectionHeader)

	test('should have title "Why Gousto"', () => {
		expect(sectionHeader.prop('title')).toEqual('Why Gousto')
	})

	test('should have style "article', () => {
		expect(sectionHeader.prop('type')).toEqual('article')
	})

	test('should have 1 p', () => {
		expect(sectionHeader.find('p').length).toEqual(1)
	})
})

describe('WelcomeCarousel Carousel', () => {
	const carousel = shallow(<WelcomeCarousel />)
		.find('section')
		.find(Carousel)

	test('should have 4 panels', () => {
		expect(carousel.children().length).toEqual(4)
	})

	test('should have 1 Image in each panel', () => {
		expect(carousel.childAt(0).find(Image).length).toEqual(1)
		expect(carousel.childAt(1).find(Image).length).toEqual(1)
		expect(carousel.childAt(2).find(Image).length).toEqual(1)
		expect(carousel.childAt(3).find(Image).length).toEqual(1)
	})

	test('should have 1 p in each panel', () => {
		expect(carousel.childAt(0).find('p').length).toEqual(1)
		expect(carousel.childAt(1).find('p').length).toEqual(1)
		expect(carousel.childAt(2).find('p').length).toEqual(1)
		expect(carousel.childAt(3).find('p').length).toEqual(1)
	})
})
