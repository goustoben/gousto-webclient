import React from 'react'

import { mount } from 'enzyme'
import { Control } from '../index'

describe(
  'Control', () => {
    test(
      'should return span', () => {
        const wrapper = mount(<Control />)
        expect(wrapper.find('span').type()).toBe('span')
      },
    )
  },
)
