import PropTypes from 'prop-types'

export const datesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    date: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
  })
)

export const slotsPropType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
  coreSlotId: PropTypes.string,
  disabled: PropTypes.bool,
})
