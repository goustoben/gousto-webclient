module.exports = {
  flipDay: 3,
  flipTime: '12:00:00',
  length: 14,
  stockTagTreshold: 30,
  stockThreshold: 3,
  legal: 'In addition to the recipe specific allergen information provided, due to production and packing methods Gousto boxes may also contain low levels of the following allergens: Fish; Eggs; Soya; Sesame; Sulphur Dioxide and Sulphites; Mustard; Nuts and Peanuts.',
  helmet: {
    title: "This Week's Menu | Choose From Up To 40 Recipes | Gousto",
    meta: [
      {
        name: 'description',
        content: "Explore this week's new Gousto menu. Receive delicious recipes and pre-portioned, fresh ingredients to your door. Choose from up to 40 recipes now!",
      },
      {
        name: 'keywords',
        content: 'Gousto, recipe delivery, organic ingredients, fresh, healthy food, cooking, recipe box',
      },
    ],
    style: [
      {
        cssText: `
          body .zopim {
            bottom: 75px !important;
            -webkit-transition: -webkit-filter 0.3s;
            -webkit-filter: blur(0px);
            @media (max-width: 767px) {
              display: none !important;
            }
          }
        `,
      },
    ],
  },
  notification: [
    {
      isAfter: '2018-03-12',
      isBefore: '2018-04-04',
      title: 'Delivery changes over Easter bank holiday',
      line1: 'Our delivery schedule is changing a bit over Easter weekend. If you\'re expecting a box on:',
      line2: ['Friday 30 March, your delivery will move to Thursday 29 March.', 'Sunday 1 April, your delivery will move to Saturday 31 March.', 'Monday 2 April, your delivery will move to Tuesday 3 April'],
      notifyGuests: false,
    },
  ],
  collections: [
    { id: 'quick-easy', label: 'Quick & Easy' },
    { id: 'family-friendly', label: 'Family Friendly' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'lighter', label: 'Lighter' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'gluten-free', label: 'Gluten Free' },
  ],
  defaultMenu: {
    switchoverDate: '2020-02-25T12:00:00+01:00',
  }
}
