import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import classnames from 'classnames'
import Helmet from 'react-helmet'
import shallowCompare from 'react-addons-shallow-compare'
import { forceCheck } from 'react-lazyload'

import menu from 'config/menu'

import MenuNoResults from './MenuNoResults'

import SubHeader from './SubHeader'
import FilterNav from './FilterNav'
import Loading from './Loading'
import FilterTagsNav from './FilterTagsNav/FilterTagsNavContainer'
import css from './Menu.css'

import DetailOverlay from './DetailOverlay'
import CollectionsNav from './CollectionsNav'
import FilterMenu from './FilterMenu'

import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import RecipeList from './RecipeList'



import fetchData from './fetchData'

import browserHelper from 'utils/browserHelper'

class Menu extends React.Component {
	static propTypes = {
		basketOrderLoaded: PropTypes.func.isRequired,
		menuLoadBoxPrices: PropTypes.func.isRequired,
		boxDetailsVisibilityChange: PropTypes.func.isRequired,
		boxSummaryDeliveryDays: PropTypes.instanceOf(Immutable.List).isRequired,
		disabled: PropTypes.bool.isRequired,
		menuLoadDays: PropTypes.func.isRequired,
		menuMobileGridViewSet: PropTypes.func.isRequired,
		basketRestorePreviousValues: PropTypes.func.isRequired,
		params: PropTypes.shape({
			orderId: PropTypes.string.isRequired
		}),
		isAuthenticated: PropTypes.bool.isRequired,
		menuRecipeDetailShow: PropTypes.string,
		detailVisibilityChange: PropTypes.func,
		boxSummaryShow: PropTypes.bool,
		boxSummaryDeliveryDaysLoad: PropTypes.func,
		hasRecommendations: PropTypes.bool,
		forceLoad: PropTypes.bool,
		menuBrowseCTAShow: PropTypes.bool,
		menuBrowseCTAVisibilityChange: PropTypes.func,
		loginVisibilityChange: PropTypes.func,
		features: PropTypes.instanceOf(Immutable.Map),
		menuCurrentCollectionId: PropTypes.string,
		menuVariation: PropTypes.string,
		query: PropTypes.object,
		orderId: PropTypes.string,
		storeOrderId: PropTypes.string,
		isLoading: PropTypes.bool,
		tariffId: PropTypes.number,
		menuLoadingBoxPrices: PropTypes.bool,
		filteredRecipesNumber: PropTypes.number,
		clearAllFilters: PropTypes.func,
		triggerMenuLoad: PropTypes.func,
	}

	static defaultProps = {
		boxSummaryDeliveryDays: Immutable.List(),
		boxSummaryDeliveryDaysLoad: () => {},
		boxDetailsVisibilityChange: () => {},
		disabled: false,
		isAuthenticated: false,
	}

	static contextTypes = {
		store: PropTypes.object.isRequired,
	}

	static defaultProps = {
		forceLoad: false,
	}

	static fetchData(args, force) {
		return fetchData(args, force)
	}

	state = {
		mobileGridView: false,
		detailRecipe: null,
		isClient: false,
		isChrome: false,
	}

	componentDidMount() {
		this.setState({ // eslint-disable-line react/no-did-mount-set-state
			isClient: true,
			isChrome: browserHelper.isChrome(),
		})

		const props = this.props
		const store = this.context.store

		// if server rendered
		if (props.params.orderId && props.params.orderId === props.storeOrderId) {
			props.basketOrderLoaded(props.params.orderId)
		}

		const forceDataLoad = (props.storeOrderId && props.storeOrderId !== props.params.orderId)
		// TODO: Add back logic to check what needs to be reloaded
		const query = props.query || {}
		const params = props.params || {}
		if (props.hasRecommendations) {
			props.triggerMenuLoad()
		}
		Menu.fetchData({ store, query, params }, forceDataLoad)

		if (props.boxSummaryDeliveryDays.size === 0 && !props.disabled) {
			props.menuLoadDays().then(() => {
				props.boxSummaryDeliveryDaysLoad()
			})
		}

		if (!props.disabled && !props.menuLoadingBoxPrices) {
			props.menuLoadBoxPrices()
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.menuRecipeDetailShow && !this.props.menuRecipeDetailShow) {
			window.document.addEventListener('keyup', this.handleKeyup, false)
		} else if (!nextProps.menuRecipeDetailShow) {
			window.document.removeEventListener('keyup', this.handleKeyup, false)
		}

		// /menu-> /menu/:orderId
		const editingOrder = (nextProps.orderId || this.props.orderId) && nextProps.orderId !== this.props.orderId
		// user login
		const justLoggedIn = !this.props.isAuthenticated && nextProps.isAuthenticated
		const variationChanged = this.props.menuVariation !== nextProps.menuVariation
		if (editingOrder || justLoggedIn || variationChanged) {
			const store = this.context.store
			const query = nextProps.query || {}
			const params = nextProps.params || {}
			Menu.fetchData({ store, query, params }, true)
		}

		if (!nextProps.disabled && !nextProps.menuLoadingBoxPrices && this.props.tariffId !== nextProps.tariffId) {
			this.props.menuLoadBoxPrices()
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState)
	}

	componentDidUpdate() {
		forceCheck()
	}

	componentWillUnmount() {
		this.props.loginVisibilityChange(false)
	}


	masonryContainer = null

	handleKeyup = (e) => {
		if (e.type === 'keyup' && e.keyCode && e.keyCode === 27) {
			this.props.detailVisibilityChange(false)
		}
	}

	toggleGridView = () => {
		this.props.menuMobileGridViewSet(this.state.mobileGridView, !this.state.mobileGridView)
		if (this.state.mobileGridView) {
			this.setState({ mobileGridView: false })
		} else {
			this.setState({ mobileGridView: true })
		}
	}

	showDetailRecipe = (recipeId) => {
		if (!this.props.boxSummaryShow) {
			this.props.detailVisibilityChange(recipeId)
		}
	}

	handleOverlayClick = () => {
		if (this.props.boxSummaryShow) {
			this.props.boxDetailsVisibilityChange(false, '')
			this.props.basketRestorePreviousValues()
		} else if (this.props.menuBrowseCTAShow) {
			this.props.menuBrowseCTAVisibilityChange(false)
		}
	}


	render() {
		const { hasRecommendations, forceLoad } = this.props
		const { mobileGridView } = this.state
		const overlayShow = this.props.boxSummaryShow || this.props.menuBrowseCTAShow
		const menuFilterExperiment = this.props.features.getIn(['filterMenu', 'value'])
		const collectionsNavEnabled = this.props.features.getIn(['forceCollections', 'value']) || (this.props.features.getIn(['collections', 'value']) && (this.props.features.getIn(['collectionsNav', 'value']) !== false))
		const showLoading = this.props.isLoading && !overlayShow || forceLoad

		let fadeCss = null
		if (showLoading && hasRecommendations) {
			fadeCss = css['fade--recommendations']
		} else if (showLoading) {
			fadeCss = css.fadeOut
		} else {
			fadeCss = css.willFade
		}

		let overlayShowCSS = null
		if (this.state.isChrome) {
			overlayShowCSS = overlayShow ? css.blur : css.willBlur
		}

		return (
			<div data-testing="menuContainer">
				<Helmet
					title={menu.helmet.title}
					meta={menu.helmet.meta}
					style={menu.helmet.style}
				/>
				<div className={classnames(css.container, overlayShowCSS)}>
					<SubHeader
						viewIcon={(mobileGridView) ? 'iconSingleColumn' : 'iconDoubleColumn'}
						onToggleGridView={this.toggleGridView}
						orderId={this.props.orderId}
					/>
					<FilterTagsNav />
					<FilterNav showLoading={this.props.isLoading} />
					<Loading loading={showLoading} hasRecommendations={hasRecommendations} />
					<div className={fadeCss} data-testing="menuRecipes">
						{collectionsNavEnabled && !menuFilterExperiment &&
							<CollectionsNav masonryContainer={this.masonryContainer} menuCurrentCollectionId={this.props.menuCurrentCollectionId} />}
						<FilterMenu />
						{this.props.filteredRecipesNumber ?
							<div
								ref={ref => { this.masonryContainer = ref }}
								className={classnames({
									[css.masonryContainerWithCollectionsNav]: !menuFilterExperiment,
									[css.masonryContainerWithMenuFilterNav]: menuFilterExperiment,
								})}
								data-testing="menuRecipesList"
							>
								<RecipeList
									mobileGridView={mobileGridView}
									showDetailRecipe={this.showDetailRecipe}
									menuCurrentCollectionId={this.props.menuCurrentCollectionId}
								/>
								<p className={css.legal}>{menu.legal}</p>
								<DetailOverlay
									showOverlay={this.state.isClient}
									menuRecipeDetailShow={this.props.menuRecipeDetailShow}
								/>
							</div>
							:
							<MenuNoResults clearAllFilters={() => this.props.clearAllFilters()} />
						}
					</div>
					<div className={overlayShow ? css.greyOverlayShow : css.greyOverlay} onClick={this.handleOverlayClick}></div>
				</div>
				<BoxSummaryMobile />
				<BoxSummaryDesktop />
			</div>
		)
	}
}

export default Menu
