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

  describe('when showAppAwareness feature is turned on', () => {
    beforeEach(() => {
      wrapper = shallow(
        <LoginDesktop showAppAwareness>
          <div />
        </LoginDesktop>
      )
    })

    test('Heading is rendered', () => {
      expect(wrapper.find('Heading').length).toBe(1)
    })
  })

  describe('when showAppAwareness feature is turned off', () => {
    beforeEach(() => {
      wrapper = shallow(
        <LoginDesktop>
          <div />
        </LoginDesktop>
      )
    })

    test('Heading is not rendered', () => {
      expect(wrapper.find('Heading').length).toBe(0)
    })
  })
})
