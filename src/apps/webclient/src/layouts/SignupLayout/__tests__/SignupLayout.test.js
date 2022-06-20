import React from 'react'
import { shallow } from 'enzyme'
import { SignupLayout } from 'layouts/SignupLayout/SignupLayout'
import { Header } from 'Header'
import { FooterContainer } from 'Footer'

describe('SignupLayout', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <SignupLayout>
        <span />
      </SignupLayout>
    )
  })
  test('should return a <div>', () => {
    expect(wrapper.type()).toBe('div')
  })

  test('should return a <Header>', () => {
    expect(wrapper.find(Header).length).toBe(1)
  })

  test('should not return a <FooterContainer>', () => {
    expect(wrapper.find(FooterContainer).length).toBe(0)
  })

  test('should return a simple <Header>', () => {
    expect(wrapper.find(Header).prop('simple')).toBe(true)
  })
})
