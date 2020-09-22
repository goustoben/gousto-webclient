import React from 'react'
import { shallow } from 'enzyme'
import { CTA, InputField } from 'goustouicomponents'
import { InputWithButton } from '..'

describe('<InputWithButton />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <InputWithButton eventErrorMessage="" showSuccessMessage={false}>
        <InputField
          id="id-test"
          placeholder="placeholder-test"
          onUpdate={() => {}}
        />
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

  test('error message is not shown', () => {
    expect(wrapper.find('.eventStatus').text()).toBe('')
  })

  test('success message is not shown', () => {
    expect(wrapper.find('.eventStatus').text()).toBe('')
  })

  describe('when showSuccessMessage is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ showSuccessMessage: true })
    })

    test('error message is shown', () => {
      expect(wrapper.find('.eventStatus').text()).toBe('Your message will arrive shortly')
    })
  })

  describe('when eventErrorMessage is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ eventErrorMessage: 'test error message' })
    })

    test('success message is shown', () => {
      expect(wrapper.find('.eventStatus').text()).toBe('test error message')
    })
  })
})
