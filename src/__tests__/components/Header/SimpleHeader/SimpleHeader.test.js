import sinon from 'sinon'

import PromoModal from 'PromoModal'

import React from 'react'
import { shallow } from 'enzyme'

import SimpleHeader from 'Header/SimpleHeader'
import Link from 'Link'
import Svg from 'Svg'

describe('SimpleHeader', () => {
	let wrapper
	beforeEach(() => {
		wrapper = shallow(<SimpleHeader />)
	})

	test('should return a <span>', () => {
		expect(wrapper.type()).toBe('span')
	})

	test('should render 2 <Svg />', () => {
		expect(wrapper.find(Svg)).toHaveLength(2)
	})

	test('should render 1 <header>', () => {
		expect(wrapper.find('header').length).toBe(1)
	})

	describe('with props', () => {
		test('should set anchor href property to "#" if serverError prop is set', () => {
			const wrapper = shallow(<SimpleHeader serverError />)
			expect(
				wrapper
					.find('a')
					.at(0)
					.prop('href'),
			).toBe('#')
		})

		test('should set Link target to "index" if homeUrl prop is set', () => {
			const wrapper = shallow(<SimpleHeader homeUrl="index" />)
			expect(wrapper.find(Link).prop('to')).toBe('index')
		})

		test('should not render the phone number if the noContactBar prop is set', () => {
			wrapper = shallow(<SimpleHeader noContactBar />)
			expect(wrapper.find({ children: 'Free delivery ' })).toHaveLength(0)
		})

		test('should render title if title prop is set', () => {
			const wrapper = shallow(<SimpleHeader title="Aenean enim libero" />)
			expect(wrapper.find({ children: 'Aenean enim libero' })).toHaveLength(1)
		})
	})
})
