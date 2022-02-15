import { connect } from 'react-redux'
import { Title } from './Title'

const mapStateToProps = state => ({
  pending: state.pricing.get('pending'),
  recipeTotal: parseFloat(state.pricing.getIn(['prices', 'grossTotal'], 0)),
  recipeDiscount: parseFloat(state.pricing.getIn(['prices', 'totalDiscount'], 0)),
  recipeTotalDiscounted: parseFloat(state.pricing.getIn(['prices', 'total'], 0)),
})

const TitleContainer = connect(mapStateToProps, {})(Title)

export { TitleContainer }
