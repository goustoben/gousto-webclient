import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import {
  isAllRecipes,
  isDefault,
  sortCollections,
  getCollectionIdWithName,
  getDefaultCollectionId,
} from 'utils/collections'

describe('utils/collections', () => {
  describe('isAllRecipes', () => {
    test('should return true for a collection which is the "All Recipes" collection', () => {
      const collection = Immutable.Map({ shortTitle: 'All Recipes' })
      const result = isAllRecipes(collection)
      expect(result).toEqual(true)
    })
    test('should return false for a collection which is not the "All Recipes" collection', () => {
      const collection = Immutable.Map({ shortTitle: 'not All Recipes' })
      const result = isAllRecipes(collection)
      expect(result).toEqual(false)
    })
  })
  describe('isDefault', () => {
    test('should return true for a collection which has default true', () => {
      const collection = Immutable.Map({
        shortTitle: 'Many Recipes',
        default: true,
      })
      const result = isDefault(collection)
      expect(result).toEqual(true)
    })
    test('should return false for a collection which is not default', () => {
      const collection = Immutable.Map({
        shortTitle: 'Many Recipes',
        default: false,
      })
      const result = isDefault(collection)
      expect(result).toEqual(false)
    })
  })
  describe('getCollectionIdWithName', () => {
    let state

    beforeEach(() => {
      state = {
        features: Immutable.Map(),
        menuCollections: Immutable.fromJS([
          {
            published: true,
            shortTitle: 'something',
            slug: 'something',
            id: '123',
            default: true,
          },
          {
            published: true,
            shortTitle: 'some&thi!ng@s0m3where strange',
            slug: 'somethings0m3where-strange',
            id: '234',
          },
          { published: false, shortTitle: 'secret', slug: 'secret', id: '456' },
        ]),
        menuCollectionRecipes: Immutable.fromJS({
          123: ['', '', ''],
          234: ['', '', ''],
          456: ['', '', ''],
        }),
      }
    })

    test('should return the ID of the collection which has the name passed in', () => {
      const result = getCollectionIdWithName(state, 'something')
      expect(result).toEqual('123')
    })
    test('should return null if it cant find the collection specified', () => {
      const result = getCollectionIdWithName(state, 'something not there')
      expect(result).toEqual(null)
    })
    test('should cope with special characters', () => {
      const result = getCollectionIdWithName(
        state,
        'somethings0m3where-strange',
      )
      expect(result).toEqual('234')
    })
    test('should cope with null', () => {
      const result = getCollectionIdWithName(state, null)
      expect(result).toEqual(null)
    })
    test('should return null for collections which dont have recipes', () => {
      state = {
        features: Immutable.Map(),
        menuCollections: Immutable.fromJS([
          {
            published: true,
            shortTitle: 'something',
            slug: 'something',
            id: '123',
            default: true,
          },
          {
            published: true,
            shortTitle: 'some&thi!ng@s0m3where strange',
            slug: 'some&thi!ng@s0m3where strange',
            id: '234',
          },
          { published: false, shortTitle: 'secret', id: '456' },
        ]),
        menuCollectionRecipes: Immutable.fromJS({
          123: [],
          234: ['', '', ''],
          456: ['', '', ''],
        }),
      }
      const result = getCollectionIdWithName(state, 'something')
      expect(result).toEqual(null)
    })
    test('should cope with undefined', () => {
      const result = getCollectionIdWithName(state, undefined)
      expect(result).toEqual(null)
    })
    test('should not return the ID of an unpublished collection which has the name passed in', () => {
      const result = getCollectionIdWithName(state, 'secret')
      expect(result).toEqual(null)
    })
    test('should cope with an undefined features property of the state', () => {
      delete state.features
      const result = getCollectionIdWithName(state, undefined)
      expect(result).toEqual(null)
    })
    test('should cope with an undefined menuCollections property of the state', () => {
      delete state.menuCollections
      const result = getCollectionIdWithName(state, undefined)
      expect(result).toEqual(null)
    })
    test('should cope with an undefined state', () => {
      const result = getCollectionIdWithName(undefined, undefined)
      expect(result).toEqual(null)
    })
  })

  describe('getDefaultCollectionId', () => {
    let state

    beforeEach(() => {
      state = {
        menuCollections: Immutable.fromJS([
          {
            published: true,
            shortTitle: 'something',
            slug: 'something',
            id: '123'
          },
          {
            published: true,
            shortTitle: 'some&thi!ng@s0m3where strange',
            id: '234',
          },
          { published: false, shortTitle: 'secret', id: '456' },
          {
            published: true,
            shortTitle: 'all recipes',
            id: '567',
            default: true,
          },
        ]),
      }
    })

    test('should return the collection id which is default', () => {
      const result = getDefaultCollectionId(state)
      expect(result).toEqual('567')
    })

    test('should return first collection id if no collection default', () => {
      const newState = {
        menuCollections: Immutable.fromJS([
          {
            published: true,
            shortTitle: 'something',
            slug: 'something',
            id: '123',
            default: false,
          },
          {
            published: true,
            shortTitle: 'some&thi!ng@s0m3where strange',
            id: '234',
            default: false,
          },
          { published: false, shortTitle: 'secret', id: '456' },
          {
            published: true,
            shortTitle: 'all recipes',
            id: '567',
            default: false,
          },
        ]),
      }
      const result = getDefaultCollectionId(newState)
      expect(result).toEqual(newState.menuCollections.first().get('id'))
    })
  })
})
