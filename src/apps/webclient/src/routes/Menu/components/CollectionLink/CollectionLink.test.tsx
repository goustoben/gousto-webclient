import React from 'react'

import { render, screen } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'

import { Recipe } from '@library/api-menu-service'

import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import * as Collections from 'routes/Menu/domains/collections'
import { useMenu } from 'routes/Menu/domains/menu'
import { MenuCollection } from 'routes/Menu/types'

import { createCollectionFromDefaultValues } from '../../domains/collections/internal/utils'
import { CollectionLink } from './CollectionLink'
import * as UseDisplayedCollections from './useDietaryCollections'

const defaultCollection = createCollectionFromDefaultValues({
  id: '101',
  published: true,
  default: true,
  slug: 'foo',
})
const collectionTwo = createCollectionFromDefaultValues({
  id: '102',
  published: true,
  default: true,
  slug: 'foo',
})
const collectionThree = createCollectionFromDefaultValues({
  id: '103',
  published: true,
  default: true,
  slug: 'foo',
})

jest.mock('routes/Menu/domains/menu')
const useMenuMock = useMenu as jest.MockedFunction<typeof useMenu>

describe('CollectionLink', () => {
  beforeEach(() => {
    jest
      .spyOn(UseDisplayedCollections, 'useDietaryCollections')
      .mockImplementation(() =>
        Immutable.OrderedMap({ a: defaultCollection, b: collectionTwo, c: collectionThree }),
      )

    jest.spyOn(Collections, 'useCollections').mockImplementation(
      () =>
        ({
          changeCollectionById: (_a: string) => {},
        } as any),
    )
    useMenuMock.mockReturnValue({
      getRecipesForCollectionId: () => [
        {
          recipe: {
            id: 'recipe-one',
            media: {
              images: [
                {
                  title: '',
                  description: '',
                  type: 'mood-image',
                  urls: [
                    {
                      width: 200,
                      src: '',
                    },
                  ],
                },
              ],
            },
          } as Recipe,
          originalId: 'recipe-one',
          reference: 'recipe-one',
        },
      ],
      getOptionsForRecipe: () => [],
      menuRecipes: [],
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const store = createMockStore({})
  const renderForTest = () =>
    render(
      <Provider store={store}>
        <CollectionLink />
      </Provider>,
    )

  describe('rendering the CollectionLink', () => {
    describe('when there is at least one collection', () => {
      test('title should be displayed', () => {
        renderForTest()

        const text = screen.getByText('Looking for something?')
        expect(text).toBeTruthy()
      })

      test('subtitle should be displayed', () => {
        renderForTest()

        const text = screen.getByText('Explore categories to find the perfect recipes.')
        expect(text).toBeTruthy()
      })

      test.only('the CollectionLinkTile should be rendered for each collection', () => {
        renderForTest()

        const components = screen.getAllByRole('button')
        expect(components).toHaveLength(3)
      })
    })

    describe('when there are not any collections', () => {
      beforeEach(() => {
        jest
          .spyOn(UseDisplayedCollections, 'useDietaryCollections')
          .mockImplementation(() => Immutable.OrderedMap<string, MenuCollection>({}))
      })

      test('then the CollectionLinkTile should not be rendered', () => {
        renderForTest()

        const components = screen.queryAllByRole('button')
        expect(components).toHaveLength(0)
      })
    })
  })
})
