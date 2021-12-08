import React from 'react'
import { mount } from 'enzyme'
import { OrderState, stateColors } from '..'

describe('<OrderState />', () => {
  let wrapper
  const STATE = 'menu open'

  beforeEach(() => {
    wrapper = mount(<OrderState state={STATE} />)
  })

  test('renders without crashing', () => {})

  test('does not have a data-testing attribute on the root element', () => {
    expect(wrapper.childAt(0).prop('data-testing')).toBe(null)
  })

  describe('when the testingSelector prop is passed', () => {
    const TESTING_SELECTOR = 'select-for-testing'

    beforeEach(() => {
      wrapper.setProps({ testingSelector: TESTING_SELECTOR })
    })

    test('adds a data-testing attribute to the root element with the value of the prop', () => {
      expect(wrapper.childAt(0).prop('data-testing')).toBe(TESTING_SELECTOR)
    })
  })

  describe.each(Object.entries(stateColors))('when the state passed is %s', (state, color) => {
    beforeEach(() => {
      wrapper.setProps({ state })
    })

    test(`renders the state with the class state--${color}`, () => {
      expect(wrapper.find(`.state--${color}`).text()).toBe(state)
    })
  })
})
