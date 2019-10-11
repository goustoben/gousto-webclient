const notificationConfig = ({
  expired: {
    message: 'Your card is expired. Please update now.',
    type: 'danger',
    title: 'Payment Method',
    url: 'my-details',
  },
  toExpire: {
    message: 'Your card is about to expire soon. Please update now.',
    type: 'danger',
    title: 'Payment Method',
    url: 'my-details',
  },
  amendDelivery: {
    message: 'We’ve moved your delivery to the next available delivery day.',
    type: 'info',
    title: 'Delivery changes',
    url: 'my-deliveries',
  },
  selectOrder: {
    message: 'Otherwise our chef will send their best selection.',
    type: 'info',
    title: 'Choose your recipes for your upcoming order before 12pm.',
    url: 'menu',
  },
  referAFriend: {
    message: 'For every friend you refer this month. Invite friends now.',
    type: 'info',
    title: 'Get £20 credit',
    url: 'my-referrals',
    startDate:'2019-10-15',
    endDate:'2019-10-31',
  },
})

export { notificationConfig as config }

