import React, { PropTypes } from 'react'

import InfoBadge from '../InfoBadge'
import { getRangeBadge } from 'utils/recipe'
import colors from 'styles/colors.css'

const RangeBadge = ({ range }) => {
  const rangeBadge = getRangeBadge(range)

  return (rangeBadge) ? (
		<InfoBadge
		  style={{
		    color: colors[rangeBadge.color],
		    backgroundColor: colors[rangeBadge.backgroundColor],
		    borderColor: colors[rangeBadge.borderColor],
		  }}
		>
			{rangeBadge.text}
		</InfoBadge>
  ) : null
}

RangeBadge.propTypes = {
  range: PropTypes.string,
}

export default RangeBadge
