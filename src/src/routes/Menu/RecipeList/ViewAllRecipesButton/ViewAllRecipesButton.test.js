import { shallow } from 'enzyme'
import React from 'react'
import { CTA } from 'zest/CTA'
import { ViewAllRecipesButton } from './ViewAllRecipesButton'

describe('ViewAllRecipesButton', () => {
  let wrapper
  let onClick

  beforeEach(() => {
    onClick = jest.fn()

    wrapper = shallow(
      <ViewAllRecipesButton onClick={onClick} />
    )
  })

  describe('When rendering CTA button', () => {
    test('renders CTA Button', () => {
      expect(wrapper.find(CTA)).toHaveLength(1)
    })

    test('renders CTA button full width', () => {
      expect(wrapper.find(CTA).prop('isFullWidth')).toBe(true)
    })

    test('renders CTA button with onClick prop', () => {
      expect(wrapper.find(CTA).prop('onClick')).toEqual(onClick)
    })

    test('renders CTA button with correct text', () => {
      expect(wrapper.find(CTA).prop('children')).toBe('View all recipes')
    })
  })
})
