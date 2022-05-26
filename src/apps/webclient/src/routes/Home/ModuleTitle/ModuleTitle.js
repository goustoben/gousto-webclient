import React, { Fragment } from 'react'

import { Heading } from 'goustouicomponents'
import PropTypes from 'prop-types'

import css from './ModuleTitle.css'

const ModuleTitle = ({ title, subTitle }) => (
  <Fragment>
    <div className={css.title}>
      <Heading size="fontStyle2XL" hasMargin={false} isCenter>
        {title}
      </Heading>
    </div>
    {subTitle && (
      <div className={css.subtitleContainer}>
        <p className={css.subtitleP}>{subTitle}</p>
      </div>
    )}
  </Fragment>
)

ModuleTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

ModuleTitle.defaultProps = {
  subTitle: '',
}

export { ModuleTitle }
