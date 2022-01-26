import React from 'react'
import PropTypes from 'prop-types'
import css from './Section.module.css'

const Section = ({ title, subTitle, children, testingSelector}) => (
  <section className={css.sectionWrapper} data-testing={testingSelector}>
    <h2 className={css.sectionTitle}>{title}</h2>
    {subTitle ? <h3 className={css.sectionSubTitle}>{subTitle}</h3> : null}
    {children}
  </section>
)

Section.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  testingSelector: PropTypes.string,
}

Section.defaultProps = {
  subTitle: null,
  testingSelector: null
}

export { Section }
