import React from 'react'
import { shallow } from 'enzyme'
import { safeJestMock } from '_testing/mocks'
import * as filterActions from 'actions/filters'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import * as menuViewAllButtonActions from '../../actions/menuViewAllButton'
import { ViewAllRecipesButtonContainer } from './ViewAllRecipesButtonContainer'
import { ViewAllRecipesButton } from './ViewAllRecipesButton'

const mockedCollectionFilterChange = safeJestMock(filterActions, 'collectionFilterChange')
const mockedViewAllFooterButtonClicked = safeJestMock(menuViewAllButtonActions, 'viewAllFooterButtonClicked')

describe('ViewAllRecipesButtonContainer', () => {
  let wrapper
  let dispatch

  beforeEach(() => {
    mockedCollectionFilterChange.mockReturnValue('mocked-collection-filter-change')
    mockedViewAllFooterButtonClicked.mockReturnValue('mocked-view-all-footer-button-clicked')

    dispatch = jest.fn()

    wrapper = shallow(
      <ViewAllRecipesButtonContainer />,
      {
        context: {
          store: {
            getState: () => ({ mock: 'state' }),
            dispatch,
            subscribe: () => {},
          }
        }
      }
    )
  })

  test('renders <ViewAllRecipesButton /> with correct props', () => {
    const viewAllRecipes = wrapper.find(ViewAllRecipesButton)

    expect(viewAllRecipes).toHaveLength(1)
    expect(viewAllRecipes.prop('onClick')).toBeInstanceOf(Function)
  })

  describe('When onClick is called', () => {
    test('dispatches an action to change collection filter', () => {
      wrapper.prop('onClick')()

      expect(mockedCollectionFilterChange).toHaveBeenCalledWith(ALL_RECIPES_COLLECTION_ID)
      expect(dispatch).toHaveBeenCalledWith('mocked-collection-filter-change')
    })

    test('dispatches an action to track button click', () => {
      wrapper.prop('onClick')()

      expect(mockedViewAllFooterButtonClicked).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith('mocked-view-all-footer-button-clicked')
    })
  })
})
