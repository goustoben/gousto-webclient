import { createSelector } from 'reselect'
import Immutable from 'immutable'

const getUserFirstName = ({ user }) => user.get('nameFirst')

const getUserSubscription = ({ user }) => user.get('subscription')

export const getUserDetails = createSelector(
  [getUserFirstName, getUserSubscription],
  (userFirstName, userSubscription = Immutable.fromJS({})) => ({
    userFirstName,
    status: userSubscription.get('state'),
  })
)
