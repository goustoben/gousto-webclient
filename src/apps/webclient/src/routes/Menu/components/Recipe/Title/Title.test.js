import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import * as recipeContext from '../../../context/recipeContext'
import { Title } from './Title'

describe('Recipe components > Title', () => {
  const className = 'my-class'
  const titleText = 'Steak and Chips'
  let wrapper

  const recipe = Immutable.fromJS({
    id: '1234',
    title: titleText
  })
  const useContextMock = jest.spyOn(React, 'useContext').mockImplementation(() => recipe)
  jest.spyOn(recipeContext, 'useRecipeTitle')

  beforeEach(() => {
    useContextMock.mockClear()
    recipeContext.useRecipeTitle.mockClear()

    wrapper = mount(<Title className={className} />)
  })

  test('should call useRecipeTitle', () => {
    expect(recipeContext.useRecipeTitle).toHaveBeenCalled()
  })

  test('should set correct className', () => {
    expect(wrapper.find('h2').prop('className')).toEqual(className)
  })

  test('should set correct text', () => {
    expect(wrapper.find('h2').text()).toEqual(titleText)
  })
})
