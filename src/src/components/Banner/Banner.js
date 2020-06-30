import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Button } from 'goustouicomponents'
import typography from 'design-language/typography.css'
import css from './Banner.css'

const Banner = ({ hide, onClick, text, linkText, isHomePageRedesignEnabled }) => (
  <div
    role="button"
    tabIndex="0"
    onClick={() => { onClick() }}
    className={classnames(
      css.container,
      css.link,
      {
        [css.hide]: hide,
        [css.homepageRedesign]: isHomePageRedesignEnabled
      },
    )}
  >
    <p className={classnames(css.text, { [typography.fontStyleM]: isHomePageRedesignEnabled })}>
      {text}
&nbsp;
    </p>
    <Button className={classnames({ [typography.fontStyleSubHead]: isHomePageRedesignEnabled, [css.button]: isHomePageRedesignEnabled })} color="tertiary">{linkText}</Button>
  </div>
)

Banner.propTypes = {
  hide: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  linkText: PropTypes.string,
  isHomePageRedesignEnabled: PropTypes.bool,
}

Banner.defaultProps = {
  isHomePageRedesignEnabled: false
}

export default Banner
