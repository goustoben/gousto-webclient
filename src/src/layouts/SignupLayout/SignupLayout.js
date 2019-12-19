import PropTypes from 'prop-types'
import React from 'react'
import { Header } from 'Header'
import css from './SignupLayout.css'

class SignupLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className={css.pageContainer}>
        <div className={css.headerContainer}>
          <Header simple small />
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default SignupLayout
