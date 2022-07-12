import React from 'react'

import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import * as Redux from 'react-redux'

import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import { useMenu } from 'routes/Menu/domains/menu'

import { RecipeAlternativeOptions } from './RecipeAlternativeOptions'
import * as Tracking from './useTracking'

jest.mock('routes/Menu/domains/menu')
const useMenuMock = useMenu as jest.MockedFunction<typeof useMenu>

function mockUseMenu(getOptionsForRecipe: jest.Mock) {
  const getRecipesForCollectionId = jest.fn().mockReturnValue([])

  useMenuMock.mockImplementation(() => ({
    getOptionsForRecipe,
    getRecipesForCollectionId,
  }))
}

const store = createMockStore({})
const renderForTest = (isOnDetailsScreen = true, onChange = undefined) =>
  render(
    <Redux.Provider store={store}>
      <RecipeAlternativeOptions
        originalId="recipe_1"
        recipeId="recipe_1"
        isOnDetailScreen={isOnDetailsScreen}
        categoryId="category_1"
        onChangeCheckedRecipe={onChange}
      />
    </Redux.Provider>,
  )

describe('RecipeAlternativeOptions', () => {
  describe('When there are recipe alternative options', () => {
    const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => [
      {
        recipeId: '111',
        recipeName: 'Test Recipe One',
        isChecked: true,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
      {
        recipeId: '222',
        recipeName: 'Test Recipe Two',
        isChecked: false,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
    ])

    beforeEach(() => {
      mockUseMenu(getAlternativeOptionsForRecipe)
      jest.spyOn(Tracking, 'useTrackVariantListDisplay').mockImplementation()
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    test('it should render recipe list', () => {
      renderForTest()
      expect(screen.queryByRole('list')).toBeInTheDocument()

      const items = screen.getAllByRole('listitem')
      expect(items.length).toEqual(2)
      expect(items[0]).toHaveTextContent(/Test Recipe One/)
      expect(items[1]).toHaveTextContent(/Test Recipe Two/)

      expect(getAlternativeOptionsForRecipe).toHaveBeenCalledWith('recipe_1', 'category_1', {
        isOnDetailScreen: true,
      })
    })

    describe('when user click on option item', () => {
      const renderRecipeAlternativeOptionsAndPickAnOption = (onChange: any) => {
        renderForTest(true, onChange)

        // Pick second item on the list
        fireEvent.click(screen.getAllByRole('radio')[1])
      }

      test('it should call the handler from the hook', () => {
        const onChange = jest.fn()
        renderRecipeAlternativeOptionsAndPickAnOption(onChange)
        expect(onChange).toHaveBeenCalled()
      })
    })

    describe('when on details screen', () => {
      test('should call trackVariantListDisplay with details', () => {
        const dispatch = jest.fn()

        // Restore high level tracking mock and fake the code that it relies on
        // as within this test we want to check the deeper implementation of tracking
        // and check the event that is dispatched to the redux
        jest.spyOn(Tracking, 'useTrackVariantListDisplay').mockRestore()
        jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)

        renderForTest()

        expect(dispatch).toHaveBeenCalledWith({
          type: 'TRACK_VARIANT_RECIPE_LIST_DISPLAY',
          trackingData: {
            actionType: 'recipe_variant_action_sheet',
            view: 'details',
          },
        })
      })
    })

    describe('when NOT on details screen', () => {
      test('should call trackVariantListDisplay with grid', () => {
        const dispatch = jest.fn()

        // Restore high level tracking mock and fake the code that it relies on
        // as within this test we want to check the deeper implementation of tracking
        // and check the event that is dispatched to the redux
        jest.spyOn(Tracking, 'useTrackVariantListDisplay').mockRestore()
        jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)

        renderForTest(false)

        expect(dispatch).toHaveBeenCalledWith({
          type: 'TRACK_VARIANT_RECIPE_LIST_DISPLAY',
          trackingData: {
            actionType: 'recipe_variant_action_sheet',
            view: 'grid',
          },
        })
      })
    })
  })

  describe('When there are no recipe alternative options', () => {
    const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => [])

    beforeEach(() => {
      mockUseMenu(getAlternativeOptionsForRecipe)
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    test('it should not render the component', () => {
      renderForTest()
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  describe('When the options consist of just a selected recipe', () => {
    const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => [
      {
        recipeId: '111',
        recipeName: 'Test Recipe One',
        isChecked: true,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
    ])

    beforeEach(() => {
      mockUseMenu(getAlternativeOptionsForRecipe)
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    test('it should not render the component', () => {
      renderForTest()
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })
})
