import { ingredientTransformer } from './ingredientTransformer'

describe('dateTransformer', () => {
  test('should return recipe data', () => {
    const menuServiceIngredient = {
      "id": "488d5751-dcff-4985-88c0-bf745ff54904",
      "type": "ingredient",
      "attributes": {
        "net_weight_mg": 40000,
        "sub_ingredients": "Cornish cow's milk (100%)",
        "images": [
          {
            "description": null,
            "type": "ingredient-image",
            "title": "Cornish clotted cream",
            "crops": [
              {
                "width": 50,
                "url": "https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x50.jpg"
              },
              {
                "width": 200,
                "url": "https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x200.jpg"
              },
              {
                "width": 700,
                "url": "https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x700.jpg"
              },
              {
                "width": 1000,
                "url": "https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x1000.jpg"
              },
              {
                "width": 1500,
                "url": "https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x1500.jpg"
              }
            ]
          }
        ],
        "label": "Clotted cream (v) (40g)",
        "allergens": [
          {
            "name": "milk",
            "contain_type": "contains",
            "slug": "milk"
          }
        ],
        "dietary_claims": [
          {
            "name": "Gluten free",
            "slug": "gluten-free"
          },
          {
            "name": "Vegetarian",
            "slug": "vegetarian"
          }
        ],
        "name": "40g Cornish clotted cream"
      },
      "label": "80g Cornish clotted cream"
    }

    const expectedFormat = {
      "allergens":[
        "milk"
      ],
      "id":"488d5751-dcff-4985-88c0-bf745ff54904",
      "label":"80g Cornish clotted cream",
      "name":"40g Cornish clotted cream",
      "media":{
        "images":[
          {
            "title":"Cornish clotted cream",
            "description":"Cornish clotted cream",
            "type":"ingredient-image",
            "urls":[
              {
                "src":"https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x50.jpg",
                "width":50
              },
              {
                "src":"https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x200.jpg",
                "width":200
              },
              {
                "src":"https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x700.jpg",
                "width":700
              },
              {
                "src":"https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x1000.jpg",
                "width":1000
              },
              {
                "src":"https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/clotted-cream-2-x1500.jpg",
                "width":1500
              }
            ]
          }
        ]
      },
      "subIngredients":"Cornish cow's milk (100%)",
    }

    const result = ingredientTransformer(menuServiceIngredient)
    expect(result).toEqual(expectedFormat)
  })
})
