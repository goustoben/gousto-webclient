import React from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import actions from 'actions/user'
import actionTypes from 'actions/actionTypes'
import { getReferralLink } from 'components/SocialLinks/socialReferralHelper'
import css from './UserRAFLink.css'

class UserRAFLink extends React.PureComponent {
  state = { copiedMessageVisible: false }

  static propTypes = {
    referralCode: PropTypes.string.isRequired,
    classContainer: PropTypes.string.isRequired,
    classLinkContainer: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    trackingReferFriend: PropTypes.func,
    isModal: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    referralCode: '',
    classContainer: '',
    classLinkContainer: '',
    isModal: false,
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
    const { referralCode, classContainer, classLinkContainer, trackingReferFriend, children, isModal } = this.props
    const { copiedMessageVisible } = this.state
    const copyLink = getReferralLink(referralCode, '', '&utm_source=weblink')

    return (
      <div className={classContainer}>
        <CopyToClipboard
          className={classLinkContainer}
          text={copyLink}
          onCopy={() => this.onCopy(trackingReferFriend)}
        >
          {children}
        </CopyToClipboard>
        <div className={`${css.referralCodeCopied} ${isModal ? '' : css.positionTop45} ${!copiedMessageVisible ? css.invisible : ''}`}>
          {'Copied!'}
        </div>
      </div>
    )
  }
}

export { UserRAFLink }
