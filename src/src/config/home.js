import React from 'react'
import Icon from 'components/Icon'
import { ACTIVE_PROMO_CODE, DEFAULT_PROMO_CODE } from './promoCode'

import VarietyImg from 'routes/Home/WhyChooseGousto/variety.png'
import VarietyImgBrand from 'routes/Home/WhyChooseGousto/variety-brand.png'
import QualityImg from 'routes/Home/WhyChooseGousto/quality.png'
import SimplicityImg from 'routes/Home/WhyChooseGousto/simplicity.png'

module.exports = {
  hero: {
    header: 'Endless choice in a recipe box',
    subheader: 'Over 50 recipes every week',
  },
  subscription: {
    header: 'How does Gousto work?',
    description: '',
    graphicType: 'svg',
    steps: [{
      path: 'icon-choose-redesign',
      title: '',
      description: 'Discover 50+ tasty recipes each week including new cuisines, family favourites, and ten minute meals.',
    }, {
      path: 'icon-delivery-redesign',
      title: '',
      description: 'Stand by for perfectly measured ingredients delivered to your door, any day you like.',
    }, {
      path: 'icon-cook-redesign',
      title: '',
      description: 'Cook up impressive meals from just £2.98 per serving, with all of the flavour and none of the fuss.',
    }],
  },
  CTA: {
    text: 'Get started',
    stickyCTA: 'Get started with 30% off',
    join: <span>Get started <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
    loggedIn: {
      text: 'See Menu',
      join: <span>See Menu <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
    },
  },
  promo: {
    // loggedIn|loggedOut|any
    applyIf: 'loggedOut',
    code: DEFAULT_PROMO_CODE,
    mayCode: ACTIVE_PROMO_CODE,
    banner: {
      text: 'Click here to get 50% off your first box and 30% off all other boxes in your first month',
      mayText: 'Get 30% off all boxes for 1 month',
    },
  },
  emailForm: {
    emailRequired: 'Please provide a valid email address.',
    serverError: 'There is a technical issue, please try again later.',
    success: 'Hooray! We’ll let you know as soon as you can place your order.',
  },
  knownVariants: [
    'default',
    'tv',
  ],
  defaultVariant: 'default',
  trustPilotReviews: '13,700',
  whyGousto: {
    steps: (isRedesignEnabled) => ([
      {
        title: 'Variety',
        img: isRedesignEnabled ? VarietyImgBrand : VarietyImg,
        list: [
          '50+ recipes a week, cooked from 10 mins',
          'Family classics, global cuisines plus Joe Wicks’s health range',
          'Tasty plant based and gluten free options too',
        ]
      },
      {
        title: 'Quality',
        img: QualityImg,
        list: [
          'Fresh ingredients from trusted suppliers',
          '100% British meat',
          'All recipes tried, tested and loved by our chefs and customers',
        ]
      },
      {
        title: 'Simplicity',
        img: SimplicityImg,
        list: [
          'Easy-to-follow recipe cards',
          'Precise ingredients with zero food waste',
          'Free, contactless delivery, any day you like',
        ]
      }
    ]),
    title: 'So why Gousto?',
  },
  joeWicks: '“I love coming home to a Gousto box with four different banging recipes each week. With so many dishes to choose from there\'s always something new to try!”',
  carousel: {
    title: 'Who says Tuesday can’t taste like Saturday?',
    subtitle: 'Tuck into our 50 dish menu, filled with global cuisines, family favourites and Joe Wicks approved healthy options. Meals for every appetite – sorted.',
  },
  seo: {
    title: 'Recipe Boxes | Get Fresh Food & Recipes Delivered | Gousto',
    meta: [
      {
        name: 'description',
        content: 'Change the way you eat with our easy to follow recipes. We deliver fresh boxes of ingredients and delicious recipes 7 days a week. Get started now!',
      },
      {
        name: 'keywords',
        content: 'Gousto, recipe delivery, ingredients, fresh, healthy food, cooking, recipe box',
      },
    ]
  },
}
