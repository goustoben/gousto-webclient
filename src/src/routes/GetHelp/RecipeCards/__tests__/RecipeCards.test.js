import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { RecipeCards } from '../RecipeCards.logic'

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

  beforeEach(() => {
    wrapper = mount(
      <RecipeCards
        recipes={TEST_RECIPES}
        title={TEST_TITLE}
      />
    )
  })

  test('renders a page title', () => {
    expect(wrapper.find('RecipeCardsPresentation').prop('title')).toBe(TEST_TITLE)
  })

  test('renders a list of recipes as Items', () => {
    expect(wrapper.find('Item')).toHaveLength(TEST_RECIPES.length)
  })

  test('renders the recipes with correct names', () => {
    expect(wrapper.find('Item').first().prop('label')).toBe(TEST_RECIPES[0].title)
  })

  describe('clicking on a recipe from the list', () => {
    beforeEach(() => {
      window.open = jest.fn()
      browserHistory.push = jest.fn()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('when the cookbook url exists for the recipe', () => {
      beforeEach(() => {
        wrapper.find('Item').first().simulate('click')
      })

      test('opens the url in a new tab', () => {
        expect(window.open).toHaveBeenCalledWith(TEST_RECIPES[0].url, '_blank', 'noopener noreferrer')
      })
    })

    describe('when the url does not exist for a recipe', () => {
      beforeEach(() => {
        const recipesNoUrl = [
          ...TEST_RECIPES,
          { id: '5', title: 'test 5', ingredients: [], url: '' }
        ]

        wrapper = mount(
          <RecipeCards
            recipes={recipesNoUrl}
            title={TEST_TITLE}
          />
        )

        wrapper.find('Item').last().simulate('click')
      })

      test('redirects to the contact page', () => {
        expect(browserHistory.push).toHaveBeenCalledWith(`${client.getHelp.index}/${client.getHelp.contact}`)
      })
    })
  })
})
