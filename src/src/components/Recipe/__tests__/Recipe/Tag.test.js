import React from 'react'

import { shallow } from 'enzyme'

import Tag from 'Recipe/Tag'

describe('<Tag />', () => {
  test('should return a <span>', () => {
    const wrapper = shallow(<Tag tag={'asda'} />)
    expect(wrapper.type()).toEqual('span')
  })
})
