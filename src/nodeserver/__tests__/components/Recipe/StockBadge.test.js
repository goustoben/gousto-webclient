import React from 'react'

import { shallow } from 'enzyme'

import InfoBadge from 'Recipe/InfoBadge'

import StockBadge from 'Recipe/StockBadge'

describe('<StockBadge />', () => {
	let wrapper

	test('should not render InfoBadge by default', () => {
		wrapper = shallow(<StockBadge />)
		expect(wrapper.find(InfoBadge).length).toEqual(0)
	})

	test('should render when given a stock number', () => {
		wrapper = shallow(<StockBadge stock={1} />)
		expect(wrapper.find(InfoBadge).length).toEqual(1)
	})
})
