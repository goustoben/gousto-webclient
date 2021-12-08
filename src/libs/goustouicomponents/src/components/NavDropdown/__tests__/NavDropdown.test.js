import React from 'react'
import { shallow } from 'enzyme'
import { NavDropdown } from '../NavDropdown.logic'

const mockOptions = [
  {
    text: 'Option 1',
    value: 'http://gousto.co.uk/cookbook/all-recipes',
  },
  {
    text: 'Option 2',
    value: 'http://gousto.co.uk/cookbook/vegan-recipes',
  },
  {
    text: 'Option 3',
    value: 'http://gousto.co.uk/cookbook/asian-recipes',
  },
]

describe('Given NavDropdown is rendered', () => {
  const renderItem = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <NavDropdown
        isMobile={false}
        name="testName"
        options={mockOptions}
        placeholder="testPlaceholder"
        testingSelector="testSelector"
        renderItem={renderItem}
      />,
    )
  })

  test('Then it renders DropdownBase with correct props', () => {
    const baseWrapper = wrapper.find('DropdownBase')

    expect(baseWrapper.exists()).toBeTruthy()
    expect(baseWrapper.prop('isMobile')).toBe(false)
    expect(baseWrapper.prop('name')).toBe('testName')
    expect(baseWrapper.prop('options')).toStrictEqual(mockOptions)
    expect(baseWrapper.prop('placeholder')).toBe('testPlaceholder')
    expect(baseWrapper.prop('testingSelector')).toBe('testSelector')
    expect(baseWrapper.prop('renderItem')).toBe(renderItem)
    expect(baseWrapper.prop('itemsAreLinks')).toBeTruthy()
  })
})
