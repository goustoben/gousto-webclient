import React from 'react'
import { shallow } from 'enzyme'
import { CTA } from '../CTA'

describe('CTA', () => {
  let wrapper
  const children = <span>Get started</span>
  const ctaUri = '/ctaTest'
  const homeGetStarted = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CTA ctaUri={ctaUri} homeGetStarted={homeGetStarted}>
        {children}
      </CTA>,
    )
  })

  test('should render ctaContainer', () => {
    expect(wrapper.find('.ctaContainer').exists()).toBeTruthy()
  })

  describe('When sectionForTracking is not passed', () => {
    describe('And CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('Then homeGetStarted should be called with proper params', () => {
        expect(homeGetStarted).toHaveBeenCalledWith(ctaUri, null)
      })
    })
  })

  describe('When sectionForTracking is passed', () => {
    describe('And CTA is clicked', () => {
      beforeEach(() => {
        wrapper.setProps({
          sectionForTracking: 'hero',
        })
        wrapper.find('CTA').simulate('click')
      })

      test('Then homeGetStarted should be called with proper params', () => {
        expect(homeGetStarted).toHaveBeenCalledWith(ctaUri, 'hero')
      })
    })
  })
})
