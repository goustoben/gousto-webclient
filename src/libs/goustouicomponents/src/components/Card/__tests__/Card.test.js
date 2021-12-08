import React from 'react'
import { mount } from 'enzyme'
import { Card } from '..'

describe('<Card />', () => {
  let wrapper
  const CONTENT = 'This is the content'

  beforeEach(() => {
    wrapper = mount(<Card>{CONTENT}</Card>)
  })

  test('renders without crashing', () => {})

  test('renders the children inside LayoutContentWrapper', () => {
    expect(wrapper.find('LayoutContentWrapper').text()).toBe(CONTENT)
  })

  test('renders LayoutContentWrapper with "large" paddings', () => {
    expect(wrapper.find('LayoutContentWrapper').prop('paddingHorizontalSize')).toBe('large')
    expect(wrapper.find('LayoutContentWrapper').prop('paddingVerticalSize')).toBe('large')
  })

  test('the class invisibleInMobile is present', () => {
    expect(wrapper.find('.visibleOnSmallScreens').exists()).toBe(true)
  })

  describe('when the prop "isVisibleOnSmallScreens" is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ isVisibleOnSmallScreens: false })
    })

    test('the class invisibleInMobile is not present', () => {
      expect(wrapper.find('.visibleOnSmallScreens').exists()).toBe(false)
    })
  })

  describe('when the prop className is passed', () => {
    const CLASSNAME = 'someClassName'

    beforeEach(() => {
      wrapper.setProps({ className: CLASSNAME })
    })

    test('the className is added to the outer container', () => {
      expect(wrapper.hasClass(CLASSNAME)).toBe(true)
    })
  })

  describe('when the prop "hasPaddingVertical" is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasPaddingVertical: true })
    })

    test('the LayoutContentWrapper paddingVertical prop is set to true', () => {
      expect(wrapper.find('LayoutContentWrapper').prop('paddingVertical')).toBe(true)
    })
  })

  describe('when the prop "hasPaddingVertical" is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasPaddingVertical: false })
    })

    test('the LayoutContentWrapper paddingVertical prop is set to false', () => {
      expect(wrapper.find('LayoutContentWrapper').prop('paddingVertical')).toBe(false)
    })
  })

  describe('when the prop "hasLateralBordersOnSmallScreens" is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasLateralBordersOnSmallScreens: true })
    })

    test('the class lateralBordersOnSmallScreens is present', () => {
      expect(wrapper.find('.lateralBordersOnSmallScreens').exists()).toBe(true)
    })
  })

  describe('when the prop "hasLateralBordersOnSmallScreens" is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasLateralBordersOnSmallScreens: false })
    })

    test('the class lateralBordersOnSmallScreens is not present', () => {
      expect(wrapper.find('.lateralBordersOnSmallScreens').exists()).toBe(false)
    })
  })

  describe('when paddingSize is "large/xlarge"', () => {
    beforeEach(() => {
      wrapper.setProps({ paddingSize: 'large/xlarge' })
    })

    test('renders LayoutContentWrapper with appropriate paddings', () => {
      expect(wrapper.find('LayoutContentWrapper').prop('paddingHorizontalSize')).toBe('large/xlarge')
      expect(wrapper.find('LayoutContentWrapper').prop('paddingVerticalSize')).toBe('large/xlarge')
    })
  })
})
