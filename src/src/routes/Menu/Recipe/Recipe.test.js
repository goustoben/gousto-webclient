import React from 'react'

import { shallow } from 'enzyme'

import { GridRecipe } from 'routes/Menu/Recipe/GridRecipe'
import { Recipe } from 'routes/Menu/Recipe'

describe('Recipe', () => {
  describe('rendering', () => {
    let wrapper

    test('should render a GridRecipe by default', () => {
      wrapper = shallow(<Recipe />)
      expect(wrapper.find(GridRecipe).length).toBe(1)
    })

    test('should render a GridRecipe for chefPrepared', () => {
      wrapper = shallow(<Recipe view="chefPrepared" />)
      expect(wrapper.find(GridRecipe).length).toBe(1)
    })
  })
})
