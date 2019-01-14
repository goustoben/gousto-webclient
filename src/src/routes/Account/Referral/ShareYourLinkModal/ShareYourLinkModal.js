import React from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import Svg from 'Svg'
import actionTypes from 'actions/actionTypes'
import ReferAFriend from '../ReferAFriend'
import css from './ShareYourLinkModal.css'
import { getFacebookReferralLink, getMessengerReferralLink, getWhatsappReferralLink, getTextMessageReferralLink} from '../socialReferralHelper'

class ShareYourLinkModal extends React.PureComponent {
  state = { isEmailFormOpen: false }
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    referralCode: PropTypes.string.isRequired,
    trackingReferFriendSocialSharing: PropTypes.func.isRequired,
    userFirstName: PropTypes.string.isRequired,
    rafOffer: PropTypes.shape({}),
  }

  toggleEmailModal = () => {
    const { trackingReferFriendSocialSharing } = this.props
    const { isEmailFormOpen } = this.state
    !isEmailFormOpen && trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Email')

    this.setState(function(prevState) {
      return { isEmailFormOpen: !prevState.isEmailFormOpen }
    })

  }

  renderRow = (onClick, svgName, rowName, children) => {
    return (
      <div className={`${css.row}`} onClick={() => onClick()}>
        <div className={css.iconWrapper}>
          <Svg fileName={svgName} className={css.icon} />
        </div>
        <span>{rowName}</span>
        {children}
      </div>
    )
  }

  render() {
    const { onClose, referralCode, trackingReferFriendSocialSharing, userFirstName, rafOffer } = this.props
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

      { this.renderRow(() => { getFacebookReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing) }, 'icon-facebook-colour', 'Facebook' ) }
      { this.renderRow(() => { getMessengerReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing) }, 'icon-facebook-messenger-colour', 'Messenger' ) }
      { this.renderRow(() => { getWhatsappReferralLink(referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing) }, 'icon-whatsapp-colour', 'Whatsapp' ) }
      { this.renderRow(() => { getTextMessageReferralLink(referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing) }, 'icon-text-message-colour', 'Text Message' ) }

    </ModalPanel>
    )
  }

}
export { ShareYourLinkModal }
