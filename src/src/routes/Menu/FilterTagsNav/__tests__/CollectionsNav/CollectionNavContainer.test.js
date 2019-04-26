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
            features: Immutable.fromJS({
              unpubCollections: {
                value: false,
              },
            }),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: ['', '', ''],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            })
          }),
          subscribe: () => {},
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
            features: Immutable.fromJS({
              unpubCollections: {
                value: false,
              },
            }),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: ['', '', ''],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            })
          }),
          subscribe: () => {},
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

  test('should not filter out unpublished collections if the unpubCollections feature flag is true', () => {
    const wrapper = shallow(<CollectionsNavContainer />, {
      context: {
        store: {
          getState: () => ({
            menuCollections: Immutable.fromJS({
              a: {
                id: 'a',
                published: false,
              },
              b: {
                id: 'b',
                published: false,
              },
              c: {
                id: 'c',
                published: false,
              },
            }).toOrderedMap(),
            features: Immutable.fromJS({
              unpubCollections: {
                value: true,
              },
            }),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: ['', '', ''],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            })
          }),
          subscribe: () => {},
        },
      },
    })

    const expected = Immutable.fromJS({
      a: {
        id: 'a',
        published: false,
      },
      b: {
        id: 'b',
        published: false,
      },
      c: {
        id: 'c',
        published: false,
      },
    }).toOrderedMap()
    const result = wrapper.prop('menuCollections')
    expect(Immutable.is(expected, result)).toEqual(true)
  })

  test('should filter out unpublished collections if the unpubCollections feature flag is true but the forceCollections is true', () => {
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
            features: Immutable.fromJS({
              unpubCollections: {
                value: true,
              },
              forceCollections: {
                value: true,
              },
            }),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: ['', '', ''],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            })
          }),
          subscribe: () => {},
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
            features: Immutable.fromJS({
              unpubCollections: {
                value: false,
              },
            }),
            menuCollectionRecipes: Immutable.fromJS({
              a: ['', '', ''],
              b: [],
              c: ['', '', ''],
            }),
            request: Immutable.fromJS({
              browser: 'desktop'
            })
          }),
          subscribe: () => {},
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
