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
  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(
        <Menu
          menuLoadBoxPrices={() => {}}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          filteredRecipesNumber={30}
          isLoading={false}
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
    })

    test('with the isLoading prop set to true it should show a Loading', () => {
      wrapper = shallow(
        <Menu
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
          menuLoadBoxPrices={() => {}}
          numPortions={2}
          menuCollectionRecipes={Immutable.Map({})}
          features={Immutable.Map({})}
          isLoading
          storeOrderId={'1234'}
          boxSummaryShow
          clearAllFilters={() => {}}
          basketOrderLoaded={() => {}}
        />,
      )
      expect(wrapper.find(Loading).prop('loading')).toBe(false)
    })

    test('with the isLoading prop set to true and menuBrowseCTAShow true it should not show a Loading', () => {
      wrapper = shallow(
        <Menu
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
    let wrapper

    beforeEach(() => {
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
      BoxSummaryMobile.mockReturnValue(<div />)
      BoxSummaryDesktop.mockReturnValue(<div />)
      RecipeList.mockReturnValue(<div />)
      SubHeader.mockReturnValue(<div />)
      Banner.mockReturnValue(<div />)
      DetailOverlay.mockReturnValue(<div />)
    })

    test('should load Box Prices for non admin users', () => {
      wrapper = mount(
        <Menu
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
            },
          },
        },
      )
      expect(menuLoadBoxPrices).toHaveBeenCalledTimes(1)
    })

    test('should not load Box Prices for admin users', () => {
      wrapper = mount(
        <Menu
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
            },
          },
        },
      )
      expect(menuLoadBoxPrices).not.toHaveBeenCalled()
    })

    test('should call fetchData', () => {
      wrapper = mount(
        <Menu
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
            },
          },
        },
      )
      expect(fetchData).toHaveBeenCalled()
    })

    test('should call basketNumPortionChange if num portions query parameter is given and numPortionsChanged is true', () => {
      const basketNumPortionChangeSpy = jest.fn()
      const shouldJfyTutorialBeVisible = jest.fn()

      wrapper = mount(
        <Menu
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
          clearAllFilters={() => { }}
          params={{}}
          basketNumPortionChange={basketNumPortionChangeSpy}
          numPortionsChanged
          query={{ num_portions: '4' }}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
            },
          },
        },
      )

      expect(basketNumPortionChangeSpy).toHaveBeenCalled()
    })
  
    test('should call shouldJfyTutorialBeVisible', () => {
      const shouldJfyTutorialBeVisible = jest.fn()
      const basketNumPortionChangeSpy = jest.fn()

      wrapper = mount(
        <Menu
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
          numPortionsChanged
          query={{num_portions:'4'}}
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
            },
          },
        },
      )

      expect(shouldJfyTutorialBeVisible).toHaveBeenCalled()
    })
  })

  describe('componentDidUpdate', () => {
    let wrapper
    let menuLoadDays
    let boxSummaryDeliveryDaysLoad
    let menuLoadBoxPrices
    let getStateSpy
    const shouldJfyTutorialBeVisible = jest.fn()

    beforeEach(() => {
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
      wrapper = mount(
        <Menu
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
        />,
        {
          context: {
            store: {
              getState: getStateSpy,
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

    test('should call forceCheck', () => {
      wrapper.instance().componentDidUpdate(wrapper.props())

      expect(forceCheck).toHaveBeenCalledTimes(1)
    })

    describe('when we have finished loading', () => {
      beforeEach(() => {
        wrapper.setProps('isLoading', false)
      })

      test('should call shouldJfyTutorialBeVisible prop', () => {
        wrapper.instance().componentDidUpdate({
          ...wrapper.props(),
          isLoading: true,
        })

        expect(shouldJfyTutorialBeVisible).toHaveBeenCalled()
      })
    })

    describe('for any non-loading updates', () => {
      test('should not call shouldJfyTutorialBeVisible prop', () => {
        wrapper.instance().componentDidUpdate({
          ...wrapper.props(),
        })

        expect(shouldJfyTutorialBeVisible).not.toHaveBeenCalled()
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

    test('should render MenuNoResults', () => {
      wrapper = mount(
        <Menu
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
