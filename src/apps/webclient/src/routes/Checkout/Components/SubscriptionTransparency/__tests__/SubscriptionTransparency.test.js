import React from 'react'

import { render } from '@testing-library/react'

import { SubscriptionTransparency } from '../SubscriptionTransparency'

describe('SubscriptionTransparency', () => {
  let rendered

  beforeEach(() => {
    rendered = render(<SubscriptionTransparency />)
  })

  test('should be rendered properly without any props', () => {
    const { getByText, findByTestId, queryByText } = rendered
    expect(getByText('Skip a box or cancel your subscription online at anytime.')).toBeDefined()
    expect(queryByText('Free delivery on your first box')).toBeNull()

    expect(findByTestId('highlighted')).toBeDefined()
    expect(findByTestId('container')).toBeDefined()
  })
})

describe('SubscriptionTransparency props check', () => {
  let rendered

  beforeEach(() => {
    rendered = render(<SubscriptionTransparency isDeliveryFree />)
  })

  test('should be rendered properly with isDeliveryFree prop to be set', () => {
    const { getByText, findByTestId } = rendered
    expect(getByText('Free delivery on your first box')).toBeDefined()

    expect(findByTestId('highlighted')).toBeDefined()
    expect(findByTestId('container')).toBeDefined()
  })
})
