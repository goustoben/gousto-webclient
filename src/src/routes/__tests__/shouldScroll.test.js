import shouldScroll from 'routes/shouldScroll'

describe('shouldScroll', () => {
  test('should return true if the pathname has changed', () => {
    expect(
      shouldScroll(
        { location: { pathname: '/home' } },
        { location: { pathname: '/menu' } },
      ),
    ).toBe(true)
  })

  test('should return false if the pathname has not changed', () => {
    expect(
      shouldScroll(
        {
          location: { pathname: '/menu', query: { collection: 'all-recipes' } },
        },
        {
          location: { pathname: '/menu', query: { collection: 'vegetarian' } },
        },
      ),
    ).toBe(false)
  })
})
