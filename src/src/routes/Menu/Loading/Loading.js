import React from 'react'
import PropTypes from 'prop-types'
import LoadingComponent from 'Loading'
import Image from 'Image'
import Svg from 'Svg'
import css from './Loading.css'

const propTypes = {
	loading: PropTypes.bool,
	hasRecommendations: PropTypes.bool,
}

const defaultProps = {
	loading: false,
	hasRecommendations: false,
}

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

const Loading = ({ loading, hasRecommendations }) => (
	(loading) ? (
		<div className={css.container}>
			{(hasRecommendations) ? (
				<div className={css['container--recommendations']}>
					<div className={css['loading--recommendations']}>
						<Image media={getImage('recommendations-loading.gif')} title="animation" className={css.spinner} />
						<p className={css['loading-text']}>
							<span className={css['loading-text__title']}>Stirring up recipes</span>
							<span className={css['loading-text__sub']}>Just for y</span>
							<Svg className={css.icon} fileName="icon-heart" />
							<span className={css['loading-text__sub']}>u</span>
						</p>
					</div>
				</div>
			) : (
				<div className={css.loading}>
					<LoadingComponent />
				</div>
			)}
		</div>
 ) : null

)

Loading.propTypes = propTypes

Loading.defaultProps = defaultProps

export default Loading
