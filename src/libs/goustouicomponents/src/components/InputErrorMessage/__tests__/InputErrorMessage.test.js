import React from 'react'
import { mount } from 'enzyme'
import { InputErrorMessage } from '..'

describe('<InputError />', () => {
  let wrapper
  const MESSAGE = 'This field is required'

  beforeEach(() => {
    wrapper = mount(
      <InputErrorMessage>
        {MESSAGE}
      </InputErrorMessage>,
    )
  })

  test('Renders the error message', () => {
    expect(wrapper.text()).toContain(MESSAGE)
  })
})
