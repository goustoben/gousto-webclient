import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CategoriesHeader } from './CategoriesHeader'
import { getCurrentCollectionShortTitle } from '../../selectors/collections'

function mapStateToProps(state, props) {
  return {
    categoryTitle: props.categoryTitle ? props.categoryTitle : getCurrentCollectionShortTitle(state)
  }
}

const CategoriesHeaderContainer = connect(mapStateToProps)(CategoriesHeader)

CategoriesHeaderContainer.propTypes = {
  categoryTitle: PropTypes.string
}

export { CategoriesHeaderContainer }
