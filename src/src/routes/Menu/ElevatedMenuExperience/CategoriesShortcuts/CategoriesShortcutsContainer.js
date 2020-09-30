import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import actions from 'actions'
import { showCategoriesModal } from '../../actions/menuCategoriesModal'
import { categoryShortcutClicked } from '../../actions/menuCategoryShortcuts'
import { CategoriesShortcuts } from './CategoriesShortcuts'

const mapDispatchToProps = {
  collectionFilterChange: actions.collectionFilterChange,
  showCategoriesModal,
  categoryShortcutClicked,
  push
}

const CategoriesShortcutsContainer = connect(null, mapDispatchToProps)(CategoriesShortcuts)

export { CategoriesShortcutsContainer }
