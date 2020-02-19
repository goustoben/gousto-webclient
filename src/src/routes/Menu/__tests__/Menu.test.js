import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable'

import fetchData from 'routes/Menu/fetchData'

import { forceCheck } from 'react-lazyload'
import Menu from 'routes/Menu/Menu'

jest.mock('layouts/MainLayout', () => ('MainLayout'))
jest.mock('utils/browserHelper', () => ({
  isChrome: () => { }
}))
jest.mock('actions/order')
jest.mock('../BoxSummary', () => ({
  BoxSummaryContainer: () => <div />
}))
jest.mock('routes/Menu/DetailOverlay', () => ('DetailOverlay'))
jest.mock('routes/Menu/JustForYouTutorial', () => ({ JustForYouTutorial: () => <div /> }))
jest.mock('../RecipeMeta', () => ({
  RecipeMeta: () => <div />
}))
jest.mock('../ThematicsPage', () => ({
  ThematicsPage: () => 'FilteredRecipePage'
}))

jest.mock('../FoodBrandPage', () => ({
  FoodBrandPage: () => <div />
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

jest.mock('react-helmet', () => () => <div />)

describe('Menu', () => {
  let requiredProps
  let mountOptions

  const shouldJfyTutorialBeVisibleMock = jest.fn()

  const getStateMock = () => ({
    features: Immutable.fromJS({
      menuService: {
        value: false
      }
    })
  })

  beforeEach(() => {
    shouldJfyTutorialBeVisibleMock.mockClear()

    requiredProps = {
      basketNumPortionChange: () => { },
      disabled: false,
      isAuthenticated: false,
      menuLoadBoxPrices: () => { },
      query: {
        orderId: '',
        reload: false
      },
      boxSummaryDeliveryDaysLoad: jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      ),
      menuLoadDays: jest.fn().mockReturnValue(
        new Promise(resolve => {
          resolve()
        })
      ),
      shouldJfyTutorialBeVisible: shouldJfyTutorialBeVisibleMock,
      recipesCount: 3,
      onOverlayClick: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    let wrapper

    mountOptions = {
      context: {
        store: {
          dispatch: jest.fn(),
          getState: getStateMock,
        },
      },
    }

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('initial render', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Menu
            {...requiredProps}
            isLoading={false}
            boxSummaryDeliveryDays={Immutable.Map()}
            disabled={false}
          />,
          mountOptions
        )
      })

      test('should return a MainLayout', () => {
        expect(wrapper.type()).toBe('MainLayout')
      })

      test('should render 1 BoxSummaryContainer', () => {
        expect(wrapper.find('BoxSummaryContainer').length).toBe(1)
      })

      test('should render JFY tutorial', () => {
        wrapper = shallow(
          <Menu
            {...requiredProps}
            isLoading={false}
            boxSummaryDeliveryDays={Immutable.Map()}
            disabled={false}
          />,
          mountOptions
        )
        expect(wrapper.find('JustForYouTutorial').length).toBe(1)
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
  })

  describe('componentWillUnmount', () => {
    let wrapper
    const loginVisibilityChange = jest.fn()
    beforeEach(() => {
      wrapper = shallow(
        <Menu
          {...requiredProps}
          isLoading={false}
          boxSummaryDeliveryDays={Immutable.Map()}
          disabled={false}
          loginVisibilityChange={loginVisibilityChange}
        />,
        mountOptions
      )
    })
    test('should call loginVisibilityChange', () => {
      wrapper.unmount()
      expect(loginVisibilityChange).toHaveBeenCalled()
    })
  })

  describe('componentDidMount', () => {
    let menuLoadBoxPrices
    let basketNumPortionChangeSpy

    beforeEach(() => {
      mountOptions = {
        context: {
          store: {
            getState: getStateMock,
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
      await mount(
        <Menu
          {...requiredProps}
          menuLoadBoxPrices={menuLoadBoxPrices}
          basketNumPortionChange={basketNumPortionChangeSpy}
          disabled={false}
        />,
        mountOptions,
      )
      expect(menuLoadBoxPrices).toHaveBeenCalledTimes(1)
    })

    test('should not load Box Prices for admin users', async () => {
      await mount(
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
      await mount(
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

      await mount(
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
      await mount(
        <Menu
          {...requiredProps}
          basketNumPortionChange={basketNumPortionChangeSpy}
          query={{ num_portions: '4' }}
        />,
        {
          context: {
            store: {
              getState: getStateMock,
              subscribe: () => { }
            },
          },
        },
      )

      expect(shouldJfyTutorialBeVisibleMock).toHaveBeenCalled()
    })
  })

  describe('componentDidUpdate', () => {
    let wrapper

    beforeEach(async () => {
      window.location.assign = jest.fn()
      wrapper = await mount(
        <Menu
          {...requiredProps}
        />,
        {
          context: {
            store: {
              getState: getStateMock,
              subscribe: () => { }
            },
          },
        },
      )
      forceCheck.mockClear()
    })
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should call forceCheck', async () => {
      wrapper.setProps({ menuCurrentCollectionId: '123abc' })

      expect(forceCheck).toHaveBeenCalledTimes(1)
    })
  })

  describe('componentWillReceiveProps', () => {
    beforeEach(() => {
      mountOptions = {
        context: {
          store: {
            getState: getStateMock,
            subscribe: () => { },
          },
        },
      }
    })

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
        mountOptions
      )
      wrapper.instance().componentWillReceiveProps({ menuVariation: 'menuB' })
      expect(fetchData).toHaveBeenCalledTimes(2)
    })

    test('should call menuLoadBoxPrices twice if not disabled & tariffId has changed', async () => {
      const menuLoadBoxPrices = jest.fn()

      const wrapper = await shallow(
        <Menu
          {...requiredProps}
          menuLoadBoxPrices={menuLoadBoxPrices}
          tariffId={1}
        />,
        mountOptions
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
})

