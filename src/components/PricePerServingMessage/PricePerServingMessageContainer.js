import { connect } from 'react-redux'
import { PricePerServingMessage } from './PricePerServingMessage'

const mapStateToProps = (state) => ({
  fullPrice: state.pricing.getIn(['prices', 'pricePerPortion']),
  discountedPrice: state.pricing.getIn(['prices', 'pricePerPortionDiscounted'])
})

export const PricePerServingMessageContainer = connect(mapStateToProps)(PricePerServingMessage)
