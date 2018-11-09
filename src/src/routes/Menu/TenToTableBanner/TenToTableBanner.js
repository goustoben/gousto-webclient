import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './TenToTableBanner.css'
import config from 'config/menu'
import Gel from 'Gel'
import Icon from 'Icon'
import { Button, Segment } from 'goustouicomponents'

class Banner extends React.PureComponent {
	static defaultProps = {
	  hide: false,
	}

	static propTypes = {
	  hide: PropTypes.bool,
	  collectionFilterChange: PropTypes.func,
	}

	viewTenToTable = () => {
	  const { collectionFilterChange } = this.props
	  collectionFilterChange(config.tenToTableBanner.collection)
	}

	render() {
	  const { hide } = this.props

	  return (
	    hide ? null :
				<div className={classnames(css.container, { [css.hide]: hide })}>
					<div className={css.contentContainer}>
						<Gel className={css.gelMain} size="large">
							<p className={css.gelMainText}>{config.tenToTableBanner.gelMain.text}</p>
							<p className={css.gelMainTitle}>{config.tenToTableBanner.gelMain.title}</p>
						</Gel>
						<Gel className={css.gelOne} size="small">
							<p className={css.gelOneTitle}>{config.tenToTableBanner.gelOne.title}</p>
							<p className={css.gelOneText}>{config.tenToTableBanner.gelOne.text}</p>
						</Gel>
						<Gel className={css.gelTwo} size="small">
							<p className={css.gelTwoTitle}>{config.tenToTableBanner.gelTwo.title}</p>
							<p className={css.gelTwoText}>{config.tenToTableBanner.gelTwo.text}</p>
						</Gel>
						<Button className={css.button} color="secondary">
							<Segment onClick={() => { this.viewTenToTable() }}>
								View <span className={css.mobileHide}>all</span> <Icon name="fa-angle-right" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} />
							</Segment>
						</Button>
					</div>
				</div>
	  )
	}
}

export default Banner
