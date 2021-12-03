import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { collectionDescriptorsLinePropType } from '../propTypes'
import { Pill } from './Pill'
import css from './CollectionPicker.module.css'

export const LineOfPills = ({ line, currentCollectionId, changeCollection, wrap }) => (
  <div className={classNames(css.line, { [css.wrap]: wrap })}>
    {line.map(({ id, slug, shortTitle }) => (
      <Pill
        key={slug}
        isActive={id === currentCollectionId}
        onClick={() => changeCollection(id, shortTitle)}
      >
        {shortTitle}
      </Pill>
    ))}
  </div>
)

LineOfPills.propTypes = {
  line: collectionDescriptorsLinePropType.isRequired,
  currentCollectionId: PropTypes.string,
  changeCollection: PropTypes.func.isRequired,
  wrap: PropTypes.bool,
}

LineOfPills.defaultProps = {
  currentCollectionId: null,
  wrap: false,
}
