import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import PartialContainer from 'routes/Checkout/Components/PartialContainer'
import Steps from 'routes/Checkout/Components/Steps'

describe('Steps', () => {
  let stepsOrder = Immutable.List([
    'summary',
    'aboutyou',
    'payment',
    'delivery',
  ])
  let wrapper

  test('should render a <div> with no props', () => {
    wrapper = shallow(<Steps />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should render 4 <PartialContainer /> components', () => {
    wrapper = shallow(<Steps order={stepsOrder} />)
    expect(wrapper.find(PartialContainer).length).toEqual(4)
  })
})
