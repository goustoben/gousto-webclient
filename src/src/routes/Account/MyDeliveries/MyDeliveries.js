import PropTypes from 'prop-types'
import React from 'react'
import actions from 'actions/user'
import { Alert, Button } from 'goustouicomponents'
import Link from 'Link'
import routes from 'config/routes'
import Loading from 'Loading'
import css from './MyDeliveries.css'
import OrdersList from './OrdersList'
import accountCss from '../Account/Account.css'

class MyDeliveries extends React.PureComponent {
  static propTypes = {
    isFetchingOrders: PropTypes.bool,
    isFetchingAddresses: PropTypes.bool,
    didErrorFetchingPendingOrders: PropTypes.string,
    didErrorFetchingProjectedOrders: PropTypes.string,
    didErrorFetchingAddresses: PropTypes.string,
  }

  static defaultProps = {
    isFetchingOrders: false,
    isFetchingAddresses: false,
    didErrorFetchingPendingOrders: null,
    didErrorFetchingProjectedOrders: null,
    didErrorFetchingAddresses: null,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static fetchOrdersAndAddresses = ({ store }) => {
    store.dispatch(actions.userLoadNewOrders())
    store.dispatch(actions.userLoadAddresses())
  }

  static renderFetchError = (retryFetch) => (
    <div>
      <Alert type="danger">
        <p>We're not able to display your deliveries right now. Please try again later.</p>
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

  retryFetch = () => {
    const store = this.context.store
    MyDeliveries.fetchOrdersAndAddresses({ store })
  }

  renderOrders() {
    const {
      didErrorFetchingPendingOrders,
      didErrorFetchingProjectedOrders,
      didErrorFetchingAddresses,
      isFetchingOrders,
      isFetchingAddresses,
    } = this.props
    if (didErrorFetchingPendingOrders !== null || didErrorFetchingProjectedOrders !== null || didErrorFetchingAddresses !== null) {
      return MyDeliveries.renderFetchError(this.retryFetch)
    }
    if (isFetchingOrders || isFetchingAddresses) {
      return MyDeliveries.renderLoading
    }

    return <OrdersList />
  }

  componentDidMount() {
    const store = this.context.store
    MyDeliveries.fetchOrdersAndAddresses({ store })
  }

  render() {

    return (
      <div className={accountCss.accountContainer} data-testing="myDeliveries">
        <div className={css.button}>
          <Link to={routes.client.menu}>
            <Button color={'secondary'} noDecoration>
              Add box
            </Button>
          </Link>
        </div>
        {this.renderOrders()}
      </div>
    )
  }
}

export default MyDeliveries
