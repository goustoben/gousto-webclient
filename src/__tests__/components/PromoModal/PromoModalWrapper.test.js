import React from 'react'
import { shallow } from 'enzyme'

import { PromoModalWrapper } from 'components/PromoModal/PromoModalWrapper'
import Overlay from 'Overlay'

describe('PromoModalWrapper', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PromoModalWrapper />)
  })

  test('should return a Overlay with no props', () => {
    expect(wrapper.type()).toEqual(Overlay)
  })
})
