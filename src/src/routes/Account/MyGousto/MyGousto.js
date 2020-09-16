import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import menuFetchData from 'routes/Menu/fetchData'
import { Notification } from './Notification'
import { LimitedCapacityNotice } from './LimitedCapacityNotice'
import { AppAwarenessBanner } from './AppAwarenessBanner'
import { Section } from './Section'
import { Cookbook } from './Cookbook'
import { HeaderContainer } from './Header'
import { ReferAFriend } from './ReferAFriend'
import css from './MyGousto.css'

const propTypes = {
  userLoadOrders: PropTypes.func.isRequired,
  userGetReferralDetails: PropTypes.func.isRequired,
  card: PropTypes.instanceOf(Immutable.Map),
  orders: PropTypes.instanceOf(Immutable.Map),
  nameFirst: PropTypes.string,
  referralDetails: PropTypes.instanceOf(Immutable.Map),
  redirect: PropTypes.func,
  isCapacityLimited: PropTypes.bool,
  isMobileViewport: PropTypes.bool.isRequired,
  showAppAwareness: PropTypes.bool,
}

const contextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
}

const defaultProps = {
  card: Immutable.Map(),
  orders: Immutable.Map(),
  nameFirst: '',
  referralDetails: Immutable.Map(),
  redirect: () => {},
  isCapacityLimited: false,
  showAppAwareness: false,
}

class MyGousto extends React.PureComponent {
  componentDidMount() {
    const { userLoadOrders, userGetReferralDetails } = this.props
    const { store } = this.context

    userLoadOrders()
    userGetReferralDetails()

    setTimeout(() => {
      store.dispatch(menuFetchData({ query: {}, params: {} }, false, true))
    }, 500)
  }

  render() {
    const {
      card,
      orders,
      nameFirst,
      referralDetails,
      redirect,
      isCapacityLimited,
      isMobileViewport,
      showAppAwareness,
    } = this.props
    const headerTitle = `Hello ${nameFirst},`
    const showAppAwarenessBanner = !isMobileViewport && showAppAwareness

    return (
      <div>
        <div className={css.wrapper}>
          <div className={css.notificationContent}>
            {showAppAwarenessBanner && <AppAwarenessBanner />}
            {(isCapacityLimited && !showAppAwarenessBanner) && <LimitedCapacityNotice />}
          </div>
          <div className={css.notificationContent}>
            <Notification card={card} orders={orders} />
          </div>
        </div>
        <Section title={headerTitle} largeTitle alternateColour hasPaddingBottom={false}>
          <HeaderContainer orders={orders} />
        </Section>
        <Section title="Your recent cookbook" alternateColour>
          <Cookbook />
        </Section>
        <Section title="Your Gousto wins" alternateColour>
          <ReferAFriend referralDetails={referralDetails} redirect={redirect} />
        </Section>
      </div>
    )
  }
}

MyGousto.propTypes = propTypes
MyGousto.defaultProps = defaultProps
MyGousto.contextTypes = contextTypes

export { MyGousto }
