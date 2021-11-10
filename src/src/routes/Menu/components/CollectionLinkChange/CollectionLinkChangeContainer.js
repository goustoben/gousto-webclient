import { connect } from 'react-redux'
import { actions } from 'actions'
import { CollectionLinkChange } from './CollectionLinkChange'

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeCollection: () => {
    if (typeof ownProps.onClick === 'function') {
      ownProps.onClick()
    }

    dispatch(actions.collectionFilterChange(ownProps.collectionId))
  }
})

const CollectionLinkChangeContainer = connect(null, mapDispatchToProps)(CollectionLinkChange)

export { CollectionLinkChangeContainer }
