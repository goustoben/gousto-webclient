import { mediaTransformer } from './mediaTransformer'

describe('mediaTransformer', () => {
  test('should return recipe data', () => {
    const menuServiceRecipeMedia = [{
      "type": "mood-image",
      "crops": [
        {
          "width": 50,
          "url": "https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x50.jpg"
        },
        {
          "width": 200,
          "url": "https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x200.jpg"
        },
        {
          "width": 400,
          "url": "https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x400.jpg"
        },
        {
          "width": 700,
          "url": "https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x700.jpg"
        },
        {
          "width": 1000,
          "url": "https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x1000.jpg"
        },
        {
          "width": 1500,
          "url": "https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x1500.jpg"
        }
      ]
    }]

    const expectedFormat = [{
      "title":"Warming Chicken Bhuna, Rice & Naan",
      "type":"mood-image",
      "urls":[
        {
          "src":"https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x50.jpg",
          "width":50
        },
        {
          "src":"https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x200.jpg",
          "width":200
        },
        {
          "src":"https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x400.jpg",
          "width":400
        },
        {
          "src":"https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x700.jpg",
          "width":700
        },
        {
          "src":"https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x1000.jpg",
          "width":1000
        },
        {
          "src":"https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x1500.jpg",
          "width":1500
        }
      ]
    }]

    const result = mediaTransformer(menuServiceRecipeMedia, "Warming Chicken Bhuna, Rice & Naan")
    expect(result).toEqual(expectedFormat)
  })
})
