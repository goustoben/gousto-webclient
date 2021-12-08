import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { LayoutContentWrapper } from '../index'
import css from '../LayoutContentWrapper.module.css'

describe('LayoutContentWrapper', () => {
  const CHILDREN = [
    <p key="1">Robin: You cannot get away from Batman that easy!</p>,
    <p key="2">Batman: Easily</p>,
    <p key="3">Batman: Good grammar is essential, Robin.</p>,
    <p key="4">Robin: Thank you.</p>,
    <p key="5">Batman: You are welcome.</p>,
  ]

  let wrapper

  beforeEach(() => {
    wrapper = mount(<LayoutContentWrapper>{CHILDREN}</LayoutContentWrapper>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LayoutContentWrapper>{CHILDREN}</LayoutContentWrapper>, div)
  })

  test('renders the children', () => {
    CHILDREN.forEach((child) => {
      expect(wrapper.contains(child)).toBe(true)
    })
  })

  test('has a default mediumPaddingHorizontal class', () => {
    expect(wrapper.find(`.${css.mediumPaddingHorizontal}`).exists()).toBe(true)
  })

  test('has a default mediumPaddingVertical class', () => {
    expect(wrapper.find(`.${css.mediumPaddingVertical}`).exists()).toBe(true)
  })

  describe('given the paddingHorizontal prop is passed', () => {
    describe('when the value of paddingHorizontal is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ paddingHorizontal: true })
      })

      describe('and the paddingHorizontalSize prop is passed', () => {
        describe('and the value of paddingHorizontalSize is set to medium', () => {
          beforeEach(() => {
            wrapper.setProps({ paddingHorizontalSize: 'medium' })
          })

          test('has a mediumPaddingHorizontal class', () => {
            expect(wrapper.find(`.${css.mediumPaddingHorizontal}`).exists()).toBe(true)
          })
        })

        describe('and the value of paddingHorizontalSize is set to large', () => {
          beforeEach(() => {
            wrapper.setProps({ paddingHorizontalSize: 'large' })
          })

          test('has a largePaddingHorizontal class', () => {
            expect(wrapper.find(`.${css.largePaddingHorizontal}`).exists()).toBe(true)
          })
        })

        describe('and the value of paddingHorizontalSize is set to large/xlarge', () => {
          beforeEach(() => {
            wrapper.setProps({ paddingHorizontalSize: 'large/xlarge' })
          })

          test('has a largeOrXLargePaddingHorizontal class', () => {
            expect(wrapper.find(`.${css.largeOrXLargePaddingHorizontal}`).exists()).toBe(true)
          })
        })
      })
    })

    describe('when the value of paddingHorizontal is set to false', () => {
      beforeEach(() => {
        wrapper.setProps({ paddingHorizontal: false })
      })

      test('does not have a default mediumPaddingHorizontal class', () => {
        expect(wrapper.find(`.${css.mediumPaddingHorizontal}`).exists()).toBe(false)
      })
    })
  })

  describe('given the paddingVertical prop is passed', () => {
    describe('when the value of paddingVertical is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ paddingVertical: true })
      })

      describe('and the paddingVerticalSize prop is passed', () => {
        describe('and the value of paddingVerticalSize is set to medium', () => {
          beforeEach(() => {
            wrapper.setProps({ paddingVerticalSize: 'medium' })
          })

          test('has a mediumPaddingVertical class', () => {
            expect(wrapper.find(`.${css.mediumPaddingVertical}`).exists()).toBe(true)
          })
        })

        describe('and the value of paddingVerticalSize is set to large', () => {
          beforeEach(() => {
            wrapper.setProps({ paddingVerticalSize: 'large' })
          })

          test('has a largePaddingVertical class', () => {
            expect(wrapper.find(`.${css.largePaddingVertical}`).exists()).toBe(true)
          })
        })

        describe('and the value of paddingVerticalSize is set to large/xlarge', () => {
          beforeEach(() => {
            wrapper.setProps({ paddingVerticalSize: 'large/xlarge' })
          })

          test('has a largeOrXLargePaddingVertical class', () => {
            expect(wrapper.find(`.${css.largeOrXLargePaddingVertical}`).exists()).toBe(true)
          })
        })
      })
    })

    describe('when the value of paddingVertical is set to false', () => {
      beforeEach(() => {
        wrapper.setProps({ paddingVertical: false })
      })

      test('does not have a default mediumPaddingVertical class', () => {
        expect(wrapper.find(`.${css.mediumPaddingVertical}`).exists()).toBe(false)
      })
    })
  })
})
