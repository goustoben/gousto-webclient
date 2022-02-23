import { Provider } from 'react-redux'
import Immutable from 'immutable'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as Collections from 'routes/Menu/domains/collections'
import * as Menu from 'routes/Menu/domains/menu'
import { MenuCollection } from 'routes/Menu/types'
import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import * as UseDisplayedCollections from './useDietaryCollections'
import { CollectionLink } from '.'
import { createCollectionFromDefaultValues } from '../../domains/collections/internal/utils'

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

describe('CollectionLink', () => {
  beforeEach(() => {
    jest
      .spyOn(UseDisplayedCollections, 'useDietaryCollections')
      .mockImplementation(() =>
        Immutable.OrderedMap({ a: defaultCollection, b: collectionTwo, c: collectionThree })
      )

    jest.spyOn(Collections, 'useCollections').mockImplementation(
      () =>
        ({
          changeCollectionById: (a: string) => {},
        } as any)
    )
    jest.spyOn(Menu, 'useMenu').mockImplementation(
      () =>
        ({
          getRecipesForCollectionId: (a: string) => ({
            recipes: Immutable.List([
              {
                recipe: Immutable.Map({
                  id: 'recipe-one',
                }),
                originalId: 'recipe-one',
              },
            ]),
          }),
        } as any)
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const store = createMockStore({})
  const renderForTest = () =>
    render(
      <Provider store={store}>
        <CollectionLink />
      </Provider>
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
