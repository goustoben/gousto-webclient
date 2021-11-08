import React from 'react'
import { shallow } from 'enzyme'

import { DuplicateOrderModalWrapper } from 'DuplicateOrderModal/DuplicateOrderModalWrapper'
import { DuplicateOrderModalContainer } from 'DuplicateOrderModal/DuplicateOrderModalContainer'
import Overlay from 'Overlay'

describe('DuplicateOrderModal/DuplicateOrderModalWrapper', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DuplicateOrderModalWrapper visible />)
  })

  test('should return an Overlay', () => {
    expect(wrapper.type()).toEqual(Overlay)
  })

  test('should contain a DuplicateOrderModal', () => {
    expect(wrapper.find(DuplicateOrderModalContainer).length).toEqual(1)
  })

  test('should map the visible prop through to Overlay open', () => {
    expect(wrapper.find(Overlay).prop('open')).toEqual(true)
    wrapper = shallow(<DuplicateOrderModalWrapper visible={false} />)
    expect(wrapper.find(Overlay).prop('open')).toEqual(false)
  })
})
