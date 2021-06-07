import React from 'react'
import { mount } from 'enzyme'
import { BoxIcon } from '../BoxIcon'

describe('Given BoxIcon component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<BoxIcon numPersons={4} numPortions={4} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('BoxIcon').exists()).toBeTruthy()
    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
  })

  describe('when icon is not defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        numPersons: 2,
        numPortions: 10,
      })
    })

    test('then component should not be rendered', () => {
      expect(wrapper.find('.container').exists()).toBeFalsy()
    })
  })
})
