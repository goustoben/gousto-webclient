import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'

import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import * as Collections from 'routes/Menu/domains/collections'
import * as Menu from 'routes/Menu/domains/menu'

import { createCollectionFromDefaultValues } from '../../../domains/collections/internal/utils'
import { CollectionLinkTile } from './CollectionLinkTile'
import * as Tracking from './tracking'

const defaultCollection = createCollectionFromDefaultValues({
  id: '101',
  published: true,
  default: true,
  slug: 'foo',
  shortTitle: 'Vegetarian',
})

const recipeId = 'recipe-id-1'

describe('CollectionLinkTile', () => {
  const track = jest.fn()
  const changeCollectionById = jest.fn()
  beforeEach(() => {
    jest.spyOn(Collections, 'useCollections').mockImplementation(
      () =>
        ({
          changeCollectionById,
        } as any),
    )

    jest.spyOn(Tracking, 'useTracking').mockImplementation(() => track as any)

    jest.spyOn(Menu, 'useMenu').mockImplementation(
      () =>
        ({
          getRecipesForCollectionId: () => ({
            recipes: Immutable.List([
              {
                recipe: Immutable.fromJS({
                  id: recipeId,
                  media: {
                    images: [
                      {
                        type: 'mood-image',
                        title: 'Nice image',
                        urls: [
                          {
                            src: 'https://production-media.gousto.co.uk/cms/mood-image/1457-Butternut-Squash--Coconut-Dal-x700.jpg',
                            width: 700,
                          },
                        ],
                      },
                    ],
                  },
                }),
              },
              'recipe2',
            ]),
          }),
        } as any),
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const store = createMockStore({})
  const renderForTest = () =>
    render(
      <Provider store={store}>
        <CollectionLinkTile collection={defaultCollection} />
      </Provider>,
    )

  describe('rendering the CollectionLinkTile', () => {
    test('collection name should be displayed', () => {
      renderForTest()

      const text = screen.getByText('Vegetarian')

      expect(text).toBeTruthy()
    })

    test('collection recipe image should be displayed', () => {
      renderForTest()

      const image = screen.getByRole('img')
      expect(image).toBeTruthy()
      expect(image).toContainHTML(
        'https://production-media.gousto.co.uk/cms/mood-image/1457-Butternut-Squash--Coconut-Dal-x700.jpg',
      )
    })

    test('number of recipes in collection should be displayed', () => {
      renderForTest()

      const recipeNumbers = screen.getByText('(2)')
      expect(recipeNumbers).toBeTruthy()
    })

    describe('When there are recipes in a collection', () => {
      test('should render tiles', () => {
        const renderOptions = () => render(<CollectionLinkTile collection={defaultCollection} />)
        renderOptions()
        const components = screen.queryAllByRole('button')
        expect(components).toHaveLength(1)
      })

      test('clicking a tile should link to a new collection', () => {
        renderForTest()

        fireEvent.click(screen.getByRole('button'))

        expect(changeCollectionById).toHaveBeenCalledWith('101')
      })

      test('clicking a tile should track correctly', () => {
        renderForTest()

        fireEvent.click(screen.getByRole('button'))

        expect(track).toHaveBeenCalledWith({
          targetCollectionId: defaultCollection.get('id'),
          recipeId,
        })
      })
    })

    describe('When there are no recipes', () => {
      beforeEach(() => {
        jest.spyOn(Collections, 'useCollections').mockImplementation(
          () =>
            ({
              changeCollectionById: (_a: string) => {},
            } as any),
        )
        jest.spyOn(Menu, 'useMenu').mockImplementation(
          () =>
            ({
              getRecipesForCollectionId: (_a: string) => ({ recipes: Immutable.List() }),
            } as any),
        )
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      test('should not render tile', () => {
        renderForTest()

        const components = screen.queryAllByRole('button')
        expect(components).toHaveLength(0)
      })
    })
  })
})
