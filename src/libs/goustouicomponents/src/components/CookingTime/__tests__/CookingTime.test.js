import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CookingTime } from '../index'
import { MetaInfo } from '../../MetaInfo'

describe('<CookingTime />', () => {
  let wrapper
  const cookingTime = 30

  beforeEach(() => {
    wrapper = mount(<CookingTime cookingTime={cookingTime} />)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CookingTime cookingTime={cookingTime} />, div)
  })

  test('should render correct layout', () => {
    expect(wrapper.find(MetaInfo).exists()).toBe(true)
  })

  test('should have proper label', () => {
    expect(wrapper.find(MetaInfo).prop('label')).toBe(`${cookingTime} mins`)
  })
})
