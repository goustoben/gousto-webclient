import React from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import Svg from 'Svg'
import actionTypes from 'actions/actionTypes'
import { UserRAFLink } from '../UserRAFLink'
import ReferAFriend from '../ReferAFriend'
import { LinkRow } from './LinkRow'
import css from './ShareYourLinkModal.css'
import { getFacebookReferralLink, getMessengerReferralLink, getWhatsappReferralLink, getTextMessageReferralLink} from '../referralHelper'

class ShareYourLinkModal extends React.PureComponent {
  state = { isEmailFormOpen: false }
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    referralCode: PropTypes.string.isRequired,
    trackingReferFriendSocialSharing: PropTypes.func.isRequired,
    trackingReferFriend: PropTypes.func.isRequired,
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

  render() {
    const { onClose, referralCode, trackingReferFriendSocialSharing, trackingReferFriend, userFirstName, rafOffer } = this.props
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

      <LinkRow onClick={() => { getTextMessageReferralLink(referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing)}} svgName='icon-text-message-colour' rowName='Text Message'/>
      <LinkRow onClick={() => { getWhatsappReferralLink(referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing)}} svgName='icon-whatsapp-colour' rowName='Whatsapp'/>
      <LinkRow onClick={() => { getMessengerReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)}} svgName='icon-facebook-messenger-colour' rowName='Messenger'/>
      <LinkRow onClick={() => { getFacebookReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)}} svgName='icon-facebook-colour' rowName='Facebook' />
      
      <UserRAFLink
        classContainer={css.row}
        classLinkContainer={css.rafLinkWrapper}
        referralCode={referralCode}
        trackingReferFriend={trackingReferFriend}
        isModal
      >
        <div>
          <div className={css.iconWrapper}>
            <Svg fileName='icon-link-colour' className={css.icon} />
          </div>
          <span>Copy link</span>
        </div>
      </UserRAFLink>
    </ModalPanel>
    )
  }

}
export { ShareYourLinkModal }
