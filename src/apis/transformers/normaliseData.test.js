import { normaliseData } from './normaliseData'

describe('normaliseData', () => {
  test('should take api response and normalise it', () => {
    const testData = {
      included: [{
        "id": "4e10aea9-996e-415a-92a2-3de840f8ed14",
        "type": "ingredients",
        "attributes": {}
      }, {
        "id": "91ff0bd9-aca6-4336-b0a0-512a8f40e460",
        "type": "collections",
        "attributes": {}
      }]
    }

    const result = normaliseData(testData)
    expect(result).toEqual({
      "ingredients": {
        "4e10aea9-996e-415a-92a2-3de840f8ed14": {
          "attributes": {},
          "id": "4e10aea9-996e-415a-92a2-3de840f8ed14",
          "type": "ingredients"
        }
      },
      "collections": {
        "91ff0bd9-aca6-4336-b0a0-512a8f40e460": {
          "attributes": {},
          "id": "91ff0bd9-aca6-4336-b0a0-512a8f40e460",
          "type": "collections"
        }
      }
    })
  })

  test('should return data sorted by included type', () => {
    const expectedFormat = {
      included: [
        {
          id: 'idtestcollection1',
          type: "collections"
        },
        {
          id: 'idtestcollection2',
          type: "collections"
        },
        {
          id: 'idtestrecipe3',
          type: "recipes"
        },
        {
          id: 'idtestrecipe4',
          type: "recipes"
        },
        {
          id: 'idtestingredients5',
          type: "ingredients"
        },
        {
          id: 'idtestingredients6',
          type: "ingredients"
        }
      ],
    }

    const result = normaliseData(expectedFormat)
    expect(result).toEqual(
      {
        collections: {
          'idtestcollection1': {
            id: 'idtestcollection1',
            type: "collections"
          },
          'idtestcollection2': {
            id: 'idtestcollection2',
            type: "collections"
          }
        },
        recipes: {
          'idtestrecipe3': {
            id: 'idtestrecipe3',
            type: "recipes"
          },
          'idtestrecipe4': {
            id: 'idtestrecipe4',
            type: "recipes"
          }
        },
        ingredients: {
          'idtestingredients5': {
            id: 'idtestingredients5',
            type: "ingredients"
          },
          'idtestingredients6': {
            id: 'idtestingredients6',
            type: "ingredients"
          }
        },
      })
  })
})
