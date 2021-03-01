import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import GoustoImage from 'Image'
import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'
import { VariantHeaderContainer } from 'routes/Menu/Recipe/VariantHeader/VariantHeaderContainer'
import { TileImage } from './TileImage'
import { CookingTimeIconContainer } from '../CookingTimeIcon'

describe('<TileImage />', () => {
  let wrapper
  let media
  beforeEach(() => {
    media = Immutable.fromJS([
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
    ])
  })

  it('shouldn\'t render a GoustoImage without media', () => {
    wrapper = shallow(<TileImage media={Immutable.List()} recipeId="1234" categoryId="abcde" />)

    expect(wrapper.find(GoustoImage)).toHaveLength(0)
  })

  it('should render a GoustoImage with media', () => {
    wrapper = shallow(<TileImage media={media} recipeId="1234" categoryId="abcde" />)

    expect(wrapper.find(GoustoImage)).toHaveLength(1)
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
    wrapper = shallow(<TileImage recipe={recipe} recipeId={recipe.get('id')} categoryId="abcde" index={index} numPortions={2} showDetailRecipe={showDetailRecipe} media={media} showVariantHeader />)
    expect(wrapper.find(CookingTimeIconContainer).length).toEqual(1)
  })

  test('should contain one VariantHeaderContainer component', () => {
    wrapper = shallow(<TileImage recipeId="1234" categoryId="abcde" isOutOfStock={false} media={Immutable.List()} showVariantHeader />)
    expect(wrapper.find(VariantHeaderContainer).length).toEqual(1)
    expect(wrapper.find(VariantHeaderContainer).prop('recipeId')).toEqual('1234')
    expect(wrapper.find(VariantHeaderContainer).prop('categoryId')).toEqual('abcde')
    expect(wrapper.find(VariantHeaderContainer).prop('isOutOfStock')).toEqual(false)
  })
})
