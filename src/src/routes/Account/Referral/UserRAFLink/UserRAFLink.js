import React from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import actions from 'actions/user'
import actionTypes from 'actions/actionTypes'
import css from './UserRAFLink.css'
import { getReferralLink } from '../referralHelper'

class UserRAFLink extends React.PureComponent {
  state = { copiedMessageVisible: false }

  static propTypes = {
    referralCode: PropTypes.string.isRequired,
    classContainer: PropTypes.string.isRequired,
    classLinkContainer: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    trackingReferFriend: PropTypes.func,
  }

  static defaultProps = {
    referralCode: '',
    classContainer: '',
    classLinkContainer: ''
  }

  static fetchData = async ({ store }) => Promise.all([
    store.dispatch(actions.userLoadReferralDetails()),
  ])

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  onCopy(trackingReferFriend) {
    trackingReferFriend(actionTypes.REFER_FRIEND_LINK_COPIED, 'ReferFriendLink Copied')
    clearTimeout(this.timeout)
    this.setState({ copiedMessageVisible: true })
    this.timeout = setTimeout(() => {
      this.setState({ copiedMessageVisible: false })
    }, 2000)
  }

  render() {
    const { referralCode, classContainer, classLinkContainer,trackingReferFriend, children } = this.props
    const { copiedMessageVisible } = this.state
    const copyLink = getReferralLink(referralCode, '&utm_source=weblink')
    
    return (
      <div className={classContainer}>
        <CopyToClipboard
          className={classLinkContainer}
          text={copyLink}
          onCopy={() => this.onCopy(trackingReferFriend)}
        >
          {children}
        </CopyToClipboard>
        <div className={`${css.referralCodeCopied} ${!copiedMessageVisible ? css.invisible : ''}`}>
          {'Copied!'}
        </div>
      </div>
    )
  }
}

export { UserRAFLink }
