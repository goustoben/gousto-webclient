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
      const filterApply = jest.fn()
      wrapper = shallow(<FilterTag value="dietary-attribute" type="dietaryAttribute" filterApply={filterApply} />)

      wrapper.find('div').first().simulate('click')
      expect(filterApply).toHaveBeenCalledWith('dietaryAttribute', "dietary-attribute")
    })

    test('should display the x icon on the tag', () => {
      const filterApply = jest.fn()
      wrapper = shallow(<FilterTag value="dietary-attribute" type="dietaryAttribute" selected filterApply={filterApply} />)

      wrapper.find('div').first().simulate('click')
      expect(wrapper.find('.tagIcon')).toHaveLength(1)
    })

    test('should trigger a total time change action with the value passed', () => {
      const filterApply = jest.fn()
      wrapper = shallow(<FilterTag value="25" type="totalTime" filterApply={filterApply} />)

      wrapper.find('div').first().simulate('click')
      expect(filterApply).toHaveBeenCalledWith('totalTime', "25")
    })

    test('should display the x icon on the tag', () => {
      const filterApply = jest.fn()
      wrapper = shallow(<FilterTag value="25" type="totalTime" selected filterApply={filterApply} />)

      wrapper.find('div').first().simulate('click')
      expect(wrapper.find('.tagIcon')).toHaveLength(1)
    })
  })
})
