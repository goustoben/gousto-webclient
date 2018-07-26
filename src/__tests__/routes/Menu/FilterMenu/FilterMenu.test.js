import React from 'react'
import { shallow } from 'enzyme'

import FilterMenu from 'routes/Menu/FilterMenu/FilterMenu'
import FilterButton from 'routes/Menu/FilterMenu/FilterButton'

describe('<FilterMenu />', () => {
	let wrapper

	describe('close button', () => {
		test('should dispatch a filterMenuClose action on click', () => {
			const filterMenuClose = jest.fn()
			wrapper = shallow(<FilterMenu filterMenuClose={filterMenuClose} />)
			wrapper.find('span').first().simulate('click')

			expect(filterMenuClose).toHaveBeenCalled()
		})
	})

	describe('filter button', () => {
		test('should dispatch a menuFiltersVisibilityChange action on click', () => {
			const filterMenuApply = jest.fn()
			wrapper = shallow(<FilterMenu filterMenuApply={filterMenuApply} />)
			wrapper.find(FilterButton).first().simulate('click')

			expect(filterMenuApply).toHaveBeenCalledTimes(1)
		})
	})
})
