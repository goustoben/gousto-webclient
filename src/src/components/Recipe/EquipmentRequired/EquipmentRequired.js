import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import Icon from 'Icon'
import { Div, Span } from 'Page/Elements'

const blankSpace = String.fromCharCode(160)

const EquipmentRequired = ({ equipment, view }) => (
	equipment && equipment.size ? (
		<Div>
			<Icon
				name="fa-spoon"
				fixedWidth
			/>
			<Span
				paragraphXS
			>
				{blankSpace}{view === 'list' ? equipment.toJS().join(', ') : 'Equipment required'}
			</Span>
		</Div>
	) : null
)

EquipmentRequired.propTypes = {
	equipment: PropTypes.instanceOf(Immutable.List).isRequired,
	view: PropTypes.oneOf(['notice', 'list']),
}

EquipmentRequired.defaultProps = {
	view: 'list',
}

export default EquipmentRequired
