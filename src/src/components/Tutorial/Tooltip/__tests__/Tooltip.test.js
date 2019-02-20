import React from 'react'
import { shallow } from 'enzyme'

import Icon from 'Icon'
import { Arrow } from 'Tutorial/Tooltip/Arrow'

import { Tooltip } from 'Tutorial/Tooltip'

describe('Tooltip', () => {
  let wrapper

  describe('rendering', () => {
    test('should render two arrows', () => {
      const direction = 'top-left'
      wrapper = shallow(<Tooltip arrow={direction} />)

      const arrows = wrapper.find(Arrow)
      expect(arrows).toHaveLength(2)
      arrows.forEach(arrow => {
        expect(arrow.prop('position')).toEqual(direction)
      })
    })

    test('should render children', () => {
      const children = <p>Tooltip Children</p>

      wrapper = shallow(<Tooltip>{children}</Tooltip>)

      expect(wrapper.find('.tooltip__content').children().first().equals(children)).toBe(true)
    })

    test('should apply styles to container div', () => {
      const style = { color: 'blue' }

      wrapper = shallow(<Tooltip style={style} />)

      expect(wrapper.prop('style')).toEqual(style)
    })

    describe('when onClose is not present', () => {
      test('should not render a close icon', () => {
        wrapper = shallow(<Tooltip />)

        expect(wrapper.find(Icon)).toHaveLength(0)
      })
    })

    describe('when onClose is present', () => {
      test('should render a close icon', () => {
        wrapper = shallow(<Tooltip onClose={() => {}} />)

        expect(wrapper.find(Icon)).toHaveLength(1)
      })
    })
  })
})
