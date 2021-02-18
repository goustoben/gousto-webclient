import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { forceCheck } from 'react-lazyload'
import Menu from 'routes/Menu/Menu'

jest.mock('layouts/MainLayout', () => ('MainLayout'))
jest.mock('utils/browserHelper', () => ({
  isChrome: () => { }
}))
jest.mock('actions/order')
jest.mock('./BoxSummary', () => ({
  BoxSummaryContainer: () => <div />
}))
jest.mock('routes/Menu/DetailOverlay', () => ('DetailOverlay'))
jest.mock('./RecipeMeta', () => ({
  RecipeMeta: () => <div />
}))
jest.mock('./ThematicsPage', () => ({
  ThematicsPage: () => 'FilteredRecipePage'
}))

jest.mock('react-lazyload', () => ({
  forceCheck: jest.fn(),
}))

jest.mock('react-helmet', () => () => <div />)

describe('Menu', () => {
  let requiredProps
  let mountOptions

  const shouldJfyTutorialBeVisibleMock = jest.fn()

  const getStateMock = () => ({
    features: Immutable.fromJS({
      menuService: {
        value: false
      },
      isMenuProgressBarHidden: {
        value: false
      },
    }),
    auth: Immutable.fromJS({
      isAuthenticated: false
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
      onOverlayClick: jest.fn(),
      fetchData: jest.fn(),
      menuCalculateTimeToUsable: jest.fn(),
    }

    mountOptions = {
      context: {
        store: {
          getState: getStateMock,
          subscribe: () => { },
          dispatch: () => { },
        },
      },
      // eslint-disable-next-line react/forbid-prop-types
      childContextTypes: { store: PropTypes.object.isRequired }
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when rendering', () => {
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
      expect(requiredProps.fetchData).toHaveBeenCalled()
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
        mountOptions
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
        mountOptions
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

    describe('when user authentificate', () => {
      beforeEach(() => {
        wrapper.setProps({isAuthenticated: true})
      })
      test('should call fetchData ', () => {
        expect(requiredProps.fetchData).toHaveBeenCalledTimes(2)
      })
    })

    describe('when use previewMenu url', () => {
      beforeEach(() => {
        wrapper.setProps({query: {
          'preview[auth_user_id]': 'previewUserToken'
        }})
      })
      test('should not call fetch data function', () => {
        expect(requiredProps.fetchData).toHaveBeenCalledTimes(1)
      })
    })

    describe('when component did update with recipesCount property', () => {
      beforeEach(() => {
        wrapper.setProps({recipesCount: 3})
      })
      test('should not trigger fetch ', () => {
        expect(requiredProps.fetchData).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('componentDidUpdate', () => {
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

