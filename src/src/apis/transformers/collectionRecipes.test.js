import { collectionRecipesTransformer } from './collectionRecipes'

describe('collectionRecipesTransformer', () => {
  test('should return a list of recipe ids for each collection', () => {
    const menuServiceResponse = {
      "status": "ok",
      "meta": {},
      "data": [
        {
          "id": "295",
          "type": "menus",
          "attributes": {
            "name": "default",
            "is_default": true,
            "core_menu_id": "295"
          },
          "relationships": {
            "collections": {
              "data": [
                {
                  "id": "a4f1eb8e-2eda-11e9-81ec-06399ef4685e",
                  "type": "collections",
                  "relationships": {
                    "recipes": {
                      "data": [
                        {
                          "type": "recipes",
                          "id": "3a1f873f-8a62-4ca8-a842-32ca52bee9d5"
                        },
                        {
                          "type": "recipes",
                          "id": "18cf8aef-b5a4-42a7-9db7-55481c9e7c978"
                        },
                      ]
                    }
                  }
                },
                {
                  "id": "e55383da-336d-11e9-b24d-06399ef4685e",
                  "type": "collections",
                  "relationships": {
                    "recipes": {
                      "data": [
                        {
                          "type": "recipes",
                          "id": "db3bbabe-51b5-48ab-b567-b353850f900a"
                        },
                        {
                          "type": "recipes",
                          "id": "0ed30b44-4d37-4a89-a5ee-2d6b2ce38dcd"
                        },
                      ]
                    }
                  }
                }
              ]
            },
          }
        }],
    }

    const expectedResult = {
      'a4f1eb8e-2eda-11e9-81ec-06399ef4685e': [
        '3a1f873f-8a62-4ca8-a842-32ca52bee9d5',
        '18cf8aef-b5a4-42a7-9db7-55481c9e7c978'
      ],
      'e55383da-336d-11e9-b24d-06399ef4685e': [
        'db3bbabe-51b5-48ab-b567-b353850f900a',
        '0ed30b44-4d37-4a89-a5ee-2d6b2ce38dcd'
      ]
    }

    const result = collectionRecipesTransformer(menuServiceResponse)
    expect(result).toEqual(expectedResult)
  })
})
