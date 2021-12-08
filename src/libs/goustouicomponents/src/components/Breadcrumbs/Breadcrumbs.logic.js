import React from 'react'
import PropTypes from 'prop-types'
import css from './Breadcrumbs.module.css'

const defaultRenderLinkItem = (item) => <a href={item.link}>{item.label}</a>

const Breadcrumbs = ({ items, renderLinkItem }) => (
  <nav className={css.breadcrumbs}>
    <ol className={css.breadcrumbsList}>
      {items.map((item, index) => {
        const { label, testingSelector } = item

        return (
          <li
            key={`breadcrumb-${label}`}
            className={css.breadcrumbsItem}
            data-separator="/"
            data-testing={testingSelector}
          >
            {index === items.length - 1 ? (
              <span className={css.text}>{label}</span>
            ) : (
              renderLinkItem(item)
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      testingSelector: PropTypes.string,
    }),
  ).isRequired,
  renderLinkItem: PropTypes.func,
}

Breadcrumbs.defaultProps = {
  renderLinkItem: defaultRenderLinkItem,
}

export { Breadcrumbs }
