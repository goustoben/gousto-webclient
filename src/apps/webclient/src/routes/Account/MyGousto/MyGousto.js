import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Link from 'Link'
import Helmet from 'react-helmet'
import { ReactReduxContext } from 'react-redux'
import menuFetchData from 'routes/Menu/fetchData'
import { frequencyIncPromoModalViewed } from 'actions/frequencyIncPromo'
import { Notification } from './Notification'
import { CustomNotice } from './CustomNotice'
import { AppAwarenessBanner } from './AppAwarenessBanner'
import { Section } from './Section'
import { Cookbook } from './Cookbook'
import { HeaderContainer } from './Header'
import { ReferAFriend } from './ReferAFriend'
import { PaymentDetailsNotification } from './PaymentDetailsNotification'
import css from './MyGousto.css'
import { FreqIncNotification } from './FreqIncNotification'

const propTypes = {
  userLoadOrders: PropTypes.func.isRequired,
  userGetReferralDetails: PropTypes.func.isRequired,
  card: PropTypes.instanceOf(Immutable.Map),
  orders: PropTypes.instanceOf(Immutable.Map),
  nameFirst: PropTypes.string,
  referralDetails: PropTypes.instanceOf(Immutable.Map),
  redirect: PropTypes.func,
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
  getFrequencyIncPromoProgress: PropTypes.func.isRequired,
  frequencyProgress: PropTypes.instanceOf(Immutable.Map),
  isFrequencyModalViewed: PropTypes.bool,
}

const defaultProps = {
  card: Immutable.Map(),
  orders: Immutable.Map(),
  nameFirst: '',
  referralDetails: Immutable.Map(),
  redirect: () => {},
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
  frequencyProgress: Immutable.Map(),
  isFrequencyModalViewed: false
}

class MyGousto extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      is3dsTokenFetched: false,
      showFrequencyModal: false,
      showFrequencyBanner: false,
    }
  }

  componentDidMount() {
    const { userLoadOrders, userGetReferralDetails, getFrequencyIncPromoProgress } = this.props
    const { store } = this.context

    userLoadOrders()
    userGetReferralDetails()
    getFrequencyIncPromoProgress()

    setTimeout(() => {
      store.dispatch(menuFetchData({ query: {}, params: {} }, false, true))
    }, 500)
  }

  componentDidUpdate(_en, _prevProps, _prevState) {
    const { userCheck3dsCompliantToken, goustoRef, pending, isCardTokenNotCompliantFor3ds } = this.props
    const { isFrequencyModalViewed, frequencyProgress} = this.props
    const { is3dsTokenFetched, showFrequencyModal } = this.state

    const hasFrequencyProgressData = frequencyProgress?.size > 0
    const isFrequencyModalFirstDemonstration = isFrequencyModalViewed === false && hasFrequencyProgressData
    const isFrequencyModalDemonstrated = isFrequencyModalViewed === true && hasFrequencyProgressData

    this.setState({
      showFrequencyModal: showFrequencyModal || isFrequencyModalFirstDemonstration,
      showFrequencyBanner: isFrequencyModalDemonstrated,
    })

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

  updateShowFrequencyModal(value) {
    const { store } = this.context
    const { showFrequencyModal: wasVisible } = this.state
    this.setState({
      showFrequencyModal: value
    })
    if (value === false && wasVisible) {
      store.dispatch(frequencyIncPromoModalViewed())
    }
  }

  render() {
    const {
      card,
      orders,
      nameFirst,
      referralDetails,
      redirect,
      isCustomNoticeEnabled,
      isMobileViewport,
      showAppAwareness,
      rateRecipeCount,
      trackClickRateRecipes,
      track3dsCompliantClick,
      isCardTokenNotCompliantFor3ds,
      frequencyProgress
    } = this.props
    const { showFrequencyModal, showFrequencyBanner } = this.state
    const headerTitle = `Hello ${nameFirst},`
    const showAppAwarenessBanner = !isMobileViewport && showAppAwareness

    return (
      <div>
        <Helmet title="My Gousto Account | View Your Most Recent Deliveries and Recipes" />
        <div className={css.wrapper}>
          {true && (
            <PaymentDetailsNotification track3dsCompliantClick={track3dsCompliantClick} />
          )}
          <div className={css.notificationContent}>
            {showAppAwarenessBanner && <AppAwarenessBanner />}
            {isCustomNoticeEnabled && <CustomNotice />}
          </div>
          <div className={css.notificationContent}>
            <Notification card={card} orders={orders} />
          </div>
          <div className={css.notificationContent}>
            <FreqIncNotification
              frequencyProgress={frequencyProgress}
              showBanner={showFrequencyBanner}
              showModal={showFrequencyModal}
              updateShowModal={(v) => this.updateShowFrequencyModal(v)}
            />
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
            <div className={css.mobileHide} data-testing="recentPreviousRecipe">
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
MyGousto.contextType = ReactReduxContext

export { MyGousto }
