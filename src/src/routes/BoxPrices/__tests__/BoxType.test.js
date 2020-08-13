import React from 'react'
import { mount } from 'enzyme'

import { BoxType } from '../BoxType/BoxType'

describe('BoxType', () => {
  let wrapper
  const props = {
    goToStep: jest.fn(),
    basketNumPortionChange: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<BoxType {...props} />)
  })

  describe('Given BoxType is mounted', () => {
    test('Then should render proper components with default props', () => {
      const expectedProps = {
        numPersons: 2,
        boxInfo: [],
        ...props
      }
      expect(wrapper).toBeDefined()
      expect(wrapper.find('Image')).toBeDefined()
      expect(wrapper.find('.boxInfoList')).toBeDefined()
      expect(wrapper.find('Button')).toBeDefined()
      expect(wrapper.props()).toEqual(expectedProps)
    })
  })

  describe('When numPersons and boxInfo props are set', () => {
    const expectedProps = {
      ...props,
      numPersons: 4,
      boxInfo: [{
        num_persons: 2,
        num_portions: 2,
        recipe_total: '24.99',
        total: '24.99',
      }]
    }

    beforeEach(() => {
      wrapper.setProps({
        numPersons: expectedProps.numPersons,
        boxInfo: expectedProps.boxInfo
      })
    })

    test('Then new props should be passed to component', () => {
      expect(wrapper.props()).toEqual(expectedProps)
    })
  })

  describe('When user clicks on Get Started button', () => {
    test('Then should dispatch goToStep and basketNumPortionChange with proper params', () => {
      wrapper.find('Segment').at(1).simulate('click')
      expect(wrapper.prop('goToStep')).toHaveBeenCalledWith('postcode')
      expect(wrapper.prop('basketNumPortionChange')).toHaveBeenCalledWith(2)
    })
  })
})
