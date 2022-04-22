import React from 'react'
import { shallow } from 'enzyme'
import { CTAHomepageContainer } from '../CTAHomepageContainer'

describe('CTAHomepageContainer', () => {
  let wrapper
  const ctaText = <span>Get started</span>
  const ctaUri = '/ctaTest'
  const homeGetStarted = jest.fn()

  const store = {
    getState: jest.fn(() => {}),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(
      <CTAHomepageContainer store={store} ctaUri={ctaUri} homeGetStarted={homeGetStarted}>
        {ctaText}
      </CTAHomepageContainer>,
    )
  })

  describe('Given initialState to CTAHomepageContainer component', () => {
    describe('When CTAHomePage is rendered', () => {
      test('Then should be rendered properly', () => {
        const expected = {
          children: ctaText,
          ctaUri,
          sectionForTracking: null,
          dataTesting: '',
        }
        expect(wrapper.find('CTA').props()).toEqual(expect.objectContaining(expected))
      })
    })
  })
})
