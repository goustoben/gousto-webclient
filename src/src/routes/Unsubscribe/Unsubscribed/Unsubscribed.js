import PropTypes from 'prop-types'
import React from 'react'

import Link from 'Link'

import css from './Unsubscribed.module.css'

export const Unsubscribed = ({ copy }) => (
  <div>
    <Link to="/" data-testing="post-unsubscribe-cta">
      {copy.link}
      <span className={css.buttonRightIcon} />
    </Link>
  </div>
)

Unsubscribed.propTypes = {
  copy: PropTypes.shape({
    link: PropTypes.string,
  }).isRequired,
}
