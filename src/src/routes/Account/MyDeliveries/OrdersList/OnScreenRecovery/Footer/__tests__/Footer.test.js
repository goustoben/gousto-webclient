import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { Footer } from '../Footer'

describe('On Screen Recovery Modal Footer', () => {
  const mockKeepOrder = jest.fn()
  const mockConfirmOrder = jest.fn()

  describe('Initial Render', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <Footer keepCopy='Keep Box' onKeep={mockKeepOrder} confirmCopy='Skip anyway' onConfirm={mockConfirmOrder} />
      )
    })

    test('should render snapshot', () => {
      const tree = renderer.create(
        <Footer keepCopy='Keep Box' onKeep={mockKeepOrder} confirmCopy='Skip anyway' onConfirm={mockConfirmOrder} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    test('should display keep button', () => {
      const keepBtn = wrapper.find('button.keep')

      expect(keepBtn.length).toBe(1)
      expect(keepBtn.text()).toBe('Keep Box')
    })

    test('should display confirm button', () => {
      const confirmBtn = wrapper.find('div.confirm')

      expect(confirmBtn.length).toBe(1)
      expect(confirmBtn.text()).toBe('Skip anyway')
    })
  })

  describe('Functionality', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <Footer keepCopy='Keep Box' onKeep={mockKeepOrder} confirmCopy='Skip anyway' onConfirm={mockConfirmOrder} />
      )
    })

    test('should fire keep order click event', () => {
      const keepBtn = wrapper.find('.keep')

      keepBtn.simulate('click')

      expect(mockKeepOrder).toHaveBeenCalledTimes(1)
    })

    test('should fire confirm order click event', () => {
      const confirmBtn = wrapper.find('div.confirm')

      confirmBtn.simulate('click')

      expect(mockConfirmOrder).toHaveBeenCalledTimes(1)
    })
  })
})
