import React from 'react'
import { shallow } from 'enzyme'
import { RecipeSidesModal } from '../RecipeSidesModal'

describe('RecipeSidesModal', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      title: 'Add a side',
      recipeTitle: 'Chicken',
      sidesModalRecipeId: '123',
      shouldShow: true,
      clearSidesModalRecipeId: jest.fn(),
      unselectRecipeSide: jest.fn(),
      trackCloseSide: jest.fn(),
    }
    wrapper = shallow(<RecipeSidesModal {...props} />)
  })

  test('should render ModalComponent with right props', () => {
    expect(wrapper.find('ModalComponent').prop('visible')).toEqual(true)
    expect(wrapper.find('ModalComponent').prop('styleName')).toEqual('recipeSidesModal')
  })

  test('should render recipeSidesModalCloseX', () => {
    expect(wrapper.find('.recipeSidesModalCloseX').exists()).toBe(true)
  })

  test('should render subtitle with correct recipe name', () => {
    expect(wrapper.find('.recipeSidesModalTitle').text()).toEqual('Do you want to add a side to your Chicken?')
  })

  describe('when click on close button', () => {
    const clearSidesModalRecipe = jest.fn()
    const unselectRecipeSide = jest.fn()
    const trackCloseSide = jest.fn()
    beforeEach(() => {
      props = {
        title: 'Add a side',
        recipeTitle: 'Chicken',
        sidesModalRecipeId: '123',
        shouldShow: true,
        clearSidesModalRecipe,
        unselectRecipeSide,
        trackCloseSide
      }
      wrapper = shallow(<RecipeSidesModal {...props} />)
    })

    test('should call clearSidesModalRecipe, unselectRecipeSide and trackCloseSide', () => {
      wrapper.find('.recipeSidesModalCloseX').simulate('click')
      expect(clearSidesModalRecipe).toHaveBeenCalled()
      expect(unselectRecipeSide).toHaveBeenCalledWith('123')
      expect(trackCloseSide).toHaveBeenCalledWith('123')
    })
  })
})
