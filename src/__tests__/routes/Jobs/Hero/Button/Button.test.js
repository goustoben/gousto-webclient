import React from 'react'
import { shallow } from 'enzyme'

import Button from 'routes/Jobs/Hero/Button/Button'
import css from 'routes/Jobs/Hero/Button/Button.css'

describe('Jobs page hero button', () => {
  test('should render buttonInner container', () => {
    const wrapper = shallow(<Button />)
    const className = `.${css.buttonInner.split(' ').join('.')}`
    expect(wrapper.find(className)).toHaveLength(1)
  })
})
