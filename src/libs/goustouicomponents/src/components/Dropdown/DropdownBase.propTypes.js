import PropTypes from 'prop-types'

export const optionShape = PropTypes.shape({
  text: PropTypes.string,
  value: PropTypes.node,
  disabled: PropTypes.bool,
})

export const defaultRenderItem = ({ text }) => text
