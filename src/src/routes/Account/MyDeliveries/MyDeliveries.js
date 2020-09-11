import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Button } from 'goustouicomponents'
import Link from 'Link'
import routes from 'config/routes'
import Loading from 'Loading'
import css from './MyDeliveries.css'
import OrdersList from './OrdersList'
import accountCss from '../Account/Account.css'

class MyDeliveries extends React.PureComponent {
  static fetchOrdersAndAddresses = ({ userLoadAddresses, userLoadNewOrders }) => {
    userLoadNewOrders()
    userLoadAddresses()
  }

  componentDidMount() {
    const { userLoadAddresses, userLoadNewOrders } = this.props
    MyDeliveries.fetchOrdersAndAddresses({ userLoadAddresses, userLoadNewOrders })
  }

  retryFetch = () => {
    const { userLoadAddresses, userLoadNewOrders } = this.props
    MyDeliveries.fetchOrdersAndAddresses({ userLoadAddresses, userLoadNewOrders })
  }

  static renderFetchError = (retryFetch) => (
    <div>
      <Alert type="danger">
        <p>We&#39;re not able to display your deliveries right now. Please try again later.</p>
      </Alert>
      <div className={css.button}>
        <Button onClick={retryFetch}>Retry</Button>
      </div>
    </div>
  )

  static renderLoading = (
    <div className={css.spinner}>
      <Loading />
    </div>
  )

  renderOrders() {
    const {
      didErrorFetchingPendingOrders,
      didErrorFetchingProjectedOrders,
      didErrorFetchingAddresses,
      isFetchingOrders
    } = this.props
    if (didErrorFetchingPendingOrders !== null || didErrorFetchingProjectedOrders !== null || didErrorFetchingAddresses !== null) {
      return MyDeliveries.renderFetchError(this.retryFetch)
    }
    if (isFetchingOrders) {
      return MyDeliveries.renderLoading
    }

    return <OrdersList />
  }

  render() {
    return (
      <div className={accountCss.accountContainer} data-testing="myDeliveries">
        <div className={css.button}>
          <Link to={routes.client.menu}>
            <Button color="secondary" noDecoration data-testing="addBoxButton">
              Add box
            </Button>
          </Link>
        </div>
        {this.renderOrders()}
      </div>
    )
  }
}

MyDeliveries.propTypes = {
  isFetchingOrders: PropTypes.bool,
  didErrorFetchingPendingOrders: PropTypes.string,
  didErrorFetchingProjectedOrders: PropTypes.string,
  didErrorFetchingAddresses: PropTypes.string,
  userLoadAddresses: PropTypes.func.isRequired,
  userLoadNewOrders: PropTypes.func.isRequired,
}

MyDeliveries.defaultProps = {
  isFetchingOrders: false,
  didErrorFetchingPendingOrders: null,
  didErrorFetchingProjectedOrders: null,
  didErrorFetchingAddresses: null,
}

export default MyDeliveries
