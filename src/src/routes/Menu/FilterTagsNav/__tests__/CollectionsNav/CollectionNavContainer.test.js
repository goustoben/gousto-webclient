import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import CollectionsNavContainer from 'routes/Menu/CollectionsNav/CollectionsNavContainer'

describe('CollectionsNavContainer', () => {
  test('should have menuCollections prop', () => {
    const wrapper = shallow(<CollectionsNavContainer />, {
      context: {
        store: {
          getState: () => ({
            menuCollections: Immutable.fromJS({
              a: {
                id: 'a',
                published: true,
              },
              b: {
                id: 'b',
                published: true,
              },
              c: {
                id: 'c',
                published: true,
              },
            }).toOrderedMap(),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: ['', '', ''],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            }),
            cookies: Immutable.Map({
              isPolicyAccepted: true
            })
          }),
          subscribe: () => { },
        },
      },
    })

    const expected = Immutable.fromJS({
      a: {
        id: 'a',
        published: true,
      },
      b: {
        id: 'b',
        published: true,
      },
      c: {
        id: 'c',
        published: true,
      },
    }).toOrderedMap()
    const result = wrapper.prop('menuCollections')
    expect(Immutable.is(expected, result)).toEqual(true)
  })

  test('should filter out unpublished collections', () => {
    const wrapper = shallow(<CollectionsNavContainer />, {
      context: {
        store: {
          getState: () => ({
            menuCollections: Immutable.fromJS({
              a: {
                id: 'a',
                published: true,
              },
              b: {
                id: 'b',
                published: false,
              },
              c: {
                id: 'c',
                published: true,
              },
            }).toOrderedMap(),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: ['', '', ''],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            }),
            cookies: Immutable.Map({
              isPolicyAccepted: true
            })
          }),
          subscribe: () => { },
        },
      },
    })

    const expected = Immutable.fromJS({
      a: {
        id: 'a',
        published: true,
      },
      c: {
        id: 'c',
        published: true,
      },
    }).toOrderedMap()
    const result = wrapper.prop('menuCollections')
    expect(Immutable.is(expected, result)).toEqual(true)
  })

  test('should filter out empty collections', () => {
    const wrapper = shallow(<CollectionsNavContainer />, {
      context: {
        store: {
          getState: () => ({
            menuCollections: Immutable.fromJS({
              a: {
                id: 'a',
                published: true,
              },
              b: {
                id: 'b',
                published: true,
              },
              c: {
                id: 'c',
                published: true,
              },
            }).toOrderedMap(),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: [],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            }),
            cookies: Immutable.Map({
              isPolicyAccepted: true
            })
          }),
          subscribe: () => { },
        },
      },
    })

    const expected = Immutable.fromJS({
      a: {
        id: 'a',
        published: true,
      },
      c: {
        id: 'c',
        published: true,
      },
    }).toOrderedMap()
    const result = wrapper.prop('menuCollections')
    expect(Immutable.is(expected, result)).toEqual(true)
  })
})
