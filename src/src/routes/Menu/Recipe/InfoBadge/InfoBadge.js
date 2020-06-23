import PropTypes from 'prop-types'
import React from 'react'
import css from './InfoBadge.css'

const getTagStyle = (theme) => ({ ...theme, border: theme.borderColor ? '1px solid' : 'none' })

const InfoBadge = ({ type = 'span', brandTag }) => {
  if (brandTag) {
    const { theme, text } = brandTag

    return React.createElement(type, { className: css.badge, style: getTagStyle(theme) }, text)
  }

  return React.createElement(type)
}

InfoBadge.propTypes = {
  type: PropTypes.string,
  brandTag: PropTypes.shape({
    text: PropTypes.string,
    theme: PropTypes.object,
  })
}

InfoBadge.defaultProps = {
  type: 'span',
  brandTag: null
}

export { InfoBadge }
