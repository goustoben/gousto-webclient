import { connect } from 'react-redux'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { ApplyVoucherPage } from './ApplyVoucherPage'
import { getCurrentPromoCodeCustomText2 } from '../../signupSelectors'
import { signupApplyVoucherGoToDeliveries } from '../../signupActions'

const mapStateToProps = (state) => ({
  applyVoucherCustomText: getCurrentPromoCodeCustomText2(state),
})

const mapDispatchToProps = {
  signupApplyVoucherGoToDeliveries,
  trackUTMAndPromoCode,
}

export const ApplyVoucherPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyVoucherPage)
