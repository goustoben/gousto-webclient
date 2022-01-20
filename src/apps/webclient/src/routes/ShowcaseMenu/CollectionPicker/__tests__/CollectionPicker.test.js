import React from 'react'
import { shallow } from 'enzyme'
import { CollectionPicker } from '../CollectionPicker'

export const collectionDescriptorsInLines = [
  [{ id: 'id1', slug: 'all-recipes', shortTitle: 'All Recipes' }],
  [{ id: 'id8', shortTitle: '10-Minute Meals', slug: '10-minute-meals' }],
]

export const collectionDescriptorsSingleLine = [
  { id: 'id1', slug: 'all-recipes', shortTitle: 'All Recipes' },
  { id: 'id8', shortTitle: '10-Minute Meals', slug: '10-minute-meals' },
]

describe('CollectionPicker', () => {
  let wrapper

  const changeCollection = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CollectionPicker
        collectionDescriptorsInLines={collectionDescriptorsInLines}
        collectionDescriptorsSingleLine={collectionDescriptorsSingleLine}
        changeCollection={changeCollection}
      />
    )
  })

  test('renders correctly', () => {
    const fixedLinesWrapper = wrapper.find('.collectionPickerFixedLines')
    expect(fixedLinesWrapper.exists()).toBe(true)
    expect(fixedLinesWrapper.find('LineOfPills')).toHaveLength(2)

    const wrappedLinesWrapper = wrapper.find('.collectionPickerWrappedLines')
    expect(wrappedLinesWrapper.exists()).toBe(true)
    expect(wrappedLinesWrapper.find('LineOfPills')).toHaveLength(1)
  })
})
