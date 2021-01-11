import React from 'react'
import PropTypes from 'prop-types'
import GoustoLink from 'Link'
import { LayoutContentWrapper, InfoTip } from 'goustouicomponents'
import css from './CardWithLink.css'

const CardWithLink = ({
  children,
  clientRouted,
  linkLabel,
  linkUrl,
  tooltipContent,
  trackClick
}) => (
  <div className={css.cardWrapper}>
    <LayoutContentWrapper>
      <div className={css.contentWrapper}>
        <LayoutContentWrapper>
          {children}
        </LayoutContentWrapper>
      </div>
      <div className={css.linkWrapper}>
        {tooltipContent
          && <InfoTip isCloseIconVisible>{tooltipContent}</InfoTip>}
        <GoustoLink to={linkUrl} clientRouted={clientRouted} tracking={trackClick}>
          {linkLabel}
          &nbsp;
          <span className={css.arrowRight} />
        </GoustoLink>
      </div>
    </LayoutContentWrapper>
  </div>
)

CardWithLink.propTypes = {
  children: PropTypes.node.isRequired,
  clientRouted: PropTypes.bool,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  tooltipContent: PropTypes.node,
  trackClick: PropTypes.func,
}

CardWithLink.defaultProps = {
  clientRouted: true,
  tooltipContent: null,
  trackClick: () => {},
}

export {
  CardWithLink,
}
