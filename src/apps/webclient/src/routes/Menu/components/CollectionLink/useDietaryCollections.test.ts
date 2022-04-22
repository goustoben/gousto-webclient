import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import * as UseDisplayedCollections from '../../domains/collections/internal/useDisplayedCollections'
import { createCollectionFromDefaultValues } from '../../domains/collections/internal/utils'
import { useDietaryCollections } from './useDietaryCollections'

const vegetarianCollection = createCollectionFromDefaultValues({
  id: '5c117c20-8b05-11e6-8538-065f01f5b2df',
  published: true,
  default: true,
  slug: 'foo',
})
const veganCollection = createCollectionFromDefaultValues({
  id: '77d1eb54-e3e5-11e7-bf51-06543e25a81c',
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

afterEach(() => {
  jest.clearAllMocks()
})
describe('useDietaryCollections', () => {
  describe('when collection id matches one of the dietary collections', () => {
    beforeEach(() => {
      jest.spyOn(UseDisplayedCollections, 'useDisplayedCollections').mockImplementation(() =>
        Immutable.OrderedMap({
          a: vegetarianCollection,
          b: veganCollection,
          c: collectionThree,
        }),
      )
    })
    test('should return two dietary collections', () => {
      const { result } = renderHook(() => useDietaryCollections())
      expect(result.current).toEqual(
        Immutable.OrderedMap({ a: vegetarianCollection, b: veganCollection }),
      )
    })
  })

  describe('when there are displayed collection but none of them are dietary', () => {
    beforeEach(() => {
      jest
        .spyOn(UseDisplayedCollections, 'useDisplayedCollections')
        .mockImplementation(() => Immutable.OrderedMap({ c: collectionThree }))
    })
    test('should return no dietary collections', () => {
      const { result } = renderHook(() => useDietaryCollections())
      expect(result.current).toEqual(Immutable.OrderedMap({}))
    })
  })

  describe('when displayed collections is an empty map', () => {
    beforeEach(() => {
      jest
        .spyOn(UseDisplayedCollections, 'useDisplayedCollections')
        .mockImplementation(() => Immutable.OrderedMap({}))
    })
    test('should return no dietary collections', () => {
      const { result } = renderHook(() => useDietaryCollections())
      expect(result.current).toEqual(Immutable.OrderedMap({}))
    })
  })

  describe('when displayed collections is null', () => {
    beforeEach(() => {
      const nullGenerator = () => null as any
      jest
        .spyOn(UseDisplayedCollections, 'useDisplayedCollections')
        .mockImplementation(nullGenerator)
    })
    test('should return no dietary collections', () => {
      const { result } = renderHook(() => useDietaryCollections())
      expect(result.current).toEqual(Immutable.OrderedMap({}))
    })
  })
})
