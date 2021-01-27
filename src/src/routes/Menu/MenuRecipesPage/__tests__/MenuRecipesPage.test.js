import React from 'react'
import { shallow } from 'enzyme'
import { SubHeaderContainer } from 'routes/Menu/SubHeader'
import Loading from 'routes/Menu/Loading'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { CollectionsNavContainer } from '../../CollectionsNav'
import { MenuRecipesPage as MenuRecipes, MenuRecipesPage } from '../MenuRecipesPage'
import { CapacityInfo } from '../../components/CapacityInfo'
import { BannerTastePreferencesContainer } from '../BannerTastePreferences'
import { OptimizelyRolloutsContainer } from '../../../../containers/OptimizelyRollouts'
import { CategoriesShortcutsContainer } from '../../ElevatedMenuExperience/CategoriesShortcuts'
import { ExperimentsContainer } from '../../../../containers/Experiments'

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
      }
      checkQueryParamsSpy = jest.fn()
      SubHeaderContainer.mockReturnValue(<div />)

      wrapper = shallow(
        <MenuRecipes
          {...requiredProps}
          basketNumPortionChange={jest.fn()}
          fadeCss="fadeOut"
          showLoading={false}
          checkQueryParams={checkQueryParamsSpy}
          shouldShowCapacityInfo={false}
          browserType="desktop"
        />
      )
    })
    test('should render 1 SubHeaderContainer', () => {
      expect(wrapper.find(SubHeaderContainer).length).toBe(1)
    })

    test('should render a mobile-only MenuDateRange', () => {
      expect(wrapper.find('Connect(MenuDateRange)')).toHaveLength(1)
      expect(wrapper.find('Connect(MenuDateRange)').prop('variant')).toBe('mobile')
    })

    test('should show a collections nav', () => {
      expect(wrapper.find(CollectionsNavContainer).exists()).toBe(true)
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

    describe('Given the bucketing A/A test', () => {
      it('should render 4 experiments containers', () => {
        expect(wrapper.find(ExperimentsContainer)).toHaveLength(4)
      })

      it.each([
        ['entropy-experiment-one', 0],
        ['entropy-experiment-two', 1],
        ['entropy-experiment-three', 2],
        ['entropy-experiment-four', 3],
      ])('renders experiment container with experiment name %s', (experimentName, index) => {
        expect(wrapper.find(ExperimentsContainer).at(index).prop('experimentName')).toBe(experimentName)
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
    expect(wrapper.find(CollectionsNavContainer).exists()).toBe(true)
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

    expect(wrapper.find(CollectionsNavContainer).exists()).toBe(true)
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

    expect(wrapper.find(CollectionsNavContainer).exists()).toBe(true)
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

describe('when the optimizely rollouts featureEnabled is true', () => {
  let wrapper
  beforeEach(() => {
    const context = {
      store: {
        dispatch: jest.fn(),
      },
    }
    context.store.dispatch.mockClear()
    const query = {
      collection: null
    }

    wrapper = shallow(
      <MenuRecipesPage browserType="mobile" query={query} />,
      { context }
    )
  })

  test('should render OptimizelyRolloutsContainer with featureEnabled true for EMERecipeList', () => {
    expect(wrapper.find(OptimizelyRolloutsContainer).first().prop('featureEnabled')).toBe(true)
    expect(wrapper.find(OptimizelyRolloutsContainer).first().find(CategoriesShortcutsContainer)).toHaveLength(1)
  })
})
