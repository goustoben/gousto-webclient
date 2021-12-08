import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { Heading } from '../index'
import { headingAvailableSizes, headingAvailableTypes } from '../Heading.logic'

describe('<Heading />', () => {
  const HEADING_TITLE = 'Test Heading'
  const HEADING_TYPE = 'h1'

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Heading type={HEADING_TYPE}>{HEADING_TITLE}</Heading>,
      div,
    )
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <Heading type={HEADING_TYPE}>
          {HEADING_TITLE}
        </Heading>,
      )
    })

    test('renders the correct HTML element', () => {
      headingAvailableTypes.forEach((type) => {
        wrapper.setProps({ type })

        expect(wrapper.find(type)).toHaveLength(1)
      })
    })

    test('renders the correct heading text', () => {
      expect(wrapper.text()).toBe(HEADING_TITLE)
    })

    test('header does not have the isCenter class on it', () => {
      expect(wrapper.find('.heading').hasClass('isCenter')).toBe(false)
    })

    test('header has the hasMargin class on it', () => {
      expect(wrapper.find('.heading').hasClass('hasMargin')).toBe(true)
    })

    describe('when a size prop is passed', () => {
      test('header contains the relevant modifier class', () => {
        headingAvailableSizes.forEach((size) => {
          wrapper.setProps({ size })

          expect(wrapper.find('.heading').hasClass(`heading--${size}`)).toBe(true)
        })
      })
    })

    describe('when the isCenter prop is passed', () => {
      beforeEach(() => {
        wrapper.setProps({ isCenter: true })
      })

      test('header has the isCenter class on it', () => {
        expect(wrapper.find('.heading').hasClass('isCenter')).toBe(true)
      })
    })

    describe('when the hasMargin prop is passed as false', () => {
      beforeEach(() => {
        wrapper.setProps({ hasMargin: false })
      })

      test('header does not have the hasMargin class on it', () => {
        expect(wrapper.find('.heading').hasClass('hasMargin')).toBe(false)
      })
    })

    describe('when the hasMargin prop is passed as true', () => {
      beforeEach(() => {
        wrapper.setProps({ hasMargin: true })
      })

      test('header has the hasMargin class on it', () => {
        expect(wrapper.find('.heading').hasClass('hasMargin')).toBe(true)
      })
    })
  })
})
