import React from 'react'
import { shallow } from 'enzyme'
import { signupConfig } from 'config/signup'
import { BoxSizeStep } from '../BoxSize/BoxSizeStep'

describe('given the user is at the Box Size Step', () => {
  let wrapper
  const numPortionChange = jest.fn()
  const numPortionChangeTracking = jest.fn()
  const next = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <BoxSizeStep
        numPortionChange={numPortionChange}
        numPortionChangeTracking={numPortionChangeTracking}
        next={next}
      />
    )
  })

  test('then the component renders correctly', () => {
    expect(wrapper.find('Heading').childAt(0).text()).toBe(signupConfig.boxSizeStep.title)

    expect(wrapper.find('SignupImage')).toHaveLength(1)

    const buttons = wrapper.find('.row Connect(Button)')
    expect(buttons).toHaveLength(2)
    expect(buttons.at(0).childAt(0).text()).toBe('2 People')
    expect(buttons.at(1).childAt(0).text()).toBe('4 People')
  })

  describe('when the user chooses the box size', () => {
    let buttons

    beforeEach(() => {
      buttons = wrapper.find('.row Connect(Button)')
    })

    test('for 2 people - then the portions are set to 2', () => {
      buttons.at(0).simulate('click')

      expect(numPortionChange).toHaveBeenCalledWith(2)
      expect(numPortionChangeTracking).toHaveBeenCalledWith(2)
      expect(next).toHaveBeenCalledWith()
    })

    test('for 4 people - then the portions are set to 4', () => {
      buttons.at(1).simulate('click')

      expect(numPortionChange).toHaveBeenCalledWith(4)
      expect(numPortionChangeTracking).toHaveBeenCalledWith(4)
      expect(next).toHaveBeenCalledWith()
    })
  })

  describe('Wizard box size experiment', () => {
    beforeEach(() => {
      wrapper.setProps({
        isWizardBoxSizeEnabled: true,
      })
    })

    test('renders carousel items properly', () => {
      expect(wrapper.find('Heading').first().contains('Choose your box size')).toBeTruthy()
      expect(wrapper.find('p').first().text()).toBe('You can choose 2, 3 or 4 recipes per box.')
      expect(wrapper.find('CTA')).toHaveLength(2)

      expect(wrapper.find('CTA').first().prop('testingSelector')).toBe('signupBoxSize2Portions')
      expect(wrapper.find('CTA').first().contains('Choose regular box')).toBeTruthy()

      expect(wrapper.find('CTA').last().prop('testingSelector')).toBe('signupBoxSize4Portions')
      expect(wrapper.find('CTA').last().contains('Choose large box')).toBeTruthy()
    })

    test('should trigger onClick for 2 portions', () => {
      wrapper.find('CTA').first().simulate('click')
      expect(numPortionChange).toHaveBeenCalledWith(2)
      expect(numPortionChangeTracking).toHaveBeenCalledWith(2)
      expect(next).toHaveBeenCalledWith()
    })

    test('should trigger onClick for 4 portions', () => {
      wrapper.find('CTA').last().simulate('click')
      expect(numPortionChange).toHaveBeenCalledWith(4)
      expect(numPortionChangeTracking).toHaveBeenCalledWith(4)
      expect(next).toHaveBeenCalledWith()
    })
  })
})
