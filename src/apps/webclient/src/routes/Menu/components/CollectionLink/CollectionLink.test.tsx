import Immutable from 'immutable'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as Collections from 'routes/Menu/domains/collections'
import * as Menu from 'routes/Menu/domains/menu'
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
          getRecipesForCollectionId: (a: string) => ({ recipes: Immutable.fromJS(['recipe one']) }),
        } as any)
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering the CollectionLink', () => {
    test('title should be displayed', () => {
      const renderOptions = () => render(<CollectionLink />)
      renderOptions()
      const text = screen.getByText('Looking for something?')
      expect(text).toBeTruthy()
    })

    test('subtitle should be displayed', () => {
      const renderOptions = () => render(<CollectionLink />)
      renderOptions()
      const text = screen.getByText('Explore categories to find the perfect recipes.')
      expect(text).toBeTruthy()
    })
    describe('When there is at least one collection', () => {
      test('Then the CollectionLinkTile should be rendered for each collection', () => {
        const renderOptions = () => render(<CollectionLink />)
        renderOptions()
        const components = screen.getAllByRole('button')
        expect(components).toHaveLength(3)
      })
    })
    describe('When there are not any collections', () => {
      beforeEach(() => {
        jest
          .spyOn(UseDisplayedCollections, 'useDietaryCollections')
          .mockImplementation((() => null) as any)
      })

      test('Then the CollectionLinkTile should not be rendered', () => {
        const renderOptions = () => render(<CollectionLink />)
        renderOptions()
        const components = screen.queryAllByRole('button')
        expect(components).toHaveLength(0)
      })
    })
  })
})
