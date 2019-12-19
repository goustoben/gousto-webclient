import React from 'react'
import { shallow } from 'enzyme'
import { RecipeMicronutrients } from '../RecipeMicronutrients'

describe('RecipeMicronutrients', () => {
  let wrapper
  describe('when the recipe contains micronutrients', () => {
    const micronutrients = [
      {
        "name": "Iron",
        "content": {
          "amount": 6.5,
          "unit": "µg"
        },
        "nrv_percent": 46.4
      },
      {
        "name": "Magnesium",
        "content": {
          "amount": 197.5,
          "unit": "mg"
        },
        "nrv_percent": 52.7
      }
    ]

    beforeEach(() => {
      wrapper = shallow(
        <RecipeMicronutrients
          micronutrients={micronutrients}
        />
      )
    })

    test('should display a table containing the micronutrients', () => {
      expect(wrapper.find('.micronutrientsWrapper').exists()).toBe(true)
    })

    test('should have 3 <th>', () => {
      expect(wrapper.find('th').length).toEqual(3)
    })

    test('should have 6 <td>', () => {
      expect(wrapper.find('td').length).toEqual(6)
    })
  })

  describe('when there are no micronutrients', () => {
    test('should not display the micronutrients', () => {
      wrapper = shallow(
        <RecipeMicronutrients
          micronutrients={null}
        />
      )
      expect(wrapper.find('.micronutrientsWrapper').exists()).toBe(false)
    })
  })
})
