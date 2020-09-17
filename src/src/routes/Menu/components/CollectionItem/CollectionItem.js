import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './CollectionItem.css'

const CollectionItem = ({ className, dataId, onClick, identifier, element, children, count, slug }) => (
  <div
    data-id={dataId}
    className={classnames(css.item, className)}
    onClick={onClick}
    key={identifier}
    ref={element}
    data-slug={slug}
  >
    {children}
    {<span className={css.count}>{count}</span>}
  </div>
)

CollectionItem.propTypes = {
  // this prop is used in the container
  // eslint-disable-next-line react/no-unused-prop-types
  collectionId: PropTypes.string.isRequired,
  dataId: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  identifier: PropTypes.string,
  element: PropTypes.func,
  children: PropTypes.node,
  count: PropTypes.number,
  slug: PropTypes.string,
}

CollectionItem.defaultProps = {
  count: 0,
}

export {
  CollectionItem
}
