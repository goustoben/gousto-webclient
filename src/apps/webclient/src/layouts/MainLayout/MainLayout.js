import PropTypes from 'prop-types'
import React from 'react'
import Footer from 'Footer'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Div } from 'Page/Elements'
import css from './MainLayout.css'
import { MenuHeader } from './MenuHeader'

const propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  orders: PropTypes.instanceOf(Immutable.Map),
  shippingAddresses: PropTypes.instanceOf(Immutable.List),
  userLoadOrders: PropTypes.func.isRequired,
  userFetchShippingAddresses: PropTypes.func.isRequired,
  userClearData: PropTypes.func.isRequired,
  menuLoadingBoxPrices: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  menuLoadBoxPrices: PropTypes.func.isRequired,
  route: PropTypes.shape({
    withRecipeBar: PropTypes.bool,
    footerType: PropTypes.string,
  }),
}

const defaultProps = {
  orders: Immutable.fromJS({}),
  shippingAddresses: Immutable.List([]),
  menuLoadingBoxPrices: false,
  route: {},
}

export class MainLayout extends React.Component {
  componentDidMount() {
    const { disabled, isAuthenticated, orders, shippingAddresses, userClearData, userFetchShippingAddresses, userLoadOrders } = this.props

    if (!disabled) {
      if (isAuthenticated) {
        if (shippingAddresses.size < 1) {
          userFetchShippingAddresses()
        }
        if (orders.size < 1) {
          userLoadOrders()
        }
      } else if (isAuthenticated) {
        userClearData()
      }
    }
  }

  componentWillReceiveProps(nextProp) {
    const { disabled, isAuthenticated, menuLoadBoxPrices, shippingAddresses, userClearData, userFetchShippingAddresses, userLoadOrders } = this.props

    if (!nextProp.disabled && !disabled) {
      if (!isAuthenticated && nextProp.isAuthenticated) {
        if (shippingAddresses.size < 1) {
          userFetchShippingAddresses()
        }
        if (nextProp.orders.size < 1) {
          userLoadOrders()

          if (!nextProp.menuLoadingBoxPrices) {
            menuLoadBoxPrices()
          }
        }
      } else if (isAuthenticated && !nextProp.isAuthenticated) {
        userClearData()
        menuLoadBoxPrices()
      }
    }
  }

  render() {
    const { children, route } = this.props
    const footerBaseClass = classNames(css.pageContainer, {
      [css.withBottomBar]: route.withRecipeBar,
    })

    return (
      <Div className={footerBaseClass} backgroundColor="Coconut">
        <MenuHeader />
        {children}
        <Div className={classNames({ [css.pullUp]: route.withRecipeBar })}>
          <Footer type={route.footerType} />
        </Div>
      </Div>
    )
  }
}

MainLayout.propTypes = propTypes

MainLayout.defaultProps = defaultProps
