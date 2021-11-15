import React from 'react'
import Icon from 'components/Icon'

export const hero = {
  header: 'Perfect Nights Start With Gin',
  subheader: 'Craft Gin Club',
}

export const CTA = {
  text: 'Join Now',
  stickyCTA: 'Get your monthly gin box',
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
      title: 'Discover the Best Gins',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/science.jpg')
        : require('routes/Home/WhyChooseGousto/science.png'),
      list: [
        'Every year our experts taste over 500 gins (seriously). We handpick the best 12 and send one of them every month to you!',
      ],
    },
    {
      title: 'Unbox Amazing Surprises',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/order.jpg')
        : require('routes/Home/WhyChooseGousto/order.png'),
      list: [
        'Every box is a surprise until it lands on your doorstep! Our members say ‘It’s like Christmas every month’. You can choose how often you want your ginny delivery - every 1, 2 or 3 months.',
      ],
    },
    {
      title: 'Enjoy Perfect Nights In',
      img: isHomeJpgEnabled
        ? require('routes/Home/WhyChooseGousto/absorption.jpg')
        : require('routes/Home/WhyChooseGousto/absorption.png'),
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
    'Personalise your own vitamin stack or browse through our best sellers, gift boxes and latest additions to the Craft collection. Each vitamin stack is freshly made-to-order and delivered in sustainable packaging.',
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
