import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import { DuplicateOrderModalContainer } from './DuplicateOrderModalContainer'

export const DuplicateOrderModalWrapper = ({ visible }) => (
  <Overlay open={visible} from="top">
    <DuplicateOrderModalContainer />
  </Overlay>
)

DuplicateOrderModalWrapper.propTypes = {
  visible: PropTypes.bool,
}

DuplicateOrderModalWrapper.defaultProps = {
  visible: false,
}
