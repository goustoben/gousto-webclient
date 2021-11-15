import { connect } from 'react-redux'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { isSubmitting } from 'routes/Checkout/utils/state'
import { SubmitButton } from './SubmitButton'
import { trackSubmitOrderEvent } from "actions/tracking/trackSubmitOrderEvent"

function mapStateToProps(state, ownProps) {
  const browser = state.request.get('browser')

  return {
    nextStepName: ownProps.nextStepName,
    onClick: ownProps.onClick,
    submitting: isSubmitting(state),
    browser,
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  }
}

const mapDispatchToProps = {
  trackSubmitOrderEvent,
}

export const SubmitButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
