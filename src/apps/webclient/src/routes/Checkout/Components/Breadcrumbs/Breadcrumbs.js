import { Box, Space, Icon, Link, Color, Text, FontFamily } from '@gousto-internal/citrus-react'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Breadcrumbs.css'

const Breadcrumbs = ({ currentId, items, trackCheckoutNavigationLinks, lastReachedStepIndex }) => {
  const trackNavigation = (label) => () => trackCheckoutNavigationLinks(label)

  return (
    <>
      <Space size={0.5} direction="vertical" />
      <Box paddingH={[4, 8]}>
        <ul className={css.breadcrumbsList}>
          {items.map(({ id, label }, index) => (
            <li key={id} className={css.listItem}>
              {index > lastReachedStepIndex ? (
                <span className={css.futureItem}>{label}</span>
              ) : (
                /* eslint-disable-next-line */
                <Link
                  onClick={() => `/check-out/${id}`}
                  tracking={trackNavigation(label)}
                  color={Color.Secondary_400}
                  padding="0.25rem"
                >
                  <Text size={1} fontFamily={id === currentId ? FontFamily.Bold : FontFamily.UI}>
                    {label}
                  </Text>
                </Link>
              )}
              <Space size={1} direction="horizontal" />
              <Icon
                name="chevron_right"
                display={index === items.length - 1 ? 'none' : 'inline-block'}
                width="1.5rem"
                height="1.5rem"
              />
              <Space size={1} direction="horizontal" />
            </li>
          ))}
        </ul>
      </Box>
      <Space size={6} direction="vertical" />
    </>
  )
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trackCheckoutNavigationLinks: PropTypes.func.isRequired,
  lastReachedStepIndex: PropTypes.number.isRequired,
}

export { Breadcrumbs }
