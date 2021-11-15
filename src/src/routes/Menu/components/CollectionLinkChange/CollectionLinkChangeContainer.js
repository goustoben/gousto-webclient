import { connect } from 'react-redux'
import { CollectionLinkChange } from './CollectionLinkChange'
import { collectionFilterChange } from "actions/filters/collectionFilterChange"

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeCollection: () => {
    if (typeof ownProps.onClick === 'function') {
      ownProps.onClick()
    }

    dispatch(collectionFilterChange(ownProps.collectionId))
  }
})

const CollectionLinkChangeContainer = connect(null, mapDispatchToProps)(CollectionLinkChange)

export { CollectionLinkChangeContainer }
