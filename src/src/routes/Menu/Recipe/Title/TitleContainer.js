import { connect } from 'react-redux'
import { Title } from './Title'
import { getRecipeTitle } from '../../selectors/recipe'

const mapStateToProps = (state, ownProps) => ({
  title: getRecipeTitle(state, ownProps)
})

const TitleContainer = connect(mapStateToProps)(Title)

export { TitleContainer }
