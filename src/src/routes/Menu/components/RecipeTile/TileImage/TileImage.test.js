import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'
import { VariantHeaderContainer } from 'routes/Menu/Recipe/VariantHeader/VariantHeaderContainer'
import { TileImage } from './TileImage'
import { CookingTimeIconContainer } from '../CookingTimeIcon'
import { Image } from '../../Recipe'

import css from './TileImage.css'

describe('<TileImage />', () => {
  let wrapper

  test('should render one Recipe Image component', () => {
    wrapper = shallow(<TileImage title="my recipe" recipeId="1234" categoryId="abcde" />)

    expect(wrapper.find(Image)).toHaveLength(1)
    expect(wrapper.find(Image).prop('lazy')).toBeTruthy()
    expect(wrapper.find(Image).prop('title')).toEqual('my recipe')
    expect(wrapper.find(Image).prop('className')).toEqual(css.imageStyle)
  })

  test('should contain one SoldOutOverlay component', () => {
    expect(wrapper.find(SoldOutOverlay).length).toEqual(1)
  })

  test('should contain one CookingTimeIcon component', () => {
    global.innerWidth = 1200
    const showDetailRecipe = jest.fn()
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      media: Immutable.fromJS([
        {
          src: 'radish.small.jpg',
          width: 100,
        },
        {
          src: 'radish.medium.jpg',
          width: 150,
        },
        {
          src: 'radish.large.jpg',
          width: 200,
        },
        {
          src: 'radish.extraLarge.jpg',
          width: 250,
        },
      ]),
      cookingTime: 30,
      cookingTimeFamily: 30
    })
    wrapper = shallow(<TileImage recipe={recipe} recipeId={recipe.get('id')} categoryId="abcde" index={index} numPortions={2} showDetailRecipe={showDetailRecipe} showVariantHeader />)
    expect(wrapper.find(CookingTimeIconContainer).length).toEqual(1)
  })

  test('should contain one VariantHeaderContainer component', () => {
    wrapper = shallow(<TileImage recipeId="1234" categoryId="abcde" isOutOfStock={false} showVariantHeader />)
    expect(wrapper.find(VariantHeaderContainer).length).toEqual(1)
    expect(wrapper.find(VariantHeaderContainer).prop('recipeId')).toEqual('1234')
    expect(wrapper.find(VariantHeaderContainer).prop('categoryId')).toEqual('abcde')
    expect(wrapper.find(VariantHeaderContainer).prop('isOutOfStock')).toEqual(false)
  })
})
