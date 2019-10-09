import snowplow from 'middlewares/tracking/snowplow'

describe('snowplow', () => {
  beforeEach(() => {
    window.dataLayer = []
  })
  test('should merge the given action with { event: "userAction" } and push it into window.dataLayer', () => {
    snowplow({ actionType: 'RECIPE_DETAIL_SHOW' })
    expect(window.dataLayer.length).toBe(1)
    expect(window.dataLayer[0]).toEqual({
      event: 'userAction',
      actionType: 'RECIPE_DETAIL_SHOW',
      actionValue: JSON.stringify({}),
    })
  })
  test('should merge the given object in with the given action and { event: "userAction" }, then push it into window.dataLayer', () => {
    snowplow({ actionType: 'RECIPE_DETAIL_SHOW' }, { pathname: '/menu' })
    expect(window.dataLayer.length).toBe(1)
    expect(window.dataLayer[0]).toEqual({
      actionValue: JSON.stringify({}),
      event: 'userAction',
      pathname: '/menu',
      actionType: 'RECIPE_DETAIL_SHOW',
    })

    snowplow(
      { clicked: 'add_recipe', actionType: 'RECIPE_ADDED' },
      { pathname: '/menu' },
    )
    expect(window.dataLayer.length).toBe(2)
    expect(window.dataLayer[1]).toEqual({
      actionValue: JSON.stringify({ clicked: 'add_recipe' }),
      event: 'userAction',
      pathname: '/menu',
      actionType: 'RECIPE_ADDED',
    })
  })
})
