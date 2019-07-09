import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { Footer } from '../Footer'

describe('On Screen Recovery Modal Footer', () => {
  const mockKeepOrder = jest.fn()
  const mockSkipOrder = jest.fn()

  describe('Initial Render', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <Footer keepCopy='Keep Box' onKeep={mockKeepOrder} confirmCopy='Skip anyway' onConfirm={mockSkipOrder} />
      )
    })

    test('should render snapshot', () => {
      const tree = renderer.create(
        <Footer onKeep={mockKeepOrder} onConfirm={mockSkipOrder} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    test('should display keep button', () => {
      const keepBtn = wrapper.find('button.keep')

      expect(keepBtn.length).toBe(1)
      expect(keepBtn.text()).toBe('Keep Box')
    })

    test('should display confirm button', () => {
      const skipBtn = wrapper.find('div.confirm')

      expect(skipBtn.length).toBe(1)
      expect(skipBtn.text()).toBe('Skip anyway')
    })
  })

  describe('Functionality', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <Footer onKeep={mockKeepOrder} onConfirm={mockSkipOrder} />
      )
    })

    test('should fire keep order click event', () => {
      const keepBtn = wrapper.find('.keep')

      keepBtn.simulate('click')

      expect(mockKeepOrder).toHaveBeenCalledTimes(1)
    })

    test('should fire skip order click event', () => {
      const skipBtn = wrapper.find('div.confirm')

      skipBtn.simulate('click')

      expect(mockSkipOrder).toHaveBeenCalledTimes(1)
    })
  })
})
