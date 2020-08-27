import React from 'react'
import { shallow } from 'enzyme'
import SubHeader from 'routes/Menu/SubHeader'
import Loading from 'routes/Menu/Loading'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { CollectionsNavContainer } from '../../CollectionsNav'
import { MenuRecipesPage as MenuRecipes } from '../MenuRecipesPage'
import { CapacityInfo } from '../../components/CapacityInfo'
import { BannerTastePreferencesContainer } from '../BannerTastePreferences'

jest.mock('routes/Menu/SubHeader')
jest.mock('../../CollectionsNav', () => ({ CollectionsNavContainer: 'CollectionsNav' }))
jest.mock('routes/Menu/JustForYouTutorial', () => ({ JustForYouTutorial: () => <div /> }))
jest.mock('../BasketValidationErrorModal', () => ({ BasketValidationErrorModalContainer: 'BasketValidationErrorModalContainer'}))
jest.mock('../RecipeSidesModal', () => ({ RecipeSidesModalContainer: 'RecipeSidesModalContainer'}))

describe('initial render', () => {
  let wrapper
  let checkQueryParamsSpy
  let requiredProps
  describe('when showLoading is false', () => {
    beforeEach(() => {
      requiredProps = {
        stateRecipeCount: 30,
        menuCurrentCollectionId: '234',
        selectCurrentCollection: jest.fn(),
        detailVisibilityChange: jest.fn(),
        shouldJfyTutorialBeVisible: jest.fn(),
        basketOrderLoaded: jest.fn(),
        portionSizeSelectedTracking: jest.fn(),
        userId: '1234',
        isAuthenticated: true,
        loadOptimizelySDK: jest.fn(),
      }
      checkQueryParamsSpy = jest.fn()
      SubHeader.mockReturnValue(<div />)

      wrapper = shallow(
        <MenuRecipes
          {...requiredProps}
          basketNumPortionChange={jest.fn()}
          fadeCss="fadeOut"
          showLoading={false}
          checkQueryParams={checkQueryParamsSpy}
          shouldShowCapacityInfo={false}
        />,
      )
    })
    test('should render 1 SubHeader', () => {
      expect(wrapper.find(SubHeader).length).toBe(1)
    })
    test('should show a collections nav', () => {
      expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
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

    test('should render RecipeSidesModalContainer', () => {
      expect(wrapper.find('RecipeSidesModalContainer')).toHaveLength(1)
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
      selectCurrentCollection: jest.fn(),
      detailVisibilityChange: jest.fn(),
      shouldJfyTutorialBeVisible: jest.fn(),
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
    expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
  })
})

describe('with the force collections feature enabled', () => {
  let wrapper
  let requiredProps
  beforeEach(() => {
    requiredProps = {
      stateRecipeCount: 30,
      menuCurrentCollectionId: '234',
      selectCurrentCollection: jest.fn(),
      detailVisibilityChange: jest.fn(),
      shouldJfyTutorialBeVisible: jest.fn(),
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

    expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
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

    expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
  })
})

describe('selectCurrentCollection', () => {
  let wrapper
  let selectCurrentCollection
  let requiredProps
  beforeEach(() => {
    selectCurrentCollection = jest.fn()
    requiredProps = {
      stateRecipeCount: 30,
      menuCurrentCollectionId: '234',
      selectCurrentCollection: jest.fn(),
      detailVisibilityChange: jest.fn(),
      shouldJfyTutorialBeVisible: jest.fn(),
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
        stateRecipeCount={30}
        menuCurrentCollectionId="123abc"
        menuRecipeDetailShow=""
        detailVisibilityChange={() => { }}
        selectCurrentCollection={selectCurrentCollection}
        checkQueryParams={() => {}}
      />,
    )
  })
  afterEach(() => {
    selectCurrentCollection.mockClear()
  })
  test('should not call selectCurrentCollection if menuCollectionId doesnt change', () => {
    wrapper.setProps({ menuCurrentCollectionId: '123abc' })
    expect(selectCurrentCollection).not.toHaveBeenCalled()
  })

  test('should only call selectCurrentCollection if menuCollectionId changes', () => {
    wrapper.setProps({ menuCurrentCollectionId: '567xyz' })
    expect(selectCurrentCollection).toHaveBeenCalled()
  })
})

describe('componentWillUnmount', () => {
  const { addEventListener, removeEventListener } = window
  const next = jest.fn()
  let wrapper
  let requiredProps

  beforeEach(() => {
    window.document.addEventListener = jest.fn()
    window.document.removeEventListener = jest.fn()
    requiredProps = {
      stateRecipeCount: 30,
      menuCurrentCollectionId: '234',
      selectCurrentCollection: jest.fn(),
      detailVisibilityChange: jest.fn(),
      shouldJfyTutorialBeVisible: jest.fn(),
      basketOrderLoaded: jest.fn(),
      portionSizeSelectedTracking: jest.fn(),
      userId: '1234',
      isAuthenticated: true,
      loadOptimizelySDK: jest.fn(),
    }

    wrapper = shallow(
      <MenuRecipes
        {...requiredProps}
        fadeCss="fadeOut"
        orderId=""
        showLoading={false}
        checkQueryParams={() => {}}
      />,
    )
  })

  afterEach(() => {
    next.mockClear()
    window.document.addEventListener = addEventListener
    window.document.removeEventListener = removeEventListener
  })
  test('should call removeEventListener', () => {
    wrapper.unmount()
    expect(window.document.removeEventListener).toHaveBeenCalled()
  })
})
