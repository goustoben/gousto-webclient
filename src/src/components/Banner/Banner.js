import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Button } from 'goustouicomponents'
import { onEnter } from 'utils/accessibility'
import css from './Banner.css'

const Banner = ({ hide, onClick, text, linkText, fixed, fixedText }) => (
  <div
    role="button"
    onClick={() => { onClick() }}
    onKeyDown={(e) => { onEnter(e, onClick) }}
    tabIndex={0}
    className={classnames(
      css.container,
      css.link,
      { [css.hide]: hide },
      { [css.fixed]: fixed }
    )}
  >
    <p className={css.text}>{fixed ? fixedText : text}&nbsp;</p>
    <Button color="tertiary">{linkText}</Button>
  </div>
)

Banner.propTypes = {
  hide: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  linkText: PropTypes.string,
  fixed: PropTypes.bool,
  fixedText: PropTypes.string,
}

Banner.defaultProps = {
  fixed: false,
  fixedText: '',
}

export default Banner
