import PropTypes from 'prop-types'
import React from 'react'
import css from './Header.css'
import Title from 'Overlay/Title'
import CloseButton from 'Overlay/CloseButton'

const Header = ({ onClose, title, children }) => (
	<div className={css.container}>
		<div className={css.content}>
			<Title title={title} />
			<CloseButton onClose={onClose} />
		</div>

		{children}
	</div>
)

Header.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default Header
