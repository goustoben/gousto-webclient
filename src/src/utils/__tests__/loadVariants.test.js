import { loadContentVariants } from 'actions/content'

import { loadVariants } from 'utils/loadVariants'

jest.mock('actions/content', () => ({
  loadContentVariants: jest.fn(),
}))

describe('loadVariants', () => {
  let store
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
    store = {
      dispatch,
    }
  })

  test('should dispatch a loadContentVariants call on store with passed variants', () => {
    const variants = {
      homepage: 'default',
      cookbook: 'value-alt',
      'my-gousto': 'osr-c',
    }

    loadVariants(variants, store)

    expect(dispatch).toHaveBeenCalled()
    expect(loadContentVariants).toHaveBeenCalledWith(variants)
  })
})
