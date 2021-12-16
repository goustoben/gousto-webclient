import PropTypes from 'prop-types'
import React from 'react'
import { NavBar } from './NavBar'
import css from './Account.css'
import Banner from './Banner'

const propTypes = {
  children: PropTypes.node,
  renderChildren: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  cardExpiryDate: PropTypes.string,
  userLoadData: PropTypes.func.isRequired,
  checkCardExpiry: PropTypes.func.isRequired,
  loadMenuServiceDataIfDeepLinked: PropTypes.func.isRequired,
  rateRecipeCount: PropTypes.number,
  userRecipeRatings: PropTypes.func.isRequired,
}

const defaultProps = {
  children: null,
  renderChildren: false,
  cardExpiryDate: '',
  rateRecipeCount: 0,
}

class Account extends React.PureComponent {
  componentDidMount() {
    const {
      loadMenuServiceDataIfDeepLinked,
      checkCardExpiry,
      userLoadData,
      userRecipeRatings,
    } = this.props

    Promise.all([
      userLoadData(),
      userRecipeRatings(),
      loadMenuServiceDataIfDeepLinked(),
    ]).then(() => checkCardExpiry())
  }

  render() {
    const {
      cardExpiryDate,
      renderChildren,
      children,
      location,
      rateRecipeCount,
    } = this.props
    const pageTitles = {
      '/my-details': 'My Details',
      '/rate-my-recipes': 'Rate my Recipes',
    }
    const currentPageTitle = pageTitles[location.pathname]

    return (
      <div className={css.accountWrap}>
        <NavBar
          currentPath={location.pathname}
          cardExpiryDate={cardExpiryDate}
          rateRecipeCount={rateRecipeCount}
        />
        {!renderChildren ? children : <div />}
        {currentPageTitle && <Banner title={currentPageTitle} />}
      </div>
    )
  }
}

Account.propTypes = propTypes
Account.defaultProps = defaultProps

export default Account
