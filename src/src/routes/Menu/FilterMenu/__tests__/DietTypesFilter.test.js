import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import DietTypesFilter from 'routes/Menu/FilterMenu/DietTypesFilter/DietTypesFilter'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'
import config from 'config'

describe('<DietTypesFilter />', () => {
  let wrapper
  const dietTypesFilters = config.recipes.dietTypes
  let dietTypes = Immutable.Set([])
  test('should display a FilterItem for each diet type passed', () => {
    wrapper = shallow(<DietTypesFilter dietTypes={dietTypes} dietTypesFilters={dietTypesFilters} />)

    expect(wrapper.find(FilterItem)).toHaveLength(Object.keys(dietTypesFilters).length)
  })

  test('should dispatch a filterCurrentDietTypesAdd when clicked', () => {
    const filterCurrentDietTypesChange = jest.fn()

    wrapper = shallow(<DietTypesFilter
      dietTypes={dietTypes}
      dietTypesFilters={dietTypesFilters}
      filterCurrentDietTypesChange={filterCurrentDietTypesChange}
    />)

    wrapper.find(FilterItem).first().simulate('click')

    expect(filterCurrentDietTypesChange).toHaveBeenCalledWith('meat')
  })
})
