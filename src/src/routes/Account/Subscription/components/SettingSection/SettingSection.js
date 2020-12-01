import React from 'react'
import {
  ExpandableSection,
  CTA,
} from 'goustouicomponents'
import PropTypes from 'prop-types'

import { iconNames } from '../Icon'
import { ExpandedContent } from './ExpandedContent'
import { SettingSectionToggle } from './SettingSectionToggle'

import css from './SettingSection.css'

export const SettingSection = ({
  children,
  ctaText,
  icon,
  isMobile,
  onEditClick,
  onSubmit,
  renderCurrentValue,
  title,
  instruction,
  testingSelector,
  extraClass,
  isCtaDisabled
}) => (
  <ExpandableSection
    allowOverflow
    disableAnimation
    onExpand={onEditClick}
    className={extraClass}
    renderToggle={({ isExpanded, handleClick }) => (
      <SettingSectionToggle
        isExpanded={isExpanded}
        icon={icon}
        title={title}
        handleClick={handleClick}
        isMobile={isMobile}
        renderCurrentValue={renderCurrentValue}
        testingSelector={testingSelector}
      />
    )}
    contentClassName={css.expandedContent}
  >
    {({ collapseSection, isExpanded }) => {
      const handleCollapseAndSubmit = (e) => {
        collapseSection(e)
        onSubmit()
      }

      return (
        <ExpandedContent
          isExpanded={isExpanded}
          isMobile={isMobile}
          title={instruction}
          collapseSection={collapseSection}
        >
          {children}
          <div className={css.ctaContainer}>
            <CTA
              isDisabled={isCtaDisabled}
              isFullWidth
              onClick={handleCollapseAndSubmit}
              testingSelector={`${testingSelector}-save-cta`}
            >
              {ctaText}
            </CTA>
          </div>
        </ExpandedContent>
      )
    }}
  </ExpandableSection>
)

SettingSection.propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  renderCurrentValue: PropTypes.node.isRequired,
  ctaText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  instruction: PropTypes.string.isRequired,
  testingSelector: PropTypes.string,
  isCtaDisabled: PropTypes.bool,
  extraClass: PropTypes.string
}

SettingSection.defaultProps = {
  isMobile: false,
  testingSelector: '',
  isCtaDisabled: false,
  extraClass: ''
}
