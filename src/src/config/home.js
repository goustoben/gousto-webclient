import React from 'react'
import Icon from 'components/Icon'

export const hero = {
  header: 'High Impact Personalised Vitamins',
  subheader: 'Bento Nourished',
}

export const CTA = {
  text: 'Take quiz',
  stickyCTA: 'Get your personalised vitamins',
  join: (
    <span>
      Take quiz{' '}
      <Icon
        name="fa-angle-right"
        size="1.5rem"
        style={{ marginLeft: '8px', verticalAlign: 'text-top' }}
      />
    </span>
  ),
  loggedIn: {
    text: 'Buy Now',
    join: (
      <span>
        See Options{' '}
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

export const getWhyGoustoConfig = (isHomeJpgEnabled) => ({
  steps: [
    {
      title: 'Backed by science',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/science.jpg')
        : require('routes/Home/WhyChooseGousto/science.png'),
      list: [
        'Take our quiz to receive a bespoke recommendation, from our proprietary science backed algorithm',
      ],
    },
    {
      title: 'Freshly made-to-order',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/order.jpg')
        : require('routes/Home/WhyChooseGousto/order.png'),
      list: [
        'Our freshly 3D printed gummy vitamins ensure you receive 99.5% of the nutritional value',
      ],
    },
    {
      title: 'High Absorption and Efficiency',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/absorption.jpg')
        : require('routes/Home/WhyChooseGousto/absorption.png'),
      list: [
        'Nourishing you faster and more efficiently, our stacks get to work as soon as you chew',
      ],
    },
  ],
  title: 'So why Nourished?',
})

export const joeWicks = 'Vitamins. Designed by you, freshly made by us.'
export const carousel = {
  title: 'Meet Our Bestsellers',
  subtitle:
    'Personalise your own vitamin stack or browse through our best sellers, gift boxes and latest additions to the Nourished collection. Each vitamin stack is freshly made-to-order and delivered in sustainable packaging.',
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
