import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import menuFetchData from 'routes/Menu/fetchData'
import { Notification } from './Notification'
import { Section } from './Section'
import { Cookbook } from './Cookbook'
import { HeaderContainer } from './Header'
import { ReferAFriend } from './ReferAFriend'
import css from './MyGousto.css'

class MyGousto extends React.PureComponent {
  static propTypes = {
    userLoadOrders: PropTypes.func.isRequired,
    userGetReferralDetails: PropTypes.func.isRequired,
    card: PropTypes.instanceOf(Immutable.Map),
    orders: PropTypes.instanceOf(Immutable.Map),
    nameFirst: PropTypes.string,
    referralDetails: PropTypes.instanceOf(Immutable.Map),
    redirect: PropTypes.func,
  }

  static defaultProps = {
    userLoadOrders: () => { },
    redirect: () => {},
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { userLoadOrders, userGetReferralDetails } = this.props
    const { store } = this.context

    userLoadOrders()
    userGetReferralDetails()
    
    setTimeout(() => {
      menuFetchData({ store, query: {}, params: {} }, false, true)
    }, 500)
  }

  render() {
    const { card, orders, nameFirst, referralDetails, redirect } = this.props
    const headerTitle = `Hello ${nameFirst},`

    return (
      <div>
        <div className={css.wrapper}>
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

export default MyGousto
