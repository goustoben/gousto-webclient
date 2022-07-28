import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { Alert, CTA, Button } from 'goustouicomponents'
import { browserHistory } from 'react-router'
import routes from 'config/routes'
import Loading from 'Loading'
import logger from 'utils/logger'
import { DeliveryCard } from 'routes/Checkout/Components/Delivery/DeliveryCard'
import OrdersList from './OrdersList'
import css from './MyDeliveries.css'
import accountCss from '../Account/Account.css'
import { FiveRecipesAwarenessBanner } from 'FiveRecipesAwareness/FiveRecipesAwarenessBanner/FiveRecipesAwarenessBanner'

class MyDeliveries extends React.PureComponent {
  componentDidMount() {
    this.fetchOrdersAndAddresses()
  }

  componentWillUnmount() {
    const { signupSetGoustoOnDemandEnabled } = this.props
    signupSetGoustoOnDemandEnabled(false)
  }

  getErrorMessage() {
    const {
      didErrorFetchingPendingOrders,
      didErrorFetchingProjectedOrders,
    } = this.props

    const errorMessages = {
      pendingOrderError: 'We\'re not able to display your upcoming orders right now. Please try again later.',
      projectedOrderError: 'We\'re not able to display your future deliveries right now. Please try again later.',
      genericError: 'We\'re not able to display your deliveries right now. Please try again later.'
    }

    if (didErrorFetchingProjectedOrders !== null) {
      return errorMessages.projectedOrderError
    } else if (didErrorFetchingPendingOrders !== null) {
      return errorMessages.pendingOrderError
    } else {
      return errorMessages.genericError
    }
  }

  fetchOrdersAndAddresses = async () => {
    const { userId, userLoadAddresses, userLoadData, userLoadNewOrders } = this.props

    try {
      if (!userId) {
        await userLoadData()
      }

      userLoadNewOrders()
      userLoadAddresses()
    } catch (error) {
      logger.error(error)
    }
  }

  retryFetch = () => {
    this.fetchOrdersAndAddresses()
  }

  static renderFetchError = (retryFetch, errorMessage) => (
    <div>
      <Alert type="danger">
        <p>{errorMessage}</p>
      </Alert>
      <div className={css.button}>
        <Button onClick={retryFetch}>Retry</Button>
      </div>
    </div>
  )

  handleOrderAnotherBoxClick = () => browserHistory.push(routes.client.menu)

  static renderLoading = (
    <div className={css.spinner}>
      <Loading />
    </div>
  )

  renderOrders() {
    const {
      didErrorFetchingPendingOrders,
      didErrorFetchingProjectedOrders,
      isFetchingOrders,
      userId
    } = this.props
    if (isFetchingOrders || !userId) {
      return MyDeliveries.renderLoading
    }

    if (didErrorFetchingPendingOrders !== null || didErrorFetchingProjectedOrders !== null) {
      const errorMessage = this.getErrorMessage()

      return MyDeliveries.renderFetchError(this.retryFetch, errorMessage)
    }

    return <OrdersList />
  }

  renderGoustoOnDemandBanner = () => {
    const { isGoustoOnDemandEnabled } = this.props

    if (isGoustoOnDemandEnabled) {
      return (
        <div className={css.bannerContainer}>
          <DeliveryCard iconName="icon-gousto-on-demand-offer" cardStyle="blue">
            Voucher will be applied to your next order
          </DeliveryCard>
        </div>
      )
    }

    return null
  }

  render() {
    return (
      <div className={accountCss.accountContainer} data-testing="myDeliveries">
        <Helmet title="Gousto Deliveries | Manage All Upcoming Deliveries" />
        <div className={css.titleContainer}>
          <h1 className={css.title}>Deliveries</h1>
          <div className={css.subTitleContainer}>
            <p className={css.subTitle}>
              Here you can manage all of your upcoming deliveries, select recipes, skip or cancel boxes as you need.
            </p>
            <FiveRecipesAwarenessBanner />
            <CTA
              onClick={this.handleOrderAnotherBoxClick}
              variant="secondary"
              size="small"
              testingSelector="addBoxButton"
            >
              Order another box
            </CTA>
          </div>
        </div>
        {this.renderGoustoOnDemandBanner()}
        {this.renderOrders()}
      </div>
    )
  }
}

MyDeliveries.propTypes = {
  isFetchingOrders: PropTypes.bool,
  didErrorFetchingPendingOrders: PropTypes.string,
  didErrorFetchingProjectedOrders: PropTypes.string,
  userLoadAddresses: PropTypes.func.isRequired,
  userLoadData: PropTypes.func.isRequired,
  userLoadNewOrders: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  isGoustoOnDemandEnabled: PropTypes.bool,
  signupSetGoustoOnDemandEnabled: PropTypes.func,
}

MyDeliveries.defaultProps = {
  isFetchingOrders: false,
  didErrorFetchingPendingOrders: null,
  didErrorFetchingProjectedOrders: null,
  isGoustoOnDemandEnabled: false,
  signupSetGoustoOnDemandEnabled: () => {},
}

export default MyDeliveries
