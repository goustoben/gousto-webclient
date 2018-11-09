import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import PromoModalWrapper from 'components/PromoModal/PromoModalWrapper'
import Overlay from 'Overlay'

describe('PromoModalWrapper', () => {
  let wrapper

  test('should return a Overlay with no props', () => {
    wrapper = shallow(<PromoModalWrapper />)
    expect(wrapper.type()).toEqual(Overlay)
  })
})
