import React from 'react'

import { shallow } from 'enzyme'

import GridRecipe from 'routes/Menu/Recipe/GridRecipe'
import SmallRecipe from 'routes/Menu/Recipe/SmallRecipe'
import SimpleRecipe from 'routes/Menu/Recipe/SimpleRecipe'
import FeaturedRecipe from 'routes/Menu/Recipe/FeaturedRecipe'
import FineDineInRecipe from 'routes/Menu/Recipe/FineDineInRecipe'
import { CTAToAllRecipes } from 'routes/Menu/Recipe/CTAToAllRecipes'

import Recipe from 'routes/Menu/Recipe'
import css from 'routes/Menu/Recipe/Recipe.css'

describe('Recipe', () => {
  describe('rendering', () => {
    let wrapper

    test('should render a GridRecipe by default', () => {
      wrapper = shallow(<Recipe />)
      expect(wrapper.find(GridRecipe).length).toBe(1)
    })

    describe('views', () => {
      const views = new Map(
        Object.entries({
          grid: GridRecipe,
          featured: FeaturedRecipe,
          gridSmall: SmallRecipe,
          simple: SimpleRecipe,
          fineDineIn: FineDineInRecipe,
          ctaAllRecipe: CTAToAllRecipes
        }),
      )

      test('should render a different component based on view', () => {
        for (const [view, component] of views.entries()) {
          wrapper = shallow(<Recipe view={view} />)
          expect(wrapper.find(component).length).toBe(1)
        }
      })

      test('should add a class based on the view type', () => {
        for (const view of views.keys()) {
          wrapper = shallow(<Recipe view={view} />)
          expect(wrapper.hasClass('grid')).toEqual(true)
          expect(wrapper.hasClass(css[view])).toEqual(true)
        }
      })
    })
  })
})
