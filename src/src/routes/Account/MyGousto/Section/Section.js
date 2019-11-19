import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Section.css'

const propTypes = {
  title: PropTypes.string,
  largeTitle: PropTypes.bool,
  alternateColour: PropTypes.bool,
  children: PropTypes.node,
  hasPaddingBottom: PropTypes.bool,
}

const defaultProps = {
  hasPaddingBottom: true,
}

const getTitleElement = (title, largeTitle) => {
  if (!title) return null

  if (largeTitle) {
    return <h2 className={css.title}><span className={css.titleText}>{title}</span></h2>
  } else {
    return <h3 className={css.title}><span className={css.titleText}>{title}</span></h3>
  }
}

const Section = ({ title, largeTitle, alternateColour, children, hasPaddingBottom }) => (
  (Children.count(children)) ? (
    <div className={classnames(css.wrapper, { [css.alternateBackground]: alternateColour })}>
      <div className={classnames(css.content, { [css.paddingBottom]: hasPaddingBottom })}>
        {getTitleElement(title, largeTitle)}
        {children}
      </div>
    </div>
  ) : null
)

Section.propTypes = propTypes
Section.defaultProps = defaultProps

export { Section }
