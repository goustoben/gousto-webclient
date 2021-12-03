import React from 'react'
import PropTypes from 'prop-types'
import {
  collectionDescriptorsInLinesPropType,
  collectionDescriptorsLinePropType,
} from '../propTypes'
import { LineOfPills } from './LineOfPills'
import css from './CollectionPicker.module.css'

export const CollectionPicker = ({
  collectionDescriptorsInLines,
  collectionDescriptorsSingleLine,
  currentCollectionId,
  changeCollection,
}) => (
  <React.Fragment>
    <div className={css.collectionPickerFixedLines}>
      {collectionDescriptorsInLines.map((line, index) => (
        /* eslint-disable react/no-array-index-key */
        <LineOfPills
          key={index}
          line={line}
          currentCollectionId={currentCollectionId}
          changeCollection={changeCollection}
        />
        /* eslint-enable react/no-array-index-key */
      ))}
    </div>
    <div className={css.collectionPickerWrappedLines}>
      <LineOfPills
        line={collectionDescriptorsSingleLine}
        currentCollectionId={currentCollectionId}
        changeCollection={changeCollection}
        wrap
      />
    </div>
  </React.Fragment>
)

CollectionPicker.propTypes = {
  collectionDescriptorsInLines: collectionDescriptorsInLinesPropType.isRequired,
  collectionDescriptorsSingleLine: collectionDescriptorsLinePropType.isRequired,
  currentCollectionId: PropTypes.string,
  changeCollection: PropTypes.func.isRequired,
}

CollectionPicker.defaultProps = {
  currentCollectionId: null,
}
