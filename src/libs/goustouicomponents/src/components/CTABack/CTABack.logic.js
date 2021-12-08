import React from 'react'
import PropTypes from 'prop-types'
import BackArrowIcon from '../../design-language/icons/Back-Arrow.svg'
import css from './CTABack.module.css'

const onClickHandler = (url) => {
  if (!url) {
    window.history.back()
  }

  return false
}

const CTABack = ({
  label,
  testingSelector,
  url,
}) => (
  <a
    data-testing={testingSelector}
    href={url}
    className={css.link}
    onClick={() => onClickHandler(url)}
  >
    <BackArrowIcon alt="back arrow" className={css.icon} />
    <span className={css.label}>{label}</span>
  </a>
)

CTABack.propTypes = {
  label: PropTypes.string,
  testingSelector: PropTypes.string,
  url: PropTypes.string,
}

CTABack.defaultProps = {
  label: 'Back',
  testingSelector: null,
  url: null,
}

export { CTABack }
