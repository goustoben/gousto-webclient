import { connect } from 'react-redux'
import { trackSubmitOrderEvent } from 'actions/tracking'
import { SubmitButton } from './SubmitButton'

function mapStateToProps(state, ownProps) {
  const browser = state.request.get('browser')

  return {
    nextStepName: ownProps.nextStepName,
    onClick: ownProps.onClick,
    browser,
  }
}

const mapDispatchToProps = {
  trackSubmitOrderEvent
}

export const SubmitButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
