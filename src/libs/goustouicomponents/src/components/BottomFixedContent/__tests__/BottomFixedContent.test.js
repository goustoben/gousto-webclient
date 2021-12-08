import React from 'react'
import { mount } from 'enzyme'
import { BottomFixedContent } from '..'

describe('<BottomFixedContent />', () => {
  let wrapper

  const CHILDREN = [
    <p key="1">Robin: You cannot get away from Batman that easy!</p>,
    <p key="2">Batman: Easily</p>,
    <p key="3">Batman: Good grammar is essential, Robin.</p>,
    <p key="4">Robin: Thank you.</p>,
    <p key="5">Batman: You are welcome.</p>,
  ]

  beforeEach(() => {
    wrapper = mount(
      <BottomFixedContent>
        {CHILDREN}
      </BottomFixedContent>,
    )
  })

  test('renders without crashing', () => {})

  test('renders the children', () => {
    CHILDREN.forEach((child) => {
      expect(wrapper.contains(child)).toBe(true)
    })
  })
})
