import React from 'react'

import { shallow } from 'enzyme'

import { TrustPilot } from '../TrustPilot'

describe('TrustPilot', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TrustPilot />)
  })

  test('should renders correctly', () => {
    expect(wrapper.find(TrustPilot)).toBeDefined()
  })
})
