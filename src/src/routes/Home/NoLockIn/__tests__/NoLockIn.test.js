import React from 'react'
import { shallow } from 'enzyme'
import { NoLockIn } from '../NoLockIn'

describe('NoLockIn', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NoLockIn />)
  })

  test('should renders correctly', () => {
    expect(wrapper.find(NoLockIn)).toBeDefined()
  })
})
