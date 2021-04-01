import { connect } from 'react-redux'
import { getIsTastePreferencesEnabled } from 'selectors/features'
import { Button } from './Button'

const mapStateToProps = (state) => ({
  isLastStep: state.signup.getIn(['wizard', 'isLastStep']),
  isTastePreferencesEnabled: getIsTastePreferencesEnabled(state),
})

export const ButtonContainer = connect(mapStateToProps)(Button)
