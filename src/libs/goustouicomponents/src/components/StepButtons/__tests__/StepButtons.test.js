import React from 'react'
import { mount } from 'enzyme'
import { StepButtons } from '../StepButtons'

describe('<StepButtons />', () => {
  let wrapper
  let onContinueClick
  let onSkipClick

  beforeAll(() => {
    onContinueClick = jest.fn()
    onSkipClick = jest.fn()

    wrapper = mount(
      <StepButtons
        isContinueDisabled={false}
        labelNext="test next"
        labelSkip="test skip"
        onContinueClick={onContinueClick}
        onSkipClick={onSkipClick}
      />,
    )
  })

  test('renders Next CTA with the correct label', () => {
    expect(wrapper.find('CTA').at(0).text()).toContain('test next')
  })

  test('renders Skip CTA with the correct label', () => {
    expect(wrapper.find('CTA').at(1).text()).toContain('test skip')
  })

  test('calls onContinueClick correctly', () => {
    wrapper.find('CTA').at(0).simulate('click')

    expect(onContinueClick).toHaveBeenCalledTimes(1)
  })

  test('calls onSkipClick correctly', () => {
    wrapper.find('CTA').at(1).simulate('click')

    expect(onSkipClick).toHaveBeenCalledTimes(1)
  })
})
