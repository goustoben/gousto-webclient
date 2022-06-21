import { actionTypes } from 'actions/actionTypes'

export const trackClickSubheadingBanner = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'click_subheading_banner',
  },
})
