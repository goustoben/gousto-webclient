import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import ReceiptExtras from 'Receipt/ReceiptExtras/ReceiptExtras'
import ReceiptLine from 'Receipt/ReceiptLine/ReceiptLine'

describe('ReceiptExtras', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
			<ReceiptExtras
			  items={Immutable.fromJS({
			    1: {
			      title: 'item title',
			      listPrice: 1.0,
			      quantity: 2,
			      isVatable: true,
			    },
			    2: { title: 'item 2', listPrice: 2.99, quantity: 1 },
			  })}
			  vatableDisclaimerKey="§"
			/>,
    )
  })

  test('should render div', () => {
    expect(wrapper.type()).toEqual('div')
  })

  test('should render 1 ReceiptLine for a heading + 1 ReceiptLine for each item', () => {
    expect(wrapper.find(ReceiptLine).length).toEqual(3)
  })

  test('should render 1 ReceiptLine for "Extras"', () => {
    expect(
      wrapper
        .find(ReceiptLine)
        .at(0)
        .prop('label'),
    ).toEqual('Extras')
  })

  test('should add vatableDisclaimerKey & quantity before title is isVatable is true', () => {
    expect(
      wrapper
        .find(ReceiptLine)
        .at(1)
        .prop('label'),
    ).toEqual('§2 x item title')
  })

  test('should NOT add vatableDisclaimerKey before title is isVatable is false', () => {
    expect(
      wrapper
        .find(ReceiptLine)
        .at(2)
        .prop('label'),
    ).toEqual('1 x item 2')
  })

  test('should add currency symbol before price & compute correct price', () => {
    expect(
      wrapper
        .find(ReceiptLine)
        .at(1)
        .prop('children'),
    ).toEqual('£2.00')
  })
})
