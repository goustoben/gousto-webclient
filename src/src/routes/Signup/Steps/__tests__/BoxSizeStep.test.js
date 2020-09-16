import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import config from 'config/signup'
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
    expect(wrapper.find('Heading').childAt(0).text()).toBe(config.boxSizeStep.title)

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

  describe('and the pricing clarity experiment is on', () => {
    const menuBoxPrices = Immutable.fromJS({})

    beforeEach(() => {
      wrapper.setProps({
        isPricingClarityEnabled: true,
        menuBoxPrices
      })
    })

    test('then alternate representation of box sizes is rendered', () => {
      expect(wrapper.find('Heading').childAt(0).text()).toBe(config.boxSizeStep.title)

      expect(wrapper.find('SignupImage')).toHaveLength(0)

      expect(wrapper.find('BoxSizeBox')).toHaveLength(2)
    })
  })
})
