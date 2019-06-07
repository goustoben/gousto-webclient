import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './CollectionItem.css'

const CollectionItem = ({ className, dataId, onClick, identifier, element, children, count, showCount, slug }) => (
  <div
    data-id={dataId}
    className={classnames(css.item, className)}
    onClick={onClick}
    key={identifier}
    ref={element}
    data-slug={slug}
  >
    {children}
    {showCount && <span className={css.count}>{count}</span>}
  </div>
)

CollectionItem.propTypes = {
  dataId: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  identifier: PropTypes.string,
  element: PropTypes.func,
  children: PropTypes.node,
  count: PropTypes.number,
  showCount: PropTypes.bool,
  slug: PropTypes.sting,
}

CollectionItem.defaultProps = {
  count: 0,
  showCount: true,
}

export default CollectionItem
