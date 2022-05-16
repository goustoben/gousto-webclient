import Immutable from 'immutable'
import moment from 'moment'

const cutoffDate = moment()
  .day(7)
  .hour(23)
  .minute(59)
  .second(59)
  .format('YYYY-MM-DD HH:mm:ss ')

export const mockProduct = {
  id: '1234',
  title: 'Borsao Macabeo',
  description:
    'A flavoursome Summer wine made from the indigenous Macabeo grape in northern Spain. A balanced, modern white with flavours of ripe peach, zesty lemon and nutty undertones, it leaves the palate with a clean and fruity finish.',
  listPrice: '6.95',
  isForSale: true,
  ageRestricted: true,
  boxLimit: 2,
  images: {
    400: {
      src: 'https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg',
      url: 'https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg',
      width: 400
    },
  }
}

export const mockProducts = {
  1234: {
    id: '1234',
    title: 'Borsao Macabeo',
    description: 'A flavoursome Summer wine made from the indigenous Macabeo grape in northern Spain. A balanced, modern white with flavours of ripe peach, zesty lemon and nutty undertones, it leaves the palate with a clean and fruity finish.',
    listPrice: '6.95',
    isForSale: true,
    ageRestricted: true,
    boxLimit: 2,
    images: {
      400: {
        src: 'https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg',
        url: 'https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg',
        width: 400
      },
    },
    categories: [
      {
        id: 'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9',
        title: 'Drinks Cabinet',
        box_limit: 7,
        is_default: false,
        recently_added: false,
        hidden: false,
        pivot: {
          created_at: '2017-05-08T13:22:46+01:00'
        }
      }
    ]
  },
  1235: {
    id: '1235',
    title: 'Borsao Macabeo',
    description: 'A flavoursome Summer wine made from the indigenous Macabeo grape in northern Spain. A balanced, modern white with flavours of ripe peach, zesty lemon and nutty undertones, it leaves the palate with a clean and fruity finish.',
    listPrice: '6.95',
    isForSale: true,
    ageRestricted: true,
    boxLimit: 2,
    images: {
      400: {
        src: 'https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg',
        url: 'https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg',
        width: 400
      },
    },
    categories: [
      {
        id: 'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9',
        title: 'Drinks Cabinet',
        box_limit: 7,
        is_default: false,
        recently_added: false,
        hidden: false,
        pivot: {
          created_at: '2017-05-08T13:22:46+01:00'
        }
      }
    ]
  }
}

export const mockProductRecipePairings = Immutable.List([
  {
    recipeId: '2211',
    title: 'Amalfi Risotto With Jumbo King Prawns',
    media: [
      {
        title: null,
        description: null,
        type: 'mood-image',
        urls: [
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/2082.-Amalfi-style-Jumbo-Prawn--Lemon-Risotto-Cookbook-Page-x50.jpg',
            width: '50'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/2082.-Amalfi-style-Jumbo-Prawn--Lemon-Risotto-Cookbook-Page-x200.jpg',
            width: '200'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/2082.-Amalfi-style-Jumbo-Prawn--Lemon-Risotto-Cookbook-Page-x400.jpg',
            width: '400'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/2082.-Amalfi-style-Jumbo-Prawn--Lemon-Risotto-Cookbook-Page-x700.jpg',
            width: '700'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/2082.-Amalfi-style-Jumbo-Prawn--Lemon-Risotto-Cookbook-Page-x1000.jpg',
            width: '1000'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/2082.-Amalfi-style-Jumbo-Prawn--Lemon-Risotto-Cookbook-Page-x1500.jpg',
            width: '1500'
          }
        ]
      }
    ],
    products: [
      Immutable.Map({
        isForSale: true,
        listPrice: '7.99',
        zone: 'Ambient',
        alwaysOnMenu: false,
        boxLimit: 2,
        title: 'Sierra Grande Pinot Noir (750ml bottle)',
        images: {
          400: {
            src:
              'https://staging-media.gousto.info/cms/mood-image/Sierra-Grande-Pinot-Noir-750ml-bottle-x400.jpg',
            url:
              'https://staging-media.gousto.info/cms/mood-image/Sierra-Grande-Pinot-Noir-750ml-bottle-x400.jpg',
            width: 400
          }
        },
        tags: [],
        isVatable: true,
        ageRestricted: true,
        volume: 16000,
        id: '1253bc8e-ad61-11e9-8ce2-06ba16bc62ee',
        createdAt: '2019-07-23T16:46:44+01:00',
        categories: [
          {
            id: 'pairings',
            title: 'Pairings',
            boxLimit: 7,
            isDefault: false,
            recentlyAdded: false,
            hidden: false,
            pivot: { createdAt: '2019-07-23T17:02:32+01:00' }
          },
          {
            id: '785741fc-3854-11e6-87a5-06f9522b85fb',
            title: 'Large Alcohol',
            boxLimit: 2,
            isDefault: false,
            recentlyAdded: false,
            hidden: true,
            pivot: { createdAt: '2019-07-23T17:02:32+01:00' }
          }
        ],
        description:
          'If you usually say no to a heavy Bordeaux, a Pinot Noir might be just the ticket. With subtle smoky notes rounded out with ripe and juicy berries, this red pairs perfectly with oriental duck or a fragrant middle eastern lamb dinner.\nABV: 13%\nOrigin: Chile\nAllergens: Sulphites\nGrape: Pinot Noir\nNot suitable for vegetarians or vegans.',
        sku: 'AP-ACH-WIN-RED-49-P'
      }),
      Immutable.Map({
        isForSale: true,
        listPrice: '2.00',
        zone: 'Chilled',
        alwaysOnMenu: false,
        boxLimit: 2,
        title: 'Hot Chocolate & Salted Caramel Lava Cake (100g)',
        images: {
          400: {
            src:
              'https://staging-media.gousto.info/cms/product-image-landscape/Hot-choc--salted-caramel-lava-cake-potsco-x400.jpg',
            url:
              'https://staging-media.gousto.info/cms/product-image-landscape/Hot-choc--salted-caramel-lava-cake-potsco-x400.jpg',
            width: 400
          }
        },
        tags: [],
        isVatable: true,
        ageRestricted: false,
        volume: 660,
        id: '7d5a30b2-c5c5-11ea-b0cc-060d0542a88e',
        createdAt: '2020-07-14T12:30:59+01:00',
        categories: [
          {
            id: 'pairings',
            title: 'Pairings',
            boxLimit: 4,
            isDefault: false,
            recentlyAdded: false,
            hidden: false,
            pivot: { createdAt: '2020-07-14T12:40:12+01:00' }
          }
        ],
        description:
          'Luxurious chocolate cake with a salted caramel\nsauce. Handmade in London.\n\nIngredients:\nSponge (70%): Sugar, unsalted butter (milk), free-range pasteurised whole egg, 61% cocoa Colombian dark chocolate (11%) [cocoa mass, sugar, cocoa butter, emulsifier: soya lecithin, natural vanilla flavouring], water, plain flour [wheat flour, calcium, iron, niacin, thiamin], self-raising flour [wheat flour, calcium, iron, niacin , thiamin , raising agents: sodium bicarbonate, calcium phosphate], double cream (milk) (6%), vegetable oil [rapeseed], cocoa powder (1%), raising agent: bicarbonate of soda, Cornish sea salt (0.1%).\nSauce (30%): Double cream (52%) (milk), caramel (38%) (sugar, water), unsalted butter (milk), thickener: corn flour, Cornish sea salt (1%).\n\nContains: milk, egg, wheat, soya\nMade in a kitchen that handles nuts.\n\nNutrition typical Values per 100g:\nEnergy 1,742KJ/417Kcal, fat 25.1g of which saturates 13.73g, carbohydrates 44.6g  of which sugars 29.6g, dietary fibre 0g, protein 3.6g, salt 0.5g.\n\nSuitable for Vegetarians\n\nNot suitable for freezing. Consume product within use by date on pack.',
        sku: 'AP-1FCD-DES-17-P'
      })
    ]
  },
  {
    recipeId: '776',
    title: 'Saffron, Crab & Clotted Cream Risotto',
    media: [
      {
        title: null,
        description: null,
        type: 'mood-image',
        urls: [
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/792---Saffron-Crab--Clotted-Cream-Risotto-x50.jpg',
            width: '50'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/792---Saffron-Crab--Clotted-Cream-Risotto-x200.jpg',
            width: '200'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/792---Saffron-Crab--Clotted-Cream-Risotto-x400.jpg',
            width: '400'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/792---Saffron-Crab--Clotted-Cream-Risotto-x700.jpg',
            width: '700'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/792---Saffron-Crab--Clotted-Cream-Risotto-x1000.jpg',
            width: '1000'
          },
          {
            src:
              'https://production-media.gousto.co.uk/cms/mood-image/792---Saffron-Crab--Clotted-Cream-Risotto-x1500.jpg',
            width: '1500'
          }
        ]
      }
    ],
    products: [
      Immutable.Map({
        isForSale: true,
        listPrice: '7.99',
        zone: 'Ambient',
        alwaysOnMenu: false,
        boxLimit: 2,
        title: 'Sierra Grande Pinot Noir (750ml bottle)',
        images: {
          400: {
            src:
              'https://staging-media.gousto.info/cms/mood-image/Sierra-Grande-Pinot-Noir-750ml-bottle-x400.jpg',
            url:
              'https://staging-media.gousto.info/cms/mood-image/Sierra-Grande-Pinot-Noir-750ml-bottle-x400.jpg',
            width: 400
          }
        },
        tags: [],
        isVatable: true,
        ageRestricted: true,
        volume: 16000,
        id: '1253bc8e-ad61-11e9-8ce2-06ba16bc62ee',
        createdAt: '2019-07-23T16:46:44+01:00',
        categories: [
          {
            id: 'pairings',
            title: 'Pairings',
            boxLimit: 7,
            isDefault: false,
            recentlyAdded: false,
            hidden: false,
            pivot: { createdAt: '2019-07-23T17:02:32+01:00' }
          },
          {
            id: '785741fc-3854-11e6-87a5-06f9522b85fb',
            title: 'Large Alcohol',
            boxLimit: 2,
            isDefault: false,
            recentlyAdded: false,
            hidden: true,
            pivot: { createdAt: '2019-07-23T17:02:32+01:00' }
          }
        ],
        description:
          'If you usually say no to a heavy Bordeaux, a Pinot Noir might be just the ticket. With subtle smoky notes rounded out with ripe and juicy berries, this red pairs perfectly with oriental duck or a fragrant middle eastern lamb dinner.\nABV: 13%\nOrigin: Chile\nAllergens: Sulphites\nGrape: Pinot Noir\nNot suitable for vegetarians or vegans.',
        sku: 'AP-ACH-WIN-RED-49-P'
      }),
      Immutable.Map({
        isForSale: true,
        listPrice: '2.00',
        zone: 'Chilled',
        alwaysOnMenu: false,
        boxLimit: 2,
        title: 'Hot Chocolate & Salted Caramel Lava Cake (100g)',
        images: {
          400: {
            src:
              'https://staging-media.gousto.info/cms/product-image-landscape/Hot-choc--salted-caramel-lava-cake-potsco-x400.jpg',
            url:
              'https://staging-media.gousto.info/cms/product-image-landscape/Hot-choc--salted-caramel-lava-cake-potsco-x400.jpg',
            width: 400
          }
        },
        tags: [],
        isVatable: true,
        ageRestricted: false,
        volume: 660,
        id: '7d5a30b2-c5c5-11ea-b0cc-060d0542a88e',
        createdAt: '2020-07-14T12:30:59+01:00',
        categories: [
          {
            id: 'pairings',
            title: 'Pairings',
            boxLimit: 4,
            isDefault: false,
            recentlyAdded: false,
            hidden: false,
            pivot: { createdAt: '2020-07-14T12:40:12+01:00' }
          }
        ],
        description:
          'Luxurious chocolate cake with a salted caramel\nsauce. Handmade in London.\n\nIngredients:\nSponge (70%): Sugar, unsalted butter (milk), free-range pasteurised whole egg, 61% cocoa Colombian dark chocolate (11%) [cocoa mass, sugar, cocoa butter, emulsifier: soya lecithin, natural vanilla flavouring], water, plain flour [wheat flour, calcium, iron, niacin, thiamin], self-raising flour [wheat flour, calcium, iron, niacin , thiamin , raising agents: sodium bicarbonate, calcium phosphate], double cream (milk) (6%), vegetable oil [rapeseed], cocoa powder (1%), raising agent: bicarbonate of soda, Cornish sea salt (0.1%).\nSauce (30%): Double cream (52%) (milk), caramel (38%) (sugar, water), unsalted butter (milk), thickener: corn flour, Cornish sea salt (1%).\n\nContains: milk, egg, wheat, soya\nMade in a kitchen that handles nuts.\n\nNutrition typical Values per 100g:\nEnergy 1,742KJ/417Kcal, fat 25.1g of which saturates 13.73g, carbohydrates 44.6g  of which sugars 29.6g, dietary fibre 0g, protein 3.6g, salt 0.5g.\n\nSuitable for Vegetarians\n\nNot suitable for freezing. Consume product within use by date on pack.',
        sku: 'AP-1FCD-DES-17-P'
      })
    ]
  },
])

export const mockMarketProduct = Immutable.fromJS({
  '012d8f6a-609e-11eb-913f-06a5bb631817': {
    title: 'Tony\'s Chocolonely Milk Chocolate bar (180g)',
    description: 'Belgian Fairtrade milk chocolate.\nTonys are crazy about chocolate and serious about people. Their mission is to make 100% slave free the norm in chocolate.\n\nIngredients:\nSugar, dried whole milk (Milk), cocoa butter, cocoa mass, emulsifier (soya lecithin) (Soya). \n\nAllergens: Milk, Soya\n\nMay contain wheat (gluten), egg, peanut, nuts.\n\nNutrition Typical Values per 100g:\nEnergy 2280kJ/545kcal, fat 33.2g of which saturates 20g, carbohydrate 51.9g, of which sugars 50.7g, protein 7.7g, salt 0.21g',
    sku: 'AP-FCD-CHO-52',
    isForSale: true,
    listPrice: '3.98',
    zone: 'Ambient',
    alwaysOnMenu: false,
    boxLimit: 5,
    stock: 1142,
    media: [
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x50.jpg',
        width: 50
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x200.jpg',
        width: 200
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x400.jpg',
        width: 400
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x700.jpg',
        width: 700
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1000.jpg',
        width: 1000
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1500.jpg',
        width: 1500
      }
    ],
    cutoffDates: [
      cutoffDate
    ],
    tags: [],
    isVatable: false,
    ageRestricted: false,
    volume: 228,
    createdAt: '2021-01-27T12:48:50+00:00',
    categories: [
      {
        id: '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9',
        title: 'Snacks',
        boxLimit: 10,
        isDefault: false,
        recentlyAdded: false,
        hidden: false,
        pivot: {
          createdAt: '2021-02-01T10:23:23+00:00'
        }
      }
    ],
  }
})

export const mockMarketProducts = Immutable.fromJS({
  '012d8f6a-609e-11eb-913f-06a5bb631817': {
    title: 'Tony\'s Chocolonely Milk Chocolate bar (180g)',
    description: 'Belgian Fairtrade milk chocolate.\nTonys are crazy about chocolate and serious about people. Their mission is to make 100% slave free the norm in chocolate.\n\nIngredients:\nSugar, dried whole milk (Milk), cocoa butter, cocoa mass, emulsifier (soya lecithin) (Soya). \n\nAllergens: Milk, Soya\n\nMay contain wheat (gluten), egg, peanut, nuts.\n\nNutrition Typical Values per 100g:\nEnergy 2280kJ/545kcal, fat 33.2g of which saturates 20g, carbohydrate 51.9g, of which sugars 50.7g, protein 7.7g, salt 0.21g',
    sku: 'AP-FCD-CHO-52',
    isForSale: true,
    listPrice: '3.98',
    zone: 'Ambient',
    alwaysOnMenu: false,
    boxLimit: 5,
    stock: 1142,
    media: [
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x50.jpg',
        width: 50
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x200.jpg',
        width: 200
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x400.jpg',
        width: 400
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x700.jpg',
        width: 700
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1000.jpg',
        width: 1000
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1500.jpg',
        width: 1500
      }
    ],
    cutoffDates: [
      cutoffDate
    ],
    tags: [],
    isVatable: false,
    ageRestricted: false,
    volume: 228,
    createdAt: '2021-01-27T12:48:50+00:00',
    categories: [
      {
        id: '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9',
        title: 'Snacks',
        boxLimit: 10,
        isDefault: false,
        recentlyAdded: false,
        hidden: false,
        pivot: {
          createdAt: '2021-02-01T10:23:23+00:00'
        }
      }
    ],
  },
  'd1655396-8034-11ec-822e-02fd1d4b57a3': {
    title: 'Sweet Chilli Crunch Sharing Bag (104g)',
    description: 'High in fibre and packed with veg for an alternative feel good snack.\n\nIngredients: sweet chilli coated pea (33%) (green peas, corn starch, wheat flour, sunflower oil, sugar, sweet chilli seasoning (dextrose, sea salt, cayenne pepper, paprika powder, tomato powder, onion powder, garlic powder, ginger powder, lovage, jalapeno pepper powder), sea salt), sweet chilli broad bean (29%) (broad beans, sunflower oil, sweet chilli seasoning (3%) (salt, maltodextrin, sugar, spices [black pepper, paprika, onion, chilli, garlic], tomato powder, yeast extract, acidity regulator: citric acid, natural colour: paprika extract)), sweet chilli corn (19%) (corn, sunflower oil, sweet chilli seasoning (3%) (salt, maltodextrin, sugar, spices [black pepper, paprika, onion, chilli, garlic], tomato powder, yeast extract, acidity regulator: citric acid, natural colour: paprika extract )), sweet chilli corn hoop (19%) (corn, sunflower oil, sweet chilli seasoning (4%)(glucose syrup, fructose, sugar, spices [onion, paprika, cayenne], dehydrated tomato powder, salt, natural flavouring, lemon juice powder, beet juice powder, antioxidant: tocopherol-rich extract)) \n\nAllergens: Wheat (Gluten)\nMay contain egg, soya, milk, peanuts, nuts, sesame, mustard.\n\nNutrition Typical Values per 100g:\nEnergy 1882 kJ/449 kcal, fat 17g of which saturates 1.9g, carbohydrate 55g, of which sugars 5.4g, fibre 9.9g, protein 15g, salt 0.98g\n\nStore in a cool, dry place. Once opened enjoy within one week.\n\nMay contain hard corn',
    sku: 'AP-FCD-CER-10',
    isForSale: true,
    listPrice: '2.59',
    zone: 'Ambient',
    alwaysOnMenu: false,
    boxLimit: 4,
    stock: 1461,
    media: [
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x50.jpg',
        width: 50
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x200.jpg',
        width: 200
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x400.jpg',
        width: 400
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x700.jpg',
        width: 700
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x1000.jpg',
        width: 1000
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x1500.jpg',
        width: 1500
      }
    ],
    cutoffDates: [
      cutoffDate
    ],
    tags: [],
    isVatable: true,
    ageRestricted: false,
    volume: 1100,
    createdAt: '2022-01-28T12:21:28+00:00',
    categories: [
      {
        id: 'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9',
        title: 'Drinks Cabinet',
        boxLimit: 10,
        isDefault: false,
        recentlyAdded: false,
        hidden: false,
        pivot: {
          createdAt: '2022-01-28T12:40:35+00:00'
        }
      }
    ],
  }
})

export const mockProjectsCategories = Immutable.Map({
  '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9': {
    id: '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9',
    title: 'Snacks',
  },
  'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9': {
    id: 'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9',
    title: 'Drinks Cabinet',
  }
})

export const mockProductsStock = Immutable.Map({
  '268ab050-ffd1-11e9-ab00-02c58c8bcbea': 10,
  'd1655396-8034-11ec-822e-02fd1d4b57a3': 10,
  '012d8f6a-609e-11eb-913f-06a5bb631817': 0,
})

export const mockGetProductRecipePairingsState = () => {
  const recipePairings = [
    {
      recipeId: 2211,
      products: [
        {
          id: '268ab050-ffd1-11e9-ab00-02c58c8bcbea',
          title: 'Gu Sticky Toffee Puddings (2 x 85g)',
          description: 'Where there is balance, there is beauty - and there\'s no better ying and yang than a light, bouncy sponge blended with fine, sticky dates and topped with the most delightful sweet toffee sauce. Heat to eat for mouthfuls of sticky toffee heaven. Ingredients: Whipping cream, water, unsalted butter, dried dates (13%) (dates, rice flour), dark muscovado sugar, dark brown sugar, flour blend (rice, potato, tapioca, maize, buckwheat), wheat flour (wheat flour, calcium carbonate, iron, niacin, thiamin), pasteurised whole egg (egg, preservative (potassium sorbate), acidity regulator (citric acid)), sugar, cornflour, Lyles golden syrup, black treacle (cane molasses, partially inverted sugar syrup), baking powder (raising agents (sodium bicarbonate, disodium diphosphate), wheat flour (wheat flour, calcium carbonate, iron, niacin, thiamin)), thickener (modified starch), Guérande salt, natural vanilla extract, starch, emulsifier (soya lecithin), preservative (potassium sorbate), sodium bicarbonate. Contains: wheat, milk, soya, egg May contain: hazelnuts and almonds. Nutrition typical Values per 100g: Energy 1,364KJ/326Kcal, fat 17.1g of which saturates 11.8g, carbohydrates 40.5g of which sugars 26.9g, dietary fibre 1.4g, protein 2.3g, sodium 1.1g, salt 0.44g. Not suitable for freezing. Consume product within use by date on pack.',
          isForSale: true,
          listPrice: '3.30',
          zone: 'Chilled',
          alwaysOnMenu: false,
          boxLimit: 2,
          images: {
            400: {
              src: 'https://staging-media.gousto.info/cms/product-image-landscape/Gu-Sticky-Toffee-Puddings-2-x-85g-x400.jpg',
              url: 'https://staging-media.gousto.info/cms/product-image-landscape/Gu-Sticky-Toffee-Puddings-2-x-85g-x400.jpg',
              width: 400,
            }
          },
          tags: [],
          isVatable: false,
          ageRestricted: false,
          volume: 680,
          categories: [
            {
              id: 'pairings',
              title: 'Pairings',
              boxLimit: 4,
              isDefault: false,
              recentlyAdded: false,
              hidden: false,
              pivot: { createdAt: '2020-07-14T12:40:12+01:00' }
            }
          ],
          createdAt: '2019-11-05T13:37:11+00:00',
        }
      ]
    }
  ].reduce((acc, recipePairing) => acc.set(`${recipePairing.recipeId}`, Immutable.fromJS(recipePairing)), Immutable.OrderedMap({}))

  return recipePairings
}
