import React from 'react'

import { shallow } from 'enzyme'

import { SignupImage } from '../Image'

describe('given Image component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SignupImage name="how-many-people" />)
  })

  test('then it should render correctly', () => {
    expect(wrapper.prop('style')).toStrictEqual({
      backgroundImage: 'url(how-many-people.jpg)',
    })
  })
})
