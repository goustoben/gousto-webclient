import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './BoostAndBalanceBanner.css'
import config from 'config/menu'
import Gel from 'Gel'

const Banner = ({ hide }) => (
  hide ? null :
		<div className={classnames(css.container, { [css.hide]: hide })}>
			<div className={css.contentContainer}>
				<Gel className={css.gelMain} size="large">
					<p className={css.gelMainTitle}>{config.balanceAndBoostBanner.gelMain.title}</p>
					<p className={css.gelMainText}>{config.balanceAndBoostBanner.gelMain.text}</p>
				</Gel>
				<Gel className={css.gelOne} size="small">
					<p className={css.gelOneTitle}>{config.balanceAndBoostBanner.gelOne.title}</p>
					<p className={css.gelOneText}>{config.balanceAndBoostBanner.gelOne.text}</p>
				</Gel>
				<Gel className={css.gelTwo} size="small">
					<p className={css.gelTwoTitle}>{config.balanceAndBoostBanner.gelTwo.title}</p>
					<p className={css.gelTwoText}>{config.balanceAndBoostBanner.gelTwo.text}</p>
				</Gel>
			</div>
		</div>
)

Banner.defaultProps = {
  hide: false,
}

Banner.propTypes = {
  hide: PropTypes.bool,
}

export default Banner
