import Immutable from 'immutable'

import Svg from 'Svg'

import React from 'react'
import { shallow } from 'enzyme'

import Testimonial from 'routes/Home/Testimonials/TestimonialCarousel/Testimonial'

describe('Home/Testimonials/TestimonialCarousel/Testimonial', () => {
	let wrapper
	let testimonial
	beforeEach(() => {
		testimonial = Immutable.Map({
			author: 'someone',
			title: 'gousto is awesome!',
			body: 'something super positive',
		})
		wrapper = shallow(<Testimonial testimonial={testimonial} />)
	})

	test('should render a div', () => {
		expect(wrapper.type()).toBe('div')
	})

	test('should render an Svg', () => {
		expect(wrapper.find(Svg)).toHaveLength(1)
	})

	test('should render the author, title, and body', () => {
		expect(
			wrapper
				.find('div')
				.at(1)
				.text(),
		).toBe('someone')
		expect(
			wrapper
				.find('div')
				.at(3)
				.text(),
		).toBe('gousto is awesome!')
		expect(
			wrapper
				.find('div')
				.at(4)
				.text(),
		).toBe('something super positive')
	})
})

describe('Testimonial rendering props modifiers', () => {
	let wrapper
	let testimonial
	beforeEach(() => {
		testimonial = Immutable.Map({
			author: 'someone',
			title: 'gousto is awesome!',
			body: 'something super positive',
		})
	})

	test('should not render the link, when showLink is false', () => {
		wrapper = shallow(
			<Testimonial testimonial={testimonial} showLink={false} />,
		)

		expect(
			wrapper
				.find('div')
				.at(3)
				.getElement().props.children[1],
		).toBe('gousto is awesome!')
	})

	test('should render the link, when showLink is true', () => {
		wrapper = shallow(<Testimonial testimonial={testimonial} showLink />)

		expect(
			wrapper
				.find('div')
				.at(3)
				.children()
				.type(),
		).toBe('a')
	})
})
