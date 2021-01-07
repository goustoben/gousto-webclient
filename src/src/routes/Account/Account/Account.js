import PropTypes from 'prop-types'
import React from 'react'
import NavBar from './NavBar'
import css from './Account.css'
import Banner from './Banner'

const propTypes = {
  children: PropTypes.node,
  renderChildren: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  cardExpiryDate: PropTypes.string,
  isNewSubscriptionPageEnabled: PropTypes.bool,
  userLoadData: PropTypes.func.isRequired,
  checkCardExpiry: PropTypes.func.isRequired,
  subscriptionLoadData: PropTypes.func.isRequired,
  loadMenuServiceDataIfDeepLinked: PropTypes.func.isRequired,
}

const defaultProps = {
  children: null,
  renderChildren: false,
  cardExpiryDate: '',
  isNewSubscriptionPageEnabled: false,
}
class Account extends React.PureComponent {
  componentDidMount() {
    const {
      loadMenuServiceDataIfDeepLinked,
      checkCardExpiry,
      subscriptionLoadData,
      userLoadData,
    } = this.props

    Promise.all([
      userLoadData(),
      loadMenuServiceDataIfDeepLinked(),
      subscriptionLoadData(),
    ]).then(() => checkCardExpiry())
  }

  render() {
    const { cardExpiryDate, renderChildren, children, location, isNewSubscriptionPageEnabled } = this.props

    const pageTitles = {
      '/my-subscription': 'Manage my Subscription',
      '/my-details': 'My Details',
      '/rate-my-recipes': 'Rate my Recipes',
    }
    const currentPageTitle = pageTitles[location.pathname]

    return (
      <div className={css.accountWrap}>
        <NavBar
          currentPath={location.pathname}
          cardExpiryDate={cardExpiryDate}
          isNewSubscriptionPageEnabled={isNewSubscriptionPageEnabled}
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
