import React from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import actions from 'actions/user'
import routes from 'config/routes'
import actionTypes from 'actions/actionTypes'
import css from './UserRAFLink.css'

class UserRAFLink extends React.PureComponent {
	state = { copiedMessageVisible: false }

	static propTypes = {
	  referralCode: PropTypes.string,
	  className: PropTypes.string,
	  trackingReferFriend: PropTypes.func
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
	  const { trackingReferFriend } = this.props
	  trackingReferFriend(actionTypes.REFER_FRIEND_LINK_COPIED, 'ReferFriendLink Copied')
	  clearTimeout(this.timeout)
	  this.setState({ copiedMessageVisible: true })
	  this.timeout = setTimeout(() => {
	    this.setState({ copiedMessageVisible: false })
	  }, 2000)
	}

	render() {
	  const { referralCode, className } = this.props
	  const { copiedMessageVisible } = this.state
	  const copyLink = `cook.gousto.co.uk/raf/?promo_code=${referralCode}&utm_source=weblink`
	  const desktopLink = this.constructLink(referralCode)
	  const mobileLink = this.constructLink(referralCode, true)

	  return (
			<div className={className}>
				<CopyToClipboard
				  className={css.linkContainer}
				  text={copyLink}
				  onCopy={() => this.onCopy()}
				>
					<div id="referral-code-box">
						<span className={`${css.mobileHide} ${css.link}`}>{desktopLink}</span>
						<span className={`${css.mobileShow} ${css.link}`}>{mobileLink}</span>
					</div>
				</CopyToClipboard>
				<div className={`${css.referralCodeCopied} ${!copiedMessageVisible ? css.invisible : ''}`}>
					{'Copied!'}
				</div>
			</div>
	  )
	}
}

export { UserRAFLink }
