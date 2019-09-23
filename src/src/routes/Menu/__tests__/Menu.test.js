import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable'

import fetchData from 'routes/Menu/fetchData'

import { forceCheck } from 'react-lazyload'
import Menu from 'routes/Menu/Menu'
import { JustForYouTutorial } from '../JustForYouTutorial'
import { flattenRecipes } from '../MenuContainer'

jest.mock('utils/browserHelper', () => ({
  isChrome: () => { }
}))
jest.mock('actions/order')
jest.mock('BoxSummary/BoxSummaryMobile', () => ('BoxSummaryMobile'))
jest.mock('BoxSummary/BoxSummaryDesktop', () => ('BoxSummaryDesktop'))
jest.mock('routes/Menu/DetailOverlay', () => ('DetailOverlay'))
jest.mock('routes/Menu/JustForYouTutorial')
jest.mock('../RecipeMeta', () => ({
  RecipeMeta: (props) => <div />
}))
jest.mock('../ThematicsPage', () => ({
  ThematicsPage: (props) => 'FilteredRecipePage'
}))

jest.mock('../FoodBrandPage', () => ({
  FoodBrandPage: (props) => <div />
}))

jest.mock('routes/Menu/MenuRecipes', () => ({
  MenuRecipes: (props) => <div />
}))

jest.mock('react-lazyload', () => ({
  forceCheck: jest.fn(),
}))

jest.mock('routes/Menu/fetchData', () => (
  jest.fn().mockReturnValue(
    new Promise(resolve => {
      resolve()
    })
  )
))

describe('Menu', () => {
  let productsLoadStock
  let productsLoadProducts
  let requiredProps

  beforeEach(() => {
    productsLoadStock = jest.fn()
    productsLoadProducts = jest.fn()
    requiredProps = {
      basketNumPortionChange: () => { },
      basketOrderLoaded: () => { },
      basketRestorePreviousValues: () => { },
      boxDetailsVisibilityChange: () => { },
      cutOffDate: '',
      disabled: false,
      isAuthenticated: false,
      menuLoadBoxPrices: () => { },
      menuMobileGridViewSet: () => { },
      orderCheckoutAction: () => { },
      orderHasAnyProducts: () => { },
      orderUpdateProducts: () => { },
      productsLoadProducts: () => { },
      productsLoadStock: () => { },
      recipes: [],
      storeOrderId: '',
      slotId: '',
      query: {
        orderId: '',
        reload: false
      },
      userOrders: Immutable.Map(),
      boxSummaryDeliveryDaysLoad: jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      ),
      menuLoadDays: jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      )
    }
  })
  describe('rendering', () => {
    let wrapper
    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('initial render', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Menu
            {...requiredProps}
            isLoading={false}
            jfyTutorialFlag={false}
            boxSummaryDeliveryDays={Immutable.Map()}
            disabled={false}
            recipes={['25', '26', '27']}
          />,
          {
            context: {
              store: {
                dispatch: jest.fn()
              }
            }
          }
        )
      })

      test('should return a div', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should render 1 BoxSummaryMobile', () => {
        expect(wrapper.find('BoxSummaryMobile').length).toBe(1)
      })

      test('should render 1 BoxSummaryDesktop', () => {
        expect(wrapper.find('BoxSummaryDesktop').length).toBe(1)
      })

      test('should not render JFY tutorial if feature flag is set to false', () => {
        expect(wrapper.find(JustForYouTutorial).length).toBe(0)
      })

      test('should render JFY tutorial if feature flag is set to true', () => {
        wrapper = shallow(
          <Menu
            {...requiredProps}
            isLoading={false}
            boxSummaryDeliveryDays={Immutable.Map()}
            disabled={false}
            recipes={['25', '26', '27']}
            jfyTutorialFlag
          />,
        )
        expect(wrapper.find(JustForYouTutorial).length).toBe(1)
      })

      describe('the RecipesInBasketProgress component', () => {
        let recipesInBasketProgress

        beforeEach(() => {
          recipesInBasketProgress = wrapper.find('RecipesInBasketProgress')
        })

        test('should be rendered', () => {
          expect(recipesInBasketProgress).toHaveLength(1)
        })

        test('should have the correct number of selected recipes', () => {
          expect(recipesInBasketProgress.prop('selectedRecipesCount')).toBe(3)
        })

        test('has the isAuthenticated prop passed to it', () => {
          expect(recipesInBasketProgress.prop('isAuthenticated')).toBe(requiredProps.isAuthenticated)
        })
      })
    })

    test('with the isLoading prop set to true it should show a Loading', () => {
      wrapper = shallow(
        <Menu
          {...requiredProps}
          jfyTutorialFlag={false}
          boxSummaryDeliveryDays={Immutable.Map()}
          disabled={false}
          recipes={['25', '26', '27']}
          isLoading
        />,
      )
      expect(wrapper.find('MenuRecipes').prop('showLoading')).toBe(true)
    })

    test('with the isLoading prop set to true and boxSummaryShow true it should not show a Loading', () => {
      wrapper = shallow(
        <Menu
          {...requiredProps}
          isLoading={false}
          jfyTutorialFlag={false}
          boxSummaryDeliveryDays={Immutable.Map()}
          disabled={false}
          numPortions={2}
          query={{ num_portions: '4' }}
          storeOrderId={'1234'}
        />,
      )
      expect(wrapper.find('MenuRecipes').prop('showLoading')).toBe(false)
    })

    test('with the isLoading prop set to true and menuBrowseCTAShow true it should not show a Loading', () => {
      wrapper = shallow(
        <Menu
          {...requiredProps}
          menuBrowseCTAShow
          jfyTutorialFlag={false}
          boxSummaryDeliveryDays={Immutable.Map()}
          disabled={false}
          isLoading
        />,
      )
      expect(wrapper.find('MenuRecipes').prop('showLoading')).toBe(false)
    })
  })

  describe('fadeCSS', () => {
    let wrapper

    test('should render fade--recommendations', () => {
      wrapper = shallow(
        <Menu
          {...requiredProps}
          jfyTutorialFlag={false}
          boxSummaryDeliveryDays={Immutable.Map()}
          disabled={false}
          isLoading
          hasRecommendations
        />,
      )
      const elementWithFadeCSS = wrapper.find('MenuRecipes')

      expect(elementWithFadeCSS.prop('fadeCss')).toEqual('fade--recommendations')
    })

    test('should render fadeOut', () => {
      wrapper = shallow(
        <Menu
          {...requiredProps}
          isLoading
          hasRecommendations={false}
        />,
      )
      const elementWithFadeCSS = wrapper.find('MenuRecipes')

      expect(elementWithFadeCSS.prop('fadeCss')).toEqual('fadeOut')
    })

    test('should render willFade', () => {
      wrapper = shallow(
        <Menu
          {...requiredProps}
          isLoading={false}
          hasRecommendations={false}
        />,
      )
      const elementWithFadeCSS = wrapper.find('MenuRecipes')

      expect(elementWithFadeCSS.prop('fadeCss')).toEqual('willFade')
    })
  })

  describe('componentDidMount', () => {
    let menuLoadBoxPrices
    let basketNumPortionChangeSpy
    let mountOptions
    let wrapper

    beforeEach(() => {
      mountOptions = {
        context: {
          store: {
            getState: () => { },
            subscribe: () => { },
          },
        },
      }
      menuLoadBoxPrices = jest.fn()
      basketNumPortionChangeSpy = jest.fn()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should load Box Prices for non admin users', async () => {
      wrapper = await mount(
        <Menu
          {...requiredProps}
          menuLoadBoxPrices={menuLoadBoxPrices}
          basketNumPortionChange={basketNumPortionChangeSpy}
          menuRecipeDetailShow={false}
          disabled={false}
        />,
        mountOptions,
      )
      expect(menuLoadBoxPrices).toHaveBeenCalledTimes(1)
    })

    test('should not load Box Prices for admin users', async () => {
      wrapper = await mount(
        <Menu
          {...requiredProps}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled
        />,
        mountOptions,
      )
      expect(menuLoadBoxPrices).not.toHaveBeenCalled()
    })

    test('should call fetchData', async () => {
      wrapper = await mount(
        <Menu
          {...requiredProps}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled
        />,
        mountOptions,
      )
      expect(fetchData).toHaveBeenCalled()
    })

    test('should call basketNumPortionChange if num portions query parameter is given', async () => {
      const basketNumPortionChange = jest.fn()

      wrapper = await mount(
        <Menu
          {...requiredProps}
          basketNumPortionChange={basketNumPortionChange}
          disabled
          query={{ num_portions: 4 }}
        />,
        mountOptions,
      )

      expect(basketNumPortionChange).toHaveBeenCalledWith(4)
    })

    test('should call shouldJfyTutorialBeVisible', async () => {
      const shouldJfyTutorialBeVisible = jest.fn()

      wrapper = await mount(
        <Menu
          {...requiredProps}
          basketNumPortionChange={basketNumPortionChangeSpy}
          shouldJfyTutorialBeVisible={shouldJfyTutorialBeVisible}
          query={{ num_portions: '4' }}
        />,
        {
          context: {
            store: {
              getState: () => { },
              subscribe: () => { }
            },
          },
        },
      )

      expect(shouldJfyTutorialBeVisible).toHaveBeenCalled()
    })

    describe('productsLoadStock and productsLoadProducts actions', () => {
      test('are called when cutOffDate is present', async () => {
        wrapper = await mount(
          <Menu
            {...requiredProps}
            cutOffDate="2019-05-14 12:00:00"
            productsLoadStock={productsLoadStock}
            productsLoadProducts={productsLoadProducts}
          />,
          mountOptions
        )

        expect(productsLoadStock).toHaveBeenCalled()
        expect(productsLoadProducts).toHaveBeenCalledWith('2019-05-14 12:00:00')
      })

      test('are not called when cutOffDate is not present', async () => {
        wrapper = await mount(
          <Menu
            {...requiredProps}
            productsLoadProducts={productsLoadProducts}
            productsLoadStock={productsLoadStock}
          />,
          mountOptions
        )

        expect(productsLoadStock).not.toHaveBeenCalled()
        expect(productsLoadProducts).not.toHaveBeenCalled()
      })
    })

    describe('events', () => {
      let map
      let menuProps
      let orderCheckout
      let orderUpdateProducts
      let orderHasAnyProducts

      beforeEach(async () => {
        window.location.assign = jest.fn()
        map = {}

        orderCheckout = jest.fn().mockResolvedValueOnce({
          orderId: 'order-id',
          url: 'summary-url',
        })

        orderHasAnyProducts = jest.fn(() => {
          return () => { }
        })

        orderUpdateProducts = jest.fn(() => {
          return () => { }
        })

        window.addEventListener = jest.fn(function (event, listener) {
          map[event] = listener
        })

        window.removeEventListener = jest.fn((event, listener) => {
          if (map[event] === listener) {
            map[event] = undefined
          }
        })

        menuProps = {
          ...requiredProps,
          menuLoadBoxPrices,
          disabled: true,
          basketNumPortionChange: basketNumPortionChangeSpy,
          query: { num_portions: '4' },
          orderId: '123456',
          postcode: '123',
          addressId: '123',
          deliveryDayId: '123',
          slotId: '123',
          disallowRedirectToSummary: true,
          recipes: flattenRecipes(Immutable.fromJS({ 222: 2, 333: 1 })),
          basketProducts: Immutable.fromJS([
            { id: 'c', quantity: '3' },
            { id: 'd', quantity: '4' },
          ]),
          orderCheckoutAction: orderCheckout,
          orderHasAnyProducts,
          orderUpdateProducts,
        }

        wrapper = await mount(
          <Menu
            {...menuProps}
          />,
          {
            context: {
              store: {
                getState: () => { },
                subscribe: () => { }
              },
            },
          },
        )
      })

      test('action orderHasAnyProducts is called when event orderDoesContainProductsRequest is dispatched', () => {
        map.orderDoesContainProductsRequest()

        expect(wrapper.prop('orderHasAnyProducts')).toHaveBeenCalledWith('123456')
      })

      test(`action orderUpdateProducts is called with the products passed in the event orderUpdateProductsRequest and the ones in the basket`, () => {
        const eventProducts = {
          itemChoices: Immutable.fromJS([
            { id: 'a', quantity: '1', type: 'Product' },
            { id: 'b', quantity: '2', type: 'Product' },
          ])
        }
        const fakeEventObject = { detail: eventProducts }
        map.orderUpdateProductsRequest(fakeEventObject)

        expect(orderUpdateProducts).toHaveBeenCalledWith(
          '123456',
          [
            Immutable.Map({ id: 'a', quantity: '1', type: 'Product' }),
            Immutable.Map({ id: 'b', quantity: '2', type: 'Product' }),
            { id: 'c', quantity: '3', type: 'Product' },
            { id: 'd', quantity: '4', type: 'Product' },
          ]
        )

        expect(orderUpdateProducts).toHaveBeenCalledTimes(1)
      })

      test('action orderCheckout is not called when orderId is present', () => {
        const eventProducts = { itemChoices: [] }
        const fakeEventObject = { detail: eventProducts }

        map.orderUpdateProductsRequest(fakeEventObject)

        expect(orderCheckout).toHaveBeenCalledTimes(0)
      })

      test('redirect is not called when orderId is present', () => {
        const eventProducts = { itemChoices: [] }
        const fakeEventObject = { detail: eventProducts }

        map.orderUpdateProductsRequest(fakeEventObject)

        expect(window.location.assign).toHaveBeenCalledTimes(0)
      })

      test('action orderUpdateProducts is not called when event orderUpdateProductsRequest is dispatched', () => {
        wrapper.unmount()

        expect(map.orderUpdateProductsRequest).toBeUndefined()
      })

      describe('call event orderUpdateProductsRequest without order ID', () => {
        beforeEach(async () => {
          wrapper = await mount(
            <Menu
              {...menuProps}
              orderId=""
            />,
            {
              context: {
                store: {
                  getState: () => { },
                  subscribe: () => { }
                },
              },
            },
          )

          const eventProducts = {
            itemChoices: [
              { id: 'a', quantity: '1', type: 'Product' },
              { id: 'b', quantity: '2', type: 'Product' },
            ]
          }
          const fakeEventObject = { detail: eventProducts }
          map.orderUpdateProductsRequest(fakeEventObject)
        })

        test('orderCheckout is called when order id is not present', () => {
          expect(orderCheckout).toHaveBeenCalledWith({
            addressId: '123',
            postcode: '123',
            numPortions: 2,
            promoCode: '',
            orderId: '',
            deliveryDayId: '123',
            slotId: '123',
            orderAction: 'transaction',
            disallowRedirectToSummary: true,
            recipes: ['222', '222', '333']
          })
        })

        test(`orderUpdateProducts is being called with orderId
        that is coming from order checkout response`, () => {
          expect(orderUpdateProducts).toHaveBeenCalledWith(
            'order-id',
            [
              { id: 'a', quantity: '1', type: 'Product' },
              { id: 'b', quantity: '2', type: 'Product' },
              { id: 'c', quantity: '3', type: 'Product' },
              { id: 'd', quantity: '4', type: 'Product' },
            ]
          )
        })

        test('redirect is being called when order checkout response is correct', async () => {
          expect(window.location.assign).toHaveBeenCalledWith('summary-url')
        })
      })

      test('action orderUpdateProducts is not called when event orderUpdateProductsRequest is dispatched', () => {
        wrapper.unmount()

        expect(map.orderUpdateProductsRequest).toBeUndefined()
      })

      describe('call event orderUpdateProductsRequest without order ID', () => {
        beforeEach(async () => {
          wrapper = await mount(
            <Menu
              {...menuProps}
              orderId=""
            />,
            {
              context: {
                store: {
                  getState: () => { },
                  subscribe: () => { }
                },
              },
            },
          )

          const eventProducts = {
            itemChoices: [
              { id: 'a', quantity: '1', type: 'Product' },
              { id: 'b', quantity: '2', type: 'Product' },
            ]
          }
          const fakeEventObject = { detail: eventProducts }
          map.orderUpdateProductsRequest(fakeEventObject)
        })

        test('orderCheckout is called when order id is not present', () => {
          expect(orderCheckout).toHaveBeenCalledWith({
            addressId: '123',
            postcode: '123',
            numPortions: 2,
            promoCode: '',
            orderId: '',
            deliveryDayId: '123',
            slotId: '123',
            orderAction: 'transaction',
            disallowRedirectToSummary: true,
            recipes: ['222', '222', '333']
          })
        })

        test(`orderUpdateProducts is being called with orderId that is coming from order checkout response`, () => {
          expect(orderUpdateProducts).toHaveBeenCalledWith(
            'order-id',
            [
              { id: 'a', quantity: '1', type: 'Product' },
              { id: 'b', quantity: '2', type: 'Product' },
              { id: 'c', quantity: '3', type: 'Product' },
              { id: 'd', quantity: '4', type: 'Product' },
            ]
          )
        })

        test('redirect is being called when order checkout response is correct', () => {
          expect(window.location.assign).toHaveBeenCalledWith('summary-url')
        })
      })
    })
  })

  describe('check query param in componentDidMount', () => {
    describe('when no foodBrand query param in URL', () => {
      test('should call filterRecipeGrouping with null if foodBrand is selected', async () => {
        const filterRecipeGrouping = jest.fn()
        await mount(
          <Menu
            {...requiredProps}
            filterRecipeGrouping={filterRecipeGrouping}
            recipeGroupingSelected={{
              slug: 'takeaway-night',
              name: 'Takeaway Night',
              borderColor: 'blue',
              location: 'foodBrand'
            }}
            query={{}}
          />,
          {
            context: {
              store: {
                getState: () => ({}),
                subscribe: () => { },
              },
            },
          },
        )
        expect(filterRecipeGrouping).toHaveBeenCalledWith(null, 'foodBrand')
      })
    })

    describe('when foodBrand query param in URL', () => {
      test('should call filterRecipeGrouping with foodBrand details if foodBrand not selected', async () => {
        const filterRecipeGrouping = jest.fn()

        await mount(
          <Menu
            {...requiredProps}
            filterRecipeGrouping={filterRecipeGrouping}
            recipeGroupingSelected={null}
            query={{ foodBrand: 'takeaway-night' }}
            foodBrandDetails={{
              slug: 'takeaway-night',
              name: 'Takeaway Night',
              borderColor: 'blue',
            }}
          />,
          {
            context: {
              store: {
                getState: () => ({}),
                subscribe: () => { },
              },
            },
          },
        )

        expect(filterRecipeGrouping).toHaveBeenCalledWith({
          slug: 'takeaway-night',
          name: 'Takeaway Night',
          borderColor: 'blue',
        }, 'foodBrand')
      })

      test('should call filterRecipeGrouping with foodBrand details if url foodbrand different than selected one', () => {
        const filterRecipeGrouping = jest.fn()

        mount(
          <Menu
            {...requiredProps}
            filterRecipeGrouping={filterRecipeGrouping}
            recipeGroupingSelected={{
              slug: 'takeaway-night',
              name: 'Takeaway Night',
              borderColor: 'blue',
              location: 'foodBrand'
            }}
            query={{ foodBrand: '10-minute-meals' }}
            foodBrandDetails={{
              slug: '10-minute-meals',
              name: '10-MINUTE MEALS',
              borderColor: 'orange',
              location: 'foodBrand'
            }}
          />,
          {
            context: {
              store: {
                getState: () => ({}),
                subscribe: () => { },
              },
            },
          },
        )

        expect(filterRecipeGrouping).toHaveBeenCalledWith({
          slug: '10-minute-meals',
          name: '10-MINUTE MEALS',
          borderColor: 'orange',
          location: 'foodBrand'
        }, 'foodBrand')
      })

      test('should NOT call filterRecipeGrouping with foodBrand details if foodBrand selected', async () => {
        const filterRecipeGrouping = jest.fn()

        await mount(
          <Menu
            {...requiredProps}
            filterRecipeGrouping={filterRecipeGrouping}
            recipeGroupingSelected={{
              slug: 'takeaway-night',
              name: 'Takeaway Night',
              borderColor: 'blue',
              location: 'foodBrand'
            }}
            query={{ foodBrand: 'takeaway-night' }}
            foodBrandDetails={{
              slug: 'takeaway-night',
              name: 'Takeaway Night',
              borderColor: 'blue',
              location: 'foodBrand'
            }}
          />,
          {
            context: {
              store: {
                getState: () => ({}),
                subscribe: () => { },
              },
            },
          },
        )

        expect(filterRecipeGrouping).not.toHaveBeenCalled()
      })
    })
  })

  describe('componentDidUpdate', () => {
    let wrapper
    let shouldJfyTutorialBeVisible

    beforeEach(async () => {
      window.location.assign = jest.fn()
      shouldJfyTutorialBeVisible = jest.fn()
      wrapper = await mount(
        <Menu
          {...requiredProps}
          shouldJfyTutorialBeVisible={shouldJfyTutorialBeVisible}
          orderCheckout={{
            orderId: 'order-id',
            url: 'summary-url',
          }}
          cutOffDate="2019-05-13 12:00:00"
        />,
        {
          context: {
            store: {
              getState: () => { },
              subscribe: () => { }
            },
          },
        },
      )
      forceCheck.mockClear()
      shouldJfyTutorialBeVisible.mockClear()
    })
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should call forceCheck', async () => {
      wrapper.setProps({ menuCurrentCollectionId: '123abc' })

      expect(forceCheck).toHaveBeenCalledTimes(1)
    })

    describe('when we have finished loading', () => {
      beforeEach(() => {
        wrapper.setProps({ 'isLoading': false })
      })

      test('should call shouldJfyTutorialBeVisible prop', async () => {
        await wrapper.instance().componentDidUpdate({
          ...wrapper.props(),
          isLoading: true,
        })

        expect(shouldJfyTutorialBeVisible).toHaveBeenCalled()
      })
    })

    describe('for any non-loading updates', () => {
      test('should not call shouldJfyTutorialBeVisible prop', async () => {
        await wrapper.instance().componentDidUpdate({
          ...wrapper.props(),
        })

        expect(shouldJfyTutorialBeVisible).not.toHaveBeenCalled()
      })
    })

    describe('productsLoadStock and productsLoadProducts actions', () => {
      test('are called when cutOffDate is present and different from the previous update', async () => {
        wrapper.setProps({
          productsLoadStock,
          productsLoadProducts,
          cutOffDate: '2019-05-14 12:00:00',
        })

        await wrapper.instance().componentDidUpdate({
          ...wrapper.props(),
        })

        expect(productsLoadStock).toHaveBeenCalled()
        expect(productsLoadProducts).toHaveBeenCalledWith('2019-05-14 12:00:00')
      })

      test('are not called when cutOffDate is not changed in the update', async () => {
        wrapper.setProps({
          productsLoadStock,
          productsLoadProducts,
          cutOffDate: '2019-05-13 12:00:00',
        })

        await wrapper.instance().componentDidUpdate({
          ...wrapper.props(),
        })

        expect(productsLoadStock).not.toHaveBeenCalled()
        expect(productsLoadProducts).not.toHaveBeenCalled()
      })

      test('are not called when cutOffDate is not present', async () => {
        wrapper.setProps({
          productsLoadStock,
          productsLoadProducts,
          cutOffDate: '',
        })

        await wrapper.instance().componentDidUpdate({
          ...wrapper.props(),
        })

        expect(productsLoadStock).not.toHaveBeenCalled()
        expect(productsLoadProducts).not.toHaveBeenCalled()
      })
    })
  })

  describe('componentWillReceiveProps', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should call Menu.fetchData once if menuVariation has changed', () => {
      const wrapper = shallow(
        <Menu
          {...requiredProps}
          tariffId={1}
          menuVariation="menuA"
        />,
      )
      wrapper.instance().componentWillReceiveProps({ menuVariation: 'menuB' })
      expect(fetchData).toHaveBeenCalledTimes(2)
    })

    test('should call menuLoadBoxPrices once if not disabled & tariffId has changed', () => {
      const menuLoadBoxPrices = jest.fn()
      const wrapper = shallow(
        <Menu
          {...requiredProps}
          menuLoadBoxPrices={menuLoadBoxPrices}
          tariffId={1}
        />,
      )
      wrapper.setProps({ tariffId: 2 })
      expect(menuLoadBoxPrices).toHaveBeenCalledTimes(2)
      expect(menuLoadBoxPrices).toHaveBeenCalledWith()
    })

    test('should NOT call menuLoadBoxPrices if disabled', () => {
      const menuLoadBoxPrices = jest.fn()
      shallow(
        <Menu
          {...requiredProps}
          disabled
        />,
      )
      expect(menuLoadBoxPrices).not.toHaveBeenCalled()
    })
  })

  describe('Filtered Recipe Page ', () => {
    test('should render FoodBrandPage if foodBrand selected or query param foodBrand has a value ', () => {
      const wrapper = shallow(
        <Menu
          {...requiredProps}
          recipeGroupingSelected={{
            slug: 'takeaway-night',
            name: 'Takeaway Night',
            borderColor: 'blue',
            location: 'foodBrand'
          }}
          query={{
            foodBrand: 'takeaway-night'
          }}
        />)

      expect(wrapper.find('FoodBrandPage')).toHaveLength(1)
      expect(wrapper.find('MenuRecipes')).toHaveLength(0)
    })

    test('should render ThematicsPage if thematic selected or query param thematic has a value ', () => {
      const wrapper = shallow(
        <Menu
          {...requiredProps}
          recipeGroupingSelected={{
            name: 'Gousto x wagamama',
            slug: 'gousto-x-wagamama',
            borderColor: 'red',
            location: 'thematic'
          }}
          query={{
            thematic: 'gousto-x-wagamama'
          }}
        />)
      expect(wrapper.find('ThematicsPage')).toHaveLength(1)
      expect(wrapper.find('MenuRecipes')).toHaveLength(0)
    })
  })
})

