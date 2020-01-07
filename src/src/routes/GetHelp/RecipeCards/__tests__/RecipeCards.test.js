import React from 'react'
import { shallow } from 'enzyme'
import { RecipeCards } from '../RecipeCards.logic'
import { RecipeCardContent } from '../RecipeCardContent'

describe('<RecipeCards />', () => {
  const TEST_TITLE = 'test title'
  const TEST_RECIPES = [
    {
      id: '1',
      title: 'test 1',
      ingredients: [{ id: '1', label: 'test' }],
      url: 'https://test-1.com'
    },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ id: '2', label: 'test' }, { id: '2222', label: 'test2' }],
      url: 'https://test-2.com',
    },
    {
      id: '3',
      title: 'test 3',
      ingredients: [{ id: '3', label: 'test' }],
      url: 'https://test-3.com'
    },
    {
      id: '4',
      title: 'test 4',
      ingredients: [{ id: '4', label: 'test' }],
      url: 'https://test-4.com'
    },
  ]

  let wrapper
  let trackRecipeCardClickMock

  beforeEach(() => {
    trackRecipeCardClickMock = jest.fn()

    wrapper = shallow(
      <RecipeCards
        recipes={TEST_RECIPES}
        title={TEST_TITLE}
        trackRecipeCardClick={trackRecipeCardClickMock}
      />
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders a page title', () => {
    expect(wrapper.find('RecipeCardsPresentation').prop('title')).toBe(TEST_TITLE)
  })

  test('passes the recipies to RecipeList component', () => {
    expect(wrapper.find('RecipeList').prop('recipes')).toEqual(TEST_RECIPES)
  })

  test('passes RecipeCardContent as child to RecipeList', () => {
    expect(wrapper.find('RecipeList').children().type()).toBe(RecipeCardContent)
  })

  test('passes tracking function to RecipeCardContent', () => {
    expect(wrapper.find('RecipeCardContent').prop('trackRecipeCardClick')).toEqual(trackRecipeCardClickMock)
  })
})
