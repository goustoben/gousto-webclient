import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './Banner.css'

const Banner = ({ title, version }) => (
	<div className={classnames(css.banner, version ? css[`on${version}`] : '')}>
		<div className={css.bannerInner}>
			<h1 className={css.bannerTitle}>{title}</h1>
		</div>
	</div>
)

Banner.propTypes = {
  title: PropTypes.string,
  version: PropTypes.string,
}

Banner.defaultProps = {
  title: '',
  version: 'Desktop',
}

export default Banner
