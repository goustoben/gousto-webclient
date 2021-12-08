import React from 'react'
import { mount } from 'enzyme'

import { RadioGroup } from '../RadioGroup.logic'
import { InputRadio } from '../../InputRadio'

describe('<RadioGroup />', () => {
  describe('Given the radio group has rendered', () => {
    let onChangeSpy
    let wrapper
    let inputRadio

    beforeEach(() => {
      onChangeSpy = jest.fn()
      wrapper = mount(
        <RadioGroup
          onChange={onChangeSpy}
          testingSelector="test-inputRadioGroup"
          name="test-inputRadioGroup"
        >
          <InputRadio name="test-inputRadioGroup" id="inputId" value="inputValue" isChecked>Test radio button</InputRadio>
          <InputRadio name="test-inputRadioGroup" id="inputId2" value="inputValue2">Test radio button</InputRadio>
        </RadioGroup>,
      )
    })

    describe('when the second input radio is selected', () => {
      beforeEach(() => {
        inputRadio = wrapper.find('#inputId2').at(1)
        inputRadio.simulate('change', { target: { value: 'inputValue2' } })
      })

      test('then the onChange event is triggered', () => {
        expect(onChangeSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            target: { value: 'inputValue2' },
          }),
        )
      })
    })
  })
})
