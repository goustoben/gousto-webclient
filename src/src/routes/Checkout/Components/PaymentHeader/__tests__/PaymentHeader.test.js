import React from 'react'
import renderer from 'react-test-renderer'

import { PaymentHeader } from 'routes/Checkout/Components/PaymentHeader'

describe('PaymentHeader', () => {
  test('will match snapshot', () => {
    const tree = renderer
      .create(<PaymentHeader />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
