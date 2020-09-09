import { connect } from 'react-redux'
import actions from 'actions'
import { showCategoriesModal } from '../../../actions/menuCategoriesModal'
import { CategoriesShortcuts } from './CategoriesShortcuts'

const mapDispatchToProps = {
  collectionFilterChange: actions.collectionFilterChange,
  showCategoriesModal
}

const CategoriesShortcutsContainer = connect(null, mapDispatchToProps)(CategoriesShortcuts)

export { CategoriesShortcutsContainer }
