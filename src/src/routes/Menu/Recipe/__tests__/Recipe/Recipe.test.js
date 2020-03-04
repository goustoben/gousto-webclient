import React from 'react'

import { shallow } from 'enzyme'

import { GridRecipe } from 'routes/Menu/Recipe/GridRecipe'
import { FeaturedRecipe } from 'routes/Menu/Recipe/FeaturedRecipe'
import { FineDineInRecipe } from 'routes/Menu/Recipe/FineDineInRecipe'
import { Recipe } from 'routes/Menu/Recipe'
import css from 'routes/Menu/Recipe/Recipe.css'
import { CTAToAllRecipes } from '../../CTAToAllRecipes'
import { CTAThematic } from '../../CTAThematic'

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
          fineDineIn: FineDineInRecipe,
          ctaAllRecipe: CTAToAllRecipes,
          ctaThematic: CTAThematic
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
