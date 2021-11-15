import moment from "moment"
import { actionTypes } from "actions/actionTypes"

export const trackUserAttributes = () => (
    (dispatch, getState) => {
        const signupDate = getState().user.getIn(['subscription', 'createdAt'], '')
        const isSignupInLast30Days = moment().isSameOrBefore(moment(signupDate).add(30, 'days'))

        if (signupDate) {
            dispatch({
                type: actionTypes.TRACKING,
                optimizelyData: {
                    type: 'user',
                    eventName: 'user_subscription_start',
                    attributes: {
                        isSignupInLast30Days,
                    }
                }
            })
        }
    }
)
