import { connect } from 'react-redux'

import { FiveRecipesAwarenessModal as Modal } from './FiveRecipesAwarenessModal'

const mapStateToProps = (state: any) => ({
  pricePerPortionDiscounted: parseFloat(
    state.menuBoxPrices.getIn(['2', '5', 'gourmet', 'pricePerPortionDiscounted'], 0),
  ),
  pricePerPortion: parseFloat(
    state.menuBoxPrices.getIn(['2', '5', 'gourmet', 'pricePerPortion'], 0),
  ),
})

export const FiveRecipesAwarenessModal = connect(mapStateToProps)(Modal)
