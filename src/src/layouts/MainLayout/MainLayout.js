import PropTypes from 'prop-types'
import React from 'react'
import { Header } from 'Header'
import Footer from 'Footer'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Div } from 'Page/Elements'
import css from './MainLayout.css'

class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    orders: PropTypes.instanceOf(Immutable.Map),
    shippingAddresses: PropTypes.instanceOf(Immutable.List),
    userLoadOrders: PropTypes.func.isRequired,
    userFetchShippingAddresses: PropTypes.func.isRequired,
    userClearData: PropTypes.func.isRequired,
    menuLoadingBoxPrices: PropTypes.bool, //eslint-disable-line react/no-unused-prop-types
    menuLoadBoxPrices: PropTypes.func.isRequired,
    route: PropTypes.shape({
      withRecipeBar: PropTypes.bool,
    }),
  }

  static defaultProps = {
    isAuthenticated: false,
    orders: Immutable.fromJS({}),
    shippingAddresses: Immutable.List([]),
    route: {

    },
  }

  componentDidMount() {
    if (!this.props.disabled) {
      if (this.props.isAuthenticated) {
        if (this.props.shippingAddresses.size < 1) {
          this.props.userFetchShippingAddresses()
        }
        if (this.props.orders.size < 1) {
          this.props.userLoadOrders()
        }
      } else {
        if (this.props.isAuthenticated) {
          this.props.userClearData()
        }
      }
    }
  }

  componentWillReceiveProps(nextProp) {
    if (!nextProp.disabled && !this.props.disabled) {
      if (!this.props.isAuthenticated && nextProp.isAuthenticated) {
        if (this.props.shippingAddresses.size < 1) {
          this.props.userFetchShippingAddresses()
        }
        if (nextProp.orders.size < 1) {
          this.props.userLoadOrders()

          if (!nextProp.menuLoadingBoxPrices) {
            this.props.menuLoadBoxPrices()
          }
        }
      } else {
        if (this.props.isAuthenticated && !nextProp.isAuthenticated) {
          this.props.userClearData()
          this.props.menuLoadBoxPrices()
        }
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
        <Header />
        {children}
        <Div className={classNames({ [css.pullUp]: route.withRecipeBar })}>
          <Footer type={route.footerType} />
        </Div>
      </Div>
    )
  }
}

export default MainLayout
