import React from 'react'
import Icon from 'components/Icon'
import varietyImg from 'routes/Home/WhyChooseGousto/variety.jpg'
import qualityImg from 'routes/Home/WhyChooseGousto/quality.jpg'
import simplicityImg from 'routes/Home/WhyChooseGousto/simplicity.jpg'

export const hero = {
  header: 'Endless choice in a recipe box',
  subheader: 'Over 60 recipes every week',
}

export const CTA = {
  text: 'Get started',
  stickyCTA: 'Get started with 50% off',
  join: (
    <span>
      Get started{' '}
      <Icon
        name="fa-angle-right"
        size="1.5rem"
        style={{ marginLeft: '8px', verticalAlign: 'text-top' }}
      />
    </span>
  ),
  loggedIn: {
    text: 'See Menu',
    join: (
      <span>
        See Menu{' '}
        <Icon
          name="fa-angle-right"
          size="1.5rem"
          style={{ marginLeft: '8px', verticalAlign: 'text-top' }}
        />
      </span>
    ),
  },
}

export const promo = {
  defaultPromoCode: 'DTI-SB-5030',
  defaultBannerText: 'Get 50% off your first box and 30% off your first month',
}

export const emailForm = {
  emailRequired: 'Please provide a valid email address.',
  serverError: 'There is a technical issue, please try again later.',
  success: 'Hooray! We’ll let you know as soon as you can place your order.',
}

export const knownVariants = ['default', 'tv']

export const defaultVariant = 'default'

export const getWhyGoustoConfig = () => ({
  steps: [
    {
      title: 'Variety',
      img: varietyImg,
      list: [
        '60+ recipes a week, cooked from 10 mins',
        'Family classics, global cuisines plus Joe Wicks’s health range',
        'Tasty plant based and gluten free options too',
      ],
    },
    {
      title: 'Quality',
      img: qualityImg,
      list: [
        'Fresh ingredients from trusted suppliers',
        '100% British fresh meat',
        'All recipes tried, tested and loved by our chefs and customers',
      ],
    },
    {
      title: 'Simplicity',
      img: simplicityImg,
      list: [
        'Easy-to-follow recipe cards',
        'Precise ingredients with zero food waste',
        'Free, contactless delivery, any day you like',
      ],
    },
  ],
  title: 'So why Gousto?',
})

export const joeWicks =
  "“I love coming home to a Gousto box with four different banging recipes each week. With so many dishes to choose from there's always something new to try!”"
export const carousel = {
  title: 'Who says Tuesday can’t taste like Saturday?',
  subtitle:
    'Tuck into our 60 dish menu, filled with global cuisines, family favourites and Joe Wicks approved healthy options. Meals for every appetite – sorted.',
}
export const seo = {
  title: 'Recipe Boxes | Get Fresh Food & Recipes Delivered | Gousto',
  meta: [
    {
      name: 'description',
      content:
        'Change the way you eat with our easy to follow recipes. We deliver fresh boxes of ingredients and delicious recipes 7 days a week. Get started now!',
    },
    {
      name: 'keywords',
      content: 'Gousto, recipe delivery, ingredients, fresh, healthy food, cooking, recipe box',
    },
  ],
}

export const homeConfig = {
  hero,
  CTA,
  promo,
  emailForm,
  knownVariants,
  defaultVariant,
  joeWicks,
  carousel,
  seo,
}
