import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import * as Redux from 'react-redux'
import * as Menu from 'routes/Menu/domains/menu'
import * as Tracking from './useTracking'
import { RecipeAlternativeOptions } from '.'

describe('RecipeAlternativeOptions', () => {
  describe('When there are recipe alternative options', () => {
    const changeCheckedRecipeTwo = jest.fn()

    const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => [
      {
        recipeId: '111',
        recipeName: 'Test Recipe One',
        changeCheckedRecipe: () => {},
        isChecked: true,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
      {
        recipeId: '222',
        recipeName: 'Test Recipe Two',
        changeCheckedRecipe: changeCheckedRecipeTwo,
        isChecked: false,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
    ])

    beforeEach(() => {
      jest.spyOn(Menu, 'useMenu').mockImplementation(() => ({ getAlternativeOptionsForRecipe }))
      jest.spyOn(Tracking, 'useTrackVariantListDisplay').mockImplementation()
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    const renderRecipeAlternativeOptions = () =>
      render(
        <RecipeAlternativeOptions
          originalId="recipe_1"
          recipeId="recipe_1"
          isOnDetailScreen
          categoryId="category_1"
        />,
      )

    test('it should render recipe list', () => {
      renderRecipeAlternativeOptions()
      expect(screen.queryByRole('list')).toBeInTheDocument()

      const items = screen.getAllByRole('listitem')
      expect(items.length).toEqual(2)
      expect(items[0]).toHaveTextContent(/Test Recipe One/)
      expect(items[1]).toHaveTextContent(/Test Recipe Two/)

      expect(getAlternativeOptionsForRecipe).toHaveBeenCalledWith({
        categoryId: 'category_1',
        closeOnSelection: false,
        isOnDetailScreen: true,
        originalId: 'recipe_1',
        recipeId: 'recipe_1',
      })
    })

    describe('when user click on option item', () => {
      const renderRecipeAlternativeOptionsAndPickAnOption = () => {
        render(
          <RecipeAlternativeOptions
            originalId="recipe_1"
            recipeId="recipe_1"
            isOnDetailScreen
            categoryId="category_1"
          />,
        )

        // Pick second item on the list
        fireEvent.click(screen.getAllByRole('radio')[1])
      }

      test('it should call the handler from the hook', () => {
        renderRecipeAlternativeOptionsAndPickAnOption()
        expect(changeCheckedRecipeTwo).toHaveBeenCalled()
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

        render(
          <RecipeAlternativeOptions
            originalId="recipe_1"
            recipeId="recipe_1"
            isOnDetailScreen
            categoryId="category_1"
          />,
        )

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

        render(
          <RecipeAlternativeOptions
            originalId="recipe_1"
            recipeId="recipe_1"
            isOnDetailScreen={false}
            categoryId="category_1"
          />,
        )

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
      jest.spyOn(Menu, 'useMenu').mockImplementation(() => ({ getAlternativeOptionsForRecipe }))
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    const renderRecipeAlternativeOptions = () =>
      render(
        <RecipeAlternativeOptions
          originalId="recipe_1"
          recipeId="recipe_1"
          isOnDetailScreen
          categoryId="category_1"
        />,
      )

    test('it should not render the component', () => {
      renderRecipeAlternativeOptions()
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  describe('When the options consist of just a selected recipe', () => {
    const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => [
      {
        recipeId: '111',
        recipeName: 'Test Recipe One',
        changeCheckedRecipe: () => {},
        isChecked: true,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
    ])

    beforeEach(() => {
      jest.spyOn(Menu, 'useMenu').mockImplementation(() => ({ getAlternativeOptionsForRecipe }))
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    const renderRecipeAlternativeOptions = () =>
      render(
        <RecipeAlternativeOptions
          originalId="recipe_1"
          recipeId="recipe_1"
          isOnDetailScreen
          categoryId="category_1"
        />,
      )

    test('it should not render the component', () => {
      renderRecipeAlternativeOptions()
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })
})
