import {
  openSidesModalAction,
  closeSidesModalAction,
  openSidesModal,
  closeSidesModal,
} from '../sides'

describe('openSidesModalAction', () => {
  test('should return the correct action', () => {
    expect(openSidesModalAction()).toEqual({ type: 'MENU_OPEN_SIDES_MODAL' })
  })
})

describe('closeSidesModalAction', () => {
  test('should return the correct action', () => {
    expect(closeSidesModalAction()).toEqual({ type: 'MENU_CLOSE_SIDES_MODAL' })
  })
})

describe('openSidesModal', () => {
  test('should return call the correct actions', () => {
    const dispatch = jest.fn().mockImplementation(() => {})

    openSidesModal()(dispatch)

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toBeCalledWith({
      trackingData: {
        event_name: 'view_order_sides_screen',
        event_screen: 'order_sides_screen',
        event_type: 'screen_view'
      },
      type: 'TRACK_VIEW_ORDER_SIDES_SCREEN'
    })
    expect(dispatch).toBeCalledWith({ key: 'BASKET_CHECKOUT', type: 'PENDING', value: true })
    expect(dispatch).toBeCalledWith({ type: 'MENU_OPEN_SIDES_MODAL' })
  })
})

describe('closeSidesModalAction', () => {
  test('should return call the correct actions', () => {
    const dispatch = jest.fn()

    closeSidesModal()(dispatch)

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toBeCalledWith({
      trackingData: {
        event_name: 'order_sides_cancel',
        event_type: 'close_screen'
      },
      type: 'TRACK_ORDER_SIDES_CANCEL'
    })
    expect(dispatch).toBeCalledWith({ key: 'BASKET_CHECKOUT', type: 'PENDING', value: false })
    expect(dispatch).toBeCalledWith({ type: 'MENU_CLOSE_SIDES_MODAL' })
  })
})
