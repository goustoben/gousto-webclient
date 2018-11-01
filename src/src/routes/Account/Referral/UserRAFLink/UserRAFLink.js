import React from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import css from './UserRAFLink.css'
import actions from 'actions/user'
import routes from 'config/routes'

class UserRAFLink extends React.PureComponent {
	state = { copiedMessageVisible: false }

	static propTypes = {
		referralCode: PropTypes.string,
		className: PropTypes.string,
	}

	static defaultProps = {
		referralCode: '',
		className: '',
	}

	static fetchData = async ({ store }) => Promise.all([
		store.dispatch(actions.userLoadReferralDetails()),
	])

	componentWillUnmount() {
		clearTimeout(this.timeout)
	}

	constructLink(referralCode, truncate = false) {
		const link = truncate ? 'gousto.co.uk' : 'https://www.gousto.co.uk'

		return (`${link}${routes.client.join}?promo_code=${referralCode}`)
	}

	onCopy() {
		clearTimeout(this.timeout)
		this.setState({ copiedMessageVisible: true })
		this.timeout = setTimeout(() => {
			this.setState({ copiedMessageVisible: false })
		}, 2000)
	}

	render() {
		const desktopLink = this.constructLink(this.props.referralCode)
		const mobileLink = this.constructLink(this.props.referralCode, true)

		return (
			<div className={this.props.className}>
				<CopyToClipboard
					className={css.linkContainer}
					text={desktopLink}
					onCopy={() => this.onCopy()}
				>
					<div id="referral-code-box">
						<span className={`${css.mobileHide} ${css.link}`}>{desktopLink}</span>
						<span className={`${css.mobileShow} ${css.link}`}>{mobileLink}</span>
					</div>
				</CopyToClipboard>
				<div className={`${css.referralCodeCopied} ${!this.state.copiedMessageVisible ? css.invisible : ''}`}>
					{'Copied!'}
				</div>
			</div>
		)
	}
}

export { UserRAFLink }
