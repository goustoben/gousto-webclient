import { connect } from 'react-redux'
import { trackUTMAndPromoCode } from 'actions/tracking'
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
  trackUTMAndPromoCode
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
