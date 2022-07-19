import React from 'react'

import { render, screen } from '@testing-library/react'
import Immutable from 'immutable'

import { RecipeTile, RecipeTileDependencies } from '@features/recipe-tile'

import { useMenu } from 'routes/Menu/domains/menu'

import { RecipeTileBridge } from './RecipeTileBridge'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('./SwapAlternativeOptions/useTracking', () => ({
  useTracking: () => ({
    trackRecipeAlternativeOptionsMenuOpen: jest.fn(),
    trackRecipeAlternativeOptionsMenuSwapRecipes: jest.fn(),
  }),
}))

jest.mock('@features/recipe-tile', () => ({
  RecipeTile: jest.fn().mockImplementation(() => <>Mock Recipe Tile</>),
  RecipeTileDependencies: jest.fn().mockImplementation(({ children }) => <>{children}</>),
}))

jest.mock('routes/Menu/domains/menu')
const useMenuMock = useMenu as jest.MockedFunction<typeof useMenu>

useMenuMock.mockReturnValue({
  getRecipesForCollectionId: () => [],
  getOptionsForRecipe: () => [],
  menuRecipes: [],
  isPending: false,
})

describe('RecipeTileBridge', () => {
  describe('when executed', () => {
    it('renders a recipe tile', () => {
      render(
        <RecipeTileBridge
          recipeReference="recipe_reference"
          recipe={Immutable.fromJS({ id: 'some reference ' })}
          originalId="original_recipe_id"
          collectionId="collection_identificator"
        />,
      )

      expect(RecipeTile).toBeCalledTimes(1)
      expect(RecipeTileDependencies).toBeCalledTimes(1)

      expect(screen.getByText('Mock Recipe Tile')).toBeInTheDocument()
    })
  })
})
