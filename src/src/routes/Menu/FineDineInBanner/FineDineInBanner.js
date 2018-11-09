import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './FineDineInBanner.css'
import config from 'config/menu'
import Gel from 'Gel'

const Banner = ({ hide }) => (
  hide ? null :
		<div className={classnames(css.container, { [css.hide]: hide })}>
			<div className={css.contentContainer}>
				<Gel className={css.gelMain} size="large">
					<p className={css.gelMainTitle}>{config.fineDineInBanner.gelMain.title}</p>
					<p className={css.gelMainText}>{config.fineDineInBanner.gelMain.text}</p>
				</Gel>
				<Gel className={css.gelOne} size="small">
					<p className={css.gelOneTitle}>{config.fineDineInBanner.gelOne.title}</p>
					<p className={css.gelOneText}>{config.fineDineInBanner.gelOne.text}</p>
				</Gel>
				<Gel className={css.gelTwo} size="small">
					<p className={css.gelTwoTitle}>{config.fineDineInBanner.gelTwo.title}</p>
					<p className={css.gelTwoText}>{config.fineDineInBanner.gelTwo.text}</p>
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
