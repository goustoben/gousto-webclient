import React, { PropTypes } from 'react'
import css from './ContentMask.css'
import colors from 'styles/colors.css'

const ContentMask = ({ fillColor }) => (
	<svg
	  className={css.container}
	  style={{
	    fill: colors[fillColor],
	  }}
	  viewBox="80.41400146484375 477.13299560546875 100.26800537109375 15.7130126953125"
	  xmlns="http://www.w3.org/2000/svg"
	  preserveAspectRatio="xMinYMin meet"
	>
		<path
		  d="M 80.215 477.072 C 102.289 492.773 152.656 498.382 180.848 477.143 L 180.835 492.965 L 80.187 493.027"
		  transform="matrix(1, 0.000113, -0.000113, 1, 0.054811, -0.014745)"
		/>
	</svg>
)

ContentMask.propTypes = {
  fillColor: PropTypes.string,
}

ContentMask.defaultProps = {
  fillColor: 'White',
}

export default ContentMask
