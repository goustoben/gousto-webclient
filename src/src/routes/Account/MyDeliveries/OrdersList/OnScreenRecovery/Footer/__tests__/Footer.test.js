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
        <Footer onKeepCopy='Keep Box' onKeep={mockKeepOrder} onConfirmCopy='Skip anyway' onConfirm={mockSkipOrder} />
      )
    })

    test('should render snapshot', () => {
      const tree = renderer.create(
        <Footer onKeep={mockKeepOrder} onConfirm={mockSkipOrder} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    test('should display restore button', () => {
      const keepBtn = wrapper.find('button.recover')

      expect(keepBtn.length).toBe(1)
      expect(keepBtn.text()).toBe('Keep Box')
    })

    test('should display loss button', () => {
      const skipBtn = wrapper.find('div.loss')

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
      const keepBtn = wrapper.find('.recover')

      keepBtn.simulate('click')

      expect(mockKeepOrder).toHaveBeenCalledTimes(1)
    })

    test('should fire skip order click event', () => {
      const skipBtn = wrapper.find('div.loss')

      skipBtn.simulate('click')

      expect(mockSkipOrder).toHaveBeenCalledTimes(1)
    })
  })
})
