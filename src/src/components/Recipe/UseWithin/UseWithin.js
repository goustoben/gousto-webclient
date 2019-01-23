import React from 'react'
import css from './UseWithin.css'

const UseWithin = ({ useWithin }) => {
  const useWithinFormatted = String(useWithin).replace(/(\d)-(\d)/, '$1 - $2')

  return (
		<div>
			<span className={css.icon} /><span className={css.description}>&nbsp;Use within {useWithinFormatted} days</span>
		</div>
  )
}

UseWithin.propTypes = {
  useWithin: React.PropTypes.string.isRequired,
}

export default UseWithin
