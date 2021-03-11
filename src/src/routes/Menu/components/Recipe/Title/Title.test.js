import React from 'react'
import { mount } from 'enzyme'
import * as recipeContext from '../../../context/recipeContext'
import { Title } from './Title'

describe('Recipe components > Title', () => {
  const className = 'my-class'
  const titleText = 'Steak and Chips'
  let wrapper

  beforeEach(() => {
    jest.spyOn(recipeContext, 'useRecipeField').mockReturnValue(titleText)

    wrapper = mount(<Title className={className} />)
  })

  test('should call useRecipeField with "title"', () => {
    expect(recipeContext.useRecipeField).toHaveBeenCalledWith('title')
  })

  test('should set correct className', () => {
    expect(wrapper.find('h2').prop('className')).toEqual(className)
  })

  test('should set correct text', () => {
    expect(wrapper.find('h2').text()).toEqual(titleText)
  })
})
