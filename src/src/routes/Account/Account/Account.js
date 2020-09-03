import PropTypes from 'prop-types'
import React from 'react'
import NavBar from './NavBar'
import css from './Account.css'
import Banner from './Banner'

class Account extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    renderChildren: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    rateRecipeCount: PropTypes.number,
    cardExpiryDate: PropTypes.string,
    isAccountTabNameTest: PropTypes.bool,
    userLoadData: PropTypes.func.isRequired,
    userRecipeRatings: PropTypes.func.isRequired,
    checkCardExpiry: PropTypes.func.isRequired,
    subscriptionLoadData: PropTypes.func.isRequired,
    loadMenuServiceDataIfDeepLinked: PropTypes.func.isRequired,
  }

  static defaultProps = {
    renderChildren: false,
    rateRecipeCount: 0,
    cardExpiryDate: '',
    isAccountTabNameTest: false,
  }

  componentDidMount() {
    const {
      loadMenuServiceDataIfDeepLinked,
      checkCardExpiry,
      subscriptionLoadData,
      userLoadData,
      userRecipeRatings
    } = this.props

    Promise.all([
      userLoadData(),
      userRecipeRatings(),
      loadMenuServiceDataIfDeepLinked(),
      subscriptionLoadData(),
    ]).then(() => checkCardExpiry())
  }

  render() {
    const { rateRecipeCount, cardExpiryDate, renderChildren, children, location, isAccountTabNameTest } = this.props

    const pageTitles = {
      '/my-subscription': 'Manage my Subscription',
      '/my-details': 'My Details',
      '/rate-my-recipes': 'Rate my Recipes',
    }
    const currentPageTitle = pageTitles[location.pathname]

    return (
      <div className={css.accountWrap}>
        <NavBar currentPath={location.pathname} rateRecipeCount={rateRecipeCount} cardExpiryDate={cardExpiryDate} isAccountTabNameTest={isAccountTabNameTest} />
        {!renderChildren ? children : <div />}
        {currentPageTitle && <Banner title={currentPageTitle} />}
      </div>
    )
  }
}

export default Account
