/* eslint-disable global-require */

export const hero = {
  header: 'Box Prices',
  image: require('media/images/box-prices/box-prices-hero.png'),
}

export const cta = 'Build My Box'
export const ctaRedesign = 'Get started'

// Note: the existing (pre-TG-4359) page's design is not flexible to support 5
// recipes, so when moving to 5 recipes, this page should be revisited.
export const numPersonsValues = ['2', '4']
export const numPortionsValues = ['2', '3', '4']

export const boxTypes = {
  2: {
    type: '2-Person',
    description: 'Delicious meals for two',
    image: require('media/images/box-prices/couples-box.jpg'),
  },
  4: {
    type: 'Family',
    description: 'Tasty meals for 2 adults and 2-3 children',
    image: require('media/images/box-prices/family-box.jpg'),
  },
}

export const boxTypesRedesign = {
  2: {
    title: 'Regular box',
    ctaText: 'Choose regular box',
    subhead: 'Our regular box is suitable for:',
    suitable: ['2 adults (or 1 + leftovers)', '1 adult and 1-2 children'],
  },
  4: {
    title: 'Large box',
    ctaText: 'Choose large box',
    subhead: 'Our large box is suitable for:',
    suitable: ['4 adults (or 2-3 + leftovers)', '2 adults and 2-3 children'],
  },
}

export const icons = [
  {
    numPortions: 4,
    numPersons: 2,
    image: require('media/images/box-prices/most-popular.png'),
    alt: 'Most Popular',
  },
  {
    numPersons: 4,
    numPortions: 4,
    image: require('media/images/box-prices/best-value.png'),
    alt: 'Best Value',
  },
]

export const content = [
  {
    title: "You're in control",
    text: 'Choose from 60 recipes a week: meat, fish and vegetarian. That’s more than other recipe boxes. Choose the recipes you want, the day of the week you want them delivered, and how many servings',
  },
  {
    title: "Won't be home for delivery?",
    text: 'No problem. Choose a safe place where we can leave your box. Ice and insulation help keep your ingredients cool.',
  },
]

export const quotes = [
  {
    text: 'Exceptionally high quality ingredients, superb meat, great big portions. No waste - one of the best bits - and a significant saving on our weekly food bill. Super excited when the box arrives each week!',
    source: 'Rachel, Leeds',
  },
  {
    text: 'Our boring meals are once again adventurous! Food bill is reduced as I no longer buy veg and meat that I forget to use. On to our third week of orders now - delicious!',
    source: 'Alison, St Albans',
  },
]

export const seo = {
  title: 'Gousto Prices | Try Our Food Box Delivery Now | Gousto',
  meta: [
    {
      name: 'description',
      content:
        'Find prices on our 2 person or family size food boxes. Get free delivery on any day you like & subscribe for convenient fresh food. Order your first box now!',
    },
    {
      name: 'keywords',
      content: 'Gousto, recipe delivery, price, fresh, healthy food, cooking, recipe box',
    },
  ],
}
