import React from 'react'
import { shallow } from 'enzyme'
import SubHeader from 'routes/Menu/SubHeader'
import Loading from 'routes/Menu/Loading'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { CollectionsNavContainer } from '../../CollectionsNav'
import { MenuRecipesPage as MenuRecipes } from '../MenuRecipesPage'
jest.mock('routes/Menu/SubHeader')

jest.mock('../../CollectionsNav', () => ({ CollectionsNavContainer: 'CollectionsNav' }))
jest.mock('routes/Menu/JustForYouTutorial', () => ({ JustForYouTutorial: () => <div /> }))
jest.mock('../BasketValidationErrorModal', () => ({ BasketValidationErrorModalContainer: 'BasketValidationErrorModalContainer'}))

describe('initial render', () => {
  let wrapper
  let checkQueryParamsSpy
  beforeEach(() => {
    checkQueryParamsSpy = jest.fn()
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
        checkQueryParams={checkQueryParamsSpy}
      />,
    )
  })
  test('should render 1 SubHeader', () => {
    expect(wrapper.find(SubHeader).length).toBe(1)
  })
  test('should show a collections nav', () => {
    expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
  })

  test('should not show as loading', () => {
    expect(wrapper.find(Loading).prop('loading')).toBe(false)
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

  describe('when showCommunicationPanel true', () => {
    beforeEach(() => {
      wrapper.setProps({showCommunicationPanel: true})
    })

    test('should render CommunicationPanel', () => {
      expect(wrapper.find('CommunicationPanel')).toHaveLength(1)
    })
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
        checkQueryParams={() => {}}
      />,
    )
    expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
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
        checkQueryParams={() => {}}
      />,
    )

    expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
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
        checkQueryParams={() => {}}
      />,
    )

    expect(wrapper.find(CollectionsNavContainer).length).toBe(1)
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
