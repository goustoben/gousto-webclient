import React from 'react'
import { shallow, mount } from 'enzyme'

import { Step } from 'Tutorial/Step'

import { Spotlight } from 'Spotlight'
import { Tooltip } from 'Tutorial/Tooltip'

import {
  isElementHidden,
  getSpotlightLocation,
  getTooltipProperties
} from 'Tutorial/helpers'

jest.mock('Spotlight', () => ({
  Spotlight: (props) => <div className="spotlight" {...props} />
}))

jest.mock('Tutorial/Tooltip', () => ({
  Tooltip: (props) => <div className="tooltip" {...props} />
}))

jest.mock('Tutorial/helpers', () => ({
  isElementHidden: jest.fn(),
  getSpotlightLocation: jest.fn(),
  getTooltipProperties: jest.fn(),
}))

describe('Step', () => {
  let wrapper
  const defaultState = {
    arrow: '',
    style: {},
    x: 0,
    y: 0
  }

  describe('rendering', () => {
    const { addEventListener, removeEventListener } = window
    const next = jest.fn()

    beforeEach(() => {
      window.addEventListener = jest.fn()
      window.removeEventListener = jest.fn()

      isElementHidden.mockReturnValue(true)
    })

    afterEach(() => {
      next.mockClear()
      window.addEventListener = addEventListener
      window.removeEventListener = removeEventListener
    })

    test('should render a Spotlight', () => {
      wrapper = shallow(<Step next={next} />)
      expect(wrapper.find(Spotlight)).toHaveLength(1)
    })

    test('should render a Tooltip', () => {
      wrapper = shallow(<Step next={next} />)
      expect(wrapper.find(Tooltip)).toHaveLength(1)
    })

    test('should pass children into Tooltip', () => {
      const children = <p>Tooltip Contents</p>

      wrapper = shallow(<Step next={next}>{children}</Step>)

      expect(wrapper.find(Tooltip).children().first().equals(children)).toBe(true)
    })
  })

  describe('lifecycle', () => {
    const { addEventListener, removeEventListener } = window
    const next = jest.fn()

    beforeEach(() => {
      window.addEventListener = jest.fn()
      window.removeEventListener = jest.fn()

      isElementHidden.mockReturnValue(true)
      wrapper = mount(<Step next={next} />)
    })

    afterEach(() => {
      next.mockClear()
      window.addEventListener = addEventListener
      window.removeEventListener = removeEventListener
    })

    describe('componentDidMount', () => {
      test('should assign a window resize handler', () => {
        expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
      })
    })

    describe('componentWillUnmount', () => {
      test('should remove a window resize handler', () => {
        wrapper.unmount()

        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
      })
    })

    describe('componentDidUpdate', () => {
      test('should recalculateLocations', () => {
        expect(next).toHaveBeenCalled()
      })
    })
  })

  describe('recalculateLocations', () => {
    const next = jest.fn()

    afterEach(() => {
      next.mockClear()
    })

    describe('when element is hidden', () => {
      beforeEach(() => {
        isElementHidden.mockReturnValue(true)
      })

      test('should call next step', () => {
        wrapper = mount(<Step next={next} />)

        expect(next).toHaveBeenCalled()
        expect(wrapper.state()).toEqual(defaultState)
      })
    })

    describe('when element is not hidden', () => {
      const location = { x: 500, y: 500 }
      const arrow = 'top'
      const style = { color: 'red' }

      beforeEach(() => {
        isElementHidden.mockReturnValue(false)
        getSpotlightLocation.mockReturnValue(location)
        getTooltipProperties.mockReturnValue({ arrow, style })
      })

      test('should recalculate location and update step', () => {
        wrapper = mount(<Step next={next} />)

        expect(next).not.toHaveBeenCalled()
        expect(wrapper.state()).toEqual({
          arrow,
          style,
          ...location,
        })
      })
    })
  })
})
