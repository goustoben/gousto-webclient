import Immutable from 'immutable'

export default Immutable.fromJS({
  title: 'Invite your friends to try out Gousto!',
  creditFormatted: '£15',
  firstBoxDiscountFormatted: '60%',
  firstMonthDiscountFormatted: '30%',
  details: [
    "Invite your friends to try Gousto. We’ll pop £15 in your account and your friends will get 50% off their first box",
    "You can refer up to 20 friends every month. That’s £300 worth of Gousto credit to use on recipes and goodies from the Gousto Market",
    "Your credit shows up once your friend’s first box is delivered. See full T&Cs [tc]here.[/tc]"
  ]
})

export const rafTermsLink = 'https://cook.gousto.co.uk/raf-tcs/'
