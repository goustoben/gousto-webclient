import React, { PropTypes } from 'react'
import Immutable from 'immutable' // eslint-disable no-caps

import config from 'config/basket'
import Button from 'Button'
import Segment from 'Button/Segment'
import Tooltip from 'Tooltip'
import BoxSummary from 'BoxSummary'
import Title from 'BoxSummary/Title'
import Description from 'BoxSummary/Description'
import RecipeList from 'BoxSummary/RecipeList'
import BoxSummaryButton from 'BoxSummary/BoxSummaryButton'
import css from './BoxSummaryDesktop.css'
import BrowseCTA from '../BrowseCTA'
import BrowseCTAButton from '../BrowseCTAButton'

import { basketSum, okRecipes } from 'utils/basket'
import { getBoundingClientRect } from 'utils/DOMhelper'

class BoxSummaryDesktop extends React.Component {
	static propTypes = {
		date: PropTypes.string,
		deliveryDays: PropTypes.instanceOf(Immutable.Map),
		numPortions: PropTypes.number.isRequired,
		recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
		menuRecipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
		showDetails: PropTypes.bool.isRequired,
		boxDetailsVisibilityChange: PropTypes.func.isRequired,
		basketRestorePreviousValues: PropTypes.func.isRequired,
		slotId: PropTypes.string,
		orderId: PropTypes.string,
		menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
		stock: PropTypes.instanceOf(Immutable.Map).isRequired,
		boxSummaryCurrentView: PropTypes.string,
		basketCheckedOut: PropTypes.bool,
		disabled: PropTypes.bool.isRequired,
		menuFetchPending: PropTypes.bool,
		hasUnavailableRecipes: PropTypes.bool,
		orderSaveError: PropTypes.string,
		boxSummaryNext: PropTypes.func.isRequired,
		displayOptions: PropTypes.instanceOf(Immutable.List),
		maxRecipesNum: PropTypes.number,
		pricingPending: PropTypes.bool,
	}

	static defaultProps = {
		deliveryDays: Immutable.fromJS([]),
		displayOptions: Immutable.fromJS([]),
		maxRecipesNum: config.maxRecipesNum,
		basketCheckedOut: false,
	}

	state = {
		hideTooltip: false,
	}

	componentDidMount() {
		if (getBoundingClientRect(this.ref).width > 0 && this.props.hasUnavailableRecipes && this.props.orderSaveError === 'no-stock') {
			this.props.boxDetailsVisibilityChange(true, 'desktop')
		}
		if (this.tooltipError()) {
			this.hideTooltipDelay = setTimeout(() => {
				if (!this.state.hideTooltip) {
					this.setState({
						hideTooltip: true,
					})
				}
			}, 15000)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.showDetails && !this.props.showDetails) {
			window.document.addEventListener('click', this.handleClick, false)
		} else if (!nextProps.showDetails) {
			window.document.removeEventListener('click', this.handleClick, false)
		}
	}

	componentWillUnmount() {
		if (this.hideTooltipDelay) {
			clearTimeout(this.hideTooltipDelay)
		}
	}

	tooltipError() {
		const showTooltip = Boolean(this.props.orderSaveError) && this.props.orderSaveError !== 'no-stock'

		if (!showTooltip) {
			return false
		}

		if (this.state.hideTooltip) {
			return false
		}

		switch (this.props.orderSaveError) {
			case 'basket-expired':
				return 'Sorry, your box has expired. Please re-add your recipe choices to continue.'
			default:
				return 'Sorry, there has been an issue saving your order. Please try again or contact customer care.'
		}
	}

	handleClick = (e) => {
		if (this.props.showDetails && e.type === 'keyup' && e.keyCode && e.keyCode === 27) {
			this.close()
		}
	}

	open = () => {
		this.props.boxDetailsVisibilityChange(true, 'desktop')
	}

	close = () => {
		this.props.boxDetailsVisibilityChange(false, 'desktop')
		this.props.basketRestorePreviousValues()
	}

	toggle = (show) => {
		if (show) {
			this.open()
		} else {
			this.close()
		}
	}

	numRecipes = () => (
		basketSum(okRecipes(this.props.recipes, this.props.menuRecipes, this.props.stock, this.props.numPortions))
	)

	renderErrorTooltip(children, key) {
		const tootlError = this.tooltipError()

		return (
			<Tooltip
				key={key}
				message={tootlError}
				visible={Boolean(tootlError)}
				style="button"
				overlayClassName={css.errorTooltipDesktop}
				className={css.errorMessage}
			>
				{children}
			</Tooltip>
		)
	}

	renderBrowseCTA = () => (
		[
			this.renderErrorTooltip(<BrowseCTAButton view="desktop" key={0} />, 0),
			<BrowseCTA view="desktop" key={1} />,
		]
	)

	renderButton = () => (
		[
			<div className={css.bsButton} key={0}>
				<Button fill={this.props.showDetails} className={css.overflowFix} color="secondary" pending={this.props.pricingPending}>
					<Segment fill={this.props.showDetails} onClick={() => { this.toggle(!this.props.showDetails && !this.props.pricingPending) }} className={css.summaryDesktopSegment} color="secondary">
						<div>
							{this.numRecipes() > 0 ? <span className={css.badge}>{this.numRecipes()}</span> : ''}
							<Title view="desktop" date={this.props.date} finalisedSlot={this.props.slotId !== ''} />
							{this.props.displayOptions.includes('hideButtonDescription')
								? null
								: <Description
									numPortions={this.props.numPortions}
									numRecipes={this.numRecipes()}
									view="desktop"
									deliveryOptions={this.props.slotId === ''}
									warning={!this.props.menuFetchPending && this.numRecipes() !== basketSum(this.props.recipes)}
								/>
							}
						</div>
						<span className={css.iconDesktop}>
							<span className={this.props.showDetails ? css.arrowDown : css.arrowUp} ></span>
						</span>
					</Segment>
				</Button>
			</div>,

			this.renderErrorTooltip(
				<BoxSummaryButton
					view="desktop"
					recipes={this.props.recipes}
					showDetails={this.props.showDetails}
					open={this.open}
					boxSummaryCurrentView={this.props.boxSummaryCurrentView}
					checkoutPending={this.props.basketCheckedOut}
					orderSaveError={this.props.orderSaveError}
					menuRecipes={this.props.menuRecipes}
					stock={this.props.stock}
					numPortions={this.props.numPortions}
					key={1}
					boxSummaryNext={this.props.boxSummaryNext}
				/>, 1,
			),
		]
	)

	renderBanner = () => {
		const { date, disabled, displayOptions, maxRecipesNum, menuRecipesStore, recipes } = this.props
		const shouldHide = displayOptions.includes('hideRecipeList')

		return (
			<div className={css.bardesktop} ref={(element) => { this.ref = element }} data-testing="menuBottomBarDesktop">
				<RecipeList view="desktop" invisible={shouldHide} recipes={recipes} menuRecipesStore={menuRecipesStore} maxRecipesNum={maxRecipesNum} />
				<span className={css.buttonsContainer}>
					{date === '' || disabled ? this.renderBrowseCTA() : this.renderButton()}
				</span>
			</div>
		)
	}

	renderOverlay = () => (
		<div className={css.supercontainerdesktop}>
			<div className={this.props.showDetails ? css.detailContainerdesktopShow : css.detailContainerdesktop}>
				<span>
					<div className={css.closeBtn} onClick={this.close}></div>
					<BoxSummary
						displayOptions={this.props.displayOptions}
						recipes={this.props.recipes}
						date={this.props.date}
						numPortions={this.props.numPortions}
						showDetails={this.props.showDetails}
						orderSaveError={this.props.orderSaveError}
						boxDetailsVisibilityChange={this.toggle}
						view="desktop"
					/>
				</span>
			</div>
		</div>
	)

	render() {
		return (
			<div className={css.desktop} data-testing="menuBottomBarDesktop">
				{this.renderBanner()}
				{this.renderOverlay()}
			</div>
		)
	}
}

export default BoxSummaryDesktop
