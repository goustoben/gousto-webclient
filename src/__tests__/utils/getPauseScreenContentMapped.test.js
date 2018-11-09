import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */

import getPauseScreenContentMapped from 'utils/getPauseScreenContentMapped'

describe('getPauseScreenContentMapped', () => {
  test('should return an Immutable List', () => {
    const contentConfig = Immutable.List([])
    expect(
      Immutable.is(
        getPauseScreenContentMapped(contentConfig),
        Immutable.List([]),
      ),
    ).toBe(true)
  })

  test('should contain one item with correct type for each contentItemDefaults', () => {
    const contentConfig = Immutable.fromJS([
      { type: 'content' },
      { type: 'quote' },
      { type: 'anything' },
    ])

    const result = getPauseScreenContentMapped(contentConfig)

    expect(result.size).toBe(3)
    expect(result.getIn([0, 'type'])).toBe('content')
    expect(result.getIn([1, 'type'])).toBe('quote')
    expect(result.getIn([2, 'type'])).toBe('anything')
  })

  test('should merge in context to defaults for each contentItemDefaults', () => {
    const contentConfig = Immutable.fromJS([
      {
        type: 'content',
        defaults: {
          something: 'Default something value',
        },
      },
    ])

    const context = Immutable.fromJS({
      something: 'Context something value',
    })

    const result = getPauseScreenContentMapped(
      contentConfig,
      undefined,
      context,
    )

    expect(result.getIn([0, 'something'])).toBe('Context something value')
  })

  test('should fall back to default if not found in in context each contentItemDefaults', () => {
    const contentConfig = Immutable.fromJS([
      {
        type: 'content',
        defaults: {
          something: 'Default something value',
          somethingElse: 'Default something else value',
        },
      },
    ])

    const context = Immutable.fromJS({
      something: 'Context something value',
    })

    const result = getPauseScreenContentMapped(
      contentConfig,
      undefined,
      context,
    )

    expect(result.getIn([0, 'somethingElse'])).toBe(
      'Default something else value',
    )
  })

  test('should map mapContent items from content to given key', () => {
    const contentConfig = Immutable.fromJS([
      {
        type: 'copy',
        mapContent: {
          templateKey: 'title',
          somethingElse: 'something',
        },
        defaults: {
          somethingElse: 'Default something else value',
          something: 'Default something value',
        },
      },
    ])

    const content = Immutable.fromJS({
      something: 'Content something value',
      title: 'Content title',
    })

    const context = Immutable.fromJS({
      something: 'Context something value',
      somethingElse: 'Conext something else value',
      somethingThird: 'Context third value',
    })

    const result = getPauseScreenContentMapped(contentConfig, content, context)

    expect(result.toJS()).toEqual([
      {
        somethingElse: 'Content something value',
        templateKey: 'Content title',
        type: 'copy',
        something: 'Context something value',
      },
    ])
  })
})
