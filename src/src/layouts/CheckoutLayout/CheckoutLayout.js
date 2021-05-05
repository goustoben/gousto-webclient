import PropTypes from 'prop-types'
import React from 'react'
import { Header } from 'Header'
import Helmet from 'react-helmet'
import css from './CheckoutLayout.css'

class CheckoutLayout extends React.PureComponent {
  render() {
    const { children } = this.props

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
            <Header simple />
            {children}
          </div>
        </div>
      </span>
    )
  }
}

CheckoutLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CheckoutLayout
