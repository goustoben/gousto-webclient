import React from 'react'
import { mount } from 'enzyme'
import { BottomFixedContentWrapper } from '../BottomFixedContentWrapper'

describe('BottomFixedContentWrapper', () => {
  let wrapper
  const CONTENT = 'test'

  beforeEach(() => {
    wrapper = mount(<BottomFixedContentWrapper>{CONTENT}</BottomFixedContentWrapper>)
  })

  test('renders without crashing', () => {})

  test('renders the children in the right place', () => {
    expect(wrapper.find('.bottomFixedContentWrapper').text()).toBe(CONTENT)
  })
})
