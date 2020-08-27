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
    const clearSidesModalRecipeId = jest.fn()
    beforeEach(() => {
      props = {
        title: 'Add a side',
        recipeTitle: 'Chicken',
        sidesModalRecipeId: '123',
        shouldShow: true,
        clearSidesModalRecipeId,
      }
      wrapper = shallow(<RecipeSidesModal {...props} />)
    })

    test('should close modal from x', () => {
      wrapper.find('.recipeSidesModalCloseX').simulate('click')
      expect(clearSidesModalRecipeId).toHaveBeenCalled()
    })
  })

  describe('when click on Add a side', () => {
    const addSide = jest.fn()
    beforeEach(() => {
      props = {
        title: 'Add a side',
        recipeTitle: 'Chicken',
        sidesModalRecipeId: '123',
        shouldShow: true,
        clearSidesModalRecipeId: jest.fn(),
        addSide,
      }
      wrapper = shallow(<RecipeSidesModal {...props} />)
    })

    test('correct function is called', () => {
      wrapper.find('.recipeSidesModalAddSideButton').simulate('click')
      expect(addSide).toHaveBeenCalled()
    })
  })

  describe('when click on I do not want a side', () => {
    const addNoSide = jest.fn()
    beforeEach(() => {
      props = {
        title: 'Add a side',
        recipeTitle: 'Chicken',
        sidesModalRecipeId: '123',
        shouldShow: true,
        clearSidesModalRecipeId: jest.fn(),
        addNoSide,
      }
      wrapper = shallow(<RecipeSidesModal {...props} />)
    })

    test('correct function is called', () => {
      wrapper.find('.recipeSidesModalNoSideButton').simulate('click')
      expect(addNoSide).toHaveBeenCalled()
    })
  })
})
