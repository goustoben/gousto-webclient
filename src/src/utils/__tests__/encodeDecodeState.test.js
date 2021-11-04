import Immutable from 'immutable'
import { defineTag, encodeState, decodeState } from 'utils/encodeDecodeState'

describe('given state utils', () => {
  let tag
  const cases = [
    [ {}, 'isObject' ],
    [ null, 'isPlain' ],
    [ undefined, 'isPlain' ],
    [ 'boolean', 'isPlain' ],
    [ 'number', 'isPlain' ],
    [ 'string', 'isPlain' ],
    [ [
      {
        type: 'collection',
        id: '123',
        header: 'header1',
      },
      {
        type: 'collection',
        id: '456',
        header: 'header2',
      },
    ], 'isArray' ],
    [ Immutable.Map(), 'isMap' ],
    [ Immutable.List([
      {
        id: 'a325affa-e453',
        coreRecipeId: '3499',
        displayName: 'Meat-Free Meatballs With Herby Bulgur And Red Pepper Sauce',
      },
      {
        id: 'a3252ffa-e453',
        coreRecipeId: '3456',
        displayName: 'Lamb Meatballs With Herby Bulgur And Red Pepper Sauc',
      },
    ]), 'isList' ],
    [ Immutable.OrderedMap(), 'isOrderedMap' ],
  ]

  describe.each(cases)('when defineTag is called', (value, expected) => {
    beforeEach(() => {
      tag = defineTag(value)
    })

    test(`then should return proper tag ${expected} for passed value`, () => {
      expect(tag).toEqual(expected)
    })
  })

  describe('when encodeState is invoked', () => {
    test('should serialise state tree', () => {
      const state = {
        // an empty object
        form: {},
        // non-empty nested object
        routing: {
          locationBeforeTransition: {
            action: 'POP',
            key: null,
            state: undefined,
          },
        },
        // string
        serverError: '404',
        // Immutable.Map contains Immutable.Map
        menu: Immutable.Map({
          menuVariants: Immutable.fromJS({
            447: {
              862: {
                displayNmae: 'Indian-Style Spiced Carrot & Lentil Soup',
              },
            },
            448: {
              864: {
                displayNmae: 'Spicy Hoisin Pork With Ginger & Sesame Greens',
              },
            },
          }),
        }),
        // Immutable.Map contains plain objects
        menu1: Immutable.Map({
          menuVariant: '',
          collectionHeaders: [
            {
              type: 'menu',
              id: '445',
            },
            {
              type: 'menu',
              id: '446',
            },
          ],
          menuPrefetched: true,
        }),
        // Immutable.List
        alternatives: Immutable.List([
          {
            id: 'a325affa-e453',
            coreRecipeId: '3499',
            displayName: 'Meat-Free Meatballs With Herby Bulgur And Red Pepper Sauce',
          },
          {
            id: 'a3252ffa-e453',
            coreRecipeId: '3456',
            displayName: 'Lamb Meatballs With Herby Bulgur And Red Pepper Sauc',
          },
        ]),
        // Immutable.OrderedMap
        menuCollections: Immutable.OrderedMap({
          a: {
            carouselConfig: null,
            featureCategoryOrder: 0,
            shortTitle: 'Gousto Recommends',
            requirements: Immutable.Map({}),
          },
          b: {
            carouselConfig: null,
            featureCategoryOrder: 0,
            shortTitle: 'Dairy-Free',
            requirements: Immutable.Map({
              dietary_claims: ['dairy-free'],
            }),
          },
        }),
        // array
        collectionsData: [
          {
            type: 'collection',
            id: '123',
            header: 'header1',
          },
          {
            type: 'collection',
            id: '456',
            header: 'header2',
          },
        ],
      }

      const serialised = encodeState(state)
      const expected = JSON.stringify({
        form: { tag: 'isObject', value: {} },
        routing: {
          tag: 'isObject',
          value: {
            locationBeforeTransition: {
              tag: 'isObject',
              value: {
                action: { tag: 'isPlain', value: 'POP' },
                key: { tag: 'isPlain', value: null },
                state: { tag: 'isPlain' },
              },
            },
          },
        },
        serverError: { tag: 'isPlain', value: '404' },
        menu: {
          tag: 'isMap',
          value: {
            menuVariants: {
              tag: 'isMap',
              value: {
                447: {
                  tag: 'isMap',
                  value: {
                    862: {
                      tag: 'isMap',
                      value: {
                        displayNmae: {
                          tag: 'isPlain',
                          value: 'Indian-Style Spiced Carrot & Lentil Soup',
                        },
                      },
                    },
                  },
                },
                448: {
                  tag: 'isMap',
                  value: {
                    864: {
                      tag: 'isMap',
                      value: {
                        displayNmae: {
                          tag: 'isPlain',
                          value: 'Spicy Hoisin Pork With Ginger & Sesame Greens',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        menu1: {
          tag: 'isMap',
          value: {
            menuVariant: { tag: 'isPlain', value: '' },
            collectionHeaders: {
              tag: 'isArray',
              value: [
                { type: 'menu', id: '445' },
                { type: 'menu', id: '446' },
              ],
            },
            menuPrefetched: { tag: 'isPlain', value: true },
          },
        },
        alternatives: {
          tag: 'isList',
          value: [
            {
              id: 'a325affa-e453',
              coreRecipeId: '3499',
              displayName: 'Meat-Free Meatballs With Herby Bulgur And Red Pepper Sauce',
            },
            {
              id: 'a3252ffa-e453',
              coreRecipeId: '3456',
              displayName: 'Lamb Meatballs With Herby Bulgur And Red Pepper Sauc',
            },
          ],
        },
        menuCollections: {
          tag: 'isOrderedMap',
          value: {
            a: {
              carouselConfig: null,
              featureCategoryOrder: 0,
              shortTitle: 'Gousto Recommends',
              requirements: {},
            },
            b: {
              carouselConfig: null,
              featureCategoryOrder: 0,
              shortTitle: 'Dairy-Free',
              requirements: { dietary_claims: ['dairy-free'] },
            },
          },
        },
        collectionsData: {
          tag: 'isArray',
          value: [
            {
              type: 'collection',
              id: '123',
              header: 'header1'
            },
            {
              type: 'collection',
              id: '456',
              header: 'header2',
            },
          ],
        },
      })

      expect(serialised).toEqual(expected)
    })
  })

  // describe('deserialise', () => {
  //   test('should deserialise state tree properly', () => {
  //     const initialState = {
  //       form: { tag: 'isObject', value: {} },
  //       routing: {
  //         tag: 'isObject',
  //         value: {
  //           locationBeforeTransition: {
  //             tag: 'isObject',
  //             value: {
  //               action: { tag: 'isPlain', value: 'POP' },
  //               key: { tag: 'isPlain', value: null },
  //               state: { tag: 'isPlain' },
  //             },
  //           },
  //         },
  //       },
  //       serverError: { tag: 'isPlain', value: '404' },
  //       menu: {
  //         tag: 'isMap',
  //         value: {
  //           menuVariants: {
  //             tag: 'isMap',
  //             value: {
  //               447: {
  //                 tag: 'isMap',
  //                 value: {
  //                   862: {
  //                     tag: 'isMap',
  //                     value: {
  //                       displayNmae: {
  //                         tag: 'isPlain',
  //                         value: 'Indian-Style Spiced Carrot & Lentil Soup',
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //               448: {
  //                 tag: 'isMap',
  //                 value: {
  //                   864: {
  //                     tag: 'isMap',
  //                     value: {
  //                       displayNmae: {
  //                         tag: 'isPlain',
  //                         value: 'Spicy Hoisin Pork With Ginger & Sesame Greens',
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       menu1: {
  //         tag: 'isMap',
  //         value: {
  //           menuVariant: { tag: 'isPlain', value: '' },
  //           collectionHeaders: {
  //             tag: 'isArray',
  //             value: [
  //               { type: 'menu', id: '445' },
  //               { type: 'menu', id: '446' },
  //             ],
  //           },
  //           menuPrefetched: { tag: 'isPlain', value: true },
  //         },
  //       },
  //       alternatives: {
  //         tag: 'isList',
  //         value: [
  //           {
  //             id: 'a325affa-e453',
  //             coreRecipeId: '3499',
  //             displayName: 'Meat-Free Meatballs With Herby Bulgur And Red Pepper Sauce',
  //           },
  //           {
  //             id: 'a3252ffa-e453',
  //             coreRecipeId: '3456',
  //             displayName: 'Lamb Meatballs With Herby Bulgur And Red Pepper Sauc',
  //           },
  //         ],
  //       },
  //       menuCollections: {
  //         tag: 'isOrderedMap',
  //         value: {
  //           a: {
  //             carouselConfig: null,
  //             featureCategoryOrder: 0,
  //             shortTitle: 'Gousto Recommends',
  //             // requirements: {},
  //           },
  //           b: {
  //             carouselConfig: null,
  //             featureCategoryOrder: 0,
  //             shortTitle: 'Dairy-Free',
  //             // requirements: { dietary_claims: ['dairy-free'] },
  //           },
  //         },
  //       },
  //       collectionsData: {
  //         tag: 'isArray',
  //         value: [
  //           {
  //             type: 'collection',
  //             id: '123',
  //             header: 'header1'
  //           },
  //           {
  //             type: 'collection',
  //             id: '456',
  //             header: 'header2',
  //           },
  //         ],
  //       },
  //     }
  //     const deserialisedState = deserialise(initialState)
  //     const expected = {
  //       form: {},
  //       routing: {
  //         locationBeforeTransition: {
  //           action: 'POP',
  //           key: null,
  //           state: undefined,
  //         },
  //       },
  //       serverError: '404',
  //       menu: Immutable.Map({
  //         menuVariants: Immutable.fromJS({
  //           447: {
  //             862: {
  //               displayNmae: 'Indian-Style Spiced Carrot & Lentil Soup',
  //             },
  //           },
  //           448: {
  //             864: {
  //               displayNmae: 'Spicy Hoisin Pork With Ginger & Sesame Greens',
  //             },
  //           },
  //         }),
  //       }),
  //       menu1: Immutable.Map({
  //         menuVariant: '',
  //         collectionHeaders: [
  //           {
  //             type: 'menu',
  //             id: '445',
  //           },
  //           {
  //             type: 'menu',
  //             id: '446',
  //           },
  //         ],
  //         menuPrefetched: true,
  //       }),
  //       alternatives: Immutable.List([
  //         {
  //           id: 'a325affa-e453',
  //           coreRecipeId: '3499',
  //           displayName: 'Meat-Free Meatballs With Herby Bulgur And Red Pepper Sauce',
  //         },
  //         {
  //           id: 'a3252ffa-e453',
  //           coreRecipeId: '3456',
  //           displayName: 'Lamb Meatballs With Herby Bulgur And Red Pepper Sauc',
  //         },
  //       ]),
  //       menuCollections: Immutable.OrderedMap({
  //         a: {
  //           carouselConfig: null,
  //           featureCategoryOrder: 0,
  //           shortTitle: 'Gousto Recommends',
  //         },
  //         b: {
  //           carouselConfig: null,
  //           featureCategoryOrder: 0,
  //           shortTitle: 'Dairy-Free',
  //         },
  //       }),
  //       collectionsData: [
  //         {
  //           type: 'collection',
  //           id: '123',
  //           header: 'header1',
  //         },
  //         {
  //           type: 'collection',
  //           id: '456',
  //           header: 'header2',
  //         },
  //       ],
  //     }
  //
  //     expect(deserialisedState).toEqual(expected)
  //   })
  // })
})
