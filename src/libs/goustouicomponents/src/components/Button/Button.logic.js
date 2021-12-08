import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { ButtonPresentation } from './Button.presentation'
import { Segment } from '../Segment'
import { Tooltip } from '../Tooltip'
import css from './Button.module.css'

const propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'negative']),
  disabled: PropTypes.bool,
  noDecoration: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.oneOf(['auto', 'full']),
  fill: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.oneOf([
      PropTypes.instanceOf(Segment),
      PropTypes.instanceOf(Tooltip),
    ]),
    PropTypes.arrayOf([
      PropTypes.instanceOf(Segment),
      PropTypes.instanceOf(Tooltip),
    ]),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  pending: PropTypes.bool,
  spinnerClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  'data-testing': PropTypes.string,
  /* indicates if the children should be always wrapped in <Segment> (which has the
     * (filling styles), no matter the type of the children */
  areChildrenInSegment: PropTypes.bool,
}

const defaultProps = {
  color: 'primary',
  className: '',
  fill: true,
  width: 'auto',
  disabled: false,
  noDecoration: false,
  onClick: () => {},
  pending: false,
  spinnerClassName: '',
  spinnerContainerClassName: '',
  'data-testing': '',
  areChildrenInSegment: false,
}

const cloneChildren = (
  children, props, fill, onClick,
) => (
  React.Children.map(
    children, (child) => {
      if (child.type === Tooltip && child.props.children.type === Segment) {
        return (
          <Tooltip
            {...child.props} // eslint-disable-line react/jsx-props-no-spreading
          >
            {React.cloneElement(
              child.props.children, props,
            )}
          </Tooltip>
        )
      } else if (typeof child === 'string' || props.areChildrenInSegment) {
        return (
          <Segment
            {...props} // eslint-disable-line react/jsx-props-no-spreading
            fill={fill}
            onClick={onClick}
          >
            {child}
          </Segment>
        )
      }

      return (
        React.cloneElement(
          child, props,
        )
      )
    },
  )
)

const Button = ({
  children, color, disabled, noDecoration, className, width, fill, onClick, pending, spinnerClassName, spinnerContainerClassName, 'data-testing': dataTesting, areChildrenInSegment,
}) => {
  const classNames = {
    [className]: className,
    [css.disabled]: (disabled || pending),
    [css.widthAuto]: (width === 'auto'),
  }
  const spinnerClassNames = {
    [css.spinnerContainer]: true,
    [spinnerContainerClassName]: true,
    [css.spinnerShow]: pending,
  }

  const clonedChildren = cloneChildren(
    children, {
      color,
      width,
      btnDisabled: disabled,
      'data-testing': dataTesting,
      noDecoration,
      areChildrenInSegment,
    }, fill, onClick,
  )

  let spinnerColor = 'white'
  if (color === 'secondary') spinnerColor = 'bluecheese'
  else if (color === 'negative') spinnerColor = 'radish'

  return (
    <ButtonPresentation
      computedKey={React.Children.count(children)}
      color={color}
      className={classnames(
        css.container, css[color], css[fill ? 'fill' : 'noFill'], classNames,
      )}
      spanClassName={classnames(
        css.spinner, spinnerClassName,
      )}
      spinnerClassNames={classnames(spinnerClassNames)}
      spinnerColor={spinnerColor}
      dataTesting={dataTesting}
    >
      {clonedChildren}
    </ButtonPresentation>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export {
  Button,
}
