import React from 'react'
import { shallow } from 'enzyme'
import { BoxSizeStep } from '../BoxSize/BoxSizeStep'

describe('given the user is at the Box Size Step', () => {
  let wrapper
  const numPortionChange = jest.fn()
  const numPortionChangeTracking = jest.fn()
  const trackSignupWizardAction = jest.fn()
  const next = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <BoxSizeStep
        numPortionChange={numPortionChange}
        numPortionChangeTracking={numPortionChangeTracking}
        next={next}
        trackSignupWizardAction={trackSignupWizardAction}
      />
    )
  })

  test('then the component renders correctly', () => {
    expect(wrapper.find('Heading').exists()).toBeTruthy()
    expect(wrapper.find('.subtitle').exists()).toBeTruthy()
    expect(wrapper.find('.boxSizeCarousel').exists()).toBeTruthy()
    expect(wrapper.find('.carouselItem')).toHaveLength(2)
    expect(wrapper.find('PrimaryButton')).toHaveLength(2)
  })

  describe('when the user chooses the box size', () => {
    beforeEach(() => {
      wrapper.find('PrimaryButton').at(0).prop('onPrimaryButtonClick')(2)
    })

    test('then proper amount of portions are set correctly', () => {
      expect(numPortionChange).toHaveBeenCalledWith(2)
      expect(numPortionChangeTracking).toHaveBeenCalledWith(2)
      expect(trackSignupWizardAction).toHaveBeenCalledWith('complete_wizard_box_size', {
        box_size: 2,
      })
      expect(next).toHaveBeenCalledWith()
    })
  })
})
