import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import * as Redux from 'react-redux'

import { BoxPriceBlock } from '../BoxPriceBlock'

jest.mock('routes/Menu/domains/basket', () => ({
  useBasket: jest.fn().mockReturnValue({
    numPortions: 4,
  }),
}))

const boxPricesBoxSizeSelected = jest.fn()
const trackUTMAndPromoCode = jest.fn()
const boxPriceMock = [
  {
    num_portions: 2,
    price_per_portion: '6.25',
    total: '24.99',
  },
  {
    num_portions: 3,
    price_per_portion: '5.00',
    total: '29.99',
  },
  {
    num_portions: 4,
    price_per_portion: '5.00',
    total: '29.99',
  },
]

const dispatch = jest.fn()
jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
jest.spyOn(Redux, 'useSelector').mockImplementation(() => false)

describe('Given BoxPriceBlock', () => {
  beforeEach(() => {
    render(
      <BoxPriceBlock
        boxInfo={boxPriceMock}
        numPersons={2}
        selectedBox={2}
        boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
      />,
    )
  })

  test('should be rendered correctly', () => {
    expect(screen.getByRole('heading', { name: 'Regular box' })).toBeDefined()
    expect(screen.getByText('Our regular box is suitable for:')).toBeDefined()
    expect(screen.getByText('2 adults (or 1 + leftovers)')).toBeDefined()
    expect(screen.getByText('1 adult and 1-2 children')).toBeDefined()
    expect(screen.getByText('Select number of recipes')).toBeDefined()
  })

  test('boxPricesBoxSizeSelected should be called', () => {
    const button = screen.getByRole('button', { name: 'Build my box' })

    expect(button).toBeDefined()

    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(boxPricesBoxSizeSelected).toHaveBeenCalled()
  })

  test('should track trackUTMAndPromoCode if box size is clicked', () => {
    const button = screen.getByRole('button', { name: '2' })

    expect(button).toBeDefined()

    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(trackUTMAndPromoCode).toHaveBeenCalled()
  })
})
