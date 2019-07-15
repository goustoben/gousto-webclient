import PropTypes from 'prop-types'
import React from 'react'
import { Header } from 'Header'
import Footer from 'components/Footer/Footer'
import Helmet from 'react-helmet'
import css from './CheckoutLayout.css'

class CheckoutLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    params: PropTypes.object,
  }
  static defaultProps = {
    params: {
      stepName: '',
    },
  }

  getMobileTitle = () => {
    const currentStep = this.props.params.stepName
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

        <div className={css.layoutContainer}>
          <div className={css.pageContainer}>
            <Header simple title={this.getMobileTitle()} />
            {this.props.children}
          </div>
          <Footer type="checkout" simple={false} />
        </div>
      </span>
    )
  }
}

export default CheckoutLayout
