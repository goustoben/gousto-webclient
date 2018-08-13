import { connect } from 'react-redux'
import RecipeSummary from './RecipeSummary'

function mapStateToProps(state) {
	return {
		numPortions: state.basket.get('numPortions'),
		recipes: state.basket.get('recipes'),
		menuRecipesStore: state.recipes,
		menuRecipeStock: state.menuRecipeStock,
		menuBoxPrices: state.menuBoxPrices,
	}
}

const RecipeSummaryContainer = connect(mapStateToProps, {})(RecipeSummary)

export default RecipeSummaryContainer
