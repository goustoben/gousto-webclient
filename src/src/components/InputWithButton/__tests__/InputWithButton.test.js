import React from 'react'
import { shallow } from 'enzyme'
import { CTA, InputField } from 'goustouicomponents'
import { InputWithButton } from '..'

describe('<InputWithButton />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <InputWithButton>
        <InputField id="id-test" placeholder="placeholder-test" onUpdate={() => {}} />
        <CTA onClick={() => {}}>
          CTA test
        </CTA>
      </InputWithButton>,
    )
  })
  test('children are rendered correctly', () => {
    expect(wrapper.find('InputField').exists()).toBe(true)
    expect(wrapper.find('CTA').exists()).toBe(true)
  })
})
