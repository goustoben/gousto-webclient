import React, { PropTypes } from 'react'
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
				<div className={css.loading}>
					<LoadingComponent />
				</div>
		</div>
  ) : null

)

Loading.propTypes = propTypes

Loading.defaultProps = defaultProps

export default Loading
