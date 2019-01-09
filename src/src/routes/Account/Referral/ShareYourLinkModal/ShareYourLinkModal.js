import React from 'react'
import PropTypes from 'prop-types'
import globals from 'config/globals'
import ModalPanel from 'Modal/ModalPanel'
import Svg from 'Svg'
import { ReferAFriend } from '../ReferAFriend'
import css from './ShareYourLinkModal.css'

class ShareYourLinkModal extends React.PureComponent {
  state = { isEmailFormOpen: false }
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    referralCode: PropTypes.string.isRequired,
  }

  toggleEmailModal = () => {
    this.setState(function(prevState) {
      return { isEmailFormOpen: !prevState.isEmailFormOpen }
    })
  }

  render() {
    const { onClose, referralCode } = this.props
    const { isEmailFormOpen } = this.state

    const fbShare = (referralLink) => {
      if (globals.client) {
        window.FB.ui({
          method: 'share',
          mobile_iframe: true,
          href: referralLink,
          redirect_uri: referralLink,
        })
      }
    }

    const fbMsgShare = (referralLink) => {
      if (globals.client) {
        window.FB.ui({
          method: 'send',
          mobile_iframe: true,
          link: referralLink,
          redirect_uri: referralLink,
        })
      }
    }

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

      <div className={`${css.row}`} onClick={() => fbShare(`https://cook.gousto.co.uk/raf/?promo_code=${referralCode}&utm_campaign=raf_facebook_share`)}>
        <div className={css.iconWrapper}>
          <Svg fileName='icon-facebook-colour' className={css.icon} />
        </div>
        <span>Facebook</span>
      </div>

      <div className={`${css.row}`} onClick={() => fbMsgShare(`https://cook.gousto.co.uk/raf/?promo_code=${referralCode}&utm_campaign=raf_messenger_share`)}>
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
