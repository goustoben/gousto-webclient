import React from 'react'
import Image from 'Image'
import { H2 } from 'Page/Header'
import config from './config'
import { UserRAFLink } from './UserRAFLink'
import { SocialButton } from './SocialButton'
import ReferAFriendModal from './ReferAFriendModal'
import accountCSS from '../Account/Account.css'
import css from './Referral.css'
import globals from 'config/globals'
import Overlay from '../../../components/Overlay/Overlay'
const { whatsForYou, whatsForThem } = config

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

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
				<Image media={getImage('refer.jpg')} title={`You get ${whatsForYou}, they get ${whatsForThem} off their first 2 boxes!`} />
				<H2 headlineFont>
					{`Refer a friend – you get ${whatsForYou}, they get ${whatsForThem} off their first 2 boxes!`}
				</H2>
				<p className={css.firstParagraph}>{`Your ${whatsForYou} credit shows up in your account once your friend's first box is delivered. Make sure they use your link or promo code.`}</p>
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
