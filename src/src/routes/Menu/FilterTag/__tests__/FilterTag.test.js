import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import FilterTag from 'routes/Menu/FilterTag/FilterTag'

describe('FilterTag', () => {
  describe('rendering', () => {
    test('Will render FilterTag', () => {
      const tree = renderer
        .create(<FilterTag>Facebook</FilterTag>)
        .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    let wrapper

    test('should trigger a dietary attributes change action with the value passed', () => {
      const filterDietaryAttributesChange = jest.fn()
      wrapper = shallow(<FilterTag value="dietary-attribute" type="dietaryAttribute" filterDietaryAttributesChange={filterDietaryAttributesChange} />)

      wrapper.find('div').first().simulate('click')
      expect(filterDietaryAttributesChange).toHaveBeenCalledWith('dietary-attribute')
    })

    test('should display the x icon on the tag', () => {
      const filterDietaryAttributesChange = jest.fn()
      wrapper = shallow(<FilterTag value="dietary-attribute" type="dietaryAttribute" selected filterDietaryAttributesChange={filterDietaryAttributesChange} />)

      wrapper.find('div').first().simulate('click')
      expect(wrapper.find('.tagIcon')).toHaveLength(1)
    })
  })
})
