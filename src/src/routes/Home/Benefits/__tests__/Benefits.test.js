import React from 'react'
import { shallow } from 'enzyme'
import { Benefits } from '../Benefits'

describe('Benefits', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Benefits byId="noLockIn" />)
  })

  test('should render correctly', () => {
    expect(wrapper.find('.row')).toHaveLength(1)
  })
})
