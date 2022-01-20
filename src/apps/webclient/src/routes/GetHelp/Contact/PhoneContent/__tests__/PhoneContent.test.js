import React from 'react'
import { shallow } from 'enzyme'
import { telephone } from 'config/company'
import { PhoneContent } from '../PhoneContent'

describe('the PhoneContent component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PhoneContent />)
  })

  test('displays the telephone number', () => {
    expect(wrapper.html().includes(telephone.number)).toBe(true)
  })
})
