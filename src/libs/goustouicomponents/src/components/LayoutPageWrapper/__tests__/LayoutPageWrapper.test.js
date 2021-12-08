import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { LayoutPageWrapper } from '../index'
import css from '../LayoutPageWrapper.module.css'

describe('LayoutPageWrapper', () => {
  const CHILDREN = [
    <p key="1">Robin: You cannot get away from Batman that easy!</p>,
    <p key="2">Batman: Easily</p>,
    <p key="3">Batman: Good grammar is essential, Robin.</p>,
    <p key="4">Robin: Thank you.</p>,
    <p key="5">Batman: You are welcome.</p>,
  ]

  let wrapper

  beforeEach(() => {
    wrapper = mount(<LayoutPageWrapper>{CHILDREN}</LayoutPageWrapper>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LayoutPageWrapper>{CHILDREN}</LayoutPageWrapper>, div)
  })

  test('adds class largeWidth', () => {
    expect(wrapper.find('.wrapper').hasClass('largeWidth')).toBeTruthy()
  })

  describe('when children items are passed', () => {
    test('renders the children', () => {
      CHILDREN.forEach((child) => {
        expect(wrapper.contains(child)).toBe(true)
      })
    })
  })

  describe('when size is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ size: 'medium' })
    })
    test('adds coresponding class', () => {
      expect(wrapper.find('.wrapper').hasClass('mediumWidth')).toBeTruthy()
    })

    test('removes default class', () => {
      expect(wrapper.find('.wrapper').hasClass('largeWidth')).toBeFalsy()
    })
  })

  describe('when the padding prop is not passed', () => {
    test('has the paddingHorizontal class on the wrapper', () => {
      expect(wrapper.find(`.${css.wrapper}.${css.paddingHorizontal}`).exists()).toBe(true)
    })

    test('does not have the paddingLargeScreens class on the wrapper', () => {
      expect(wrapper.find(`.${css.wrapper}.${css.paddingLargeScreens}`).exists()).toBe(false)
    })
  })

  describe('when the padding prop is passed', () => {
    describe('and the value of padding is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ padding: true })
      })

      test('has the paddingHorizontal class on the wrapper', () => {
        expect(wrapper.find(`.${css.wrapper}.${css.paddingHorizontal}`).exists()).toBe(true)
      })

      test('does not have the paddingLargeScreens class on the wrapper', () => {
        expect(wrapper.find(`.${css.wrapper}.${css.paddingLargeScreens}`).exists()).toBe(false)
      })
    })

    describe('and the value of padding is set to false', () => {
      beforeEach(() => {
        wrapper.setProps({ padding: false })
      })

      test('does not have the paddingHorizontal class on the wrapper', () => {
        expect(wrapper.find(`.${css.wrapper}.${css.paddingHorizontal}`).exists()).toBe(false)
      })

      test('does not have the paddingLargeScreens class on the wrapper', () => {
        expect(wrapper.find(`.${css.wrapper}.${css.paddingLargeScreens}`).exists()).toBe(false)
      })
    })

    describe('and the value of padding is set to "large-screens-only"', () => {
      beforeEach(() => {
        wrapper.setProps({ padding: 'large-screens-only' })
      })

      test('has the paddingLargeScreens class on the wrapper', () => {
        expect(wrapper.find(`.${css.wrapper}.${css.paddingLargeScreens}`).exists()).toBe(true)
      })

      test('does not have the paddingHorizontal class on the wrapper', () => {
        expect(wrapper.find(`.${css.wrapper}.${css.paddingHorizontal}`).exists()).toBe(false)
      })
    })
  })

  describe('when testingSelector is passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        testingSelector: 'test-selector',
      })
    })

    test('adds data-testing attribute with the selector value', () => {
      expect(wrapper.find('[data-testing="test-selector"]').exists()).toBeTruthy()
    })
  })
})
