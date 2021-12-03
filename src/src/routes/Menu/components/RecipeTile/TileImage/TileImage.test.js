import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'
import { VariantHeaderContainer } from 'routes/Menu/Recipe/VariantHeader/VariantHeaderContainer'
import { TileImage } from './TileImage'
import { Image } from '../../Recipe'
import { CookingTimeIcon } from '../../Recipe/CookingTimeIcon'

import css from './TileImage.module.css'

describe('<TileImage />', () => {
  let wrapper

  test('should render one Recipe Image component', () => {
    wrapper = shallow(<TileImage title="my recipe" recipeId="1234" categoryId="abcde" showVariantHeader={false} />)

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
    })
    wrapper = shallow(<TileImage recipe={recipe} recipeId={recipe.get('id')} categoryId="abcde" index={index} numPortions={2} showDetailRecipe={showDetailRecipe} showVariantHeader />)
    expect(wrapper.find(CookingTimeIcon).length).toEqual(1)
  })

  test('should contain one VariantHeaderContainer component', () => {
    wrapper = shallow(<TileImage recipeId="1234" categoryId="abcde" isOutOfStock={false} showVariantHeader />)
    expect(wrapper.find(VariantHeaderContainer).length).toEqual(1)
    expect(wrapper.find(VariantHeaderContainer).prop('recipeId')).toEqual('1234')
    expect(wrapper.find(VariantHeaderContainer).prop('categoryId')).toEqual('abcde')
    expect(wrapper.find(VariantHeaderContainer).prop('isOutOfStock')).toEqual(false)
  })
})
