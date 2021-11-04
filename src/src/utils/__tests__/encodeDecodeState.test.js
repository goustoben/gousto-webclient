import Immutable from 'immutable'
import { defineTag, encodeState, decodeState } from 'utils/encodeDecodeState'

const defineTagCases = [
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

describe('given state utils', () => {
  describe.each(defineTagCases)('when defineTag is invoked', (value, expected) => {
    let tag

    beforeEach(() => {
      tag = defineTag(value)
    })

    test(`then should return proper tag ${expected} for passed value`, () => {
      expect(tag).toEqual(expected)
    })
  })

  describe('when encodeState is invoked', () => {
    test('should serialise and deserialise state tree properly', () => {
      const state = {
        // an empty object
        form: {},
        // non-empty nested object
        routing: {
          locationBeforeTransition: {
            action: 'POP',
            key: null,
            state: undefined,
            query: {},
          },
        },
        // string
        serverError: '404',
        // Immutable.Map contains Immutable.Map
        menu: Immutable.Map({
          menuVariants: Immutable.Map({
            447: Immutable.Map({
              862: Immutable.Map({
                displayName: 'Indian-Style Spiced Carrot & Lentil Soup',
              }),
            }),
            448: Immutable.Map({
              864: Immutable.Map({
                displayName: 'Spicy Hoisin Pork With Ginger & Sesame Greens',
              }),
            }),
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
      const deserialised = decodeState(JSON.parse(serialised))

      expect(deserialised).toEqual(state)
    })
  })
})
