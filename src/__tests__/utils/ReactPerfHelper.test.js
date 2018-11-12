import { shallow, mount } from 'enzyme'
import React from 'react'
import ReactPerfHelper from 'utils/ReactPerfHelper/ReactPerfHelper'

describe('ReactPerfHelper', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ReactPerfHelper />)
  })

  test('should render a <div> with no props', () => {
    expect(wrapper.type()).toBe('div')
  })

  test('should render 1 button', () => {
    expect(wrapper.find('button').length).toBe(1)
  })

  test('should render 4 buttons', () => {
    wrapper = mount(<ReactPerfHelper />)
    wrapper.setState({ show: true })
    expect(wrapper.find('button').length).toBe(4)
  })
})
