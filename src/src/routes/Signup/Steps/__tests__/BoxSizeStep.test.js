import React from 'react'
import Immutable from 'immutable'
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

  describe('and the pricing clarity experiment is on', () => {
    const menuBoxPrices = Immutable.fromJS({})

    beforeEach(() => {
      wrapper.setProps({
        isPricingClarityEnabled: true,
        menuBoxPrices,
      })
    })

    test('then alternate representation of box sizes is rendered', () => {
      expect(wrapper.find('Heading').childAt(0).text()).toBe(signupConfig.boxSizeStep.title)

      expect(wrapper.find('SignupImage')).toHaveLength(0)

      expect(wrapper.find('BoxSizeBox')).toHaveLength(2)
    })
  })

  describe('given wizard price per serving is enabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isWizardPricePerServingEnabled: true,
        lowestPricePerPortion: {
          forTwo: {
            price: '2',
            priceDiscounted: '2',
          },
          forFour: {
            price: '4',
            priceDiscounted: '4',
          },
        },
      })
    })

    test('then should render PricePerServing properly', () => {
      expect(wrapper.find('PricePerServing')).toHaveLength(2)
      expect(wrapper.find('PricePerServing').first().props()).toEqual(
        expect.objectContaining({
          portion: 2,
          image: 'per-two-people',
          cost: {
            price: '2',
            priceDiscounted: '2',
          },
        })
      )
      expect(wrapper.find('PricePerServing').at(1).props()).toEqual(
        expect.objectContaining({
          portion: 4,
          image: 'per-four-people',
          cost: {
            price: '4',
            priceDiscounted: '4',
          },
        })
      )
    })

    describe('when the PricePerServing button is clicked', () => {
      let sections

      beforeEach(() => {
        sections = wrapper.find('PricePerServing')
      })

      test('for 2 people - then the portions are set to 2', () => {
        sections.at(0).prop('onClick')()

        expect(numPortionChange).toHaveBeenCalledWith(2)
        expect(numPortionChangeTracking).toHaveBeenCalledWith(2)
        expect(next).toHaveBeenCalledWith()
      })

      test('for 4 people - then the portions are set to 4', () => {
        sections.at(1).prop('onClick')()

        expect(numPortionChange).toHaveBeenCalledWith(4)
        expect(numPortionChangeTracking).toHaveBeenCalledWith(4)
        expect(next).toHaveBeenCalledWith()
      })
    })
  })
})
