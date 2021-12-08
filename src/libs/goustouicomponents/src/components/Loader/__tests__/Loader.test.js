import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { Loader } from '../index'

describe('<Loader />', () => {
  let wrapper
  const DEFAULT_COLOR_CLASS = 'colorWhite'

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Loader />,
      div,
    )
  })

  beforeEach(() => {
    wrapper = mount(<Loader />)
  })

  test('adds a class with the default color name to the Loader', () => {
    expect(wrapper.find('.loader').hasClass(DEFAULT_COLOR_CLASS)).toBe(true)
  })

  describe('when a color prop is passed', () => {
    const COLOR_PROP = 'Bluecheese'

    beforeEach(() => {
      wrapper.setProps({ color: COLOR_PROP })
    })

    test('adds a class with the corresponding color name to the Loader', () => {
      expect(wrapper.find('.loader').hasClass(`color${COLOR_PROP}`)).toBe(true)
    })

    test('does not have the default color name class on the Loader', () => {
      expect(wrapper.find('.loader').hasClass(DEFAULT_COLOR_CLASS)).toBe(false)
    })
  })
})
