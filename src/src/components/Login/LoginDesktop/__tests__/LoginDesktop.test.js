import React from 'react'
import { shallow } from 'enzyme'
import { LoginDesktop } from '../LoginDesktop'

describe('<LoginDesktop />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <LoginDesktop>
        <div />
      </LoginDesktop>
    )
  })

  test('children is rendered', () => {
    expect(wrapper.children().length).toBe(1)
  })
})
