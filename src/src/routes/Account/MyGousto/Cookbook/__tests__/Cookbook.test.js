import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import { Cookbook } from '../Cookbook'
import { RecipeCard } from '../RecipeCard'

describe('MyGousto', () => {
  let wrapper
  const orders = Immutable.fromJS({ '1234': { id: '1234' }, '5678': { id: '5678' } })
  const recipes = Immutable.fromJS([
    {
      title: 'Recipe 1',
      id: '1',
      url: 'www.recipe1.com',
      media: {
        images: [{ urls: ['url1', 'url2'] }]
      }
    },
    {
      title: 'Recipe 2',
      id: '2',
      url: 'www.recipe2.com',
      media: {
        images: [{ urls: ['url1', 'url2'] }]
      }
    },
    {
      title: 'Recipe 3',
      id: '3',
      url: 'www.recipe3.com',
      media: {
        images: [{ urls: ['url1', 'url2'] }]
      }
    }
  ])
  const userLoadCookbookRecipesSpy = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<Cookbook orders={orders} recipes={recipes} userLoadCookbookRecipes={userLoadCookbookRecipesSpy} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    test('should render loading text when loading', () => {
      wrapper.setProps({ loading: true })
      expect(wrapper.find('p').text()).toContain('Loading your most recent recipes')
    })

    test('should render 6 recipe cards', () => {
      expect(wrapper.find(RecipeCard).length).toEqual(6)
    })

    test('should render 3 recipe cards with props', () => {
      expect(
        wrapper
          .find(RecipeCard)
          .first()
          .prop('title')
      ).toEqual('Recipe 1')

      expect(
        wrapper
          .find(RecipeCard)
          .first()
          .prop('link')
      ).toEqual('www.recipe1.com')

      expect(
        wrapper
          .find(RecipeCard)
          .first()
          .prop('images')
      ).toEqual(Immutable.List(['url1', 'url2']))
    })

    test('should render 3 empty recipe cards', () => {
      expect(
        wrapper
          .find(RecipeCard)
          .last()
          .prop('title')
      ).toEqual(null)

      expect(
        wrapper
          .find(RecipeCard)
          .last()
          .prop('link')
      ).toEqual(null)

      expect(
        wrapper
          .find(RecipeCard)
          .last()
          .prop('images')
      ).toEqual('product-placeholder.png')
    })
  })

  describe('componentDidUpdate', () => {
    test('should call userLoadCookbookRecipes only on order prop update', () => {
      wrapper = shallow(<Cookbook userLoadCookbookRecipes={userLoadCookbookRecipesSpy} />)

      wrapper.setProps({ orders })
      wrapper.setProps({ orders })
      wrapper.setProps({ recipes })

      expect(userLoadCookbookRecipesSpy).toHaveBeenCalledTimes(1)
    })
  })
})
