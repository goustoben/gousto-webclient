import React from 'react'

import { render } from '@testing-library/react'

import { SubscriptionTransparency } from '../SubscriptionTransparency'

describe('SubscriptionTransparency', () => {
  let rendered

  beforeEach(() => {
    rendered = render(<SubscriptionTransparency />)
  })

  test('should be rendered properly', () => {
    const { getByText, findByTestId } = rendered
    expect(getByText('Skip a box or cancel your subscription online at anytime.')).toBeDefined()

    expect(findByTestId('highlighted')).toBeDefined()
    expect(findByTestId('container')).toBeDefined()
  })
})
