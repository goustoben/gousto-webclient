import React from 'react'
import renderer from 'react-test-renderer'

import { BoxPricesRedesign } from 'routes/BoxPrices/BoxPricesRedesign'

describe('BoxPricesRedesign', () => {
  test('will match snapshot', () => {
    const boxPrices = renderer
      .create(<BoxPricesRedesign />)
      .toJSON()

    expect(boxPrices).toMatchSnapshot()
  })
})
