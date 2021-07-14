import PropTypes from 'prop-types'

const CategoryPropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  box_limit: PropTypes.number,
  is_default: PropTypes.bool,
  recently_added: PropTypes.bool,
  hidden: PropTypes.bool,
  pivot: PropTypes.shape({
    created_at: PropTypes.string,
  }),
})

const AttributesPropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  unit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.string,
})

const MediaPropType = PropTypes.shape({
  src: PropTypes.string,
  url: PropTypes.string,
  width: PropTypes.number
})

const MediaObjectPropType = PropTypes.shape({
  50: MediaPropType,
  200: MediaPropType,
  400: MediaPropType,
  700: MediaPropType,
  1000: MediaPropType,
  1500: MediaPropType,
})

export const SidePropType = PropTypes.shape({
  id: PropTypes.string,
  sku: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['product']),
  description: PropTypes.string,
  list_price: PropTypes.string,
  is_vatable: PropTypes.bool,
  is_for_sale: PropTypes.bool,
  age_restricted: PropTypes.bool,
  box_limit: PropTypes.number,
  always_on_menu: PropTypes.bool,
  volume: PropTypes.number,
  zone: PropTypes.string,
  created_at: PropTypes.string,
  categories: PropTypes.arrayOf(CategoryPropType),
  attributes: PropTypes.arrayOf(AttributesPropType),
  // We don't know what tags looks like.
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array,
  images: MediaObjectPropType,
})
