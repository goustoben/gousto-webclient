import React from 'react'
import { shallow } from 'enzyme'
import { InfoBadge } from './InfoBadge'

describe('InfoBadge', () => {
  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<InfoBadge />)
    })

    test('should render a <span> with no props', () => {
      expect(wrapper.type()).toBe('span')
    })

    test('should render a span with theme', () => {
      const brandTag = {
        text: 'Oven ready',
        theme: {},
      }

      wrapper = shallow(
        <InfoBadge brandTag={brandTag} />,
      )
      expect(wrapper.find('span').text()).toBe('Oven ready')
    })
  })
})
