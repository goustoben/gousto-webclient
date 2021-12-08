import React from 'react'
import { mount } from 'enzyme'
import { Stepper } from '..'

describe('<Stepper />', () => {
  let wrapper
  let onContinueClick
  let onSkipClick

  beforeEach(() => {
    onContinueClick = jest.fn()
    onSkipClick = jest.fn()

    wrapper = mount(
      <Stepper
        isContinueDisabled={false}
        onContinueClick={onContinueClick}
        onSkipClick={onSkipClick}
      >
        <div>
          Child 1
        </div>
        <div>
          Child 2
        </div>
      </Stepper>,
    )
  })

  test('then <StepIndicator /> renders correctly', () => {
    expect(wrapper.find('StepIndicator').prop('current')).toBe(1)
    expect(wrapper.find('StepIndicator').prop('size')).toBe(2)
  })

  test('then <StepButton /> renders correctly', () => {
    expect(wrapper.find('StepButtons').length).toBe(1)
  })

  test('then <StepContent /> renders correctly', () => {
    expect(wrapper.find('StepContent').length).toBe(1)
    expect(wrapper.find('StepContent').find('.step').length).toBe(2)
  })

  describe('when clicking on the skip button', () => {
    beforeEach(() => {
      wrapper.find('StepButtons').find('CTA').at(1).simulate('click')
    })

    test('then callback is called passing the current state', () => {
      expect(onSkipClick).toHaveBeenCalledWith({ currentStep: 1 })
    })
  })

  describe('when clicking on the continue button', () => {
    beforeEach(() => {
      wrapper.setProps({ stepNumber: 2 })
      wrapper.update()
      wrapper.find('StepButtons').find('CTA').at(0).simulate('click')
    })

    test('then callback is called the currentStep', () => {
      expect(onContinueClick).toHaveBeenCalledWith({ currentStep: 2 })
    })
  })

  describe('when pre setting the indicator', () => {
    beforeEach(() => {
      wrapper = mount(
        <Stepper
          isContinueDisabled={false}
          stepIndicator={{ current: 2, size: 5 }}
          onContinueClick={onContinueClick}
          onSkipClick={onSkipClick}
        >
          <div>
            Child 1
          </div>
          <div>
            Child 2
          </div>
          <div>
            Child 3
          </div>
        </Stepper>,
      )
    })

    test('then indicator shows based on the props', () => {
      expect(wrapper.find('StepIndicator').prop('current')).toBe(3)
      expect(wrapper.find('StepIndicator').prop('size')).toBe(5)
    })

    describe('and when clicking to continue', () => {
      beforeEach(() => {
        wrapper.setProps({ stepNumber: 3 })
        wrapper.update()
      })

      test('then indicator shows based on the props', () => {
        expect(wrapper.find('StepIndicator').prop('current')).toBe(5)
        expect(wrapper.find('StepIndicator').prop('size')).toBe(5)
      })
    })
  })

  describe('when the continue button is disabled', () => {
    beforeEach(() => {
      wrapper = mount(
        <Stepper
          isContinueDisabled
          onContinueClick={onContinueClick}
          onSkipClick={onSkipClick}
        >
          <div>
            Child 1
          </div>
          <div>
            Child 2
          </div>
        </Stepper>,
      )
    })

    test('then the continue CTA is not called', () => {
      wrapper.find('StepButtons').find('CTA').at(0).simulate('click')
      expect(onContinueClick).not.toHaveBeenCalled()
    })
  })

  describe('when the skip button is set to hidden', () => {
    beforeEach(() => {
      wrapper = mount(
        <Stepper
          isContinueDisabled
          isSkipButtonVisible={false}
          onContinueClick={onContinueClick}
          onSkipClick={onSkipClick}
        >
          <div>
            Child 1
          </div>
          <div>
            Child 2
          </div>
        </Stepper>,
      )
    })

    test('skip button is not rendered', () => {
      expect(wrapper.find('StepButtons').find('CTA').at(1).length).toBe(0)
    })
  })
})
