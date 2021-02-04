import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { Header } from 'Header'
import Footer from 'components/Footer/Footer'
import Helmet from 'react-helmet'
import css from './CheckoutLayout.css'

class CheckoutLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    params: PropTypes.object,
    isCheckoutOverhaulEnabled: PropTypes.bool,
  }

  static defaultProps = {
    params: {
      stepName: '',
    },
    isCheckoutOverhaulEnabled: false,
  }

  getMobileTitle = () => {
    const { params } = this.props
    const currentStep = params.stepName
    let title

    switch (currentStep) {
    case 'boxdetails':
      title = 'Basket Summary'
      break
    case 'yourdetails':
      title = 'Checkout'
      break
    case 'payment':
      title = 'Payment'
      break
    default:
      title = ''
    }

    return title
  }

  render() {
    const { isCheckoutOverhaulEnabled, children } = this.props

    return (
      <span>
        <Helmet
          title="Food Boxes | Get Fresh Food &amp; Ingredients Delivered | Gousto"
          style={[{
            cssText: `
              #react-root {
                height: 100%;
              }
            `,
          }]}
        />

        <div className={classNames(css.layoutContainer, { [css.layoutContainerRedesign]: isCheckoutOverhaulEnabled })}>
          <div className={classNames(css.pageContainer, { [css.pageContainerRedesign]: isCheckoutOverhaulEnabled })}>
            <Header simple title={isCheckoutOverhaulEnabled ? '' : this.getMobileTitle()} />
            {children}
          </div>
          {!isCheckoutOverhaulEnabled && (
            <Footer
              type="checkout"
              simple={false}
              helpPreLoginVisibilityChange={() => {}}
              trackNavigationClick={() => {}}
            />
          )}
        </div>
      </span>
    )
  }
}

export default CheckoutLayout
