import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './CollectionsNavigationItem.module.css'

const propTypes = {
  children: PropTypes.string.isRequired,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  setActive: PropTypes.func,
}

const defaultProps = {
  index: null,
  isActive: false,
  setActive: () => {},
}

const CollectionsNavigationItem = ({
  children, index, isActive, onClick, setActive,
}) => {
  const wrapperClasses = classnames(
    css.item,
    {
      [css.isActive]: isActive,
    },
  )

  return (
    <button
      className={wrapperClasses}
      onClick={() => {
        onClick()
        setActive(index)
      }}
      type="button"
    >
      {children}
    </button>
  )
}

CollectionsNavigationItem.defaultProps = defaultProps
CollectionsNavigationItem.propTypes = propTypes

export {
  CollectionsNavigationItem,
}
