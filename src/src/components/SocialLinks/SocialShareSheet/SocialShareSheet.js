import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import Svg from 'Svg'
import { actionTypes } from 'actions/actionTypes'
import { UserRAFLink } from 'components/UserRAFLink'
import { onEnter } from 'utils/accessibility'
import { ReferAFriendContainer } from 'components/ReferAFriend'
import { LinkRow } from './LinkRow'
import css from './SocialShareSheet.css'
import { getFacebookReferralLink, getWhatsappReferralLink, getTextMessageReferralLink, SOCIAL_TYPES } from '../socialReferralHelper'

class SocialShareSheet extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isEmailFormOpen: false }
  }

  toggleEmailModal = () => {
    const { trackingReferFriendSocialSharing, trackUserFreeFoodLinkShare } = this.props
    const { isEmailFormOpen } = this.state
    if (!isEmailFormOpen) {
      trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', SOCIAL_TYPES.email)
      trackUserFreeFoodLinkShare({ target: SOCIAL_TYPES.email })
    }

    this.setState((prevState) => ({ isEmailFormOpen: !prevState.isEmailFormOpen }))
  }

  render() {
    const {
      onClose,
      referralCode,
      trackingReferFriendSocialSharing,
      trackingReferFriend,
      userFirstName,
      rafOffer,
      trackUserFreeFoodLinkShare,
    } = this.props
    const { isEmailFormOpen } = this.state

    return (
      <ModalPanel
        closePortal={onClose}
        className={css.modal}
        disableOverlay
      >
        <div className={`${css.title} ${css.row}`}>
          <span>Share Via</span>
        </div>

        <div className={`${css.row} ${isEmailFormOpen && css.emailFormOpen}`}>
          <div role="button" tabIndex={0} className={css.emailHeader} onClick={this.toggleEmailModal} onKeyDown={onEnter(this.toggleEmailModal)}>
            <div className={css.iconWrapper}>
              <Svg fileName="icon-email-colour" className={css.icon} />
            </div>
            <span>E-mail</span>
          </div>

          <div className={`${css.emailForm} ${!isEmailFormOpen && css.hideContent}`}>
            {isEmailFormOpen && <ReferAFriendContainer />}
          </div>
        </div>

        <LinkRow onClick={() => { getTextMessageReferralLink(referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing, trackUserFreeFoodLinkShare) }} svgName="icon-text-message-colour" rowName={SOCIAL_TYPES.text} />
        <LinkRow onClick={() => { getWhatsappReferralLink(referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing, trackUserFreeFoodLinkShare) }} svgName="icon-whatsapp-colour" rowName={SOCIAL_TYPES.whatsapp} />
        <LinkRow onClick={() => { getFacebookReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing, trackUserFreeFoodLinkShare) }} svgName="icon-facebook-colour" rowName={SOCIAL_TYPES.facebook} />

        <UserRAFLink
          classContainer={css.row}
          classLinkContainer={css.rafLinkWrapper}
          referralCode={referralCode}
          trackingReferFriend={trackingReferFriend}
          isModal
        >
          <div>
            <div className={css.iconWrapper}>
              <Svg fileName="icon-link-colour" className={css.icon} />
            </div>
            <span>Copy link</span>
          </div>
        </UserRAFLink>
      </ModalPanel>
    )
  }
}

SocialShareSheet.propTypes = {
  onClose: PropTypes.func.isRequired,
  referralCode: PropTypes.string.isRequired,
  trackingReferFriendSocialSharing: PropTypes.func.isRequired,
  trackingReferFriend: PropTypes.func.isRequired,
  userFirstName: PropTypes.string.isRequired,
  rafOffer: PropTypes.instanceOf(Immutable.Map),
  trackUserFreeFoodLinkShare: PropTypes.func.isRequired,
}

SocialShareSheet.defaultProps = {
  rafOffer: null,
}

export { SocialShareSheet }
