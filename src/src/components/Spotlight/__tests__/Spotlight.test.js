import React from 'react'
import { shallow } from 'enzyme'

import {
  getDocumentHeight,
  getEllipse,
} from 'Spotlight/helpers'

import {
  Spotlight,
  RADIUS,
  accuracy,
} from 'Spotlight/Spotlight'

jest.mock('Spotlight/helpers', () => ({
  getDocumentHeight: jest.fn(),
  getEllipse: jest.fn(),
}))

describe('Spotlight', () => {
  let wrapper
  let originX
  let originY

  describe('rendering', () => {
    beforeEach(() => {
      originX = 500
      originY = 750
    })

    test("should call getEllipse and include the path in it's clip-path", () => {
      const getEllipseReturnValue = 'test steps'
      getEllipse.mockReturnValueOnce(getEllipseReturnValue)

      wrapper = shallow(<Spotlight x={originX} y={originY} />)

      expect(getEllipse).toHaveBeenCalledWith({
        originX,
        originY,
        radius: RADIUS,
        accuracy,
      })
      expect(wrapper.props().style.clipPath).toContain(getEllipseReturnValue)
    })

    test('should call getDocumentHeight and apply the height as a style', () => {
      getDocumentHeight.mockReturnValueOnce(1080)

      wrapper = shallow(<Spotlight />)

      expect(getDocumentHeight).toHaveBeenCalled()
      expect(wrapper.props().style.height).toBe(1080)
    })
  })

  describe('onClick', () => {
    test('should trigger when spotlight is clicked', () => {
      const onClick = jest.fn()
      wrapper = shallow(<Spotlight onClick={onClick} />)

      wrapper.find('.spotlight').simulate('click')
      expect(onClick).toHaveBeenCalled()
    })
  })
})
