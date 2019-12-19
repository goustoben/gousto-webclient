import React from 'react'
import { shallow } from 'enzyme'
import { RecipeList } from '..'

describe('the RecipeList component', () => {
  let wrapper
  const TEST_RECIPES = [
    { id: '1', title: 'test 1', ingredients: [{ id: '1', label: 'test' }] },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ id: '2', label: 'test' }, { id: '2222', label: 'test2' }]
    },
  ]

  const mockChildProps = {
    prop1: '1',
    prop2: '2',
  }

  const MockChildComponent = () => (
    <div>Example recipe content</div>
  )

  beforeEach(() => {
    wrapper = shallow(
      <RecipeList recipes={TEST_RECIPES}>
        <MockChildComponent {...mockChildProps} />
      </RecipeList>
    )
  })

  test('renders recipes as a list of  expandable items', () => {
    const item = wrapper.find('ItemExpandable')
    expect(item.length).toBe(TEST_RECIPES.length)
    expect(item.first().prop('label')).toBe(TEST_RECIPES[0].title)
  })

  test('uses the child components as the expanded content', () => {
    expect(wrapper.find('ItemExpandable').find('MockChildComponent').length).toBe(TEST_RECIPES.length)
  })

  test('passes props to each child', () => {
    const expectedProps = {
      ...mockChildProps,
      recipe: TEST_RECIPES[0],
    }

    expect(wrapper.find('MockChildComponent').first().props()).toEqual(expectedProps)
  })
})
