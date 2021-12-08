import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { Cuisine } from '../index'
import { MetaInfo } from '../../MetaInfo'

describe('<Cuisine />', () => {
  let wrapper
  const cuisineName = 'Chinese'

  beforeEach(() => {
    wrapper = mount(<Cuisine name={cuisineName} />)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Cuisine name={cuisineName} />, div)
  })

  test('should render correct layout', () => {
    expect(wrapper.find(MetaInfo).exists()).toBe(true)
  })

  test('should have proper label', () => {
    expect(wrapper.find(MetaInfo).prop('label')).toBe(cuisineName)
  })
})
