import React from 'react'
import { mount } from 'enzyme'
import { RecipeCards } from '../RecipeCards.logic'
import { RecipeCardContent } from '../RecipeCardContent'

describe('<RecipeCards />', () => {
  const TEST_RECIPES = [
    {
      id: '1',
      title: 'test 1',
      ingredients: [{ uuid: '1', label: 'test' }],
      url: 'https://test-1.com'
    },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ uuid: '2', label: 'test' }, { uuid: '2222', label: 'test2' }],
      url: 'https://test-2.com',
    },
    {
      id: '3',
      title: 'test 3',
      ingredients: [{ uuid: '3', label: 'test' }],
      url: 'https://test-3.com'
    },
    {
      id: '4',
      title: 'test 4',
      ingredients: [{ uuid: '4', label: 'test' }],
      url: 'https://test-4.com'
    },
  ]

  let wrapper
  const trackRecipeCardClick = jest.fn()
  const trackRecipeCardGetInTouchClick = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <RecipeCards
        recipes={TEST_RECIPES}
        trackRecipeCardClick={trackRecipeCardClick}
        trackRecipeCardGetInTouchClick={trackRecipeCardGetInTouchClick}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the right page title', () => {
    expect(wrapper.find('GetHelpLayout2').prop('headingText')).toBe('Get help with your box')
  })

  test('passes the recipes to RecipeList component', () => {
    expect(wrapper.find('RecipeList').prop('recipes')).toEqual(TEST_RECIPES)
  })

  test('passes RecipeCardContent as child to RecipeList', () => {
    expect(wrapper.find('RecipeList').props().children.type).toBe(RecipeCardContent)
  })

  test('passes tracking function to RecipeCardContent', () => {
    expect(wrapper.find('RecipeList').props().children.props.trackRecipeCardClick)
      .toEqual(trackRecipeCardClick)
  })

  test('passes tracking get in touch function to RecipeCardContent', () => {
    expect(wrapper.find('RecipeList').props().children.props.trackRecipeCardGetInTouchClick)
      .toEqual(trackRecipeCardGetInTouchClick)
  })
})
