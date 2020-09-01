import React from 'react'
import { mount } from 'enzyme'
import { HeadingWithSeparator } from '../HeadingWithSeparator'

describe('<HeadingWithSeparator />', () => {
  let wrapper
  const TITLE = 'Test title'

  beforeEach(() => {
    wrapper = mount(
      <HeadingWithSeparator>
        {TITLE}
      </HeadingWithSeparator>
    )
  })

  test('render title', () => {
    expect(wrapper.find('Heading').text()).toBe('Test title')
  })
})
