import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import { actionTypes } from 'actions/actionTypes'
import Overlay from 'components/Overlay'
import SocialShareSheet from 'components/SocialLinks/SocialShareSheet'

import css from './SocialShareSheetCTA.css'

const propTypes = {
  referralCode: PropTypes.string.isRequired,
  isFixed: PropTypes.bool.isRequired,
  trackingReferFriend: PropTypes.func.isRequired,
  isWelcomePageOnboardingEnabled: PropTypes.bool,
}

const defaultProps = {
  isWelcomePageOnboardingEnabled: false,
}

class SocialShareSheetCTA extends PureComponent {
  state = { isShareSheetOpen: false }

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
    const { referralCode, isFixed, isWelcomePageOnboardingEnabled } = this.props
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
        {
          isWelcomePageOnboardingEnabled
            ? (
              <CTA isFullWidth variant="secondary" onClick={this.openShareSheet}>
                Share your link
              </CTA>
            )
            : (
              <div className={CTAClasses} onClick={this.openShareSheet}>
                <span className={css.shareYourLinkText}>Share your link</span>
              </div>
            )
        }
        <Overlay open={isShareSheetOpen} from="bottom">
          <SocialShareSheet onClose={this.closeShareSheet} referralCode={referralCode} />
        </Overlay>
      </div>
    )
  }
}

SocialShareSheetCTA.propTypes = propTypes
SocialShareSheetCTA.defaultProps = defaultProps

export { SocialShareSheetCTA }
