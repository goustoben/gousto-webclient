import React from 'react'
import { shallow } from 'enzyme'
import { collectionDescriptorsSingleLine } from './CollectionPicker.test'
import { LineOfPills } from '../LineOfPills'

describe('LineOfPills', () => {
  let wrapper
  const changeCollection = jest.fn()

  beforeAll(() => {
    wrapper = shallow(
      <LineOfPills
        line={collectionDescriptorsSingleLine}
        changeCollection={changeCollection}
        currentCollectionId={collectionDescriptorsSingleLine[0].id}
      />
    )
  })

  test('renders a pill per item', () => {
    const pills = wrapper.find('Pill')
    expect(pills).toHaveLength(2)

    const firstPill = pills.at(0)
    expect(firstPill.prop('isActive')).toBe(true)
    expect(firstPill.prop('children')).toBe('All Recipes')

    const secondPill = pills.at(1)
    expect(secondPill.prop('isActive')).toBe(false)
    expect(secondPill.prop('children')).toBe('10-Minute Meals')
  })

  describe('when a pill is clicked', () => {
    beforeEach(() => {
      wrapper.find('Pill').at(1).simulate('click')
    })

    test('then it should change the active collection', () => {
      expect(changeCollection).toHaveBeenCalledWith('id8', '10-Minute Meals')
    })
  })
})
