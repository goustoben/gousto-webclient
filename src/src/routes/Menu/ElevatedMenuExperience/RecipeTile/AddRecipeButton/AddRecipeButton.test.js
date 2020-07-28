import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { AddRecipeButton } from './AddRecipeButton'

describe('AddRecipeButton', () => {
  let wrapper
  const buttonsProps = {
    recipeId: '1234',
    basketRecipeAdd: jest.fn(),
    basketRecipeRemove: jest.fn(),
    isInBasket: false,
    isBasketLimitReached: false,
    buttonProps: {
      buttonClassName: 'addButton',
      lineClassName: 'addButtonLine',
      buttonText: 'Add recipe',
    }
  }

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddRecipeButton {...buttonsProps} />, div)
  })

  describe('the appearance', () => {
    beforeEach(() => {
      wrapper = shallow(<AddRecipeButton {...buttonsProps} />)
    })

    test('renders a single button', () => {
      expect(wrapper.find('button')).toHaveLength(1)
    })

    describe('when the recipe is not selected', () => {
      test('button has Add recipe text', () => {
        expect(wrapper.find('.hideOnMobile').text()).toEqual('Add recipe')
      })
    })

    describe('when the the recipe is already selected', () => {
      beforeEach(() => {
        wrapper.setProps({
          isInBasket: true,
          buttonProps: {
            buttonClassName: 'removeButton',
            lineClassName: 'removeButtonLine',
            buttonText: 'Remove recipe',
          }
        })
      })

      test('button has Remove recipe text', () => {
        expect(wrapper.find('.hideOnMobile').text()).toEqual('Remove recipe')
      })
    })
  })

  describe('functionality', () => {
    beforeEach(() => {
      wrapper = shallow(<AddRecipeButton {...buttonsProps} />)
    })
    describe('when recipe not in basket', () => {
      test('should call basketRecipeAdd', () => {
        wrapper.find('.addButton').simulate('click', {
          stopPropagation: () => {}
        })
        expect(buttonsProps.basketRecipeAdd).toHaveBeenCalledWith('1234')
      })
    })

    describe('when the the recipe is already selected', () => {
      beforeEach(() => {
        wrapper.setProps({
          isInBasket: true,
          buttonProps: {
            buttonClassName: 'removeButton',
            lineClassName: 'removeButtonLine',
            buttonText: 'Remove recipe',
          }
        })
      })
      test('should call basketRecipeRemove', () => {
        wrapper.find('.removeButton').simulate('click', {
          stopPropagation: () => {}
        })
        expect(buttonsProps.basketRecipeRemove).toHaveBeenCalledWith('1234')
      })
    })

    describe('when basket limit is reached', () => {
      beforeEach(() => {
        wrapper.setProps({
          isBasketLimitReached: true
        })
      })

      test('addRecipe should be removed', () => {
        expect(wrapper.find('.addButton').prop('disabled')).toBe(true)
      })
    })
  })
})
