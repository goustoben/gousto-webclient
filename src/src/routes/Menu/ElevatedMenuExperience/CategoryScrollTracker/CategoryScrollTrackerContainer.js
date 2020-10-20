import { connect } from 'react-redux'
import { trackCategoryScroll } from '../../actions/menuCategoryTrackScroll'
import { CategoryScrollTracker } from './CategoryScrollTracker'
import { getCurrentCollectionId, getCurrentCollectionSlug } from '../../selectors/collections'

function mapStateToProps(state, props) {
  return {
    categoryId: getCurrentCollectionId(state, props),
    categorySlug: getCurrentCollectionSlug(state, props)
  }
}

const mapDispatchToProps = {
  trackCategoryScroll,
}

const CategoryScrollTrackerContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryScrollTracker)

export { CategoryScrollTrackerContainer }
