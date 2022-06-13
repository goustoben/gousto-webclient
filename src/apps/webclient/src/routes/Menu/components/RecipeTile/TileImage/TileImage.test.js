import React from 'react'

import { shallow } from 'enzyme'

import * as RecipeContext from 'routes/Menu/context/recipeContext'
import * as BasketHook from 'routes/Menu/domains/basket'

import { Image } from '../../Recipe'
import { CookingTimeIcon } from '../../Recipe/CookingTimeIcon'
import { SoldOutOverlay } from '../../Recipe/SoldOutOverlay'
import { VariantHeader } from '../VariantHeader'
import { TileImage } from './TileImage'

import css from './TileImage.css'

describe('<TileImage />', () => {
  beforeEach(() => {
    jest.spyOn(BasketHook, 'useStock').mockImplementation(() => ({
      isRecipeOutOfStock: () => false,
    }))
    jest.spyOn(RecipeContext, 'useRecipeField').mockImplementation(() => '1234')
  })

  afterEach(() => jest.clearAllMocks())

  let wrapper

  test('should render one Recipe Image component', () => {
    wrapper = shallow(<TileImage categoryId="abcde" originalId="foo bar" />)

    expect(wrapper.find(Image)).toHaveLength(1)
    expect(wrapper.find(Image).prop('lazy')).toBeTruthy()
    expect(wrapper.find(Image).prop('className')).toEqual(css.imageStyle)
  })

  test('should contain one SoldOutOverlay component', () => {
    expect(wrapper.find(SoldOutOverlay).length).toEqual(1)
  })

  test('should contain one CookingTimeIcon component', () => {
    global.innerWidth = 1200
    const showDetailRecipe = jest.fn()
    wrapper = shallow(
      <TileImage categoryId="abcde" showDetailRecipe={showDetailRecipe} originalId="foo bar" />,
    )
    expect(wrapper.find(CookingTimeIcon).length).toEqual(1)
  })

  test('should contain one VariantHeader component', () => {
    wrapper = shallow(<TileImage categoryId="abcde" originalId="foo bar" />)
    expect(wrapper.find(VariantHeader).length).toEqual(1)
    expect(wrapper.find(VariantHeader).prop('categoryId')).toEqual('abcde')
    expect(wrapper.find(VariantHeader).prop('originalId')).toEqual('foo bar')
  })
})
