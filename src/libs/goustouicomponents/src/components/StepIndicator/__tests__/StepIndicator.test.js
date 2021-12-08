import React from 'react'
import { mount } from 'enzyme'
import { StepIndicator } from '..'

describe('<StepIndicator />', () => {
  const CURRENT = 3
  const SIZE = 5
  let wrapper

  beforeEach(() => {
    wrapper = mount(<StepIndicator current={CURRENT} size={SIZE} />)
  })

  test('renders without crashing', () => {})

  describe('when mounted', () => {
    test('should render <StepIndicator />', () => {
      expect(wrapper.find('StepIndicator')).toHaveLength(1)
    })

    test('should show correct step count', () => {
      expect(wrapper.find('.steps').text()).toContain('3 of 5')
    })
  })

  describe('when the current step passed is out of range', () => {
    describe('and the current step passed is smaller than 1', () => {
      beforeEach(() => {
        wrapper.setProps({ current: 0 })
      })

      test('should set the current step to 1', () => {
        expect(wrapper.find('.steps').text()).toContain('1 of 5')
      })
    })

    describe('and the current step passed is greater than the amount of steps', () => {
      beforeEach(() => {
        wrapper.setProps({ current: 8 })
      })

      test('should stay on the last step count', () => {
        expect(wrapper.find('.steps').text()).toContain('5 of 5')
      })
    })
  })
})
