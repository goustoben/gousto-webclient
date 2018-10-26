import React from 'react'
import css from './Banner.css'
import classnames from 'classnames'

const Banner = ({ title, version }) => (
	<div className={classnames(css.banner, version ? css[`on${version}`] : '')}>
		<div className={css.bannerInner}>
			<h1 className={css.bannerTitle}>{title}</h1>
		</div>
	</div>
)

Banner.propTypes = {
	title: React.PropTypes.string,
	version: React.PropTypes.string,
}

Banner.defaultProps = {
	title: '',
	version: 'Desktop',
}

export default Banner
