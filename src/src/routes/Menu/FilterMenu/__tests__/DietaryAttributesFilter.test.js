import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import FilterItem from 'routes/Menu/FilterMenu/FilterItem'

import DietaryAttributesFilter from 'routes/Menu/FilterMenu/DietaryAttributesFilter/DietaryAttributesFilter'

describe('<DietaryAttributesFilter />', () => {
  let wrapper
  const dietaryAttributes = Immutable.Set(['gluten-free'])
  const dietaryAttributeTypes = {
    'gluten-free': 'Gluten Free',
    'dairy-free': 'Dairy Free',
  }

  test('should display a FilterItem for each dietaryAttributeType passed', () => {
    wrapper = shallow(<DietaryAttributesFilter dietaryAttributeTypes={dietaryAttributeTypes} />)

    expect(wrapper.find(FilterItem)).toHaveLength(2)
  })

  describe('FilterItem', () => {
    const filterDietaryAttributesChange = jest.fn()

    beforeEach(() => {
      wrapper = shallow(<DietaryAttributesFilter
        dietaryAttributeTypes={dietaryAttributeTypes}
        dietaryAttributes={dietaryAttributes}
        filterDietaryAttributesChange={filterDietaryAttributesChange}
      />)
    })

    test('should check a FilterItem if dietaryAttributes matches type', () => {
      expect(wrapper.find(FilterItem).first().prop('checked')).toBe(true)
      expect(wrapper.find(FilterItem).at(1).prop('checked')).toBe(false)
    })

    test('should dispatch a filterDietaryAttributesChange when clicked', () => {
      wrapper.find(FilterItem).first().simulate('click')
      expect(filterDietaryAttributesChange).toHaveBeenCalledWith('gluten-free')

      wrapper.find(FilterItem).at(1).simulate('click')
      expect(filterDietaryAttributesChange).toHaveBeenCalledWith('dairy-free')
    })
  })
})
