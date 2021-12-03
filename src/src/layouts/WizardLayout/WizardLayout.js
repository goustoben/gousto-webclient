import PropTypes from 'prop-types'
import React from 'react'
import { Header } from 'Header'
import css from './WizardLayout.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

class WizardLayout extends React.PureComponent {
  render() {
    const { children } = this.props

    return (
      <div className={css.pageContainer}>
        <div className={css.headerContainer}>
          <Header simple />
        </div>
        {children}
      </div>
    )
  }
}

WizardLayout.propTypes = propTypes

export default WizardLayout
