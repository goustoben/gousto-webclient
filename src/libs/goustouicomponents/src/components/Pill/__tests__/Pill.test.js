import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { Pill } from '../index'

describe('Pill', () => {
  const CONTENT = 'More details'
  const onClick = jest.fn()

  let wrapper

  beforeEach(() => {
    wrapper = mount(<Pill onClick={onClick}>{CONTENT}</Pill>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Pill onClick={onClick}>{CONTENT}</Pill>,
      div,
    )
  })

  test('render children inside the button', () => {
    expect(wrapper.find('button').text()).toContain(CONTENT)
  })

  describe('when the Pill is clicked', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('call onClick function', () => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the icon prop value is "false"', () => {
    beforeEach(() => {
      wrapper.setProps({ icon: false })
    })

    test('does not render the icon component', () => {
      expect(wrapper.find('span')).toHaveLength(0)
    })
  })

  describe('when the icon prop value is "true"', () => {
    beforeEach(() => {
      wrapper.setProps({ icon: true })
    })

    test('renders the icon component', () => {
      expect(wrapper.find('span')).toHaveLength(1)
    })
  })

  describe('when mouseEnter and mouseLeave events', () => {
    const mouseEnter = jest.fn()
    const mouseLeave = jest.fn()
    beforeEach(() => {
      wrapper.setProps({ mouseEnter, mouseLeave })
    })

    test('call mouseEnter function', () => {
      wrapper.simulate('mouseEnter')
      expect(mouseEnter).toHaveBeenCalledTimes(1)
    })

    test('call mouseLeave function', () => {
      wrapper.simulate('mouseLeave')
      expect(mouseLeave).toHaveBeenCalledTimes(1)
    })
  })
})
