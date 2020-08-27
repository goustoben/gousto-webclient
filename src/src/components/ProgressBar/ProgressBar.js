import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { Div, Li, Span, Ul } from 'Page/Elements'
import Icon from 'Icon'

import css from './ProgressBar.css'

const ProgressBar = ({ currentId, items, isCheckoutRedesignEnabled }) => {
  const activeIndex = items && items.findIndex(item => item.id === currentId)

  return items ? (
    <Ul
      className={classNames(css.list, { [css.checkoutRedesign]: isCheckoutRedesignEnabled })}
      d-flex
      flex-nowrap
    >
      {items.map(({ id, label } = {}, index) => (
        <Li
          className={classNames(
            css.listItem,
            {
              [css.activeItem]: index === activeIndex,
              [css.pastItem]: index < activeIndex,
              [css.futureItem]: index > activeIndex,
            },
          )}
          d-block
          key={id}
          font-weight-bold
          relative
          text-center
          text-md-left
          text-uppercase
          w-100
        >
          <Div
            className={css.content}
            d-block
            text-truncate
            w-100
          >
            <Span
              className={classNames(css.number, css.text, { [css.checkoutRedesign]: isCheckoutRedesignEnabled })}
              padding={{
                left: 'XXS',
                right: 'XXS',
              }}
            >
              {index < activeIndex
                ? <Icon name="fa-check" />
                : (index + 1)}
            </Span>
            {isCheckoutRedesignEnabled
              ? (
                <Span className={classNames(css.checkoutRedesign, css.tick)}>
                  {index < activeIndex && <Icon name="fa-check" />}
                </Span>
              )
              : null}
            <Span
              className={classNames(css.text, css.hiddenSMDown, { [css.checkoutRedesign]: isCheckoutRedesignEnabled })}
              padding={{
                left: 'XXS',
                right: 'XXS',
              }}
            >
              {label}
            </Span>
          </Div>
          <Div
            absolute
            className={css.arrow}
          />
        </Li>
      ))}
    </Ul>
  ) : null
}

ProgressBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  currentId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isCheckoutRedesignEnabled: PropTypes.bool
}

ProgressBar.defaultProps = {
  isCheckoutRedesignEnabled: false
}

export default ProgressBar
