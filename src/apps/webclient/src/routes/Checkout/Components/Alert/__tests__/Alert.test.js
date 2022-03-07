import React from 'react'
import { render } from 'enzyme'
import { Alert } from '../Alert'

describe('Given Alert', () => {
  let wrapper
  const children = <div>Error message content</div>
  const ctaButton = <cta-button>Log in</cta-button>

  beforeEach(() => {
    wrapper = render(<Alert>{children}</Alert>)
  })

  test('should render child prorps', () => {
    expect(wrapper.text()).toBe('Error message content')
  })

  test('should render an error icon', () => {
    expect(wrapper.find('svg').length).toBe(1)
    expect(wrapper.find('svg').prop('data-testid')).toBe('error')
  })

  describe('when a cta button is not provided', () => {
    test('should not render a cta button', () => {
      expect(wrapper.find('cta-button').length).toBe(0)
    })
  })

  describe('when a cta button is provided', () => {
    beforeEach(() => {
      wrapper = render(<Alert ctaButton={ctaButton}>{children}</Alert>)
    })

    test('should render a cta button', () => {
      expect(wrapper.find('cta-button').length).toBe(1)
    })
  })
})
