import React from 'react'
import { shallow } from 'enzyme'
import { safeJestMock } from '_testing/mocks'
import * as recipeListSelectors from '../selectors/recipeList'
import * as menuSelectors from '../selectors/menu'
import { DietaryRequirementsPageContainer } from './DietaryRequirementsPageContainer'
import { DietaryRequirementsPage } from './DietaryRequirementsPage'

const mockedIsMenuLoading = safeJestMock(menuSelectors, 'isMenuLoading')
const mockedGetRecipesByCollectionSlugs = safeJestMock(recipeListSelectors, 'getRecipesByCollectionSlugs')
const wrapperOptions = {
  context: {
    store: {
      getState: () => ({ mock: 'state' }),
      dispatch: () => {},
      subscribe: () => {},
    }
  }
}

describe('DietaryRequirementsPageContainer', () => {
  let wrapper

  beforeEach(() => {
    mockedGetRecipesByCollectionSlugs.mockReturnValue([])

    mockedIsMenuLoading.mockReturnValue(true)

    wrapper = shallow(
      <DietaryRequirementsPageContainer />,
      wrapperOptions
    )
  })

  test('calls getRecipesByCollectionSlugs with correct arguments', () => {
    expect(mockedGetRecipesByCollectionSlugs).toHaveBeenCalledWith({ mock: 'state' }, {
      collectionSlugs: [
        'dairy-free',
        'gluten-free',
        'vegetarian',
        'plant-based',
      ]}
    )
  })

  test('calls isMenuLoading with the correct arguments', () => {
    expect(mockedIsMenuLoading).toHaveBeenCalledWith({ mock: 'state' })
  })

  test('renders <DietaryRequirementsPage /> with correct props', () => {
    const dietaryPage = wrapper.find(DietaryRequirementsPage)

    expect(dietaryPage.prop('recipesForCollections')).toEqual([])

    expect(dietaryPage.prop('isMenuLoading')).toBe(true)
  })
})
