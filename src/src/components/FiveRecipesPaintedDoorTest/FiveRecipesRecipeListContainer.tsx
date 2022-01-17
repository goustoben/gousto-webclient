import { connect } from 'react-redux'
import { FiveRecipesRecipeList } from './FiveRecipesRecipeList'

interface Props {
    pricing: {
        getIn: (args: string[]) => any
    }
}

const mapStateToProps = (state: Props) => ({
  fullPrice: state.pricing.getIn(['prices', 'pricePerPortion']),
  discountedPrice: state.pricing.getIn(['prices', 'pricePerPortionDiscounted'])
})

export const FiveRecipesRecipeListContainer = connect(mapStateToProps)(FiveRecipesRecipeList)
