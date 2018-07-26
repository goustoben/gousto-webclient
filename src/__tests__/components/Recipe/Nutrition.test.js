import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import Nutrition from 'Recipe/Detail/Nutrition'

describe('<Nutrition />', () => {
	let perPortion
	let per100Grams
	let wrapper

	beforeEach(() => {
		perPortion = {
			energyKj: 1.111,
			energyKcal: 2.222,
			fat: 3.333,
			fatSaturates: 4.444,
			carbs: 5.555,
			carbsSugars: 6.666,
			fibre: 7.777,
			protein: 8.888,
			salt: 9.999,
		}
		per100Grams = {
			energyKj: 1.111,
			energyKcal: 2.222,
			fat: 3.333,
			fatSaturates: 4.444,
			carbs: 5.555,
			carbsSugars: 6.666,
			fibre: 7.777,
			protein: 8.888,
			salt: 9.999,
		}
		wrapper = shallow(
			<Nutrition perPortion={perPortion} per100Grams={per100Grams} />,
		)
	})

	test('should return a <div>', () => {
		expect(wrapper.type()).toEqual('div')
	})

	test('should have a <table>', () => {
		expect(wrapper.find('table').length).toEqual(1)
	})

	test('should have 7 <tr>', () => {
		expect(wrapper.find('tr').length).toEqual(7)
	})

	test('should have 3 <th>', () => {
		expect(wrapper.find('th').length).toEqual(3)
	})

	test('should have 18 <td>', () => {
		expect(wrapper.find('td').length).toEqual(18)
	})

	test('should have a <thead>', () => {
		expect(wrapper.find('thead').length).toEqual(1)
	})

	test('should have a <tbody>', () => {
		expect(wrapper.find('tbody').length).toEqual(1)
	})

	test('should render calorie information', () => {
		expect(wrapper.text()).toContain(
			'Gousto’s nutritional information only applies to ingredients supplied by Gousto. The cooking process and additional ingredients added at home (listed under “What you’ll need”) will affect total values.',
		)
	})
})
