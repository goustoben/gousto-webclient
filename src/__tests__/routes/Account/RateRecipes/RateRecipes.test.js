import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import RateRecipes from 'routes/Account/RateRecipes/RateRecipes'

describe('RateRecipes', () => {
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<RateRecipes />)
		})

		test('should render a <div> with no props', () => {
			expect(wrapper.type()).toEqual('div')
		})
	})
})
