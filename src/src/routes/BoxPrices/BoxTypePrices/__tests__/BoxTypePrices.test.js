import React from 'react'
import { mount } from 'enzyme'

import { BoxTypePrices } from '../BoxTypePrices'

describe('BoxTypePrices', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<BoxTypePrices />)
  })

  describe('When BoxTypePrices is initialised', () => {
    test('Then component should be defined', () => {
      expect(wrapper).toBeDefined()
    })

    describe('And no props are set', () => {
      test('Then numPortions and totalPrice props should be null', () => {
        const expectedProps = {
          numPortions: null,
          totalPrice: null,
        }
        expect(wrapper.props()).toEqual(expectedProps)
      })
    })

    describe('And numPortions and totalPrice props set', () => {
      beforeEach(() => {
        wrapper.setProps({
          numPortions: 2,
          totalPrice: '10',
        })
      })

      test('Then numPortions and totalPrice props should be defined', () => {
        const expectedProps = {
          numPortions: 2,
          totalPrice: '10',
        }
        expect(wrapper.props()).toEqual(expectedProps)
      })
    })
  })
})
