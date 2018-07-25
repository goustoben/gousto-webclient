import React from 'react'

import { shallow } from 'enzyme'

import Spinner from 'Spinner'
import css from 'Spinner/Spinner.css'

describe('<Spinner />', () => {
	let wrapper

	test('should render by default', () => {
		wrapper = shallow(<Spinner />)

		expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
	})

	test("should pass it's given color as a class", () => {
		const colors = ['white', 'black', 'bluecheese']

		for (const color of colors) {
			wrapper = shallow(<Spinner color={color} />)

			expect(wrapper.find(`.${css[color]}`).length).toBeGreaterThanOrEqual(1)
		}
	})
})
