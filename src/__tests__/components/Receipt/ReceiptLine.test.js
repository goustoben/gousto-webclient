import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import ReceiptLine from 'Receipt/ReceiptLine'

describe('ReceiptLine', () => {
  test('should render label and children', () => {
    const wrapper = shallow(<ReceiptLine label="Total">11.99</ReceiptLine>)

    expect(wrapper.text()).toEqual('Total11.99')
  })
})
