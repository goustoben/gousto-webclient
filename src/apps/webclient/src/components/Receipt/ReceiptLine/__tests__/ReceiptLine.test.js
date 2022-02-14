import { render } from 'enzyme'
import React from 'react'

import { ReceiptLine } from 'Receipt/ReceiptLine'

describe('ReceiptLine', () => {
  test('should render label and children', () => {
    const wrapper = render(<ReceiptLine label="Total">11.99</ReceiptLine>)

    expect(wrapper.text()).toEqual('Total11.99')
  })
})
