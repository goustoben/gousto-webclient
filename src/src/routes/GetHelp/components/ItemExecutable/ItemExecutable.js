import React, { PropTypes } from 'react'

import css from './ItemExecutable.css'

const ItemExecutable = ({ label, onClick }) => (
	<div className={css.itemContent} onClick={() => onClick()}>
		{label}
		<span className={css.itemArrowRight} />
	</div>
)

ItemExecutable.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
}

ItemExecutable.defaultProps = {
	onClick: () => {}
}

export default ItemExecutable
