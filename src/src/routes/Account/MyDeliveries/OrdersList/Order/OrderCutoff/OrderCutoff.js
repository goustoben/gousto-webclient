import PropTypes from 'prop-types';
import React from 'react';
import css from './OrderCutoff.css'

const OrderCutoff = ({ whenCutoff }) => (
	<p className={css.cutoff}>{whenCutoff} left to edit this box</p>
)

OrderCutoff.propTypes = {
	whenCutoff: PropTypes.string,
}

OrderCutoff.defaultProps = {
	whenCutoff: '',
}

export default OrderCutoff
