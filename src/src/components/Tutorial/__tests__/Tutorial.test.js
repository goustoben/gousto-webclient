import React from 'react'
import { shallow, mount } from 'enzyme'

import { isElementHidden } from 'Tutorial/helpers'
import { Step } from 'Tutorial/Step'

import { Tutorial } from 'Tutorial'

jest.mock('Tutorial/Step', () => ({
  Step: props => <div {...props} />,
}))

jest.mock('Tutorial/helpers', () => ({
  isElementHidden: jest.fn(),
}))

const generateSteps = (length) => (
  [...Array(length).keys()].map(index => (
    <Step key={`test-step-${index}`} selector=".test">{`Step #${index}`}</Step>
  ))
)

describe('Tutorial', () => {
  let wrapper

  describe('state', () => {
    test('should only hold visible children', () => {
      isElementHidden.mockReturnValueOnce(true)
      wrapper = shallow(<Tutorial trackStepViewed={jest.fn()}>{generateSteps(1)}</Tutorial>)
      expect(wrapper.state().children.length).toBe(0)

      isElementHidden.mockReturnValueOnce(false)
      wrapper = shallow(<Tutorial trackStepViewed={jest.fn()}>{generateSteps(1)}</Tutorial>)
      expect(wrapper.state().children.length).toBe(1)
    })
  })

  describe('rendering', () => {
    beforeEach(() => {
      isElementHidden.mockReturnValue(false)
    })

    test('should display first child step by default', () => {
      wrapper = shallow(
        <Tutorial trackStepViewed={jest.fn()}>{generateSteps(3)}</Tutorial>
      )

      expect(wrapper.children()).toHaveLength(1)
      expect(wrapper.state().children).toHaveLength(3)
      expect(wrapper.children().first().text()).toEqual('Step #0')
    })
  })

  describe('children', () => {
    beforeEach(() => {
      isElementHidden.mockReturnValue(false)
    })

    test('should clone children with next, last, onClose props ', () => {
      const children = generateSteps(3)

      wrapper = shallow(
        <Tutorial trackStepViewed={jest.fn()}>{children}</Tutorial>
      )

      expect(wrapper.prop('last')).toBe(false)
      expect(wrapper.prop('next')).toBeInstanceOf(Function)
      expect(wrapper.prop('onClose')).toBeInstanceOf(Function)
    })
  })

  describe('next', () => {
    beforeEach(() => {
      isElementHidden.mockReturnValue(false)
    })

    test('should return the next valid step', () => {
      const onClose = jest.fn()
      const trackStepViewed = jest.fn()
      const children = generateSteps(2)

      wrapper = mount(
        <Tutorial onClose={onClose} trackStepViewed={trackStepViewed}>
          {children}
        </Tutorial>
      )

      expect(wrapper.find('Step').html()).toContain('Step #0')
      expect(wrapper.find('Step').first().prop('last')).toBe(false)

      const { next } = wrapper.instance()
      next().then(() => {
        expect(wrapper.find('Step').html()).toContain('Step #1')
        expect(wrapper.find('Step').first().prop('last')).toBe(true)
      })
    })

    test('should close if the current step is the last', () => {
      const onClose = jest.fn()
      const trackStepViewed = jest.fn()
      const children = generateSteps(2)

      wrapper = mount(
        <Tutorial onClose={onClose} trackStepViewed={trackStepViewed}>
          {children}
        </Tutorial>
      )

      const { next } = wrapper.instance()
      next().then(() => {
        expect(wrapper.find('Step').html()).toContain('Step #1')
        expect(wrapper.find('Step').first().prop('last')).toBe(true)
      })
      next().then(() => {
        expect(wrapper.state().hide).toBe(true)
      })
    })
  })

  describe('close', () => {
    beforeEach(() => {
      isElementHidden.mockReturnValue(false)
    })

    test('should return the next valid step', () => {
      const onClose = jest.fn()
      const trackStepViewed = jest.fn()

      wrapper = mount(
        <Tutorial onClose={onClose} trackStepViewed={trackStepViewed}>
          {generateSteps(2)}
        </Tutorial>
      )

      expect(wrapper.find('Step').html()).toContain('Step #0')
      expect(wrapper.find('Step').first().prop('last')).toBe(false)

      const { close } = wrapper.instance()
      close()

      expect(wrapper.html()).toBeNull()
    })

    test('should invoke onClose prop', () => {
      const onClose = jest.fn()
      const trackStepViewed = jest.fn()

      wrapper = mount(
        <Tutorial onClose={onClose} trackStepViewed={trackStepViewed}>
          {generateSteps(2)}
        </Tutorial>
      )

      const { close } = wrapper.instance()
      close()

      expect(onClose).toHaveBeenCalled()
    })
  })

  test('should invoke trackStepViewed prop', () => {
    const onClose = jest.fn()
    const trackStepViewed = jest.fn()

    wrapper = mount(
      <Tutorial onClose={onClose} trackStepViewed={trackStepViewed}>
        {generateSteps(2)}
      </Tutorial>
    )

    const { next } = wrapper.instance()
    next()

    expect(trackStepViewed).toHaveBeenCalled()
  })
})
