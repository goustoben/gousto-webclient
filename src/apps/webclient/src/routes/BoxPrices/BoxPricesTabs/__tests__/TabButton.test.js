import React from 'react'
import { shallow } from 'enzyme'
import { TabButton } from '../TabButton'

describe('Given TabButton', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<TabButton isActive={false} text="Select regular box" onClick={onClick} />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('.tab').exists()).toBeTruthy()
  })

  describe('when isActive is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isActive: true,
      })
    })

    test('then it should render correctly', () => {
      expect(wrapper.find('.tabActive').exists()).toBeTruthy()
    })
  })

  test('should handle events correctly', () => {
    wrapper.find('.tab').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
