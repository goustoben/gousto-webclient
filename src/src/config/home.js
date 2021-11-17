import React from 'react'
import Icon from 'components/Icon'
import { boxTypes } from './basket'

export const hero = {
  header: 'Perfect Nights Start With Gin',
  subheader: 'Craft Gin Club',
}

export const CTA = {
  text: 'Join Now',
  stickyCTA: 'Get your monthly gin box',
  join: (
    <span>
      Join Now{' '}
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
      title: 'Discover the Best Gins',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/rewards.jpg')
        : require('routes/Home/WhyChooseGousto/rewards.png'),
      list: [
        'Every year our experts taste over 500 gins (seriously). We handpick the best 12 and send one of them every month to you!',
      ],
    },
    {
      title: 'Unbox Surprises',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/xmas-box.jpg')
        : require('routes/Home/WhyChooseGousto/xmas-box.png'),
      list: [
        'Every box is a surprise until it lands on your doorstep! You can choose how often you want your ginny delivery - every 1, 2 or 3 months.',
      ],
    },
    {
      title: 'Perfect Nights In',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/aug-box.jpg')
        : require('routes/Home/WhyChooseGousto/aug-box.png'),
      list: [
        'Spend the night in ginny delight with perfectly paired G&Ts, delicious cocktails and scrumptious treats.',
      ],
    },
  ],
  title: 'So why Craft?',
})

export const joeWicks = "Gin. It's our thing!"
export const carousel = {
  title: 'Browse our Past Boxes',
  subtitle:
  "Every month, we send our club members a full-sized bottle of amazing craft gin from one of the world's finest distillers, in a treat-filled Gin of the Month box."
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
