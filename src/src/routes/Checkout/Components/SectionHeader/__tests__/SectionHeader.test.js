import React from 'react'
import { mount } from 'enzyme'
import { SectionHeader } from '../SectionHeader'

describe('SectionHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <SectionHeader title="title" />
    )
  })

  test('should render correctly', () => {
    expect(wrapper.find(SectionHeader).exists()).toBeTruthy()
  })
})
