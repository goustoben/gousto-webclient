import PropTypes from 'prop-types'

export const collectionDescriptorsLinePropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string.isRequired,
    shortTitle: PropTypes.string.isRequired,
  })
)

export const collectionDescriptorsInLinesPropType = PropTypes.arrayOf(
  collectionDescriptorsLinePropType
)
