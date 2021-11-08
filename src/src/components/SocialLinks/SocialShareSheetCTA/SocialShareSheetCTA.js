import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import { actionTypes } from 'actions/actionTypes'
import Overlay from 'components/Overlay'
import { SocialShareSheetContainer } from 'components/SocialLinks/SocialShareSheet'

import css from './SocialShareSheetCTA.css'

const propTypes = {
  referralCode: PropTypes.string.isRequired,
  isFixed: PropTypes.bool.isRequired,
  trackingReferFriend: PropTypes.func.isRequired,
}

class SocialShareSheetCTA extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isShareSheetOpen: false }
  }

  openShareSheet = () => {
    const { trackingReferFriend } = this.props
    trackingReferFriend(actionTypes.REFER_FRIEND_SHARE_SHEET_OPENED, 'ReferFriendShareSheet Opened')
    this.setState({ isShareSheetOpen: true })
  }

  closeShareSheet = () => {
    const { trackingReferFriend } = this.props
    trackingReferFriend(actionTypes.REFER_FRIEND_SHARE_SHEET_CLOSED, 'ReferFriendShareSheet Closed')
    this.setState({ isShareSheetOpen: false })
  }

  render() {
    const { isShareSheetOpen } = this.state
    const { referralCode, isFixed } = this.props
    const ctaContainerClasses = classnames(css.mobileShow, {
      [css.fixedMobileCTAContainer]: isFixed,
    })

    return (
      <div className={ctaContainerClasses}>
        <CTA isFullWidth variant="secondary" onClick={this.openShareSheet}>
          Share your link
        </CTA>
        <Overlay open={isShareSheetOpen} from="bottom">
          <SocialShareSheetContainer onClose={this.closeShareSheet} referralCode={referralCode} />
        </Overlay>
      </div>
    )
  }
}

SocialShareSheetCTA.propTypes = propTypes

export { SocialShareSheetCTA }
