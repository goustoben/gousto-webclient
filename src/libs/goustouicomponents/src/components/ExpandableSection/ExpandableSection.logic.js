import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Heading } from '../Heading'
import css from './ExpandableSection.module.css'

const renderDefaultToggle = (isExpanded, label) => (
  <div className={css.defaultToggle}>
    <div className={css.headingContainer}>
      <Heading size="fontStyleL" hasMargin={false}>
        {label}
      </Heading>
    </div>
    <div className={isExpanded ? css.arrowExpanded : css.arrowCollapsed} />
  </div>
)

export const ExpandableSection = ({
  label,
  renderToggle,
  defaultExpanded,
  className,
  contentClassName,
  children,
  onExpand,
  disableAnimation,
  allowOverflow,
}) => {
  const ACTIVE_TRANSITION = disableAnimation ? 'none' : `height ${css.duration} ease-in`

  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [height, setHeight] = useState(defaultExpanded ? null : 0)
  const [transition, setTransition] = useState(ACTIVE_TRANSITION)
  const ref = useRef(null)

  const handleClick = (e) => {
    e.preventDefault()

    const elementHeight = ref.current.scrollHeight

    if (isExpanded) {
      setTransition('none')

      window.requestAnimationFrame(() => {
        setHeight(elementHeight)
        setTransition(ACTIVE_TRANSITION)

        window.requestAnimationFrame(() => {
          setHeight(0)
        })
      })
      setIsExpanded(false)
    } else {
      setHeight(elementHeight)
      setIsExpanded(true)
      onExpand()
    }
  }

  const handleTransitionEnd = (e) => {
    if (e.target !== ref.current) {
      return
    }
    if (isExpanded) {
      setHeight(null)
    }
  }

  const isChildRenderFn = typeof children === 'function'

  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <section className={className} aria-expanded={isExpanded}>
      {renderToggle
        ? renderToggle({ handleClick, isExpanded, label })
        : (
          <button
            className={classNames(
              css.toggleContainer,
            )}
            onClick={handleClick}
            type="button"
          >
            {renderDefaultToggle(isExpanded, label)}
          </button>
        )}
      <div
        className={classNames(css.contentContainer, {
          [css.isExpanded]: isExpanded,
          [css.allowOverflow]: allowOverflow && isExpanded,
        })}
        ref={ref}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transition,
          height,
          visibility: isExpanded ? 'visible' : 'hidden',
        }}
      >
        <div
          data-testing="children"
          className={contentClassName || css.defaultContent}
        >
          {
            isChildRenderFn
              ? children({
                collapseSection: handleClick,
                isExpanded,
              })
              : children
          }
        </div>
      </div>
    </section>
  )
}

ExpandableSection.propTypes = {
  label: PropTypes.string,
  renderToggle: PropTypes.func,
  defaultExpanded: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onExpand: PropTypes.func,
  disableAnimation: PropTypes.bool,
  allowOverflow: PropTypes.bool,
}

ExpandableSection.defaultProps = {
  label: '',
  renderToggle: null,
  defaultExpanded: false,
  className: null,
  contentClassName: null,
  children: null,
  onExpand: () => { },
  disableAnimation: false,
  allowOverflow: false,
}
