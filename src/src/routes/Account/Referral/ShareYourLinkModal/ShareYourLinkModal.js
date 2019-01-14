import React from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import Svg from 'Svg'
import actionTypes from 'actions/actionTypes'
import ReferAFriend from '../ReferAFriend'
import css from './ShareYourLinkModal.css'
import { getFacebookReferralLink, getMessengerReferralLink } from '../socialReferralHelper'

class ShareYourLinkModal extends React.PureComponent {
  state = { isEmailFormOpen: false }
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    referralCode: PropTypes.string.isRequired,
    trackingReferFriendSocialSharing: PropTypes.func.isRequired,
    userFirstName: PropTypes.string.isRequired,
  }

  toggleEmailModal = () => {
    const { trackingReferFriendSocialSharing } = this.props
    const { isEmailFormOpen } = this.state
    !isEmailFormOpen && trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Email')

    this.setState(function(prevState) {
      return { isEmailFormOpen: !prevState.isEmailFormOpen }
    })

  }

  render() {
    const { onClose, referralCode, trackingReferFriendSocialSharing, userFirstName } = this.props
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
        <div className={css.emailHeader} onClick={this.toggleEmailModal}>
          <div className={css.iconWrapper}>
            <Svg fileName='icon-email-colour' className={css.icon} />
          </div>
          <span>E-mail</span>
        </div>

        <div className={`${css.emailForm} ${!isEmailFormOpen && css.hideContent}`}>
          { isEmailFormOpen && <ReferAFriend/> }
        </div>
      </div>

      <div className={`${css.row}`} onClick={() => getFacebookReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)}>
        <div className={css.iconWrapper}>
          <Svg fileName='icon-facebook-colour' className={css.icon} />
        </div>
        <span>Facebook</span>
      </div>

      <div className={`${css.row}`} onClick={() => getMessengerReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)}>
        <div className={css.iconWrapper}>
          <Svg fileName='icon-facebook-messenger-colour' className={css.icon} />
        </div>
        <span>Messenger</span>
      </div>
    </ModalPanel>
    )
  }

}
export { ShareYourLinkModal }
