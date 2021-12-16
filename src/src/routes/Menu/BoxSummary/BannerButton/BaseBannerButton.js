import React from 'react'
import PropTypes from 'prop-types'
import { Button, Segment } from 'goustouicomponents'
import classnames from 'classnames'
import { isMobile } from 'utils/view'
import css from './BannerButton.css'

const BaseBannerButton = ({ view, pending, disabled, spinnerClassName, spinnerContainerClassName, onClick, children, dataTesting, color }) => {
  const isMobileView = isMobile(view)

  return (
    <Button
      disabled={disabled}
      pending={pending}
      spinnerClassName={spinnerClassName}
      spinnerContainerClassName={spinnerContainerClassName}
      width="full"
      data-testing={dataTesting}
      color={color}
    >
      <Segment
        className={classnames({
          [css.submitButton]: isMobileView,
          [css.coButtonSegment]: !isMobileView,
        })}
        onClick={onClick}
      >
        {children}
      </Segment>
    </Button>
  )
}

BaseBannerButton.propTypes = {
  view: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  dataTesting: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  disabled: PropTypes.bool,
  spinnerClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
}

BaseBannerButton.defaultProps = {
  disabled: false,
  spinnerClassName: undefined,
  spinnerContainerClassName: undefined,
  onClick: undefined,
  color: 'primary',
}

export { BaseBannerButton }
