import React from 'react'

import { mount } from 'enzyme'
import css from '../Spinner.module.css'
import { Spinner } from '../index'

describe('<Spinner />', () => {
  test('should render by default', () => {
    const wrapper = mount(<Spinner />)

    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
  })

  test("should pass it's given color as a class", () => {
    const colors = ['white', 'black', 'bluecheese']

    colors.forEach((color) => {
      const wrapper = mount(<Spinner color={color} />)

      expect(wrapper.find(`.${css[color]}`).length).toBeGreaterThanOrEqual(1)
    })
  })
})
