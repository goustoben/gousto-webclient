import { connect } from 'react-redux'
import { trackCategoryScroll } from '../../actions/menuCategoryTrackScroll'
import { getCurrentCollectionId, getCurrentCollectionSlug } from '../../selectors/collections'
import { CategoryScrollTracker } from './CategoryScrollTracker'

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
