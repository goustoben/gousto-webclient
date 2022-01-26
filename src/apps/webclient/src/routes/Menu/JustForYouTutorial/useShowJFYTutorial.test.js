import React from 'react'
import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import * as TutorialActions from 'actions/tutorial'
import { useShowJFYTutorial } from './useShowJFYTutorial'

describe('useShowJFYTutorial', () => {
  beforeEach(() => {
    jest.spyOn(TutorialActions, 'tutorialTracking')
      .mockImplementation(() => ({type: 'foo'}))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when used in different browsers', () => {
    describe('when browser is Edge', () => {
      test('should not render', () => {
        const { result } = renderUseShowCFYTutorialHook({userAgent: 'Edge'})
        expect(result.current).toEqual(false)
      })
    })

    describe('when browser is IE', () => {
      test('should not render', () => {
        const { result } = renderUseShowCFYTutorialHook({userAgent: 'Trident'})
        expect(result.current).toEqual(false)
      })
    })

    describe('when browser is Chrome', () => {
      test('should render', () => {
        const { result } = renderUseShowCFYTutorialHook({userAgent: 'Chrome'})
        expect(result.current).toEqual(true)
      })
    })
  })

  describe('when JustForYou Tutorial already seen', () => {
    test('should not render', () => {
      const { result } = renderUseShowCFYTutorialHook({
        tutorial: Immutable.fromJS({
          viewed: {
            justforyou: 1,
          },
        }),
      })
      expect(result.current).toEqual(false)
    })
  })

  describe('when there are no Recommendations yet', () => {
    test('should not render', () => {
      const { result } = renderUseShowCFYTutorialHook({
        enableRecommendationCollection: false,
      })
      expect(result.current).toEqual(false)
    })
  })

  describe('when there is Generic personal recommendation (one suggested to all new customer)', () => {
    test('should not render', () => {
      const { result } = renderUseShowCFYTutorialHook({
        enableRecommendationCollection: true,
        recommendationsBasedOnPurchaseHistory: false,
      })
      expect(result.current).toEqual(false)
    })
  })

  describe('when there is Personal recommendation (one based on purchase history)', () => {
    test('should not render', () => {
      const { result } = renderUseShowCFYTutorialHook({
        enableRecommendationCollection: true,
        recommendationsBasedOnPurchaseHistory: true,
      })
      expect(result.current).toEqual(true)
    })
  })
})

const renderUseShowCFYTutorialHook = ({
  userAgent = 'Chrome',
  tutorial = Immutable.fromJS({}),
  enableRecommendationCollection = true,
  recommendationsBasedOnPurchaseHistory = true,
} = {}) => {
  const mockStore = configureMockStore()
  const RECIPE_1 = Immutable.Map({ id: 'aaaa' })
  const RECIPE_2 = Immutable.Map({ id: 'bbbb' })
  const RECIPE_3 = Immutable.Map({ id: 'cccc' })
  const RECIPE_4 = Immutable.Map({ id: 'dddd' })

  const COLLECTION_RECOMMENDATION = Immutable.Map({
    id: 'recomendation-collection',
    published: true,
    shortTitle: 'Recommendations',
    slug: 'recommendations',
    recipesInCollection: Immutable.List([RECIPE_1, RECIPE_2, RECIPE_3, RECIPE_4].map(r => r.get('id'))),
    properties: Immutable.fromJS({
      ...(recommendationsBasedOnPurchaseHistory && {tutorial: 'jfy'}),
    }),
  })

  const COLLECTION_ONE = Immutable.Map({
    id: 'one-collection',
    published: true,
    shortTitle: 'Collection One',
    slug: 'one',
    recipesInCollection: Immutable.List([RECIPE_1, RECIPE_2].map(r => r.get('id')))
  })

  const initialState = {
    recipes: {
      [RECIPE_1.get('id')]: RECIPE_1,
      [RECIPE_2.get('id')]: RECIPE_2,
      [RECIPE_3.get('id')]: RECIPE_3,
      [RECIPE_4.get('id')]: RECIPE_4,
    },
    menuRecipes: [
      RECIPE_1.get('id'),
      RECIPE_2.get('id'),
      RECIPE_3.get('id'),
      RECIPE_4.get('id'),
    ],
    menuCollections: Immutable.fromJS({
      ...( enableRecommendationCollection && {[COLLECTION_RECOMMENDATION.get('id')]: COLLECTION_RECOMMENDATION }),
      [COLLECTION_ONE.get('id')]: COLLECTION_ONE,
    }),
    menuRecipeStock: Immutable.fromJS({
      [RECIPE_1.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_2.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_3.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_4.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
    }),
    auth: Immutable.fromJS({}),
    basket: Immutable.fromJS({
      numPortions: 2,

    }),
    request: Immutable.fromJS({
      userAgent,
    }),
    tutorial,
    routing: {
      locationBeforeTransitions: {
        query: {}
      }
    },
  }
  const store = mockStore(initialState)

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  return renderHook(() => useShowJFYTutorial(), { wrapper })
}
