import React from 'react'
import PropTypes from 'prop-types'
import { Button, Segment } from 'goustouicomponents'
import classNames from 'classnames'
import { isMobile } from 'utils/view'
import css from './BannerButton.css'

const BaseBannerButton = ({
  view,
  pending,
  disabled,
  spinnerClassName,
  spinnerContainerClassName,
  onClick,
  children,
  dataTesting,
  color,
  isSimplifyBasketBarEnabled,
}) => {
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
      className={classNames({ [css.buttonIsSimplifyBasketBarEnabled]: isSimplifyBasketBarEnabled })}
    >
      <Segment
        className={classNames({
          [css.submitButton]: isMobileView && !isSimplifyBasketBarEnabled,
          [css.coButtonSegment]: !isMobileView && !isSimplifyBasketBarEnabled,
          [css.segmentIsSimplifyBasketBarEnabled]: isSimplifyBasketBarEnabled,
          [css.isDisabled]: disabled,
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  disabled: PropTypes.bool,
  spinnerClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  isSimplifyBasketBarEnabled: PropTypes.bool,
}

BaseBannerButton.defaultProps = {
  disabled: false,
  spinnerClassName: undefined,
  spinnerContainerClassName: undefined,
  onClick: undefined,
  color: 'primary',
  isSimplifyBasketBarEnabled: false,
}

export { BaseBannerButton }
