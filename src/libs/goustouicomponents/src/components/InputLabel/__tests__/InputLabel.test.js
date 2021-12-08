import React from 'react'
import { mount } from 'enzyme'
import { InputLabel } from '..'

describe('<InputLabel />', () => {
  let wrapper
  const LABEL = 'Title'

  beforeEach(() => {
    wrapper = mount(
      <InputLabel
        inputId="testid"
      >
        {LABEL}
      </InputLabel>,
    )
  })

  test('Renders the label', () => {
    expect(wrapper.text()).toContain(LABEL)
  })
})
