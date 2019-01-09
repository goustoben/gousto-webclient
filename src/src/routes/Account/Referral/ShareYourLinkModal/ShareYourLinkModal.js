import React from 'react'
import PropTypes from 'prop-types'

import globals from 'config/globals'
import ModalPanel from 'Modal/ModalPanel'
import Svg from 'Svg'
import { UserRAFLink } from '../UserRAFLink'
import { ReferAFriend } from '../ReferAFriend'
import Overlay from '../../../../components/Overlay/Overlay'
import css from './ShareYourLinkModal.css'

class ShareYourLinkModal extends React.PureComponent {
  state = { isEmailModalOpen: false }
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    referralCode: PropTypes.string.isRequired,
  }

  openEmailModal = () => {
	  this.setState({ isEmailModalOpen: true })
  }

	closeEmailModal = () => {
	  this.setState({ isEmailModalOpen: false })
	}

	render() {
	  const { onClose, referralCode } = this.props
	  const { isEmailModalOpen } = this.state

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

      <div className={`${css.row}`} onClick={this.openEmailModal}>
        <div className={css.iconWrapper}>
          <Svg fileName='icon-email-colour' className={css.icon} />
        </div>
        <span className={css.optionLabel}>E-mail</span>
          <ReferAFriend
            onClose={this.closeEmailModal}
          />
      </div>
      <div className={`${css.row}`} onClick={() => fbShare(`https://www.gousto.co.uk/join?promo_code=${referralCode}`)}>
        <div className={css.iconWrapper}>
          <Svg fileName='icon-facebook-colour' className={css.icon} />
        </div>
        <span className={css.optionLabel}>Facebook</span>
      </div>
      <div className={`${css.row}`} onClick={() => fbMsgShare(`https://www.gousto.co.uk/join?promo_code=${referralCode}`)}>
        <div className={css.iconWrapper}>
          <Svg fileName='icon-facebook-messenger-colour' className={css.icon} />
        </div>
        <span className={css.optionLabel}>Messenger</span>
      </div>
      <div className={`${css.row}`}>
        <UserRAFLink className={css.rafLink} referralCode={referralCode} />
      </div>

    </ModalPanel>
	  )
	}

}
export { ShareYourLinkModal }
