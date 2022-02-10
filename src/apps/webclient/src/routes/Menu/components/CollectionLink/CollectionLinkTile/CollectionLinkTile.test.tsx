import Immutable from 'immutable'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import * as Menu from 'routes/Menu/domains/menu'
import * as Collections from 'routes/Menu/domains/collections'
import { CollectionLinkTile } from '.'
import { createCollectionFromDefaultValues } from '../../../domains/collections/internal/utils'

const defaultCollection = createCollectionFromDefaultValues({
  id: '101',
  published: true,
  default: true,
  slug: 'foo',
  shortTitle: 'Vegetarian',
})

describe('CollectionLinkTile', () => {
  const changeCollectionById = jest.fn()
  beforeEach(() => {
    jest.spyOn(Collections, 'useCollections').mockImplementation(
      () =>
        ({
          changeCollectionById,
        } as any)
    )
    jest.spyOn(Menu, 'useMenu').mockImplementation(
      () =>
        ({
          getRecipesForCollectionId: () => ({
            recipes: Immutable.List([
              {
                recipe: Immutable.fromJS({
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
        } as any)
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('rendering the CollectionLinkTile', () => {
    test('collection name should be displayed', () => {
      const renderOptions = () => render(<CollectionLinkTile collection={defaultCollection} />)
      renderOptions()
      const text = screen.getByText('Vegetarian')
      expect(text).toBeTruthy()
    })

    test('collection recipe image should be displayed', () => {
      const renderOptions = () => render(<CollectionLinkTile collection={defaultCollection} />)
      renderOptions()
      const image = screen.getByRole('img')
      expect(image).toBeTruthy()
      expect(image).toContainHTML(
        'https://production-media.gousto.co.uk/cms/mood-image/1457-Butternut-Squash--Coconut-Dal-x700.jpg'
      )
    })

    test('number of recipes in collection should be displayed', () => {
      const renderOptions = () => render(<CollectionLinkTile collection={defaultCollection} />)
      renderOptions()
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
        render(<CollectionLinkTile collection={defaultCollection} />)
        fireEvent.click(screen.getByRole('button'))
        expect(changeCollectionById).toHaveBeenCalledWith('101')
      })
    })

    describe('When there are no recipes', () => {
      beforeEach(() => {
        jest.spyOn(Collections, 'useCollections').mockImplementation(
          () =>
            ({
              changeCollectionById: (a: string) => {},
            } as any)
        )
        jest.spyOn(Menu, 'useMenu').mockImplementation(
          () =>
            ({
              getRecipesForCollectionId: (a: string) => ({ recipes: null }),
            } as any)
        )
      })

      afterEach(() => {
        jest.clearAllMocks()
      })
      test('should not render tile', () => {
        const renderOptions = () => render(<CollectionLinkTile collection={defaultCollection} />)
        renderOptions()
        const components = screen.queryAllByRole('button')
        expect(components).toHaveLength(0)
      })
    })
  })
})
