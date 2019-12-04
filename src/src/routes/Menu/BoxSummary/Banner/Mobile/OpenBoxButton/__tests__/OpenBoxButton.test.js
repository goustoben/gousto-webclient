import React from 'react'
import { mount } from 'enzyme'
import { OpenBoxButton } from '../OpenBoxButton.logic'

describe('OpenBoxButton', () => {
  const props = {
    showDetails: false,
    showTextOnButton: false,
    recipeNumber: 0,
  }
  const wrapper = mount(<OpenBoxButton {...props} />)
  describe('render', () => {

    describe('when showTextOnButton false', () => {
      test('should render arrowUp icon', () => {
        expect(wrapper.find('.arrowUp')).toHaveLength(1)
      })

      test('should render arrowDown icon', () => {
        wrapper.setProps({ showDetails: true })
        expect(wrapper.find('.arrowDown')).toHaveLength(1)
      })
    })

    describe('when showTextOnButton true', () => {
      wrapper.setProps({ showTextOnButton: true })
      describe('and no recipes in or basket', () => {
        test('should render text Box Summary on the button', () => {
          expect(wrapper.find('.openButtonText').text()).toEqual('BOX SUMMARY')
        })
      })

      describe('and less then 4 recipes in basket', () => {
        test('should render text Review Recipes on the button', () => {
          wrapper.setProps({ recipeNumber: 3 })
          expect(wrapper.find('.openButtonText').text()).toEqual('REVIEW RECIPES')
        })
      })

      describe('and 4 recipes in basket', () => {
        test('should render text Review Recipes on the button', () => {
          wrapper.setProps({ recipeNumber: 4 })
          expect(wrapper.find('.openButtonText').text()).toEqual('REVIEW RECIPES')
        })
      })
    })
  })
})
