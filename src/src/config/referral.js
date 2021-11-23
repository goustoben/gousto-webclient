import Immutable from 'immutable'

export default Immutable.fromJS({
  title: 'Invite your friends to try out Craft!',
  creditFormatted: '£15',
  firstBoxDiscountFormatted: '60%',
  firstMonthDiscountFormatted: '30%',
  details: [
    'Invite your friends to try Craft. We’ll pop £15 in your account and your friends will get 50% off their first box',
    'You can refer up to 20 friends every month. That’s £300 worth of Craft credit to use on items and goodies from the Online Shop',
    'Your credit shows up once your friend’s first box is delivered. See full T&Cs [tc]here.[/tc]',
  ],
})

export const rafTermsLink = 'https://cook.craft.co.uk/raf-tcs/'
