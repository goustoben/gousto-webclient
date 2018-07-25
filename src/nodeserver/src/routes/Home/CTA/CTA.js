import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Button from 'Button'
import Segment from 'Button/Segment'
import css from './CTA.css'

const CTA = ({ onClick, children, withContainer, align, responsive, dataTesting }) => (
	<div className={classnames(withContainer ? css.buttonContainer : css.buttonSimple, responsive ? css.buttonResponsive : '', css[align])}>
		<Button width="full" data-testing={dataTesting}>
			<Segment onClick={onClick} className={responsive ? css.segmentResponsive : css.segment}>{children}</Segment>
		</Button>
	</div>
)

CTA.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.element,
	]).isRequired,
	withContainer: PropTypes.bool,
	align: PropTypes.string,
	responsive: PropTypes.bool,
	dataTesting: PropTypes.string,
}

CTA.defaultProps = {
	withContainer: true,
	align: 'center',
	responsive: false,
}

export default CTA
