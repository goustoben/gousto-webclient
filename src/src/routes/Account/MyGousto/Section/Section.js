import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Section.css'

const propTypes = ({
  title: PropTypes.string,
  largeTitle: PropTypes.bool,
  alternateColour: PropTypes.bool,
  children: PropTypes.node,
})

const getTitleElement = (title, largeTitle) => {
  if (!title) return null

  if (largeTitle) {
    return <h2 className={css.title}><span className={css.titleText}>{title}</span></h2>
  } else {
    return <h3 className={css.title}><span className={css.titleText}>{title}</span></h3>
  }
}

const Section = ({ title, largeTitle, alternateColour, children }) => (
  <div className={classnames(css.wrapper, { [css.alternateBackground]: alternateColour })}>
    <div className={css.content}>
      {getTitleElement(title, largeTitle)}
      {children}
    </div>
  </div>
)

Section.propTypes = propTypes

export { Section }
