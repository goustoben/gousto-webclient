import React, { PropTypes } from 'react'
import { Button, Segment } from 'goustouicomponents'

const Portions = ({ numPortions, onNumPortionChange }) => (
	<Button
		fill={false}
		width="full"
	>
		<Segment key={1} fill={numPortions === 2} onClick={() => { onNumPortionChange(2) }}>2 People</Segment>
		<Segment key={2} fill={numPortions === 4} onClick={() => { onNumPortionChange(4) }}>4 People</Segment>
	</Button>
)

Portions.propTypes = {
	numPortions: PropTypes.number.isRequired,
	onNumPortionChange: PropTypes.func.isRequired,
}

export default Portions
