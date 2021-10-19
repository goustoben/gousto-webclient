import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Link from 'Link'
import Helmet from 'react-helmet'
import menuFetchData from 'routes/Menu/fetchData'
import { Notification } from './Notification'
import { LimitedCapacityNotice } from './LimitedCapacityNotice'
import { CustomNotice } from './CustomNotice'
import { AppAwarenessBanner } from './AppAwarenessBanner'
import { Section } from './Section'
import { Cookbook } from './Cookbook'
import { HeaderContainer } from './Header'
import { ReferAFriend } from './ReferAFriend'
import { PaymentDetailsNotification } from './PaymentDetailsNotification'
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
  isCustomNoticeEnabled: PropTypes.bool,
  isMobileViewport: PropTypes.bool.isRequired,
  showAppAwareness: PropTypes.bool,
  rateRecipeCount: PropTypes.number,
  trackClickRateRecipes: PropTypes.func,
  userCheck3dsCompliantToken: PropTypes.func,
  goustoRef: PropTypes.string,
  isCardTokenNotCompliantFor3ds: PropTypes.bool,
  track3dsCompliantClick: PropTypes.func,
  userReset3dsCompliantToken: PropTypes.func,
  pending: PropTypes.bool,
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
  isCustomNoticeEnabled: false,
  showAppAwareness: false,
  rateRecipeCount: 0,
  trackClickRateRecipes: () => {},
  userCheck3dsCompliantToken: () => {},
  goustoRef: '',
  isCardTokenNotCompliantFor3ds: false,
  track3dsCompliantClick: () => {},
  userReset3dsCompliantToken: () => {},
  pending: false,
}

class MyGousto extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      is3dsTokenFetched: false
    }
  }

  componentDidMount() {
    const { userLoadOrders, userGetReferralDetails } = this.props
    const { store } = this.context

    userLoadOrders()
    userGetReferralDetails()

    setTimeout(() => {
      store.dispatch(menuFetchData({ query: {}, params: {} }, false, true))
    }, 500)
  }

  componentDidUpdate(_en, _prevProps, _prevState) {
    const { userCheck3dsCompliantToken, goustoRef, pending, isCardTokenNotCompliantFor3ds } = this.props
    const { is3dsTokenFetched } = this.state

    if (!isCardTokenNotCompliantFor3ds && goustoRef && !pending && !is3dsTokenFetched) {
      this.setState({
        is3dsTokenFetched: true
      })

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout)
      }

      this.debounceTimeout = setTimeout(() => {
        userCheck3dsCompliantToken()
      }, 500)
    }
  }

  componentWillUnmount() {
    const { userReset3dsCompliantToken, isCardTokenNotCompliantFor3ds } = this.props
    if (isCardTokenNotCompliantFor3ds) {
      userReset3dsCompliantToken()
      this.setState({
        is3dsTokenFetched: false
      })
    }

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }
  }

  render() {
    const {
      card,
      orders,
      nameFirst,
      referralDetails,
      redirect,
      isCapacityLimited,
      isCustomNoticeEnabled,
      isMobileViewport,
      showAppAwareness,
      rateRecipeCount,
      trackClickRateRecipes,
      track3dsCompliantClick,
      isCardTokenNotCompliantFor3ds,
    } = this.props
    const headerTitle = `Hello ${nameFirst},`
    const showAppAwarenessBanner = !isMobileViewport && showAppAwareness

    return (
      <div>
        <Helmet title="My Gousto Account | View Your Most Recent Deliveries and Recipes" />
        <div className={css.wrapper}>
          {isCardTokenNotCompliantFor3ds && (
            <PaymentDetailsNotification track3dsCompliantClick={track3dsCompliantClick} />
          )}
          <div className={css.notificationContent}>
            {showAppAwarenessBanner && <AppAwarenessBanner />}
            {isCapacityLimited && !showAppAwarenessBanner && <LimitedCapacityNotice />}
            {isCustomNoticeEnabled && <CustomNotice />}
          </div>
          <div className={css.notificationContent}>
            <Notification card={card} orders={orders} />
          </div>
        </div>
        <Section title={headerTitle} largeTitle alternateColour hasPaddingBottom={false}>
          <HeaderContainer />
        </Section>
        <Section title="Your recent recipes" alternateColour>
          {rateRecipeCount && rateRecipeCount > 0 ? (
            <div className={css.desktopHide}>
              <Link
                className={css.rateRecipesButton}
                to="/rate-my-recipes"
                clientRouted={false}
                tracking={() => {
                  trackClickRateRecipes('mygousto_button')
                }}
              >
                <span>
                  Rate your recipes (
                  {rateRecipeCount}
                  )
                </span>
              </Link>
            </div>
          ) : null}
          <Cookbook />
          {rateRecipeCount && rateRecipeCount > 0 ? (
            <div className={css.mobileHide}>
              <Link
                className={css.rateRecipesButton}
                to="/rate-my-recipes"
                clientRouted={false}
                tracking={() => {
                  trackClickRateRecipes('mygousto_button')
                }}
              >
                <span>
                  Rate your recipes (
                  {rateRecipeCount}
                  )
                </span>
              </Link>
            </div>
          ) : null}
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
