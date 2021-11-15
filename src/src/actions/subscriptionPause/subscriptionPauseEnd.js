import { subscriptionPauseVisibilityChange } from "actions/subscriptionPause/subscriptionPauseVisibilityChange"
import { subscriptionPauseReasonsRefreshRequired } from "actions/subscriptionPause/subscriptionPauseReasonsRefreshRequired"
import { subscriptionPauseTrackRecover } from "actions/subscriptionPause/subscriptionPauseTrackRecover"

export function subscriptionPauseEnd() {
  return (dispatch, getState) => {
    dispatch(subscriptionPauseVisibilityChange(false))
    dispatch(subscriptionPauseReasonsRefreshRequired(true))
    const subscriptionStatus = getState().user.getIn(['subscription', 'state'])
    if (subscriptionStatus === 'active') {
      let categorySlug
      let reasonSlug
      const state = getState().subscriptionPause
      const chosenReasonIds = state.get('chosenReasonIds')
      if (chosenReasonIds.size > 0) {
        const categoryId = chosenReasonIds.get(0)
        categorySlug = state.get('reasons').filter(reason => reason.get('id') === categoryId)
        categorySlug = categorySlug && categorySlug.size > 0 ? categorySlug.first().get('slug') : undefined
      }
      if (chosenReasonIds.size > 1) {
        const reasonId = chosenReasonIds.last()
        reasonSlug = state.get('activeReasons').getIn([reasonId, 'slug'])
      }

      dispatch(subscriptionPauseTrackRecover())
    }
  }
}
