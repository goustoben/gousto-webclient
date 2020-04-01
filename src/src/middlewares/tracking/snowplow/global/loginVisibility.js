import * as trackingKeys from 'actions/trackingKeys'

export const loginVisibility = (action, state) => ({
  type: trackingKeys.changeLoginVisibility,
  data: {
    visible: state.loginVisibility.get('login'),
  },
})
