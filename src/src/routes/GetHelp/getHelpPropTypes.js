import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

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

export const orderPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  recipeItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeDetailedItems: PropTypes.objectOf(PropTypes.string).isRequired, // keys are recipeId, values are recipeGoustoReference
  deliverySlot: PropTypes.shape({
    deliveryEnd: PropTypes.string.isRequired,
    deliveryStart: PropTypes.string.isRequired,
  }).isRequired,
  deliveryDate: PropTypes.string.isRequired,
  trackingUrl: PropTypes.string,
  hasPassedDeliveryValidation: PropTypes.bool,
  deliveryCompensationAmount: PropTypes.number,
})

// This is not in getHelp in the store, but it's used in Get Help entry point in My Gousto
export const userOrderPropType = ImmutablePropTypes.contains({
  id: PropTypes.string.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  humanDeliveryDate: PropTypes.string.isRequired,
  phase: PropTypes.string.isRequired,
  prices: ImmutablePropTypes.contains({
    total: PropTypes.string.isRequired,
  }).isRequired,
  recipeItems: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    title: PropTypes.string,
    media: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
      type: PropTypes.string.isRequired,
      urls: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
        src: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  })),
  state: PropTypes.string.isRequired,
})
