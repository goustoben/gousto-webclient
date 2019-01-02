import React from 'react'
import globals from 'config/globals'
import { UserRAFLink } from './UserRAFLink'
import { SocialButton } from './SocialButton'
import ReferAFriendModal from './ReferAFriendModal'
import { RAFTitle } from './RAFTitle'
import accountCSS from '../Account/Account.css'
import css from './Referral.css'
import Overlay from '../../../components/Overlay/Overlay'
import RAFOffer from './RAFOffer'

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

class Referral extends React.Component {
	state = { isEmailModalOpen: false }

	openEmailModal = () => {
	  this.setState({ isEmailModalOpen: true })
	}

	closeEmailModal = () => {
	  this.setState({ isEmailModalOpen: false })
	}

	render() {
	  const { referralCode } = this.props

	  return (
			<div className={`${accountCSS.accountContainer} ${accountCSS.container}`}>
				<RAFTitle />
				<RAFOffer />
				<p>{'Send this unique link to your friends.'}</p>
				<div className={css.row}>
					<UserRAFLink className={css.rafLink} referralCode={referralCode} />
					<div className={css.socialButtons}>
						<SocialButton text="Email" type="email" onClick={this.openEmailModal}/>
						<Overlay open={this.state.isEmailModalOpen} from="top">
							<ReferAFriendModal
							  onClose={this.closeEmailModal}
							/>
						</Overlay>
						<SocialButton text="Facebook" type="facebook" onClick={() => fbShare(`https://www.gousto.co.uk/join?promo_code=${referralCode}`)} />
						<SocialButton text="Messenger" type="facebook-messenger" onClick={() => fbMsgShare(`https://www.gousto.co.uk/join?promo_code=${referralCode}`)} />
					</div>
				</div>
			</div>
	  )
	}
}

export default Referral
