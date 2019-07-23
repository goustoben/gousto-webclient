import PropTypes from 'prop-types'
import React from 'react'
import { Header } from 'Header'
import css from './WizardLayout.css'

class WizardLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className={css.pageContainer}>
        <div className={css.headerContainer}>
          <Header simple noContactBar small />
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default WizardLayout
