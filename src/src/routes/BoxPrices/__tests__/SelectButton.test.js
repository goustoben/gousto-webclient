import React from 'react'
import { shallow } from 'enzyme'
import { SelectButton } from '../SelectButton'

describe('Given SelectButton', () => {
  let wrapper
  const setSelectedBox = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<SelectButton setSelectedBox={setSelectedBox} selectedBox={1} index={1} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.tab').exists()).toBeTruthy()
    expect(wrapper.find('.tabActive').exists()).toBeTruthy()
  })

  test('should be clicked', () => {
    wrapper.find('.tab').simulate('click')
    expect(setSelectedBox.mock.calls.length).toEqual(1)
    wrapper.find('.tab').simulate('keypress', { key: 'Enter' })
    expect(setSelectedBox.mock.calls.length).toEqual(2)
  })
})
