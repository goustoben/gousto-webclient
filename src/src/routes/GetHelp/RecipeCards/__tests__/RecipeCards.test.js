import React from 'react'
import { mount } from 'enzyme'
import { RecipeCards } from '../RecipeCards.logic'

describe('<RecipeCards />', () => {
  const TEST_TITLE = 'test title'
  const TEST_RECIPES = [
    { id: '1', title: 'test 1', ingredients: [{ id: '1', label: 'test' }] },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ id: '2', label: 'test' }, { id: '2222', label: 'test2' }]
    },
    { id: '3', title: 'test 3', ingredients: [{ id: '3', label: 'test' }] },
    { id: '4', title: 'test 4', ingredients: [{ id: '4', label: 'test' }] },
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

  test('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
