import React from 'react'

import { colors, Color } from '@gousto-internal/citrus-react'
import { render } from '@testing-library/react'

import { OrderDetails, OrderState } from '../OrderDetails.logic'

const TODAY = new Date('2022-12-10T00:00:00.000Z')
const FAKE_URL = 'https://www.google.com/fake/image/path'
const FAKE_ALT = 'Fake alt image text'

describe('<OrderDetails />', () => {
  it(`should render delivery date in a human readable format`, async () => {
    const { findByTestId } = render(<OrderDetails deliveryDate={TODAY} />)
    const { textContent } = await findByTestId('delivery-date')

    expect(textContent).toBe('Saturday 10th December')
  })

  it(`should not display price if "price" property is not defined`, async () => {
    const { findByTestId } = render(<OrderDetails deliveryDate={TODAY} />)
    const shouldThrow = () => findByTestId('price')

    // react-testing library throw error if element cannot be found
    await expect(shouldThrow()).rejects.toThrow(
      'Unable to find an element by: [data-testid="price"]',
    )
  })

  it(`should display price in a human readble format if price property exists`, async () => {
    const price = 1532.57
    const { findByTestId } = render(<OrderDetails deliveryDate={TODAY} price={price} />)
    const { textContent } = await findByTestId('price')

    expect(textContent).toBe('£1532.57')
  })

  it.each([
    ['cancelled' as OrderState, Color.Primary_500],
    ['confirmed' as OrderState, Color.Success_500],
    ['delivered' as OrderState, Color.Success_500],
    ['dispatched' as OrderState, Color.Success_500],
    ['menu open' as OrderState, Color.Warning_500],
    ['recipes chosen' as OrderState, Color.Success_500],
    ['scheduled' as OrderState, Color.Success_500],
  ])(`should render "%s" order state using %s color`, async (state: OrderState, color: Color) => {
    const { findByTestId } = render(<OrderDetails deliveryDate={TODAY} orderState={state} />)
    const element = await findByTestId('order-state')

    expect(element.textContent).toBe(state)
    expect(element).toHaveStyle({ color: colors[color] })
  })

  it(`should render 4 empty placeholder images by default if list is empty`, async () => {
    const { findByTestId } = render(
      <OrderDetails deliveryDate={TODAY} orderState="confirmed" recipeImages={[]} />,
    )
    const parentList = await findByTestId('recipe-list')

    expect(parentList.children.length).toBe(4)
  })

  it(`should only display delivery time if "deliveryStartTime" and "deliveryEndTime" properties are both provided`, async () => {
    const { findByTestId } = render(
      <OrderDetails
        deliveryDate={TODAY}
        orderState="scheduled"
        deliveryEndTime="22:00"
        deliveryStartTime="12:00"
      />,
    )
    const { textContent } = await findByTestId('delivery-time')

    expect(textContent).toBe('12pm - 10pm')
  })

  it.each(['deliveryStartTime', 'deliveryEndTime'])(
    `should not display delivery time if "%s" is missing`,
    async (propertyToOmit) => {
      const normalisedProperties = Object.create({
        deliveryEndTime: '22:00',
        deliveryStartTime: '12:00',
        [propertyToOmit]: undefined,
      })
      const { findByTestId } = render(
        <OrderDetails deliveryDate={TODAY} orderState="scheduled" {...normalisedProperties} />,
      )
      const shouldThrow = () => findByTestId('delivery-time')

      await expect(shouldThrow()).rejects.toThrowError(
        'Unable to find an element by: [data-testid="delivery-time"]',
      )
    },
  )

  it(`should only display delivery time if "deliveryStartTime" and "deliveryEndTime" exist`, async () => {
    const { findByTestId } = render(
      <OrderDetails
        deliveryDate={TODAY}
        orderState="scheduled"
        deliveryEndTime="22:00"
        deliveryStartTime="12:00"
      />,
    )
    const { textContent } = await findByTestId('delivery-time')

    expect(textContent).toBe('12pm - 10pm')
  })

  it(`should render available recipe images the rest fill in with placeholders`, async () => {
    const { findByTestId, queryAllByRole } = render(
      <OrderDetails
        deliveryDate={TODAY}
        orderState="confirmed"
        recipeImages={Array(3).fill({ src: FAKE_URL, alt: FAKE_ALT })}
      />,
    )
    const container = await findByTestId('recipe-list')
    const images = queryAllByRole('img')

    expect(images.length).toBe(3) // only three are images
    expect(container.children.length).toBe(4) // total is 4
  })

  it(`should only render fixed number of recipe images`, async () => {
    const { findByTestId, queryAllByRole } = render(
      <OrderDetails
        deliveryDate={TODAY}
        orderState="confirmed"
        maxRecipesCount={5}
        recipeImages={Array(7).fill({ src: FAKE_URL, alt: FAKE_ALT })}
      />,
    )
    const container = await findByTestId('recipe-list')
    const images = queryAllByRole('img')

    expect(images.length).toBe(5)
    expect(container.children.length).toBe(5)
  })
})
