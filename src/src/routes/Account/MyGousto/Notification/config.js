const NOTIFICATION = ({
  expired: {
    message: 'Your card is expired. Please update now.',
    type: 'warning',
    title: 'Payment Method',
    url: 'my-details',
  },
  toExpire: {
    message: 'Your card is about to expire soon. Please update now.',
    type: 'warning',
    title: 'Payment Method',
    url: 'my-details',
  },
  amendDeliverys: {
    message: 'Due to the Bank Holiday, we’ve moved your delivery to the next available delivery day.',
    type: 'confirm',
    title: 'Delivery changes',
    url: 'my-deliveries',
  },
  order: {
    message: 'Otherwise our chef will send their best selection.',
    type: 'notify',
    title: 'Choose your recipes for your upcoming order before 12pm.',
    url: 'menu',
  },
  referAFriend: {
    message: 'for every friend you refer this week. Invite friends now.',
    type: 'raf',
    title: 'Get £30 credit',
    url: 'my-referrals',
  },
})

export { NOTIFICATION as config }

