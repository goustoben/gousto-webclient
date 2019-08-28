import React from 'react'
import { shallow } from 'enzyme'
import { ShortlistButton } from 'Recipe/ShortlistButton'

describe('<ShortlistButton />', () => {
  describe('Render', () => {
    test('should show SVG when renders', () => {
      const wrapper = shallow(<ShortlistButton />)

      expect(wrapper.find('Svg').length).toBe(1)
    })
  })
})
