import { fireEvent, render, screen } from '@testing-library/react'
import { actionTypes } from 'actions/actionTypes'
import { filterProductCategory } from 'actions/filters'
import { productsLoadRecipePairings } from 'actions/products'
import { trackPairingsData } from 'actions/tracking'
import { marketCategory } from 'actions/trackingKeys'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import Immutable from 'immutable'
import React from 'react'
import * as Redux from 'react-redux'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import {
  mockGetProductRecipePairingsState,
  mockMarketProducts,
  mockProducts,
  mockProjectsCategories,
} from '../../config'
import { Market } from '../Market'

jest.mock('react-use', () => ({
  ...jest.requireActual('react-use'),
  useMedia: jest.fn().mockReturnValue(false),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

jest.mock('actions/products', () => ({
  ...jest.requireActual('actions/products'),
  productsLoadRecipePairings: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  ...jest.requireActual('actions/tracking'),
  trackPairingsData: jest.fn(),
}))

jest.mock('actions/filters', () => ({
  ...jest.requireActual('actions/filters'),
  filterProductCategory: jest.fn(),
}))

jest.mock('../../OrderSummary/OrderSummaryContainer', () => ({
  OrderSummaryContainer: jest.fn(() => 'OrderSummaryContainer'),
}))

jest.mock('../../ProductList', () => ({
  ProductList: jest.fn(() => 'ProductList'),
}))

jest.mock('../../ProductListPairings', () => ({
  ProductListPairings: jest.fn(() => 'ProductListPairings'),
}))

jest.mock('../../ReferAFriend', () => ({
  ReferAFriend: jest.fn(() => 'ReferAFriend'),
}))

jest.mock('Overlay', () => jest.fn(() => 'Overlay'))

describe('Market', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  const mockStore = configureMockStore()
  const state = {
    products: mockMarketProducts,
    productsCategories: mockProjectsCategories,
    productRecipePairings: mockGetProductRecipePairingsState(),
    menuRecipes: Immutable.fromJS(['2211']),
    basket: Immutable.fromJS({
      products: mockProducts,
      orderDetails: {
        period: {
          whenStart: '2022-05-17T11:00:00Z',
        },
        recipeItems: [
          {
            recipeId: '2211',
            title: 'Mock recipe title',
            media: [],
          },
        ],
      },
      numPortions: 2,
    }),
    recipes: Immutable.fromJS({
      100: {},
      200: {},
      300: {},
    }),
    pending: Immutable.fromJS({ [actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE]: false }),
    error: Immutable.fromJS({}),
    auth: Immutable.fromJS({
      accessToken: 'test-access-token',
    }),
    temp: Immutable.fromJS({}),
  }
  const mockedStore = mockStore(state)
  const dispatch = jest.fn()
  jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)

  test('should render MarketPresentation correctly', () => {
    ;(productsLoadRecipePairings as jest.Mock).mockReturnValue({
      type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
      recipeParings: {},
    })
    ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(false)
    ;(trackPairingsData as jest.Mock).mockReturnValue(trackPairingsData)

    render(
      <Provider store={mockedStore}>
        <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
      </Provider>,
    )

    expect(screen.getByTestId('MarketPresentation')).toBeInTheDocument()
    expect(screen.getByText(/All Products/i)).toBeInTheDocument()
    expect(screen.getByText(/Snacks/i)).toBeInTheDocument()
    expect(screen.getByText(/Drinks Cabinet/i)).toBeInTheDocument()
    expect(screen.getByText(/Open Order Summary/i)).toBeInTheDocument()
    expect(screen.getByText('ProductList')).toBeInTheDocument()
    expect(screen.getByText('OrderSummaryContainer')).toBeInTheDocument()
    expect(screen.getByText('ReferAFriend')).toBeInTheDocument()
    expect(screen.getByText('Overlay')).toBeInTheDocument()

    expect(dispatch).toBeCalledWith(productsLoadRecipePairings())
    expect(productsLoadRecipePairings).toBeCalledWith(['2211'], '2022-05-17T11:00:00Z')

    fireEvent.click(screen.getByRole('button', { name: /^Snacks \(\d\)$/i }))
    expect(filterProductCategory).toBeCalledWith(
      marketCategory,
      'clicked',
      'secondary_action',
      'Snacks',
      expect.any(Number),
      '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9',
    )

    fireEvent.click(screen.getByRole('button', { name: /^Drinks Cabinet \(\d\)$/i }))
    expect(filterProductCategory).toBeCalledWith(
      marketCategory,
      'clicked',
      'secondary_action',
      'Drinks Cabinet',
      expect.any(Number),
      'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9',
    )

    fireEvent.click(screen.getByRole('button', { name: /^All Products \(\d\)$/i }))
    expect(filterProductCategory).toBeCalledWith(
      marketCategory,
      'clicked',
      'secondary_action',
      'All Products',
      expect.any(Number),
      'all-products',
    )
  })

  describe('Pairings Experiment', () => {
    test('when user is not in experiment, should not render pairings or track pairings data', () => {
      ;(productsLoadRecipePairings as jest.Mock).mockReturnValue({
        type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
        recipeParings: {},
      })
      ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(false)
      ;(trackPairingsData as jest.Mock).mockReturnValue(trackPairingsData)

      render(
        <Provider store={mockedStore}>
          <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
        </Provider>,
      )

      expect(screen.queryByText('ProductListPairings')).not.toBeInTheDocument()
      expect(screen.queryByText(/^Pairings \(\d\)$/i)).not.toBeInTheDocument()
      expect(screen.getByText('ProductList')).toBeInTheDocument()

      expect(dispatch).not.toBeCalledWith(trackPairingsData)
      expect(trackPairingsData).not.toBeCalled()
    })

    describe('when user is in experiment', () => {
      test('should render pairings and track pairings data', () => {
        ;(productsLoadRecipePairings as jest.Mock).mockReturnValue({
          type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
          recipeParings: {},
        })
        ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(true)
        ;(trackPairingsData as jest.Mock).mockReturnValue(trackPairingsData)

        render(
          <Provider store={mockedStore}>
            <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
          </Provider>,
        )

        expect(screen.getByText('ProductListPairings')).toBeInTheDocument()
        expect(screen.getByText(/^Pairings \(\d\)$/i)).toBeInTheDocument()
        expect(screen.queryByText('ProductList')).not.toBeInTheDocument()

        expect(dispatch).toBeCalledWith(trackPairingsData)
        expect(trackPairingsData).toBeCalled()

        fireEvent.click(screen.getByRole('button', { name: /^Pairings \(\d\)$/i }))
        expect(filterProductCategory).toBeCalledWith(
          marketCategory,
          'clicked',
          'secondary_action',
          'Pairings',
          expect.any(Number),
          'pairings',
        )
      })

      test('should not render pairings when the user has no matching recipes', () => {
        ;(productsLoadRecipePairings as jest.Mock).mockReturnValue({
          type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
          recipeParings: {},
        })
        ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(true)
        ;(trackPairingsData as jest.Mock).mockReturnValue(trackPairingsData)

        const newStore = mockStore({
          ...state,
          basket: state.basket.setIn(
            ['orderDetails', 'recipeItems'],
            Immutable.fromJS([
              {
                recipeId: '1234',
                title: 'Mock recipe title',
                media: [],
              },
            ]),
          ),
        })

        render(
          <Provider store={newStore}>
            <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
          </Provider>,
        )

        expect(screen.queryByText('ProductListPairings')).not.toBeInTheDocument()
        expect(screen.getByText('ProductList')).toBeInTheDocument()

        expect(dispatch).not.toBeCalledWith(trackPairingsData)
        expect(trackPairingsData).not.toBeCalled()
      })

      test('should not render pairings when productRecipePairings has not products', () => {
        ;(productsLoadRecipePairings as jest.Mock).mockReturnValue({
          type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
          recipeParings: {},
        })
        ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(true)
        ;(trackPairingsData as jest.Mock).mockReturnValue(trackPairingsData)

        const newStore = mockStore({
          ...state,
          productRecipePairings: state.productRecipePairings.setIn(
            ['2211', 'products'],
            Immutable.fromJS([]),
          ),
        })

        render(
          <Provider store={newStore}>
            <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
          </Provider>,
        )

        expect(screen.queryByText('ProductListPairings')).not.toBeInTheDocument()
        expect(screen.getByText('ProductList')).toBeInTheDocument()

        expect(dispatch).not.toBeCalledWith(trackPairingsData)
        expect(trackPairingsData).not.toBeCalled()
      })

      test('should not render pairings when productRecipePairings data is empty', () => {
        ;(productsLoadRecipePairings as jest.Mock).mockReturnValue({
          type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
          recipeParings: {},
        })
        ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(true)
        ;(trackPairingsData as jest.Mock).mockReturnValue(trackPairingsData)

        const newStore = mockStore({
          ...state,
          productRecipePairings: Immutable.fromJS({}),
        })

        render(
          <Provider store={newStore}>
            <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
          </Provider>,
        )

        expect(screen.queryByText('ProductListPairings')).not.toBeInTheDocument()
        expect(screen.getByText('ProductList')).toBeInTheDocument()

        expect(dispatch).not.toBeCalledWith(trackPairingsData)
        expect(trackPairingsData).not.toBeCalled()
      })
    })

    test('should not render pairings when productRecipePairings is not a Map', () => {
      ;(productsLoadRecipePairings as jest.Mock).mockReturnValue({
        type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
        recipeParings: {},
      })
      ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(true)
      ;(trackPairingsData as jest.Mock).mockReturnValue(trackPairingsData)

      const newStore = mockStore({
        ...state,
        productRecipePairings: Immutable.fromJS([]),
      })

      render(
        <Provider store={newStore}>
          <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
        </Provider>,
      )

      expect(screen.queryByText('ProductListPairings')).not.toBeInTheDocument()
      expect(screen.getByText('ProductList')).toBeInTheDocument()

      expect(dispatch).not.toBeCalledWith(trackPairingsData)
      expect(trackPairingsData).not.toBeCalled()
    })
  })
})
