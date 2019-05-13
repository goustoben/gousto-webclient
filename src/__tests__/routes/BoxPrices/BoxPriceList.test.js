import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import BoxPricesList from 'routes/BoxPrices/BoxPricesList'
import BoxPrice from 'routes/BoxPrices/BoxPrice'
import ErrorPage from 'ErrorPage'

import boxPricesMock from './__mocks__/boxPrices.json'

describe("BoxPriceList", () => {

  it ("Will snap BoxPriceList", () => {
    const tree = renderer
      .create(<BoxPricesList boxPrices={boxPricesMock} type="gourmet" />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it ("Will render box price list", () => {
    const component = mount(
      <BoxPricesList boxPrices={boxPricesMock} type="gourmet" />
    )

    expect(component.find(BoxPrice).length).toEqual(2)
  })

  it ("Will render an error component in case of error", () => {
    const component = shallow(
      <BoxPricesList boxPrices={{}} type="gourmet" error />
    )

    expect(component.find(ErrorPage).length).toEqual(1)
  })
})
