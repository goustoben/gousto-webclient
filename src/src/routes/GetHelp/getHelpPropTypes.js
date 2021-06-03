import PropTypes from 'prop-types'

export const recipePropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  url: PropTypes.string,
})
