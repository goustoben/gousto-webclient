import { connect } from 'react-redux'

import { trackUTMAndPromoCode } from 'actions/tracking'

import { signupApplyVoucherGoToDeliveries } from '../../signupActions'
import { getCurrentPromoCodeCustomText2 } from '../../signupSelectors'
import { ApplyVoucherPage } from './ApplyVoucherPage'

const mapStateToProps = (state) => ({
  applyVoucherCustomText: getCurrentPromoCodeCustomText2(state),
})

const mapDispatchToProps = {
  signupApplyVoucherGoToDeliveries,
  trackUTMAndPromoCode,
}

export const ApplyVoucherPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyVoucherPage)
