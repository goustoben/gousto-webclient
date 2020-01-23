import React from 'react'
import { shallow } from 'enzyme'
import CollectionsNav from 'routes/Menu/CollectionsNav'
import SubHeader from 'routes/Menu/SubHeader'
import Loading from 'routes/Menu/Loading'
import { Banner } from 'routes/Menu/Banner'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { MenuRecipesPage as MenuRecipes } from '../MenuRecipesPage'

jest.mock('routes/Menu/SubHeader')

jest.mock('routes/Menu/CollectionsNav', () => ('CollectionsNav'))

describe('initial render', () => {
  let wrapper
  beforeEach(() => {
    SubHeader.mockReturnValue(<div />)

    wrapper = shallow(
      <MenuRecipes
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        stateRecipeCount={30}
        menuCurrentCollectionId=""
        menuRecipeDetailShow=""
        selectCurrentCollection={jest.fn()}
        detailVisibilityChange={() => { }}
      />,
    )
  })
  test('should render 1 SubHeader', () => {
    expect(wrapper.find(SubHeader).length).toBe(1)
  })
  test('should show a collections nav', () => {
    expect(wrapper.find('CollectionsNav').length).toBe(1)
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
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        stateRecipeCount={30}
        menuCurrentCollectionId=""
        menuRecipeDetailShow=""
        detailVisibilityChange={() => { }}
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
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        stateRecipeCount={30}
        menuCurrentCollectionId=""
        menuRecipeDetailShow=""
        detailVisibilityChange={() => { }}
        selectCurrentCollection={jest.fn()}
      />,
    )

    expect(wrapper.find(CollectionsNav).length).toBe(1)
  })
  test('should still show the collections nav bar with the collectionsNav feature disabled', () => {
    wrapper = shallow(
      <MenuRecipes
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        stateRecipeCount={30}
        menuCurrentCollectionId=""
        menuRecipeDetailShow=""
        detailVisibilityChange={() => { }}
        selectCurrentCollection={jest.fn()}
      />,
    )

    expect(wrapper.find(CollectionsNav).length).toBe(1)
  })
})

describe('selectCurrentCollection', () => {
  let wrapper
  let selectCurrentCollection
  beforeEach(() => {
    selectCurrentCollection = jest.fn()
    wrapper = shallow(
      <MenuRecipes
        orderId=""
        basketNumPortionChange={jest.fn()}
        fadeCss="fadeOut"
        showLoading={false}
        stateRecipeCount={30}
        menuCurrentCollectionId="123abc"
        menuRecipeDetailShow=""
        detailVisibilityChange={() => { }}
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

describe('componentWillUnmount', () => {
  const { addEventListener, removeEventListener } = window
  const next = jest.fn()
  let wrapper

  beforeEach(() => {
    window.document.addEventListener = jest.fn()
    window.document.removeEventListener = jest.fn()

    wrapper = shallow(
      <MenuRecipes
        fadeCss="fadeOut"
        orderId=""
        showLoading={false}
        stateRecipeCount={30}
        menuCurrentCollectionId="123abc"
        menuRecipeDetailShow=""
        selectCurrentCollection={() => { }}
        detailVisibilityChange={() => { }}
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

describe('stockAlert', () => {
  describe('when showStockAlert is true', () => {
    let wrapper
    beforeEach(() => {
      SubHeader.mockReturnValue(<div />)

      wrapper = shallow(
        <MenuRecipes
          orderId=""
          basketNumPortionChange={jest.fn()}
          fadeCss="fadeOut"
          showLoading={false}
          showStockAlert
          stateRecipeCount={30}
          menuCurrentCollectionId=""
          menuRecipeDetailShow=""
          selectCurrentCollection={jest.fn()}
          detailVisibilityChange={() => { }}
        />,
      )
    })
    test('should show stock alert', () => {
      expect(wrapper.find('Alert')).toHaveLength(1)
    })
    
    test('should show stock alert with Recipe rush title', () => {
      expect(wrapper.find('Alert > h4').text()).toEqual('Recipe rush')
    })
  })
})
