import React from 'react'
import NavBar from './NavBar'
import userActions from 'actions/user'
import subscriptionActions from 'actions/subscriptionPause'
import homeActions from 'actions/home'
import css from './Account.css'
import Banner from './Banner'

class Account extends React.PureComponent {

	static propTypes = {
		children: React.PropTypes.node,
		renderChildren: React.PropTypes.bool,
		location: React.PropTypes.shape({
			pathname: React.PropTypes.string,
		}).isRequired,
		rateRecipeCount: React.PropTypes.number,
	}
	static defaultProps = {
		renderChildren: false,
	}
	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	}

	componentDidMount() {
		const store = this.context.store
		Promise.all([
			store.dispatch(userActions.userLoadData()),
			store.dispatch(userActions.userRecipeRatings()),
			store.dispatch(homeActions.homeLoadCarousel()),
			store.dispatch(subscriptionActions.subscriptionLoadData()),
		]).then(() => store.dispatch(userActions.checkCardExpiry()))
	}

	render() {
		const pageTitles = {
			'/my-gousto': 'My Gousto',
			'/my-deliveries': 'My Deliveries',
			'/my-subscription': 'Manage my Subscription',
			'/my-details': 'My Details',
			'/my-referrals': 'Refer a Friend',
			'/rate-my-recipes': 'Rate my Recipes',
			'/mydeliveries': 'My Deliveries',
		}

		const newPages = [
			'/mydeliveries',
		]

		const oldPages = [
			'/my-deliveries',
			'/my-subscription',
			'/my-details',
			'/my-referrals',
			'/rate-my-recipes',
		]

		return (
			<div className={css.accountWrap}>
				<NavBar currentPath={this.props.location.pathname} rateRecipeCount={this.props.rateRecipeCount} cardExpiryDate={this.props.cardExpiryDate} />
				{newPages.indexOf(this.props.location.pathname) > -1 ? <Banner title={pageTitles[this.props.location.pathname]} /> : <div></div>}
				{!this.props.renderChildren ? this.props.children : <div></div>}
				{oldPages.indexOf(this.props.location.pathname) > -1 ? <Banner title={pageTitles[this.props.location.pathname]} /> : <div></div>}
			</div>
		)
	}

}

export default Account
