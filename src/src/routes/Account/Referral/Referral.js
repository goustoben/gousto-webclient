import React from 'react'
import Image from 'Image'
import { H2 } from 'Page/Header'
import config from './config'
import UserRAFLink from './UserRAFLink'
import SocialButton from './SocialButton'
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
			title: 'Get 3 delicious meals for just £9.99!', // TODO WE SHOULD CHANGE THIS MESSAGE
			description: `Thanks to Gousto, I'm cooking delicious recipes every week, and you can too! Use my personal code ${referralLink} and get ${whatsForThem} off your first box.`,
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
			// TODO WE SHOULD CHANGE THIS MESSAGE
			message: `I enjoy cooking Gousto and think you should give it a try! I'm discovering new recipes and getting all the top-quality, pre-measured ingredients to cook them delivered straight to my home. Click on ${referralLink} and get up to £25 off your first box. That's 3 meals for just £9.99, don't miss it!`,
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
