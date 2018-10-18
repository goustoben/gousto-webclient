import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './ReceiptLine.css'

const ReceiptLine = ({ label, children, style, showLineAbove }) => (
	<div>
	{
		showLineAbove
		? <div className={css.horizontalLineAbove}></div>
		: null
	}
		<p
			className={classnames(css.receiptLine,
				{ [css.small]: style === 'small' },
				{ [css.normal]: style === 'normal' },
				{ [css.bold]: style === 'bold' },
				{ [css.primary]: style === 'primary' },
				{ [css.highlighted]: style === 'highlighted' })}
		>
			<span className={classnames(css.label, { [css.truncateLabel]: style === 'truncateLabel' })}>{label}</span>
			<span className={css.content}>{children}</span>
		</p>
	</div>
)

ReceiptLine.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.oneOf(['small', 'normal', 'bold', 'primary', 'highlighted', 'truncateLabel']),
	showLineAbove: PropTypes.bool,
}

ReceiptLine.defaultProps = {
	showLineAbove: false,
}

export default ReceiptLine
