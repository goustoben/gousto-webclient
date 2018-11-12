import React from 'react'
import BoxPrices from 'routes/BoxPrices/BoxPrices'
import BoxPricesList from 'routes/BoxPrices/BoxPricesList'
import Loading from 'Loading'
import { shallow } from 'enzyme'
import boxPricesMock from './__mocks__/boxPrices.json'

describe("Box Prices", () => {

  it ("Will render a loading screen when fetching data", () => {
    const component = shallow(
			<BoxPrices data={{
			  loading: true,
			}}
			/>
    )

    expect(component.find(Loading).length).toEqual(1)
    expect(component.find(BoxPricesList).length).toEqual(0)
  })

  it ("Will render a BoxPriceList when data is returned", () => {
    const component = shallow(
			<BoxPrices data={{
			  loading: false,
			  boxPrices: boxPricesMock,
			}}
			/>
    )

    expect(component.find(Loading).length).toEqual(0)
    expect(component.find(BoxPricesList).length).toEqual(1)
  })
})
