import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { AddRecipeButton } from './AddRecipeButton'

describe('AddRecipeButton', () => {
  let wrapper
  const buttonsProps = {
    recipeId: '1234',
    orignalId: '1234-b',
    categoryId: '5678',
    basketRecipeAddAttempt: jest.fn(),
    basketRecipeRemove: jest.fn(),
    setSidesModalRecipe: jest.fn(),
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
    describe('when recipe is not in the basket', () => {
      test('should call basketRecipeAddAttempt', () => {
        wrapper.find('.addButton').simulate('click', {
          stopPropagation: () => { }
        })
        expect(buttonsProps.basketRecipeAddAttempt).toHaveBeenCalledWith('1234')
      })

      describe('when enter key is pressed', () => {
        test('should not call basketRecipeAddAttempt', () => {
          buttonsProps.basketRecipeAddAttempt.mockClear()
          wrapper.find('.addButton').simulate('keyPress', {
            stopPropagation: () => { },
            keyCode: 13
          })
          expect(buttonsProps.basketRecipeAddAttempt).toHaveBeenCalledWith('1234')
        })
      })

      describe('when other key beside enter is pressed', () => {
        test('should not call basketRecipeAddAttempt', () => {
          buttonsProps.basketRecipeAddAttempt.mockClear()
          wrapper.find('.addButton').simulate('keyPress', {
            stopPropagation: () => { },
            keyCode: 20
          })
          expect(buttonsProps.basketRecipeAddAttempt).not.toHaveBeenCalled()
        })
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
          stopPropagation: () => { }
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

    describe('when alternative type is sides', () => {
      beforeEach(() => {
        wrapper.setProps({
          recipeVariants: {
            type: 'sides',
          }
        })
      })

      test('should call setSidesModalRecipe', () => {
        wrapper.find('.addButton').simulate('click', {
          stopPropagation: () => { }
        })
        expect(buttonsProps.setSidesModalRecipe).toHaveBeenCalledWith({ recipeId: '1234' })
      })
    })

    describe('when has side added to basket', () => {
      beforeEach(() => {
        wrapper.setProps({
          hasSideAddedToBasket: true,
          firstSideRecipeId: '567',
          buttonProps: {
            buttonClassName: 'removeButton',
            lineClassName: 'removeButtonLine',
            buttonText: 'Remove recipe',
          }
        })
      })

      test('should call setSidesModalRecipe', () => {
        wrapper.find('.removeButton').simulate('click', {
          stopPropagation: () => { }
        })
        expect(buttonsProps.basketRecipeRemove).toHaveBeenCalledWith('567')
      })
    })

    describe('when recipe is not in basket', () => {
      beforeEach(() => {
        wrapper.setProps({
          isInBasket: false,
          buttonProps: {
            buttonClassName: 'addButton',
          }
        })
      })

      describe('when recipe has alternatives', () => {
        beforeEach(() => {
          wrapper.setProps({
            recipeVariants: {
              type: 'alternatives',
            }
          })
        })

        describe('when mandatoryVariantFeatureEnabled is true and hasBasketPostcode is true', () => {
          let recipeVariantDropdownExpanded

          beforeEach(() => {
            recipeVariantDropdownExpanded = jest.fn()

            wrapper.setProps({
              mandatoryVariantFeatureEnabled: true,
              hasBasketPostcode: true,
              recipeVariantDropdownExpanded
            })
          })

          test('should call recipeVariantDropdownExpanded', () => {
            wrapper.find('.addButton').simulate('click', {
              stopPropagation: () => { }
            })

            const { recipeId, originalId, categoryId } = buttonsProps

            expect(recipeVariantDropdownExpanded).toHaveBeenCalledWith({
              recipeId,
              originalId,
              categoryId
            })
          })

          test('should not call basketRecipeAddAttempt', () => {
            wrapper.find('.addButton').simulate('click', {
              stopPropagation: () => { }
            })

            expect(buttonsProps.basketRecipeAddAttempt).not.toHaveBeenCalled()
          })
        })

        describe('when mandatoryVariantFeatureEnabled is true and hasBasketPostcode is false', () => {
          let recipeVariantDropdownExpanded

          beforeEach(() => {
            recipeVariantDropdownExpanded = jest.fn()

            wrapper.setProps({
              mandatoryVariantFeatureEnabled: true,
              hasBasketPostcode: false,
              recipeVariantDropdownExpanded
            })
          })

          test('should not call recipeVariantDropdownExpanded', () => {
            wrapper.find('.addButton').simulate('click', {
              stopPropagation: () => { }
            })

            expect(recipeVariantDropdownExpanded).not.toHaveBeenCalled()
          })

          test('should call basketRecipeAddAttempt', () => {
            wrapper.find('.addButton').simulate('click', {
              stopPropagation: () => { }
            })

            expect(buttonsProps.basketRecipeAddAttempt).toHaveBeenCalledWith('1234')
          })
        })

        describe('when mandatoryVariantFeatureEnabled is false', () => {
          let recipeVariantDropdownExpanded

          beforeEach(() => {
            recipeVariantDropdownExpanded = jest.fn()

            wrapper.setProps({
              mandatoryVariantFeatureEnabled: false,
              recipeVariantDropdownExpanded
            })
          })

          test('should not call recipeVariantDropdownExpanded', () => {
            wrapper.find('.addButton').simulate('click', {
              stopPropagation: () => { }
            })

            expect(recipeVariantDropdownExpanded).not.toHaveBeenCalled()
          })

          test('should call basketRecipeAddAttempt', () => {
            wrapper.find('.addButton').simulate('click', {
              stopPropagation: () => { }
            })

            expect(buttonsProps.basketRecipeAddAttempt).toHaveBeenCalledWith('1234')
          })
        })
      })
    })
  })

  describe('when recipe is in basket', () => {
    beforeEach(() => {
      wrapper.setProps({
        isInBasket: false,
        buttonProps: {
          buttonClassName: 'removeButton',
        }
      })
    })

    describe('when mandatoryVariantFeatureEnabled is true and recipe has alternatives', () => {
      let recipeVariantDropdownExpanded

      beforeEach(() => {
        recipeVariantDropdownExpanded = jest.fn()

        wrapper.setProps({
          mandatoryVariantFeatureEnabled: true,
          recipeVariants: {
            type: 'alternatives',
          },
          recipeVariantDropdownExpanded
        })
      })

      test('should call basketRecipeRemove', () => {
        wrapper.find('.removeButton').simulate('click', {
          stopPropagation: () => { }
        })
        expect(buttonsProps.basketRecipeRemove).toHaveBeenCalledWith('1234')
      })
    })
  })
})
