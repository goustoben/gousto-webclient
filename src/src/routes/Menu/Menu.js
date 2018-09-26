import React, { PropTypes } from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import classnames from 'classnames'
import Helmet from 'react-helmet'
import shallowCompare from 'react-addons-shallow-compare'
import { forceCheck } from 'react-lazyload'

import menu from 'config/menu'

import Detail from 'Recipe/Detail'
import MenuNoResults from './MenuNoResults'

import Loading from 'Loading'
import SubHeader from './SubHeader'
import FilterNav from './FilterNav'
import FilterTagsNav from './FilterTagsNav/FilterTagsNavContainer'
import css from './Menu.css'

import Overlay from 'Overlay'

import CollectionsNav from './CollectionsNav'
import FilterMenu from './FilterMenu'

import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import RecipeList from './RecipeList'

import { getLowStockTag, getSurcharge } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'

import fetchData from './fetchData'

class Menu extends React.Component {
	static propTypes = {
		basketOrderLoaded: PropTypes.func.isRequired,
		recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
		menuLoadBoxPrices: PropTypes.func.isRequired,
		stock: PropTypes.instanceOf(Immutable.Map),
		numPortions: PropTypes.number.isRequired,
		menuRecipeDetailShow: PropTypes.string,
		detailVisibilityChange: PropTypes.func,
		boxSummaryShow: PropTypes.bool,
		boxDetailsVisibilityChange: PropTypes.func.isRequired,
		disabled: PropTypes.bool.isRequired,
		boxSummaryDeliveryDaysLoad: PropTypes.func,
		menuLoadDays: PropTypes.func,
		menuBrowseCTAShow: PropTypes.bool,
		menuBrowseCTAVisibilityChange: PropTypes.func,
		loginVisibilityChange: PropTypes.func,
		menuMobileGridViewSet: PropTypes.func.isRequired,
		basketRestorePreviousValues: PropTypes.func.isRequired,
		features: PropTypes.instanceOf(Immutable.Map),
		menuCurrentCollectionId: PropTypes.string,
		menuVariation: PropTypes.string,
		params: PropTypes.object,
		query: PropTypes.object,
		orderId: PropTypes.string,
		isLoading: PropTypes.bool,
		isAuthenticated: PropTypes.bool.isRequired,
		tariffId: PropTypes.number,
		menuLoadingBoxPrices: PropTypes.bool,
		filteredRecipesNumber: PropTypes.number,
		clearAllFilters: PropTypes.func,
	}

	static contextTypes = {
		store: PropTypes.object.isRequired,
	}

	static fetchData(args, force) {
		return fetchData(args, force)
	}

	constructor() {
		super()

		this.state = {
			mobileGridView: false,
			detailRecipe: null,
			isClient: false,
			isChrome: false,
		}
	}

	componentDidMount() {
		let isChrome = false
		if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.indexOf('Chrome/') !== -1) {
			isChrome = true
		}
		this.setState({ // eslint-disable-line react/no-did-mount-set-state
			isClient: true,
			isChrome,
		})

		const props = this.props
		const store = this.context.store

		// if server rendered
		if (props.params.orderId && props.params.orderId === store.getState().basket.get('orderId')) {
			props.basketOrderLoaded(props.params.orderId)
		}

		const forceLoad = (store.getState().basket.get('orderId') && store.getState().basket.get('orderId') !== props.params.orderId)
		// TODO: Add back logic to check what needs to be reloaded
		const query = props.query || {}
		const params = props.params || {}
		Menu.fetchData({ store, query, params }, forceLoad)

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
		const mobileGridView = this.state.mobileGridView
		const overlayShow = this.props.boxSummaryShow || this.props.menuBrowseCTAShow
		const menuFilterExperiment = this.props.features.getIn(['filterMenu', 'value'])
		const collectionsNavEnabled = this.props.features.getIn(['forceCollections', 'value']) || (this.props.features.getIn(['collections', 'value']) && (this.props.features.getIn(['collectionsNav', 'value']) !== false))

		let overlayShowCSS = null
		if (this.state.isChrome) {
			overlayShowCSS = overlayShow ? css.blur : css.willBlur
		}

		return (
			<div data-testing="menuContainer">
				<Helmet
					title="Food Delivery | Try Our Recipe Kits | Gousto"
					meta={[
						{
							name: 'description',
							content: 'Food delivery is simple with Gousto\'s popular recipe kit boxes. Receive fresh and seasonal ingredients straight to your home with FREE delivery',
						},
						{
							name: 'keywords',
							content: 'Gousto, recipe delivery, ingredients, fresh, healthy food, cooking',
						},
					]}
					style={[{
						cssText: `
							body .zopim {
								bottom: 75px !important;
								-webkit-transition: -webkit-filter 0.3s;
								-webkit-filter: blur(0px);
								@media (max-width: 767px) {
									display: none !important;
								}
							}
						`,
					}]}
				/>
				<div className={classnames(css.container, overlayShowCSS)}>
					<SubHeader
						viewIcon={(mobileGridView) ? 'iconSingleColumn' : 'iconDoubleColumn'}
						onToggleGridView={this.toggleGridView}
						orderId={this.props.orderId}
					/>
					{menuFilterExperiment && <FilterTagsNav />}
					{menuFilterExperiment && <FilterNav />}
					{this.props.isLoading && !overlayShow ? <div className={css.loadingContainer}><div className={css.loading}><Loading /></div></div> : null}
					<div className={this.props.isLoading && !overlayShow ? css.fadeOut : css.willFade} data-testing="menuRecipes">
						{collectionsNavEnabled && !menuFilterExperiment && <CollectionsNav masonryContainer={this.masonryContainer} menuCurrentCollectionId={this.props.menuCurrentCollectionId} />}
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
								{(() => (
									<Overlay open={!!this.props.menuRecipeDetailShow && this.state.isClient && this.props.recipesStore.has(this.props.menuRecipeDetailShow)}>
										{(() => {
											if (this.props.recipesStore) {
												const recipeId = this.props.menuRecipeDetailShow
												const detailRecipe = this.props.recipesStore.get(recipeId)
												if (this.props.menuRecipeDetailShow && detailRecipe) {
													const stock = this.props.stock.getIn([recipeId, String(this.props.numPortions)])
													const surcharge = getSurcharge(detailRecipe.get('meals'), this.props.numPortions)
													const IsFineDineIn = detailRecipe.get('range') === 'fine_dine_in'
													const view = (IsFineDineIn) ? 'fineDineInDetail' : 'detail'
													const images = (IsFineDineIn) ? getRangeImages(detailRecipe) : null

													return (
														<Detail
															view={view}
															tag={getLowStockTag(stock, detailRecipe.getIn(['rating', 'count']))}
															media={getFeaturedImage(detailRecipe, 'detail')}
															images={images}
															title={detailRecipe.get('title', '')}
															count={detailRecipe.getIn(['rating', 'count'], 0)}
															average={detailRecipe.getIn(['rating', 'average'], 0)}
															perPortion={detailRecipe.getIn(['nutritionalInformation', 'perPortion'], Immutable.Map({}))}
															per100Grams={detailRecipe.getIn(['nutritionalInformation', 'per100g'], Immutable.Map({}))}
															ingredients={detailRecipe.get('ingredients', Immutable.List([]))}
															allergens={detailRecipe.get('allergens', Immutable.List([]))}
															id={detailRecipe.get('id')}
															recipeId={recipeId}
															stock={stock}
															useWithin={detailRecipe.get('shelfLifeDays')}
															cookingTime={this.props.numPortions === 2 ? detailRecipe.get('cookingTime') : detailRecipe.get('cookingTimeFamily')}
															description={detailRecipe.get('description')}
															availability={detailRecipe.get('availability')}
															youWillNeed={detailRecipe.get('basics')}
															cuisine={detailRecipe.get('cuisine')}
															diet={detailRecipe.get('dietType')}
															equipment={detailRecipe.get('equipment')}
															surcharge={surcharge}
															range={detailRecipe.get('range', '')}
														/>
													)
												}
											}

											return null
										})()}
									</Overlay>
								))()}
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
