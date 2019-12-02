import React from 'react'
import { shallow } from 'enzyme'
import { PageLoader } from '.'

describe('the PageLoader component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PageLoader />)
  })

  test('renders a Loading component', () => {
    expect(wrapper.find('Loading')).toHaveLength(1)
  })
})
