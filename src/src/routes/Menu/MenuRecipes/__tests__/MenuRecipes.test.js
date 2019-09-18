import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { MenuRecipes } from 'routes/Menu/MenuRecipes/MenuRecipes'
import CollectionsNav from 'routes/Menu/CollectionsNav'
import SubHeader from 'routes/Menu/SubHeader'
import Loading from 'routes/Menu/Loading'
import { Banner } from 'routes/Menu/Banner'
import MenuNoResults from 'routes/Menu/MenuNoResults'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'

jest.mock('routes/Menu/SubHeader')

describe('initial render', () => {
  let wrapper
  beforeEach(() => {
    SubHeader.mockReturnValue(<div />)

    wrapper = shallow(
      <MenuRecipes
        clearAllFilters={() => { }}
        orderId={''}
        basketNumPortionChange={jest.fn()}
        fadeCss={'fadeOut'}
        showLoading={false}
        filteredRecipesNumber={30}
        mobileGridView
        menuCurrentCollectionId={''}
        menuRecipeDetailShow={''}
        isClient
        showDetailRecipe={jest.fn()}
        selectCurrentCollection={jest.fn()}
      />,
    )

  })
  test('should render 1 SubHeader', () => {
    expect(wrapper.find(SubHeader).length).toBe(1)
  })
  test('should not show a collections nav', () => {
    expect(wrapper.find('CollectionsNav').length).toBe(0)
  })

  test('should not show as loading', () => {
    expect(wrapper.find(Loading).prop('loading')).toBe(false)
  })
  test('should render banner with an image name prop', () => {
    expect(wrapper.find(Banner).length).toBe(1)
    expect(wrapper.find(Banner).prop('type')).toBeTruthy()
  })
  test('should render these through the RecipGrid component', () => {
    expect(wrapper.find(RecipeGrid)).toHaveLength(1)
  })
})

describe('with the collections feature enabled', () => {
  let wrapper
  test('should show a collections nav', () => {
    wrapper = shallow(
      <MenuRecipes
        clearAllFilters={() => { }}
        orderId={''}
        basketNumPortionChange={jest.fn()}
        fadeCss={'fadeOut'}
        showLoading={false}
        filteredRecipesNumber={30}
        mobileGridView
        menuCurrentCollectionId={''}
        menuRecipeDetailShow={''}
        isClient
        showDetailRecipe={jest.fn()}
        selectCurrentCollection={jest.fn()}
      />,
    )
    expect(wrapper.find(CollectionsNav).length).toBe(1)
  })
})

describe('with the force collections feature enabled', () => {
  let wrapper

  test('should show a collections nav', () => {
    wrapper = shallow(
      <MenuRecipes
        clearAllFilters={() => { }}
        orderId={''}
        basketNumPortionChange={jest.fn()}
        fadeCss={'fadeOut'}
        showLoading={false}
        filteredRecipesNumber={30}
        mobileGridView
        menuCurrentCollectionId={''}
        menuRecipeDetailShow={''}
        isClient
        showDetailRecipe={jest.fn()}
        selectCurrentCollection={jest.fn()}
      />,
    )

    expect(wrapper.find(CollectionsNav).length).toBe(1)
  })
  test('should still show the collections nav bar with the collectionsNav feature disabled', () => {
    wrapper = shallow(
      <MenuRecipes
        clearAllFilters={() => { }}
        orderId={''}
        basketNumPortionChange={jest.fn()}
        fadeCss={'fadeOut'}
        showLoading={false}
        filteredRecipesNumber={30}
        mobileGridView
        menuCurrentCollectionId={''}
        menuRecipeDetailShow={''}
        isClient
        showDetailRecipe={jest.fn()}
        selectCurrentCollection={jest.fn()}
      />,
    )

    expect(wrapper.find(CollectionsNav).length).toBe(1)
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
    wrapper = shallow(
      <MenuRecipes
        clearAllFilters={() => { }}
        orderId={''}
        basketNumPortionChange={jest.fn()}
        fadeCss={'fadeOut'}
        showLoading={false}
        filteredRecipesNumber={0}
        mobileGridView
        menuCurrentCollectionId={''}
        menuRecipeDetailShow={''}
        isClient
        showDetailRecipe={jest.fn()}
        features={Immutable.Map({
          currentCollectionId: '',
          totalTime: '0',
          dietTypes: Immutable.Set(['meat']),
          dietaryAttributes: Immutable.Set(['gluten-free']),
        })}
      />,
    )

    expect(wrapper.find(MenuNoResults)).toHaveLength(1)
  })
})

describe('selectCurrentCollection', () => {
  let wrapper
  let selectCurrentCollection
  beforeEach(() => {
    selectCurrentCollection = jest.fn()
    wrapper = shallow(
      <MenuRecipes
        clearAllFilters={() => { }}
        orderId={''}
        basketNumPortionChange={jest.fn()}
        fadeCss={'fadeOut'}
        showLoading={false}
        filteredRecipesNumber={30}
        mobileGridView
        menuCurrentCollectionId={'123abc'}
        menuRecipeDetailShow={''}
        isClient
        showDetailRecipe={jest.fn()}
        selectCurrentCollection={selectCurrentCollection}
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
