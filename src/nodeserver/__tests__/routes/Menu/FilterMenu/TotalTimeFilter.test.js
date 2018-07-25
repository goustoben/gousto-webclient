import React from 'react'
import { shallow } from 'enzyme'

import TotalTimeFilter from 'routes/Menu/FilterMenu/TotalTimeFilter/TotalTimeFilter'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'
import config from 'config'

describe('<TotalTimeFilter />', () => {
	let wrapper
	const totalTimeFilters = config.recipes.totalTime
	let totalTimeSelected = '0'
	test('should display a FilterItem for each diet type passed', () => {
		wrapper = shallow(<TotalTimeFilter totalTimeFilters={totalTimeFilters} totalTimeSelected={totalTimeSelected} />)

		expect(wrapper.find(FilterItem)).toHaveLength(Object.keys(totalTimeFilters).length)
	})

	test('should dispatch a filterCurrentDietTypesAdd when clicked', () => {
		const filterCurrentTotalTimeChange = jest.fn()

		wrapper = shallow(<TotalTimeFilter
			totalTimeFilters={totalTimeFilters}
			totalTimeSelected={totalTimeSelected}
			filterCurrentTotalTimeChange={filterCurrentTotalTimeChange}
		/>)

		wrapper.find(FilterItem).first().simulate('click')

		expect(filterCurrentTotalTimeChange).toHaveBeenCalledWith('0')
	})
})
