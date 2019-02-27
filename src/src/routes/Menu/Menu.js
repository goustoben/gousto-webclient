import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import classnames from 'classnames'
import Helmet from 'react-helmet'
import moment from 'moment'
import shallowCompare from 'react-addons-shallow-compare'
import { forceCheck } from 'react-lazyload'

import menu from 'config/menu'

import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import browserHelper from 'utils/browserHelper'
import MenuNoResults from './MenuNoResults'

import SubHeader from './SubHeader'
import FilterNav from './FilterNav'
import Loading from './Loading'
import FilterTagsNav from './FilterTagsNav/FilterTagsNavContainer'
import css from './Menu.css'

import DetailOverlay from './DetailOverlay'
import CollectionsNav from './CollectionsNav'
import FilterMenu from './FilterMenu'

import RecipeList from './RecipeList'
import { Banner } from './Banner'

import fetchData from './fetchData'

class Menu extends React.Component {
	static propTypes = {
	  basketOrderLoaded: PropTypes.func.isRequired,
	  menuLoadBoxPrices: PropTypes.func.isRequired,
	  menuRecipeDetailShow: PropTypes.string,
	  detailVisibilityChange: PropTypes.func,
	  boxSummaryShow: PropTypes.bool,
	  boxDetailsVisibilityChange: PropTypes.func.isRequired,
	  disabled: PropTypes.bool.isRequired,
	  boxSummaryDeliveryDaysLoad: PropTypes.func,
	  hasRecommendations: PropTypes.bool,
	  forceLoad: PropTypes.bool,
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
	  storeOrderId: PropTypes.string,
	  isLoading: PropTypes.bool,
	  isAuthenticated: PropTypes.bool.isRequired,
	  tariffId: PropTypes.number,
	  menuLoadingBoxPrices: PropTypes.bool,
	  filteredRecipesNumber: PropTypes.number,
	  clearAllFilters: PropTypes.func,
	  triggerMenuLoad: PropTypes.func,
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
		
	  if (props.params.orderId) {
	    store.dispatch(props.portionSizeSelectedTracking(props.numPortions, props.params.orderId))
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

  renderBanner = (switchoverDate) => {
    const now = moment()
    const switchoverTime = moment(switchoverDate)

    return (now.isSameOrAfter(switchoverTime, 'day')) ? (
      <Banner imageName={'menu/ef-gel.png'} type={'everyday-favourites'} color='red' />
    ) : (
      <Banner imageName={'menu/jw-portrait.jpg'} type={'joe-wicks'} color='white' fileName="jw-partner-text" />
    )
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
					{this.renderBanner(menu.efBanner.switchoverDate)}
					<SubHeader
					  viewIcon={(mobileGridView) ? 'iconSingleColumn' : 'iconDoubleColumn'}
					  onToggleGridView={this.toggleGridView}
					  orderId={this.props.orderId}
					/>
					<FilterTagsNav />
					<FilterNav showLoading={this.props.isLoading} />
					<Loading loading={showLoading} hasRecommendations={hasRecommendations} />
					<div className={fadeCss} data-testing="menuRecipes">
						{!showLoading && collectionsNavEnabled && !menuFilterExperiment &&
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
