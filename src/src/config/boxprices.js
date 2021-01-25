/* eslint-disable global-require */

module.exports = {
  hero: {
    header: 'Box Prices',
    image: require('media/images/box-prices/box-prices-hero.png'),
  },
  pricePerServing: '2.87',
  cta: 'Build My Box',
  ctaRedesign: 'Get started',
  boxTypes: {
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
  },
  boxTypesRedesign: {
    2: {
      description: 'This smaller box is packed with enough pre-measured ingredients for each recipe to feed 2 people.',
      image: require('media/images/box-prices/two-person-box.jpg'),
    },
    4: {
      description: 'This larger box is packed with enough pre-measured ingredients for each recipe to feed 4 people.',
      image: require('media/images/box-prices/four-person-box.jpg'),
    },
  },
  icons: [
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
  ],
  content: [
    {
      title: 'You\'re in control',
      text: 'Choose from 50 recipes a week: meat, fish and vegetarian. That’s more than other recipe boxes. Choose the recipes you want, the day of the week you want them delivered, and how many servings',
    },
    {
      title: 'Won\'t be home for delivery?',
      text: 'No problem. Choose a safe place where we can leave your box. Ice and insulation help keep your ingredients cool.',
    },
  ],
  quotes: [
    {
      text: 'Exceptionally high quality ingredients, superb meat, great big portions. No waste - one of the best bits - and a significant saving on our weekly food bill. Super excited when the box arrives each week!',
      source: 'Rachel, Leeds',
    },
    {
      text: 'Our boring meals are once again adventurous! Food bill is reduced as I no longer buy veg and meat that I forget to use. On to our third week of orders now - delicious!',
      source: 'Alison, St Albans',
    },
  ],
}
