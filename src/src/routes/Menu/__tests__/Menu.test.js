import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Loading from 'routes/Menu/Loading'
import { Banner } from 'routes/Menu/Banner'
import fetchData from 'routes/Menu/fetchData'
import SubHeader from 'routes/Menu/SubHeader'
import RecipeList from 'routes/Menu/RecipeList'
import CollectionsNav from 'routes/Menu/CollectionsNav'
import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import DetailOverlay from 'routes/Menu/DetailOverlay'
import MenuNoResults from 'routes/Menu/MenuNoResults'

import { forceCheck } from 'react-lazyload'
import Menu from 'routes/Menu/Menu'
import { JustForYouTutorial } from '../JustForYouTutorial'
import { flattenRecipes } from '../MenuContainer'

jest.mock('actions/order')
jest.mock('routes/Menu/Banner')
jest.mock('routes/Menu/SubHeader')
jest.mock('routes/Menu/FilterMenu')
jest.mock('routes/Menu/FilterTagsNav/FilterTagsNavContainer')
jest.mock('routes/Menu/FilterNav')
jest.mock('routes/Menu/RecipeList')
jest.mock('BoxSummary/BoxSummaryMobile')
jest.mock('BoxSummary/BoxSummaryDesktop')
jest.mock('routes/Menu/DetailOverlay')
jest.mock('routes/Menu/JustForYouTutorial')
jest.mock('routes/Menu/MenuNoResults')

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

  beforeEach(() => {
    productsLoadStock = jest.fn()
    productsLoadProducts = jest.fn()
  })

  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          filteredRecipesNumber={30}
          isLoading={false}
          jfyTutorialFlag={false}
          changeBannerGelFlag={false}
        />,
      )
    })

    describe('initial render', () => {
      test('should return a div', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should render 1 SubHeader', () => {
        expect(wrapper.find(SubHeader).length).toBe(1)
      })

      test('should render 1 BoxSummaryMobile', () => {
        expect(wrapper.find(BoxSummaryMobile).length).toBe(1)
      })

      test('should render 1 BoxSummaryDesktop', () => {
        expect(wrapper.find(BoxSummaryDesktop).length).toBe(1)
      })

      test('should not show a collections nav', () => {
        expect(wrapper.find(CollectionsNav).length).toBe(0)
      })

      test('should not show as loading', () => {
        expect(wrapper.find(Loading).prop('loading')).toBe(false)
      })

      test('should not render JFY tutorial if feature flag is set to false', () => {
        expect(wrapper.find(JustForYouTutorial).length).toBe(0)
      })

      test('should render JFY tutorial if feature flag is set to true', () => {
        wrapper = shallow(
          <Menu
            productsLoadProducts={() => {}}
            productsLoadStock={() => {}}
            menuLoadBoxPrices={() => {}}
            menuCollectionRecipes={Immutable.Map({})}
            features={Immutable.Map({})}
            filteredRecipesNumber={30}
            isLoading={false}
            jfyTutorialFlag
          />,
        )
        expect(wrapper.find(JustForYouTutorial).length).toBe(1)
      })

      test('should render banner with an image name prop', () => {
        expect(wrapper.find(Banner).length).toBe(1)
        expect(wrapper.find(Banner).prop('type')).toBeTruthy()
      })
    })

    test('with the isLoading prop set to true it should show a Loading', () => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuRecipeDetailShow={false}
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          clearAllFilters={() => {}}
          basketOrderLoaded={() => {}}
          isLoading
        />,
      )
      expect(wrapper.find(Loading).prop('loading')).toBe(true)
    })

    test('with the isLoading prop set to true and boxSummaryShow true it should not show a Loading', () => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          numPortions={2}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          isLoading
          storeOrderId={'1234'}
          boxSummaryShow
          clearAllFilters={() => {}}
          basketOrderLoaded={() => {}}
          query={{ num_portions: '4' }}
        />,
      )
      expect(wrapper.find(Loading).prop('loading')).toBe(false)
    })

    test('with the isLoading prop set to true and menuBrowseCTAShow true it should not show a Loading', () => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          stock={Immutable.Map()}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          isLoading
          menuBrowseCTAShow
          clearAllFilters={() => {}}
          basketOrderLoaded={() => {}}
        />,
      )
      expect(wrapper.find(Loading).prop('loading')).toBe(false)
    })

    describe('with the collections feature enabled', () => {
      let stock
      let recipesStore
      let recipes

      beforeEach(() => {
        stock = Immutable.fromJS({
          1: { 2: 2 },
          2: { 2: 2 },
          3: { 2: 2 },
        })

        recipesStore = Immutable.fromJS({
          1: {
            id: '1',
            availability: [],
            boxType: 'vegetarian',
            dietType: 'Fish',
          },
          2: {
            id: '2',
            availability: [],
            boxType: 'vegetarian',
            dietType: 'Vegetarian',
          },
          3: {
            id: '3',
            availability: [],
            boxType: 'gourmet',
            dietType: 'Meat',
          },
        })
        wrapper = shallow(
          <Menu
            productsLoadProducts={() => {}}
            productsLoadStock={() => {}}
            menuLoadBoxPrices={() => {}}
            menuCollectionRecipes={Immutable.Map({})}
            clearAllFilters={() => {}}
            basketOrderLoaded={() => {}}
            features={Immutable.fromJS({
              collections: {
                value: true,
              },
              filterMenu: {
                value: false,
              }
            })}
          />,
        )
      })

      test('should show a collections nav', () => {
        expect(wrapper.find(CollectionsNav).length).toBe(1)
      })

      describe('and the collectionsNav feature disabled', () => {
        beforeEach(() => {
          wrapper = shallow(
            <Menu
              productsLoadProducts={() => {}}
              productsLoadStock={() => {}}
              menuLoadBoxPrices={() => {}}
              menuCollectionRecipes={Immutable.Map({})}
              clearAllFilters={() => {}}
              features={Immutable.fromJS({
                collections: {
                  value: true,
                },
                collectionsNav: {
                  value: false,
                },
              })}
            />,
          )
        })
        test('should not show the collections nav bar', () => {
          expect(wrapper.find(CollectionsNav).length).toBe(0)
        })
      })
    })
  })

  describe('fadeCSS', () => {
    let wrapper

    test('should render fade--recommendations', () => {
      wrapper = shallow(
        <Menu
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          filteredRecipesNumber={30}
          isLoading
          hasRecommendations
        />,
      )
      const elementWithFadeCSS = wrapper.find('.fade--recommendations')

      expect(elementWithFadeCSS).toHaveLength(1)
    })

    test('should render fadeOut', () => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          filteredRecipesNumber={30}
          isLoading
          hasRecommendations={false}
        />,
      )
      const elementWithFadeCSS = wrapper.find('.fadeOut')

      expect(elementWithFadeCSS).toHaveLength(1)
    })

    test('should render willFade', () => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          filteredRecipesNumber={30}
          isLoading={false}
          hasRecommendations={false}
        />,
      )
      const elementWithFadeCSS = wrapper.find('.willFade')

      expect(elementWithFadeCSS).toHaveLength(1)
    })
  })

  describe('with the force collections feature enabled', () => {
    let wrapper

    test('should show a collections nav', () => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          clearAllFilters={() => {}}
          features={Immutable.fromJS({
            collections: {
              value: true,
            },
            forceCollections: {
              value: true,
            },
          })}
        />,
      )

      expect(wrapper.find(CollectionsNav).length).toBe(1)
    })
    test('should still show the collections nav bar with the collectionsNav feature disabled', () => {
      wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          clearAllFilters={() => {}}
          features={Immutable.fromJS({
            collections: {
              value: true,
            },
            forceCollections: {
              value: true,
            },
            collectionsNav: {
              value: false,
            },
          })}
        />,
      )

      expect(wrapper.find(CollectionsNav).length).toBe(1)
    })
  })

  describe('componentDidMount', () => {
    let menuLoadDays
    let boxSummaryDeliveryDaysLoad
    let menuLoadBoxPrices
    let getStateSpy
    let basketNumPortionChangeSpy
    let mountOptions
    let wrapper

    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        features: Immutable.Map({
          filterMenu: Immutable.Map({
            value: false,
          })
        })
      })
      mountOptions = {
        context: {
          store: {
            getState: getStateSpy,
            subscribe: () => {},
          },
        },
      }
      menuLoadBoxPrices = jest.fn()
      menuLoadDays = jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      )
      boxSummaryDeliveryDaysLoad = jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      )
      BoxSummaryMobile.mockReturnValue(<div />)
      BoxSummaryDesktop.mockReturnValue(<div />)
      RecipeList.mockReturnValue(<div />)
      SubHeader.mockReturnValue(<div />)
      Banner.mockReturnValue(<div />)
      DetailOverlay.mockReturnValue(<div />)
      basketNumPortionChangeSpy = jest.fn()
    })

    test('should load Box Prices for non admin users', async () => {
      wrapper = await mount(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuRecipeDetailShow={false}
          boxSummaryDeliveryDays={Immutable.List([])}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          menuLoadDays={menuLoadDays}
          boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled={false}
          filteredRecipesNumber={30}
          clearAllFilters={() => {}}
          params={{}}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
              subscribe: () => {},
            },
          },
        },
      )
      expect(menuLoadBoxPrices).toHaveBeenCalledTimes(1)
    })

    test('should not load Box Prices for admin users', async () => {
      wrapper = await mount(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuRecipeDetailShow={false}
          boxSummaryDeliveryDays={Immutable.List([])}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          menuLoadDays={menuLoadDays}
          boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled
          filteredRecipesNumber={30}
          clearAllFilters={() => {}}
          params={{}}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
              subscribe: () => {},
            },
          },
        },
      )
      expect(menuLoadBoxPrices).not.toHaveBeenCalled()
    })

    test('should call fetchData', async () => {
      wrapper = await mount(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuRecipeDetailShow={false}
          boxSummaryDeliveryDays={Immutable.List([])}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          menuLoadDays={menuLoadDays}
          boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled
          filteredRecipesNumber={30}
          clearAllFilters={() => {}}
          params={{}}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
              subscribe: () => {}
            },
          },
        },
      )
      expect(fetchData).toHaveBeenCalled()
    })

    test('should call basketNumPortionChange if num portions query parameter is given', async () => {
      const basketNumPortionChange = jest.fn()

      wrapper = await mount(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuRecipeDetailShow={false}
          boxSummaryDeliveryDays={Immutable.List([])}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          menuLoadDays={menuLoadDays}
          boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled
          filteredRecipesNumber={30}
          clearAllFilters={() => { }}
          params={{}}
          basketNumPortionChange={basketNumPortionChange}
          query={{ num_portions: 4 }}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
              subscribe: () => {}
            },
          },
        },
      )

      expect(basketNumPortionChange).toHaveBeenCalledWith(4)
    })

    test('should call shouldJfyTutorialBeVisible', async () => {
      const shouldJfyTutorialBeVisible = jest.fn()

      wrapper = await mount(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          shouldJfyTutorialBeVisible={shouldJfyTutorialBeVisible}
          menuRecipeDetailShow={false}
          boxSummaryDeliveryDays={Immutable.List([])}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          menuLoadDays={menuLoadDays}
          boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled
          filteredRecipesNumber={30}
          clearAllFilters={() => {}}
          params={{}}
          basketNumPortionChange={basketNumPortionChangeSpy}
          query={{num_portions:'4'}}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
              subscribe: () => {}
            },
          },
        },
      )

      expect(shouldJfyTutorialBeVisible).toHaveBeenCalled()
    })

    describe('productsLoadStock and productsLoadProducts actions', () => {
      let menuProps

      beforeAll(() => {
        menuProps = {
          shouldJfyTutorialBeVisible: () => {},
          menuRecipeDetailShow: false,
          boxSummaryDeliveryDays: Immutable.List([]),
          menuCollectionRecipes: Immutable.Map({}),
          features: Immutable.Map({}),
          menuLoadDays,
          boxSummaryDeliveryDaysLoad,
          menuLoadBoxPrices,
          disabled: true,
          filteredRecipesNumber: 30,
          clearAllFilters: () => {},
          params: {},
          basketNumPortionChange: () => {},
          query: { num_portions: '4' },
        }
      })

      test('are called when cutOffDate is present', async () => {
        wrapper = await mount(
          <Menu
            { ...menuProps }
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
            { ...menuProps }
            cutOffDate=""
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
          return () => {}
        })

        orderUpdateProducts = jest.fn(() => {
          return () => {}
        })

        window.addEventListener = jest.fn((event, callback) => {
          map[event] = callback
        })

        window.removeEventListener = jest.fn((event) => {
          map[event] = undefined
        })

        menuProps = {
          productsLoadProducts: () => { },
          productsLoadStock: () => { },
          menuRecipeDetailShow: false,
          boxSummaryDeliveryDays: Immutable.List([]),
          menuCollectionRecipes: Immutable.Map({}),
          features: Immutable.Map({}),
          menuLoadDays,
          boxSummaryDeliveryDaysLoad,
          menuLoadBoxPrices,
          disabled: true,
          filteredRecipesNumber: 30,
          clearAllFilters: () => { },
          params: {},
          basketNumPortionChange: basketNumPortionChangeSpy,
          query: { num_portions: '4' },
          orderId: '123456',
          postcode: '123',
          addressId: '123',
          deliveryDayId: '123',
          slotId: '123',
          disallowRedirectToSummary: true,
          userOrders: Immutable.Map([]),
          recipes: flattenRecipes(Immutable.fromJS({ 222: 2, 333: 1})),
          basketProducts: [
            { id: 'c', quantity: '3' },
            { id: 'd', quantity: '4' },
          ],
          loginVisibilityChange: () => { },
          orderCheckoutAction: orderCheckout,
          orderHasAnyProducts,
          orderUpdateProducts,
        }

        wrapper = await mount(
          <Menu {...menuProps} />,
          {
            context: {
              store: {
                getState: getStateSpy,
                subscribe: () => {}
              },
            },
          },
        )
      })

      test('action orderHasAnyProducts is called when event orderDoesContainProductsRequest is dispatched', () => {
        map.orderDoesContainProductsRequest()

        expect(wrapper.prop('orderHasAnyProducts')).toHaveBeenCalledWith('123456')
      })

      test(`action orderUpdateProducts is called with the products passed in
      the event orderUpdateProductsRequest and the ones in the basket`,
      () => {
        const eventProducts = {
          itemChoices: [
            { id: 'a', quantity: '1', type: 'Product' },
            { id: 'b', quantity: '2', type: 'Product' },
          ]
        }
        const fakeEventObject = { detail: eventProducts }
        map.orderUpdateProductsRequest(fakeEventObject)

        expect(orderUpdateProducts).toHaveBeenCalledWith(
          '123456',
          [
            { id: 'a', quantity: '1', type: 'Product' },
            { id: 'b', quantity: '2', type: 'Product' },
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
            <Menu {...menuProps} orderId="" />,
            {
              context: {
                store: {
                  getState: getStateSpy,
                  subscribe: () => {}
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
            <Menu {...menuProps} orderId="" />,
            {
              context: {
                store: {
                  getState: getStateSpy,
                  subscribe: () => {}
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
    })
  })

  describe('componentDidUpdate', () => {
    let wrapper
    let menuLoadDays
    let boxSummaryDeliveryDaysLoad
    let menuLoadBoxPrices
    let getStateSpy
    const shouldJfyTutorialBeVisible = jest.fn()

    beforeEach(async () => {
      window.location.assign = jest.fn()
      getStateSpy = jest.fn().mockReturnValue({
        features: Immutable.Map({
          filterMenu: Immutable.Map({
            value: false,
          })
        })
      })
      menuLoadBoxPrices = jest.fn()
      menuLoadDays = jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      )
      boxSummaryDeliveryDaysLoad = jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      )
      wrapper = await mount(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuRecipeDetailShow={false}
          boxSummaryDeliveryDays={Immutable.List([])}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          menuLoadDays={menuLoadDays}
          boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
          menuLoadBoxPrices={menuLoadBoxPrices}
          disabled={false}
          filteredRecipesNumber={30}
          clearAllFilters={() => {}}
          shouldJfyTutorialBeVisible={shouldJfyTutorialBeVisible}
          params={{}}
          orderCheckout={{
            orderId: 'order-id',
            url: 'summary-url',
          }}
          cutOffDate="2019-05-13 12:00:00"
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
              subscribe: () => {}
            },
          },
        },
      )
      forceCheck.mockClear()
      shouldJfyTutorialBeVisible.mockClear()
    })

    afterEach(() => {
      forceCheck.mockClear()
      shouldJfyTutorialBeVisible.mockClear()
    })

    test('should call forceCheck', async () => {
      await wrapper.instance().componentDidUpdate(wrapper.props())

      expect(forceCheck).toHaveBeenCalledTimes(1)
    })

    describe('when we have finished loading', () => {
      beforeEach(() => {
        wrapper.setProps('isLoading', false)
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

      test('are not called when cutOffDate is not changed in the update', async() => {
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
    beforeEach(() => {
      fetchData.mockClear()
    })

    test('should call Menu.fetchData once if menuVariation has changed', () => {
      const wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={() => {}}
          features={Immutable.Map({})}
          tariffId={1}
          manuVariation="menuA"
          clearAllFilters={() => {}}
          params={{}}
        />,
      )
      wrapper.instance().componentWillReceiveProps({ menuVariation: 'menuB' })
      expect(fetchData).toHaveBeenCalledTimes(1)
    })

    test('should call menuLoadBoxPrices once if not disabled & tariffId has changed', () => {
      const menuLoadBoxPrices = jest.fn()
      const wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={menuLoadBoxPrices}
          features={Immutable.Map({})}
          tariffId={1}
          clearAllFilters={() => {}}
          params={{}}
        />,
      )
      wrapper.instance().componentWillReceiveProps({ tariffId: 2 })
      expect(menuLoadBoxPrices).toHaveBeenCalledTimes(1)
      expect(menuLoadBoxPrices).toHaveBeenCalledWith()
    })

    test('should NOT call menuLoadBoxPrices if disabled', () => {
      const menuLoadBoxPrices = jest.fn()
      const wrapper = shallow(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          menuLoadBoxPrices={menuLoadBoxPrices}
          features={Immutable.Map({})}
          tariffId={1}
          clearAllFilters={() => {}}
          params={{}}
        />,
      )
      wrapper
        .instance()
        .componentWillReceiveProps({ tariffId: 2, disabled: true })
      expect(menuLoadBoxPrices).not.toHaveBeenCalled()
    })
  })

  describe('when filtering removes all recipes from the list', () => {
    let wrapper
    let getStateSpy
    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
        }),
        filters: Immutable.Map({
          currentCollectionId: '',
          totalTime: '0',
          dietTypes: Immutable.Set(['meat']),
          dietaryAttributes: Immutable.Set(['gluten-free']),
        }),
        features: Immutable.Map({
          filterMenu: Immutable.Map({
            value: false,
          })
        }),
        content: Immutable.Map({}),
        menu: Immutable.Map({}),
      })
    })

    test('should render MenuNoResults', async () => {
      wrapper = await mount(
        <Menu
          productsLoadProducts={() => {}}
          productsLoadStock={() => {}}
          boxSummaryDeliveryDays={Immutable.List([])}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          disabled
          filteredRecipesNumber={0}
          clearAllFilters={() => {}}
          params={{}}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
              subscribe: () => {},
              dispatch: () => {},
            },
          },
        },
      )
      expect(wrapper.find(MenuNoResults)).toHaveLength(1)
    })
  })
})
