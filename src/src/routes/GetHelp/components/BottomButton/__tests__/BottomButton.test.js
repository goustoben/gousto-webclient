import React from 'react'
import { mount } from 'enzyme'
import { BottomButton } from '../BottomButton'

describe('BottomButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BottomButton
        clientRouted={false}
        color="secondary"
        url="/bla"
      >
        Click me!
      </BottomButton>
    )
  })

  test('does not have an onClick prop on the Button component', () => {
    expect(wrapper.find('Button').prop('onClick')).toEqual(null)
  })

  describe('when the onClick prop is passed', () => {
    const ON_CLICK_FUNCTION = () => {}

    beforeEach(() => {
      wrapper.setProps({ onClick: ON_CLICK_FUNCTION })
    })

    test('passes the onClick function to Button component', () => {
      expect(wrapper.find('Button').prop('onClick')).toBe(ON_CLICK_FUNCTION)
    })
  })
})
