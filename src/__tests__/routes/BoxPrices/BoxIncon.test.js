import React from 'react'
import renderer from 'react-test-renderer'

import BoxIcon from 'routes/BoxPrices/BoxIcon'

describe("BoxIcon", () => {

  it ("Will snap BoxIcon", () => {
    const tree = renderer
      .create(<BoxIcon
        numPortions={2}
        numPersons={2}
      />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
