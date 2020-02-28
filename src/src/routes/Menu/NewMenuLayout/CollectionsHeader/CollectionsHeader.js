import PropTypes from 'prop-types'
import React from 'react'
import css from './CollectionsHeader.css'

const CollectionsHeader = ({currentCollectionTitle}) => (
  <div className={css.titleHeader}>
    {currentCollectionTitle}
  </div>
)
CollectionsHeader.propTypes = {
  currentCollectionTitle: PropTypes.string.isRequired
}
export { CollectionsHeader }
