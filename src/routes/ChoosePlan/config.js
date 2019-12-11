export const subscription = {
  title: 'Weekly box',
  priceBoxTypeMessage: 'For first box',
  benefits: [
    '50% off first box + 30% off all boxes in the first month',
    'Skip boxes or pause your subscription online at any time',
    'Priority delivery slots',
    'Surprise gifts!'
  ]
}

export const transactional = {
  title: 'One-off box',
  priceBoxTypeMessage: 'For one box',
  get benefits() { return [
    'Single payment, no subscription',
    `${this.percentageOff}% off first box`
  ]},
  percentageOff: 30
}

export const transactionalPromoCode = 'FLEX1'
