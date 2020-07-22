import PropTypes from 'prop-types'
import React from 'react'
import userActions from 'actions/user'
import subscriptionActions from 'actions/subscriptionPause'
import { loadMenuServiceDataIfDeepLinked } from 'utils/menuService'

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
  }

  static defaultProps = {
    renderChildren: false,
    rateRecipeCount: 0,
    cardExpiryDate: '',
    isAccountTabNameTest: false,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { store } = this.context

    Promise.all([
      store.dispatch(userActions.userLoadData()),
      store.dispatch(userActions.userRecipeRatings()),

      loadMenuServiceDataIfDeepLinked(store),
      store.dispatch(subscriptionActions.subscriptionLoadData()),
    ]).then(() => store.dispatch(userActions.checkCardExpiry()))
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
