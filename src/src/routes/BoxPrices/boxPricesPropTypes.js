import PropTypes from 'prop-types'

export const BoxDescriptorsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    num_portions: PropTypes.number,
    price_per_portion: PropTypes.string,
    total: PropTypes.string,
  })
)
