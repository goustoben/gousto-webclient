import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'

const Portions = ({ numPortions, onNumPortionChange, trackNumPortionChange, orderId }) => (
  <Button fill={false} width="full">
    <Segment
      key={1}
      fill={numPortions === 2}
      onClick={() => {
        onNumPortionChange(2)
        trackNumPortionChange(2, orderId)
      }}
    >
      2 People
    </Segment>
    <Segment
      key={2}
      fill={numPortions === 4}
      onClick={() => {
        onNumPortionChange(4)
        trackNumPortionChange(4, orderId)
      }}
    >
      4 People
    </Segment>
  </Button>
)

Portions.propTypes = {
  numPortions: PropTypes.number.isRequired,
  onNumPortionChange: PropTypes.func.isRequired,
  trackNumPortionChange: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
}

export { Portions }
