import { connect } from 'react-redux'
import actions from 'actions/subscriptionPause'
import getPauseScreen from 'utils/getPauseScreen'
import Screen from './Screen'

const mapStateToProps = state => {
  const screenData = state.subscriptionPause.get('staticScreenId') || state.subscriptionPause.get('activeReasons').size > 0 ? getPauseScreen(state.subscriptionPause).toJS() : undefined
  const type = screenData ? screenData.type : undefined
  const chosenReasonIdSize = state.subscriptionPause.get('startScreen').size > 0 ? 1 : 0
  const onSubReasons = type === 'reasonList' && state.subscriptionPause.get('chosenReasonIds').size > chosenReasonIdSize

  return ({
    enableBack: onSubReasons || (screenData && screenData.allowBack),
    pending: state.pending.some((isPending, key) => isPending && key.includes('SUBSCRIPTION_PAUSE')),
    screenData,
    type,
  })
}

const ScreenContainer = connect(mapStateToProps, {
  closeModal: actions.subscriptionPauseEnd,
  onGoBack: actions.subscriptionPauseGoBack,
})(Screen)

export default ScreenContainer
