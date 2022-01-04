import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'
import { VariantHeader } from 'routes/Menu/Recipe/VariantHeader/VariantHeader'
import { TileImage } from './TileImage'
import { Image } from '../../Recipe'
import { CookingTimeIcon } from '../../Recipe/CookingTimeIcon'

import css from './TileImage.css'

describe('<TileImage />', () => {
  let wrapper

  test('should render one Recipe Image component', () => {
    wrapper = shallow(<TileImage title="my recipe" recipeId="1234" categoryId="abcde" showVariantHeader={false} originalId="foo bar" />)

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
    wrapper = shallow(<TileImage recipe={recipe} recipeId={recipe.get('id')} categoryId="abcde" index={index} numPortions={2} showDetailRecipe={showDetailRecipe} showVariantHeader originalId="foo bar" />)
    expect(wrapper.find(CookingTimeIcon).length).toEqual(1)
  })

  test('should contain one VariantHeader component', () => {
    wrapper = shallow(<TileImage recipeId="1234" categoryId="abcde" originalId="foo bar" isOutOfStock={false} showVariantHeader />)
    expect(wrapper.find(VariantHeader).length).toEqual(1)
    expect(wrapper.find(VariantHeader).prop('recipeId')).toEqual('1234')
    expect(wrapper.find(VariantHeader).prop('categoryId')).toEqual('abcde')
    expect(wrapper.find(VariantHeader).prop('originalId')).toEqual('foo bar')
  })
})
