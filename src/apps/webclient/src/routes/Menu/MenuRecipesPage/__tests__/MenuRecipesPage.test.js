import React from 'react'
import { shallow } from 'enzyme'
import Loading from 'routes/Menu/Loading'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { CollectionsNavWrapper } from '../../CollectionsNav'
import { MenuRecipesPage as MenuRecipes } from '../MenuRecipesPage'
import { CapacityInfo } from '../../components/CapacityInfo'
import { BannerTastePreferencesContainer } from '../BannerTastePreferences'

jest.mock('routes/Menu/SubHeader')
jest.mock('../../CollectionsNav', () => ({ CollectionsNavWrapper: 'CollectionsNav' }))
jest.mock('routes/Menu/JustForYouTutorial', () => ({ JustForYouTutorial: () => <div /> }))
jest.mock('../BasketValidationErrorModal', () => ({ BasketValidationErrorModalContainer: 'BasketValidationErrorModalContainer'}))

describe('initial render', () => {
  let wrapper
  let checkQueryParamsSpy
  let requiredProps
  describe('when showLoading is false', () => {
    beforeEach(() => {
      requiredProps = {
        stateRecipeCount: 30,
        menuCurrentCollectionId: '234',
        detailVisibilityChange: jest.fn(),
        basketOrderLoaded: jest.fn(),
        portionSizeSelectedTracking: jest.fn(),
        userId: '1234',
        isAuthenticated: true,
        loadOptimizelySDK: jest.fn(),

      }
      checkQueryParamsSpy = jest.fn()

      wrapper = shallow(
        <MenuRecipes
          {...requiredProps}
          basketNumPortionChange={jest.fn()}
          fadeCss="fadeOut"
          showLoading={false}
          checkQueryParams={checkQueryParamsSpy}
          shouldShowCapacityInfo={false}
        />
      )
    })
    test('should render 1 SubHeaderContainer', () => {
      expect(wrapper.find('Memo(Connect(SubHeader))').length).toBe(1)
    })

    test('should render a mobile-only MenuDateRange', () => {
      expect(wrapper.find('Connect(MenuDateRange)')).toHaveLength(1)
      expect(wrapper.find('Connect(MenuDateRange)').prop('variant')).toBe('mobile')
    })

    test('should show a collections nav', () => {
      expect(wrapper.find(CollectionsNavWrapper).exists()).toBe(true)
    })

    test('should render these through the RecipGrid component', () => {
      expect(wrapper.find(RecipeGrid)).toHaveLength(1)
    })

    test('should render JFY tutorial', () => {
      expect(wrapper.find('JustForYouTutorial').length).toBe(1)
    })

    test('should render BasketValidationErrorModalContainer', () => {
      expect(wrapper.find('BasketValidationErrorModalContainer')).toHaveLength(1)
    })

    test('should call checkQueryParams at componentDidMount', () => {
      expect(checkQueryParamsSpy).toHaveBeenCalledTimes(1)
    })

    test('should render BannerTastePreferencesContainer', () => {
      expect(wrapper.find(BannerTastePreferencesContainer)).toHaveLength(1)
    })
    describe('when showCommunicationPanel true', () => {
      beforeEach(() => {
        wrapper.setProps({showCommunicationPanel: true})
      })

      test('should render CommunicationPanel', () => {
        expect(wrapper.find('CommunicationPanel')).toHaveLength(1)
      })
    })
  })

  describe('when showLoading is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <MenuRecipes
          {...requiredProps}
          basketNumPortionChange={jest.fn()}
          fadeCss="fadeOut"
          showLoading
          checkQueryParams={checkQueryParamsSpy}
          shouldShowCapacityInfo={false}
        />,
      )
    })

    test('Loading is rendered', () => {
      expect(wrapper.find(Loading)).toHaveLength(1)
    })

    test('should pass the loading prop to the <Loading> component', () => {
      expect(wrapper.find(Loading).prop('loading')).toBe(true)
    })
  })

  describe('and there is no slot available', () => {
    beforeEach(() => {
      wrapper = shallow(
        <MenuRecipes
          {...requiredProps}
          basketNumPortionChange={jest.fn()}
          fadeCss="fadeOut"
          showLoading={false}
          checkQueryParams={checkQueryParamsSpy}
          shouldShowCapacityInfo
          userId="1234"
        />,
      )
    })

    test('CapacityInfo is rendered', () => {
      expect(wrapper.find(CapacityInfo)).toHaveLength(1)
    })

    test('should pass the userId prop to the <CapacityInfo> component', () => {
      expect(wrapper.find(CapacityInfo).prop('userId')).toBe('1234')
    })
  })
})

describe('with the collections feature enabled', () => {
  let wrapper
  let requiredProps
  test('should show a collections nav', () => {
    requiredProps = {
      stateRecipeCount: 30,
      menuCurrentCollectionId: '234',
      detailVisibilityChange: jest.fn(),
      basketOrderLoaded: jest.fn(),
      portionSizeSelectedTracking: jest.fn(),
      userId: '1234',
      isAuthenticated: true,
      loadOptimizelySDK: jest.fn(),
    }
    wrapper = shallow(
      <MenuRecipes
        {...requiredProps}
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        menuRecipeDetailShow=""
        checkQueryParams={() => {}}
      />,
    )
    expect(wrapper.find(CollectionsNavWrapper).exists()).toBe(true)
  })
})

describe('with the force collections feature enabled', () => {
  let wrapper
  let requiredProps
  beforeEach(() => {
    requiredProps = {
      stateRecipeCount: 30,
      menuCurrentCollectionId: '234',
      detailVisibilityChange: jest.fn(),
      basketOrderLoaded: jest.fn(),
      portionSizeSelectedTracking: jest.fn(),
      userId: '1234',
      isAuthenticated: true,
      loadOptimizelySDK: jest.fn(),
    }
  })

  test('should show a collections nav', () => {
    wrapper = shallow(
      <MenuRecipes
        {...requiredProps}
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        menuRecipeDetailShow=""
        checkQueryParams={() => {}}
      />,
    )

    expect(wrapper.find(CollectionsNavWrapper).exists()).toBe(true)
  })
  test('should still show the collections nav bar with the collectionsNav feature disabled', () => {
    wrapper = shallow(
      <MenuRecipes
        {...requiredProps}
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        checkQueryParams={() => {}}
      />,
    )

    expect(wrapper.find(CollectionsNavWrapper).exists()).toBe(true)
  })
})
