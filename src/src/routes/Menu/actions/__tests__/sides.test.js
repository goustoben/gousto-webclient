import {
  openSidesModal,
  closeSidesModal,
} from '../sides'

describe('openSidesModal', () => {
  test('should return the correct action', () => {
    expect(openSidesModal()).toEqual({ type: 'MENU_OPEN_SIDES_MODAL' })
  })
})

describe('closeSidesModal', () => {
  test('should return the correct action', () => {
    expect(closeSidesModal()).toEqual({ type: 'MENU_CLOSE_SIDES_MODAL' })
  })
})
