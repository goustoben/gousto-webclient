import React from 'react'

import { shallow } from 'enzyme'

import { InformationalPageTemplate } from '../InformationalPageTemplate'

describe('InformationalPageTemplate', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <InformationalPageTemplate headerText="test header">
        <div className="test">test children</div>
      </InformationalPageTemplate>,
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('.heading').text()).toBe('test header')
    expect(wrapper.find('.test').text()).toBe('test children')
  })
})
