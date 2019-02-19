import React from 'react'
import { shallow } from 'enzyme'

import { Arrow } from 'Tutorial/Tooltip/Arrow'
import { getArrowClasses } from 'Tutorial/Tooltip/Arrow/Arrow'

describe('getArrowClasses', () => {
  const yPositions = ['top', 'bottom']
  const xPositions = ['left', '', 'right']
  let positions = {}

  yPositions.forEach(positionY => (
    xPositions.forEach(positionX => {
      positions = {
        ...positions,
        [positionX ? [positionY, positionX].join('-') : positionY]: { positionY, positionX }
      }
    })
  ))

  test('should return a selector containing top, bottom classes', () => {
    Object.entries(positions).forEach(([position, { positionY, positionX }]) => {
      expect(getArrowClasses(position)).toContain(positionY)
      expect(getArrowClasses(position)).toContain(positionX)
    })
  })
})

describe('Arrow', () => {
  let wrapper

  describe('rendering', () => {
    describe('when position does not include positionY', () => {
      test('should not render', () => {
        wrapper = shallow(<Arrow positionY="bottom" position="top" />)

        expect(wrapper.html()).toBeNull()
      })
    })

    describe('when position includes positionY', () => {
      describe('when postion is top*', () => {
        test('should render a ▲', () => {
          wrapper = shallow(<Arrow positionY="top" position="top-left" />)

          expect(wrapper.html()).toContain('▲')
        })
      })

      describe('when postion is bottom*', () => {
        test('should render a ▼', () => {
          wrapper = shallow(<Arrow positionY="bottom" position="bottom-right" />)

          expect(wrapper.html()).toContain('▼')
        })
      })
    })
  })
})
