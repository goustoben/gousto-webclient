import React from 'react'
import { mount } from 'enzyme'
import { GetHelpLayout2 } from '..'

describe('GetHelpLayout2', () => {
  let wrapper
  const HEADING_TEXT = 'This is a heading'
  const CHILDREN = [
    <p key="key1">I got your distress call</p>,
    <p key="key2">And came here as soon as I wanted to</p>,
  ]

  beforeEach(() => {
    wrapper = mount(
      <GetHelpLayout2
        headingText={HEADING_TEXT}
      >
        {CHILDREN}
      </GetHelpLayout2>
    )
  })

  test('renders without crashing', () => {})

  test('renders a CTABack', () => {
    expect(wrapper.find('CTABack').exists()).toBe(true)
  })

  describe('the heading rendered', () => {
    let heading

    beforeEach(() => {
      heading = wrapper.find('Heading')
    })

    test('has the same text as the "headingText" property', () => {
      expect(heading.text()).toBe(HEADING_TEXT)
    })

    test('has the type set to h1', () => {
      expect(heading.prop('type')).toBe('h1')
    })

    test('has the size set to fontStyleXL', () => {
      expect(heading.prop('size')).toBe('fontStyleXL')
    })
  })

  test('renders a Card', () => {
    expect(wrapper.find('Card').exists()).toBe(true)
  })

  test('renders the children inside the card', () => {
    CHILDREN.map((child) => (
      expect(wrapper.find('Card').contains(child)).toBe(true)
    ))
  })
})
