import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import InfoToggle from './InfoToggle'
import moment from 'moment'
import config from 'config/menu'
import { H3 } from 'Page/Header'
import Vegetarian from './Vegetarian'
import css from './SubHeader.css'

class SubHeader extends React.PureComponent {
	static propTypes = {
	  filterVegetarian: PropTypes.bool,
	  onFilterVegetarianChange: PropTypes.func,
	  viewIcon: PropTypes.oneOf(['iconSingleColumn', 'iconDoubleColumn']),
	  onToggleGridView: PropTypes.func,
	  fromJoin: PropTypes.bool,
	  orderRecipesNo: PropTypes.number,
	  showVegetarianFilter: PropTypes.bool,
	  isAuthenticated: PropTypes.bool,
	  showFilters: PropTypes.bool,
	}

	static defaultProps = {
	  showVegetarianFilter: true,
	  isAuthenticated: false,
	  fromJoin: false,
	  viewIcon: 'iconSingleColumn',
	  onToggleGridView: () => {},
	  onFilterVegetarianChange: () => {},
	  filterVegetarian: false,
	}

	deliveryInfo = (mobile) => (
		<InfoToggle>
			<div className={mobile ? css.mobileDeliveryInfo : css.deliveryInfo}>
				<span>
					About Delivery <span className={css.iconArrowDown} />
				</span>
			</div>
			<div>
				<div className={css.tooltipTitle}>
					<H3 headlineFont>
						How does delivery work?
					</H3>
				</div>
				<p className={css.tooltipText}>
					Our insulated box and ice packs help keep your food cool. And if you're not home, we can leave your box in your chosen safe place.
				</p>
			</div>
		</InfoToggle>
	)

	notificationBanner = () => {
	  const info = config.notification.filter(message => moment().isBetween(message.isAfter, message.isBefore)).shift()
	  const showNotificaiton = info && (info.notifyGuests || this.props.isAuthenticated)

	  return (
	    showNotificaiton ? <InfoToggle>
				<div className={css.infoBanner}>
					{info.title}&nbsp;<span className={css.infoIcon} />
				</div>
				<div className={css.infoBannerMessage}>
					{info.line1}
					<ul className={info.line2.length < 2 ? css.noBullet : ''}>
						{Object.keys(info.line2).map((line, i) => <li key={i}>{info.line2[line]}</li>)}
					</ul>
				</div>
                        </InfoToggle> : null
	  )
	}

	render() {
	  return (
			<div
			  className={classnames(
			    css[this.props.fromJoin ? 'subHeaderSimple' : 'subHeader'],
			    css.mobileHide,
			  )}
			>
				<div className={css.subHeaderContent}>
					<div className={css.filterMobile}>
						{this.props.showVegetarianFilter ? <Vegetarian onFilterVegetarianChange={this.props.onFilterVegetarianChange} filterVegetarian={this.props.filterVegetarian} mobile /> : null}
						<span onClick={this.props.onToggleGridView}>
							View <span className={css[this.props.viewIcon]} />
						</span>
					</div>
					<div className={css.filter}>
						<h1 className={css.menuTitle}>
							{this.props.orderRecipesNo > 0 ? 'Edit Recipes' : 'Choose Recipes'}
						</h1>
						<div>
							{this.notificationBanner()}
						</div>
						<div className={css.filterRight}>
							<div className={css.filterSection}>
								{this.deliveryInfo()}
							</div>
							<div className={css.filterSection}>
								{this.props.showVegetarianFilter ? <Vegetarian onFilterVegetarianChange={this.props.onFilterVegetarianChange} filterVegetarian={this.props.filterVegetarian} mobile={false} /> : null}
							</div>
						</div>
					</div>
				</div>
				<div className={css.mobile}>
					{this.deliveryInfo(true)}
					{this.notificationBanner()}
				</div>
			</div>
	  )
	}
}

export default SubHeader
