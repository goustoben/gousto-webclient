import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { actionTypes } from 'actions/actionTypes'
import Overlay from 'components/Overlay'
import { ReferAFriendModal } from 'components/ReferAFriendModal'
import { getFacebookReferralLink, getMessengerReferralLink, SOCIAL_TYPES } from '../socialReferralHelper'
import { SocialButton } from '../SocialButton'

import css from './SocialShareButtons.css'

const propTypes = {
  referralCode: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  device: PropTypes.string.isRequired,
  offerCredit: PropTypes.string.isRequired,
  elementType: PropTypes.string,
  trackingReferFriendSocialSharing: PropTypes.func.isRequired,
  trackUserFreeFoodLinkShare: PropTypes.func.isRequired,
}

const defaultProps = {
  elementType: 'page'
}
class SocialShareButtons extends PureComponent {
  state = { isEmailModalOpen: false }

  openEmailModal = () => {
    const { trackingReferFriendSocialSharing, trackUserFreeFoodLinkShare } = this.props
    trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', SOCIAL_TYPES.email)
    trackUserFreeFoodLinkShare({ target: SOCIAL_TYPES.email })
    this.setState({ isEmailModalOpen: true })
  }

  closeEmailModal = () => {
    this.setState({ isEmailModalOpen: false })
  }

  handleGetMessengerReferralLink = () => {
    const {
      referralCode,
      userFirstName,
      trackingReferFriendSocialSharing,
      device,
      trackUserFreeFoodLinkShare,
    } = this.props

    getMessengerReferralLink(
      referralCode,
      userFirstName,
      trackingReferFriendSocialSharing,
      device,
      trackUserFreeFoodLinkShare,
    )
  }

  handleGetFacebookReferralLink = () => {
    const {
      referralCode,
      userFirstName,
      trackingReferFriendSocialSharing,
      trackUserFreeFoodLinkShare,
    } = this.props

    getFacebookReferralLink(
      referralCode,
      userFirstName,
      trackingReferFriendSocialSharing,
      trackUserFreeFoodLinkShare,
    )
  }

  render() {
    const { offerCredit, elementType } = this.props
    const { isEmailModalOpen } = this.state
    const socialShareButtonsClasses = classnames(
      css.mobileHide,
      css.socialButtons,
      {
        [css.pageSocialButtons]: elementType === 'page',
        [css.componentSocialButtons]: elementType === 'component'
      })

    return (
      <section className={socialShareButtonsClasses}>
        <SocialButton
          data-testing="freeFoodEmailCTA"
          text={SOCIAL_TYPES.email}
          type="email"
          elementType={elementType}
          onClick={this.openEmailModal}
        />
        <SocialButton
          text={SOCIAL_TYPES.messenger}
          type="facebook-messenger"
          elementType={elementType}
          onClick={this.handleGetMessengerReferralLink}
        />
        <SocialButton
          text={SOCIAL_TYPES.facebook}
          type="facebook"
          elementType={elementType}
          onClick={this.handleGetFacebookReferralLink}
        />
        <Overlay open={isEmailModalOpen} from="top">
          <ReferAFriendModal
            onClose={this.closeEmailModal}
            credit={offerCredit}
          />
        </Overlay>
      </section>
    )
  }
}

SocialShareButtons.propTypes = propTypes
SocialShareButtons.defaultProps = defaultProps

export { SocialShareButtons, SOCIAL_TYPES }
