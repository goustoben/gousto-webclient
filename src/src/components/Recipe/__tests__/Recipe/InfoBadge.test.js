import React from 'react'

import { shallow } from 'enzyme'

import InfoBadge from 'Recipe/InfoBadge'

describe('InfoBadge', () => {
  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<InfoBadge />)
    })

    test('should render a <span> with no props', () => {
      expect(wrapper.type()).toBe('span')
    })

    test('should render children', () => {
      wrapper = shallow(
        <InfoBadge>
          <a href="/" />
          <a href="/" />
        </InfoBadge>,
      )
      expect(wrapper.find('a')).toHaveLength(2)
    })
  })
})
