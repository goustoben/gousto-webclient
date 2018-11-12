import React from 'react'
import renderer from 'react-test-renderer'

import BoxInfo from 'routes/BoxPrices/BoxInfo'

describe("BoxInfo", () => {

  it ("Will snap BoxInfo", () => {
    const tree = renderer
      .create(<BoxInfo
        numPortions={2}
        totalPrice="10.10"
        pricePerPortion="2.25"
        numPersons={2}
      />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
