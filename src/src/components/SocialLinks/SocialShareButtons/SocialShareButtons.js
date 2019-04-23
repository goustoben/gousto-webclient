import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import actionTypes from 'actions/actionTypes'
import Overlay from 'components/Overlay'
import { ReferAFriendModal } from 'components/ReferAFriendModal'
import { getFacebookReferralLink, getMessengerReferralLink } from '../socialReferralHelper'
import { SocialButton } from '../SocialButton'

import css from './SocialShareButtons.css'

const propTypes = {
  referralCode: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  device: PropTypes.string.isRequired,
  offerCredit: PropTypes.string.isRequired,
  elementType: PropTypes.string,
  trackingReferFriendSocialSharing: PropTypes.func.isRequired,
}

const defaultProps = {
  elementType: 'page'
}
class SocialShareButtons extends PureComponent {
  state = { isEmailModalOpen: false }

  openEmailModal = () => {
    const { trackingReferFriendSocialSharing } = this.props
    trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Email')
    this.setState({ isEmailModalOpen: true })
  }

  closeEmailModal = () => {
    this.setState({ isEmailModalOpen: false })
  }

  render() {
    const { referralCode, userFirstName, trackingReferFriendSocialSharing, device, offerCredit, elementType } = this.props
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
        <SocialButton text="Facebook" type="facebook" elementType={elementType} onClick={() => getFacebookReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)} />
        <SocialButton text="Messenger" type="facebook-messenger" elementType={elementType} onClick={() => getMessengerReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing, device)} />
        <SocialButton text="Email" type="email" elementType={elementType} onClick={this.openEmailModal} />
        <Overlay open={isEmailModalOpen} from="top">
          <ReferAFriendModal
            onClose={this.closeEmailModal}
            credit={offerCredit}
          />
        </Overlay>
      </section >
    )
  }
}

SocialShareButtons.propTypes = propTypes
SocialShareButtons.defaultProps = defaultProps

export { SocialShareButtons }
