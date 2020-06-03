import React from 'react'
import { mount } from 'enzyme'
import { IngredientIssues } from '../IngredientIssues'

describe('given the IngredientIssues is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <IngredientIssues />
    )
  })

  test('loading is added to the page', () => {
    expect(wrapper.find('Loading').exists()).toBe(true)
  })
})
