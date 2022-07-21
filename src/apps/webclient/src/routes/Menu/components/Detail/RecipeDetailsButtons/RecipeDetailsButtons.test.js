import React from 'react'

import actions from 'actions'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'
import * as Redux from 'react-redux'

import * as Auth from 'routes/Menu/domains/auth'
import * as BasketHook from 'routes/Menu/domains/basket'
import { useStock } from 'routes/Menu/domains/stock'

import * as MenuRecipeDetailsActions from '../../../actions/menuRecipeDetails'
import { RecipeDetailsButtons } from './RecipeDetailsButtons'
import * as UseSurchargePerPortion from './useSurchargePerPortion'

jest.mock('routes/Menu/domains/stock')
const useStockMock = useStock

const mockUp = ({
  numPortions = 2,
  reachedLimit = false,
  canAddRecipes = true,
  quantity = 0,
  stockLevel = 1000,
  isAdmin = false,
  surchargePerPortion = null,
  maxRecipesNum = 4,
} = {}) => {
  const dispatch = jest.fn()

  jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
  const addRecipe = jest.fn()
  const removeRecipe = jest.fn()

  jest.spyOn(BasketHook, 'useBasket').mockImplementation(() => ({
    numPortions,
    reachedLimit,
    canAddRecipes,
    getQuantitiesForRecipeId: () => quantity,
    addRecipe,
    removeRecipe,
  }))

  jest.spyOn(BasketHook, 'useSupportedBoxTypes').mockImplementation(() => ({
    maxRecipesForPortion: () => maxRecipesNum,
  }))

  useStockMock.mockImplementation(() => ({
    getStockForRecipe: () => stockLevel,
  }))
  jest.spyOn(Auth, 'useAuth').mockImplementation(() => ({ isAdmin }))
  jest
    .spyOn(UseSurchargePerPortion, 'useSurchargePerPortion')
    .mockImplementation(() => surchargePerPortion)

  const menuBrowseCTAVisibilityChange = jest.fn()
  jest
    .spyOn(actions, 'menuBrowseCTAVisibilityChange')
    .mockImplementation(menuBrowseCTAVisibilityChange)

  jest.spyOn(MenuRecipeDetailsActions, 'menuRecipeDetailVisibilityChange')

  return {
    dispatch,
    menuBrowseCTAVisibilityChange,
    addRecipe,
    removeRecipe,
  }
}

describe('the RecipeDetailsButtons component', () => {
  let wrapper

  const buttonsProps = {
    recipeId: '12345',
    position: 10,
    view: 'grid',
    isOutOfStock: false,
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('with most common props', () => {
    beforeAll(() => mockUp())

    test('renders without crashing', () => {
      const div = document.createElement('div')
      ReactDOM.render(<RecipeDetailsButtons {...buttonsProps} />, div)
    })
  })

  describe('the appearance', () => {
    beforeEach(() => {
      mockUp()
      wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
    })

    test('renders a single Button', () => {
      expect(wrapper.find('Button')).toHaveLength(1)
    })

    describe('when the recipe is not selected', () => {
      test('renders 1 Segment', () => {
        expect(wrapper.find('Segment')).toHaveLength(1)
      })

      test('shows the add recipe text', () => {
        const childrenText = wrapper.find('Segment').prop('children').join('')
        expect(childrenText).toBe('Add recipe')
      })

      test('does not have the class for surcharge recipes in grid view', () => {
        expect(wrapper.find('Segment').hasClass('segment')).toBe(false)
      })

      describe('and the recipe has a surcharge', () => {
        beforeEach(() => {
          mockUp({ surchargePerPortion: 2.99 })
          wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
        })

        test('renders a Surcharge component', () => {
          expect(wrapper.find('Surcharge')).toHaveLength(1)
        })

        test('shows the add recipe text', () => {
          expect(wrapper.find('Segment').contains('Add recipe')).toBe(true)
        })

        test('has the classes for surcharge recipes in grid view', () => {
          expect(wrapper.find('Segment').hasClass('segment')).toBe(true)
          expect(wrapper.find('Segment').find('div').hasClass('surchargeWrapped surcharge')).toBe(
            true,
          )
        })

        describe('when viewing the recipe in detail', () => {
          beforeEach(() => {
            wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} view="detail" />)
          })

          test('does not have the classes for surcharge recipes in grid view', () => {
            expect(wrapper.find('Segment').hasClass('segment')).toBe(false)
            expect(wrapper.find('Segment').find('div').hasClass('surchargeWrapped surcharge')).toBe(
              false,
            )
          })
        })
      })

      describe('and the basket limit has been reached', () => {
        beforeEach(() => {
          mockUp({ reachedLimit: true })
          wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
        })

        test('the button is disabled', () => {
          expect(wrapper.find('Segment').prop('disabled')).toBe(true)
        })
      })
    })

    describe('when the the recipe is already selected', () => {
      const newQty = 2
      const numPortions = 4
      const totalPortions = newQty * numPortions
      const longMessage = `${totalPortions} Servings Added`
      const shortMessage = `${totalPortions} Added`

      beforeEach(() => {
        mockUp({ quantity: newQty, numPortions })
        wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} view="detail" />)
      })

      test('renders 3 Segments', () => {
        expect(wrapper.find('Segment')).toHaveLength(3)
      })

      test('renders two Controls', () => {
        expect(wrapper.find('Control').first().prop('children')).toBe('-')
        expect(wrapper.find('Control').last().prop('children')).toBe('+')
      })

      test('shows how many servings have been added', () => {
        expect(wrapper.find('Segment').at(1).prop('children')[0]).toBe(longMessage)
      })

      test('should not have the classes for surcharge recipes in grid view', () => {
        wrapper
          .find('Segment')
          .forEach((segment) => expect(segment.hasClass('segmentSelected')).toBe(false))
      })

      describe('and the selected recipe has a surcharge', () => {
        beforeEach(() => {
          mockUp({ quantity: newQty, numPortions, surchargePerPortion: 2.99 })
          wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} view="grid" />)
        })

        test('renders a Surcharge component', () => {
          expect(wrapper.find('Surcharge')).toHaveLength(1)
        })

        test('shows how many servings have been added', () => {
          expect(wrapper.find('Segment').at(1).prop('children')[0]).toBe(shortMessage)
        })

        test('has the classes for surcharge recipes in grid view', () => {
          wrapper
            .find('Segment')
            .forEach((segment) => expect(segment.hasClass('segmentSelected')).toBe(true))
          expect(wrapper.find('Segment').find('div').hasClass('surchargeHidden surcharge')).toBe(
            true,
          )
        })

        describe('when viewing the recipe in detail', () => {
          beforeEach(() => {
            mockUp({ quantity: newQty, numPortions, surchargePerPortion: 2.99 })
            wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} view="detail" />)
          })

          test('does not have the classes for surcharge recipes in grid view', () => {
            wrapper
              .find('Segment')
              .forEach((segment) => expect(segment.hasClass('segmentSelected')).toBe(false))
            expect(wrapper.find('Segment').find('div').hasClass('surchargeHidden surcharge')).toBe(
              false,
            )
          })
        })
      })

      describe('and the basket limit has been reached', () => {
        beforeEach(() => {
          mockUp({ quantity: newQty, numPortions, reachedLimit: true })
          wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} view="detail" />)
        })

        test('shows the add button as disabled', () => {
          expect(wrapper.find('Segment').at(2).prop('disabled')).toBe(true)
        })
      })

      describe('and the recipe is out of stock', () => {
        beforeEach(() => {
          mockUp({ quantity: newQty, numPortions })
          wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} view="detail" isOutOfStock />)
        })

        test('shows the add button as disabled', () => {
          expect(wrapper.find('Segment').last().prop('disabled')).toBe(true)
        })
      })
    })
  })

  describe('the functionality', () => {
    const { recipeId, view, position, score } = buttonsProps

    describe('Given the recipe is not selected', () => {
      let buttonContent

      describe('when the stock is not null', () => {
        describe('when the disable prop is false', () => {
          describe('and clicking to adding a recipe', () => {
            let addRecipe
            const maxRecipesNum = 4

            beforeEach(() => {
              ;({ addRecipe } = mockUp())
              wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
            })
            test('then it adds the recipe', () => {
              buttonContent = wrapper.find('Segment').first()
              buttonContent.simulate('click')
              expect(addRecipe).toHaveBeenCalledWith(
                recipeId,
                view,
                { position, score },
                maxRecipesNum,
              )
            })

            test('then it closes the recipe', () => {
              buttonContent = wrapper.find('Segment').first()
              buttonContent.simulate('click')
              expect(MenuRecipeDetailsActions.menuRecipeDetailVisibilityChange).toHaveBeenCalled()
            })
          })
        })
      })

      describe('When the stock is null', () => {
        describe('and clicking to add a recipe', () => {
          let addRecipe

          beforeEach(() => {
            ;({ addRecipe } = mockUp({ stockLevel: null }))
            wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
          })

          test('then the recipe is not added', () => {
            buttonContent = wrapper.find('Segment').first()
            buttonContent.simulate('click')
            expect(addRecipe).not.toHaveBeenCalled()
          })
        })
      })

      describe('When the postcode is empty', () => {
        let menuBrowseCTAVisibilityChange

        beforeEach(() => {
          ;({ menuBrowseCTAVisibilityChange } = mockUp({ stockLevel: null }))
          wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
        })

        test('then it should call menuBrowseCTAVisibilityChange', () => {
          buttonContent = wrapper.find('Segment').first()
          buttonContent.simulate('click')
          expect(menuBrowseCTAVisibilityChange).toHaveBeenCalled()
        })
      })

      describe('when view is detail and no postcode', () => {
        let menuBrowseCTAVisibilityChange

        beforeEach(() => {
          ;({ menuBrowseCTAVisibilityChange } = mockUp({ stockLevel: null }))
          jest.useFakeTimers()
          wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} view="detail" />)
        })

        test('then it should call menuBrowseCTAVisibilityChange', () => {
          buttonContent = wrapper.find('Segment').first()
          buttonContent.simulate('click')
          jest.advanceTimersByTime(3000)
          expect(menuBrowseCTAVisibilityChange).toHaveBeenCalled()
        })
      })
    })

    describe('When the recipe is already selected', () => {
      let segmentAdd
      let segmentRemove

      describe('When the button is not disabled', () => {
        describe('When the stock is not null', () => {
          describe('and clicking to add a recipe', () => {
            let addRecipe
            const maxRecipesNum = 4

            beforeEach(() => {
              ;({ addRecipe } = mockUp({ quantity: 2 }))
              wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
            })

            test('then it should add the recipe', () => {
              segmentRemove = wrapper.find('Segment').at(0)
              segmentAdd = wrapper.find('Segment').at(2)
              segmentAdd.simulate('click')
              expect(addRecipe).toHaveBeenCalledWith(
                recipeId,
                view,
                { position, score },
                maxRecipesNum,
              )
            })
          })

          describe('When clicking to remove a recipe', () => {
            let removeRecipe

            beforeEach(() => {
              ;({ removeRecipe } = mockUp({ quantity: 2 }))
              wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
            })
            test('then it should remove the recipe', () => {
              segmentRemove = wrapper.find('Segment').at(0)
              segmentRemove.simulate('click')
              expect(removeRecipe).toHaveBeenCalledWith(recipeId, view, position)
            })
          })
        })

        describe('When stock is null', () => {
          describe('and clicking to add a recipe', () => {
            let addRecipe

            beforeEach(() => {
              ;({ addRecipe } = mockUp({ quantity: 2, stockLevel: null }))
              wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
            })

            test('then the recipe is not added', () => {
              segmentAdd = wrapper.find('Segment').at(2)
              segmentAdd.simulate('click')
              expect(addRecipe).not.toHaveBeenCalled()
            })
          })

          describe('When clicking to remove a recipe', () => {
            let removeRecipe

            beforeEach(() => {
              ;({ removeRecipe } = mockUp({ quantity: 2, stockLevel: null }))
              wrapper = shallow(<RecipeDetailsButtons {...buttonsProps} />)
            })
            test('then it should remove the recipe', () => {
              segmentRemove = wrapper.find('Segment').at(0)
              segmentRemove.simulate('click')
              expect(removeRecipe).toHaveBeenCalledWith(recipeId, view, position)
            })
          })
        })
      })
    })
  })
})
