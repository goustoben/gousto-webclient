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
      'a4f1eb8e-2eda-11e9-81ec-06399ef4685e': [{
        "id": "3a1f873f-8a62-4ca8-a842-32ca52bee9d5",
        "type": "recipes",
      }, {
        "id": "18cf8aef-b5a4-42a7-9db7-55481c9e7c978",
        "type": "recipes",
      }],
      'e55383da-336d-11e9-b24d-06399ef4685e': [{
        "id": "db3bbabe-51b5-48ab-b567-b353850f900a",
        "type": "recipes",
      }, {
        "id": "0ed30b44-4d37-4a89-a5ee-2d6b2ce38dcd",
        "type": "recipes",
      }],
    }

    const result = collectionRecipesTransformer(menuServiceResponse.data[0])
    expect(result).toEqual(expectedResult)
  })

  test('should return a list of recipe ids for each collection in a specific menu', () => {
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
        },

        {
          "id": "296",
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
                  "id": "a8c05b28-35a9-4608-b362-af57059057d3",
                  "type": "collections",
                  "relationships": {
                    "recipes": {
                      "data": [
                        {
                          "type": "recipes",
                          "id": "1bdebc21-d962-4837-b116-057179c07a4e"
                        },
                        {
                          "type": "recipes",
                          "id": "3de16e26-978d-439a-8fe3-ff5f129b1083"
                        },
                      ]
                    }
                  }
                }
              ]
            },
          }
        }
      ],
    }

    const expectedResult = {
      'a8c05b28-35a9-4608-b362-af57059057d3': [{
        "id": "1bdebc21-d962-4837-b116-057179c07a4e",
        "type": "recipes",
      }, {
        "id": "3de16e26-978d-439a-8fe3-ff5f129b1083",
        "type": "recipes",
      }],
    }

    const result = collectionRecipesTransformer(menuServiceResponse.data[1])
    expect(result).toEqual(expectedResult)
  })
})
