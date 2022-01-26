import React from 'react'
import { shallow } from 'enzyme'
import { Pill } from '../Pill'

describe('Pill', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Pill isActive={false} onClick={onClick}>
        Fish
      </Pill>
    )
  })

  test('renders correctly', () => {
    expect(wrapper.type()).toBe('button')
    expect(wrapper.find('.pillInternal').text()).toBe('Fish')
  })

  describe('when clicked', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('then it should invoke the callback', () => {
      expect(onClick).toHaveBeenCalled()
    })
  })
})
