import { connect } from 'react-redux'
import { trackSubmitOrderEvent } from 'actions/tracking'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { isSubmitting } from 'routes/Checkout/utils/state'
import { SubmitButton } from './SubmitButton'

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
