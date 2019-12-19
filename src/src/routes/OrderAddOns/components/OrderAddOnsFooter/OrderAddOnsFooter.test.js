import React from 'react'
import { shallow } from 'enzyme'
import { OrderAddOnsFooter } from './OrderAddOnsFooter'

describe('the OrderAddOnsFooter component', () => {
  let wrapper
  const CHILDREN = [
    <div key={1}>Test child 1</div>,
    <p key={2}>Test child 2</p>,
  ]

  beforeEach(() => {
    wrapper = shallow(<OrderAddOnsFooter>{CHILDREN}</OrderAddOnsFooter>)
  })

  test('renders the children passed in', () => {
    expect(wrapper.contains(CHILDREN)).toBe(true)
  })
})
