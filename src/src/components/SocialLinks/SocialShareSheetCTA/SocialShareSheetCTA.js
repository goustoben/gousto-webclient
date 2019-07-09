import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import actionTypes from 'actions/actionTypes'
import Overlay from 'components/Overlay'
import SocialShareSheet from 'components/SocialLinks/SocialShareSheet'

import css from './SocialShareSheetCTA.css'

class SocialShareSheetCTA extends PureComponent {
  state = { isShareSheetOpen: false }

  static propTypes = {
    referralCode: PropTypes.string.isRequired,
    isFixed: PropTypes.bool.isRequired,
    trackingReferFriend: PropTypes.func.isRequired,
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
    const CTAContainerClasses = classnames(
      css.mobileShow,
      { [css.fixedMobileCTAContainer]: isFixed })

    const CTAClasses = classnames(
      {
        [css.fixedMobileCTA]: isFixed,
        [css.mobileCTA]: !isFixed,
      })

    return (
      <div className={CTAContainerClasses}>
        <div className={CTAClasses} onClick={this.openShareSheet}>
          <span className={css.shareYourLinkText}>SHARE YOUR LINK</span>
        </div>
        <Overlay open={isShareSheetOpen} from="bottom">
          <SocialShareSheet onClose={this.closeShareSheet} referralCode={referralCode} />
        </Overlay>
      </div>
    )
  }
}

export { SocialShareSheetCTA }
