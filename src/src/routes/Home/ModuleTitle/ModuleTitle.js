import React, { Fragment } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Heading } from 'goustouicomponents'
import css from './ModuleTitle.css'

const ModuleTitle = ({ title, subTitle, color }) => {
  const reverseColor = color === 'white' ? css.whiteColor : ''

  return (
    <Fragment>
      <div className={classNames(css.title, reverseColor)}>
        <Heading size="fontStyle2XL" hasMargin={false} isCenter>
          {title}
        </Heading>
      </div>
      {subTitle && (
        <div className={css.subtitleContainer}>
          <p className={classNames(css.subtitleP, reverseColor)}>{subTitle}</p>
        </div>
      )}
    </Fragment>
  )
}

ModuleTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.oneOf(['white', 'grey']),
}

ModuleTitle.defaultProps = {
  subTitle: '',
  color: 'grey',
}

export { ModuleTitle }
