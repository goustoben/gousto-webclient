import { trackClickPriceComparisonTableHeader } from 'routes/Home/PriceComparisonTable/actions/trackClickPriceComparisonTableHeading'
import { actionTypes } from 'actions/actionTypes'
import { clickPriceComparisonTableHeading } from 'actions/trackingKeys'

const mockedDispatch = jest.fn()

describe('PriceComparisonTable: actions', () => {
  test('clickComparisonTableHeading action should be called with exact args', () => {
    const fnWithDispatch = trackClickPriceComparisonTableHeader()

    fnWithDispatch(mockedDispatch)

    expect(mockedDispatch).toBeCalledTimes(1)
    expect(mockedDispatch).toBeCalledWith({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: clickPriceComparisonTableHeading,
      },
    })
  })
})
