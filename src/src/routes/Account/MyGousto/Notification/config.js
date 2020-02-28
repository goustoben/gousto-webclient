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
    message: 'for every friend you refer this weekend. Invite friends now.',
    type: 'info',
    title: 'Get £30 credit',
    url: 'my-referrals',
    linkTrackingType: 'refer_friend',
    startDate: '2019-11-22',
    endDate: '2019-11-24',
  },
  sustainabilityPledge: {
    message: 'And this is just the beginning. Find out more.',
    type: 'info',
    title: 'We’ve solved our 50% pledge.',
    url: 'https://www.gousto.co.uk/unwrapped',
    linkTrackingType: 'sustainability_pledge',
    startDate: '2020-01-10',
    endDate: '2020-02-29',
  },
})

export { notificationConfig as config }

