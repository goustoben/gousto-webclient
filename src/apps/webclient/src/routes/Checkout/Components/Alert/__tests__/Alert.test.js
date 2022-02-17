import React from 'react'
import { render } from 'enzyme'
import { Alert } from '../Alert'

describe('Given Alert', () => {
  let wrapper
  const children = <div>Error message content</div>

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
})
