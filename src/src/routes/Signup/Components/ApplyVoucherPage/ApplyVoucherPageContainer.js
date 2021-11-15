import { connect } from 'react-redux'
import { ApplyVoucherPage } from './ApplyVoucherPage'
import { getCurrentPromoCodeCustomText2 } from '../../signupSelectors'
import { signupApplyVoucherGoToDeliveries } from '../../signupActions'
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

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
