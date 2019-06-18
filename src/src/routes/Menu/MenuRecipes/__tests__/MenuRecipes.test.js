import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { MenuRecipes } from 'routes/Menu/MenuRecipes'
import CollectionsNav from 'routes/Menu/CollectionsNav'
import SubHeader from 'routes/Menu/SubHeader'
import Loading from 'routes/Menu/Loading'
import { Banner } from 'routes/Menu/Banner'
import MenuNoResults from 'routes/Menu/MenuNoResults'

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

  describe('and the collectionsNav feature disabled', () => {
    test('should not show the collections nav bar', () => {
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
          features={Immutable.fromJS({
            collections: {
              value: false,
            },
            filterMenu: {
              value: true,
            },
          })}
        />,
        {
          context: {
            store: {
              dispatch: jest.fn()
            }
          }
        }
      )
      expect(wrapper.find(CollectionsNav).length).toBe(0)
    })
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
