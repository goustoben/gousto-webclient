import { connect } from 'react-redux'
import { collectionFilterChange } from 'actions/filters'
import { hideCategoriesModal } from '../../actions/menuCategoriesModal'
import { getDisplayedCollections } from '../../selectors/collections'
import { CategoriesModal } from './CategoriesModal'

function mapStateToProps(state) {
  return {
    showCategoriesModal: state.menu.get('isCategoriesModalVisible'),
    menuCollections: getDisplayedCollections(state),
  }
}

const mapDispatchToProps = {
  hideCategoriesModal,
  collectionFilterChange,
}

const CategoriesModalContainer = connect(mapStateToProps, mapDispatchToProps)(CategoriesModal)

export { CategoriesModalContainer }
