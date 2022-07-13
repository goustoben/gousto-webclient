import Immutable from 'immutable'
import moment from 'moment'

const cutoffDate = moment().day(7).hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss ')

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
      width: 400,
    },
  },
}

export const mockProducts = {
  1234: {
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
        width: 400,
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
          created_at: '2017-05-08T13:22:46+01:00',
        },
      },
    ],
  },
  1235: {
    id: '1235',
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
        width: 400,
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
          created_at: '2017-05-08T13:22:46+01:00',
        },
      },
    ],
  },
}

export const mockMarketProduct = Immutable.fromJS({
  '012d8f6a-609e-11eb-913f-06a5bb631817': {
    title: "Tony's Chocolonely Milk Chocolate bar (180g)",
    description:
      'Belgian Fairtrade milk chocolate.\nTonys are crazy about chocolate and serious about people. Their mission is to make 100% slave free the norm in chocolate.\n\nIngredients:\nSugar, dried whole milk (Milk), cocoa butter, cocoa mass, emulsifier (soya lecithin) (Soya). \n\nAllergens: Milk, Soya\n\nMay contain wheat (gluten), egg, peanut, nuts.\n\nNutrition Typical Values per 100g:\nEnergy 2280kJ/545kcal, fat 33.2g of which saturates 20g, carbohydrate 51.9g, of which sugars 50.7g, protein 7.7g, salt 0.21g',
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
        width: 50,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x200.jpg',
        width: 200,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x400.jpg',
        width: 400,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x700.jpg',
        width: 700,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1000.jpg',
        width: 1000,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1500.jpg',
        width: 1500,
      },
    ],
    cutoffDates: [cutoffDate],
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
          createdAt: '2021-02-01T10:23:23+00:00',
        },
      },
    ],
  },
})

export const mockMarketProducts = Immutable.fromJS({
  '012d8f6a-609e-11eb-913f-06a5bb631817': {
    title: "Tony's Chocolonely Milk Chocolate bar (180g)",
    description:
      'Belgian Fairtrade milk chocolate.\nTonys are crazy about chocolate and serious about people. Their mission is to make 100% slave free the norm in chocolate.\n\nIngredients:\nSugar, dried whole milk (Milk), cocoa butter, cocoa mass, emulsifier (soya lecithin) (Soya). \n\nAllergens: Milk, Soya\n\nMay contain wheat (gluten), egg, peanut, nuts.\n\nNutrition Typical Values per 100g:\nEnergy 2280kJ/545kcal, fat 33.2g of which saturates 20g, carbohydrate 51.9g, of which sugars 50.7g, protein 7.7g, salt 0.21g',
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
        width: 50,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x200.jpg',
        width: 200,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x400.jpg',
        width: 400,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x700.jpg',
        width: 700,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1000.jpg',
        width: 1000,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Tonys-Chocolonely-01-x1500.jpg',
        width: 1500,
      },
    ],
    cutoffDates: [cutoffDate],
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
          createdAt: '2021-02-01T10:23:23+00:00',
        },
      },
    ],
  },
  'd1655396-8034-11ec-822e-02fd1d4b57a3': {
    title: 'Sweet Chilli Crunch Sharing Bag (104g)',
    description:
      'High in fibre and packed with veg for an alternative feel good snack.\n\nIngredients: sweet chilli coated pea (33%) (green peas, corn starch, wheat flour, sunflower oil, sugar, sweet chilli seasoning (dextrose, sea salt, cayenne pepper, paprika powder, tomato powder, onion powder, garlic powder, ginger powder, lovage, jalapeno pepper powder), sea salt), sweet chilli broad bean (29%) (broad beans, sunflower oil, sweet chilli seasoning (3%) (salt, maltodextrin, sugar, spices [black pepper, paprika, onion, chilli, garlic], tomato powder, yeast extract, acidity regulator: citric acid, natural colour: paprika extract)), sweet chilli corn (19%) (corn, sunflower oil, sweet chilli seasoning (3%) (salt, maltodextrin, sugar, spices [black pepper, paprika, onion, chilli, garlic], tomato powder, yeast extract, acidity regulator: citric acid, natural colour: paprika extract )), sweet chilli corn hoop (19%) (corn, sunflower oil, sweet chilli seasoning (4%)(glucose syrup, fructose, sugar, spices [onion, paprika, cayenne], dehydrated tomato powder, salt, natural flavouring, lemon juice powder, beet juice powder, antioxidant: tocopherol-rich extract)) \n\nAllergens: Wheat (Gluten)\nMay contain egg, soya, milk, peanuts, nuts, sesame, mustard.\n\nNutrition Typical Values per 100g:\nEnergy 1882 kJ/449 kcal, fat 17g of which saturates 1.9g, carbohydrate 55g, of which sugars 5.4g, fibre 9.9g, protein 15g, salt 0.98g\n\nStore in a cool, dry place. Once opened enjoy within one week.\n\nMay contain hard corn',
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
        width: 50,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x200.jpg',
        width: 200,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x400.jpg',
        width: 400,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x700.jpg',
        width: 700,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x1000.jpg',
        width: 1000,
      },
      {
        src: 'https://staging-media.gousto.info/cms/product-image-landscape/Graze---sweet-chilli-7287-x1500.jpg',
        width: 1500,
      },
    ],
    cutoffDates: [cutoffDate],
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
          createdAt: '2022-01-28T12:40:35+00:00',
        },
      },
    ],
  },
})

export const mockProductCategories = Immutable.Map({
  '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9': {
    id: '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9',
    title: 'Snacks',
  },
  'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9': {
    id: 'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9',
    title: 'Drinks Cabinet',
  },
})

export const mockProductsStock = Immutable.Map({
  '268ab050-ffd1-11e9-ab00-02c58c8bcbea': 10,
  'd1655396-8034-11ec-822e-02fd1d4b57a3': 10,
  '012d8f6a-609e-11eb-913f-06a5bb631817': 0,
})
