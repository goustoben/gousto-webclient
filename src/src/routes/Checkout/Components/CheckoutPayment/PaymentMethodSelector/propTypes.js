import PropTypes from 'prop-types'

const itemType = {
  itemType: PropTypes.oneOf(['label', 'svg']).isRequired,
  className: PropTypes.string,
  hide: PropTypes.bool,

  // only if itemType="label"
  text: PropTypes.string,

  // only if itemType="svg"
  fileName: PropTypes.string,
}

export const methodDescriptorPropType = PropTypes.shape({
  paymentMethod: PropTypes.string.isRequired,
  leftItem: itemType.isRequired,
  rightItem: itemType.isRequired,
})
