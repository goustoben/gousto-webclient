import React from 'react'
import PropTypes from 'prop-types'

import { Card, ItemExpandable } from 'goustouicomponents'
import { client } from 'config/routes'
import Link from '../../../../components/Link'
import layoutCss from '../../layouts/GetHelpLayout2/GetHelpLayout2.css'

const ISSUE_TYPES_MAPPING = {
  MISSING_INGREDIENTS: ['3'],
  WRONG_INGREDIENTS: ['4'],
  DAMAGED_INGREDIENTS: ['22'],
  INGREDIENT_QUALITY: ['13', '14', '17', '18', '20', '21'],
}

const getIssuesTypes = (issuesIDs, issueTypesMapping) => {
  const issueTypes = {}

  Object.keys(issueTypesMapping).forEach((issueType) => {
    issueTypes[issueType] = issueTypesMapping[issueType].find(id => issuesIDs.includes(id))
  })

  return issueTypes
}

const ARTICLE_NAME_1 = 'Where can I view my credit?'
const ARTICLE_NAME_2 = 'What happens next with my feedback?'

const GetHelpFAQ = ({ issuesIDs, onClick }) => {
  const issueTypes = getIssuesTypes(issuesIDs, ISSUE_TYPES_MAPPING)
  const hasIssueTypes = Object.values(issueTypes).find(issueType => issueType)
  const { MISSING_INGREDIENTS, WRONG_INGREDIENTS, DAMAGED_INGREDIENTS, INGREDIENT_QUALITY } = getIssuesTypes(issuesIDs, ISSUE_TYPES_MAPPING)
  const trackClick = (articleName) => () => onClick(articleName)

  return (
    <section>
      <Card
        hasLateralBordersOnSmallScreens={false}
        hasPaddingVertical={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <ItemExpandable trackClick={trackClick(ARTICLE_NAME_1)} label={ARTICLE_NAME_1}>
          <p>If you&apos;d like to check how much credit is on your account:</p>

          <p>
            <strong>On the website:</strong>
            <br />
            Log in to &apos;My Gousto&apos; and select the&nbsp;
            <Link to={client.myDetails} clientRouted={false}>
              Account Details
            </Link>
            &nbsp;tab.
          </p>

          <p>
            <strong>In the app:</strong>
            <br />
            Go to &apos;Profile&apos; and then &apos;Account Details&apos;.
          </p>

          <p>Your credit won&apos;t show up at checkout, but don&apos;t worry. It will be deducted automatically from your next order when we process the payment at 12pm (noon), 4 days before your scheduled delivery date.</p>

          <p>You can also spend your credit in Gousto Market - where you can treat yourself to desserts, wine, beer, kitchen equipment and more.</p>
        </ItemExpandable>
      </Card>
      {hasIssueTypes && (
        <Card
          hasLateralBordersOnSmallScreens={false}
          hasPaddingVertical={false}
          className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
        >
          <ItemExpandable trackClick={trackClick(ARTICLE_NAME_2)} label={ARTICLE_NAME_2}>
            {
              (
                MISSING_INGREDIENTS || WRONG_INGREDIENTS
              ) && (
                <p>For missing and wrong ingredients, your feedback will be shared with our factory so we can look for trends and reduce this kind of mistake.</p>
              )
            }
            {
              INGREDIENT_QUALITY && (
                <p>For low quality ingredients we will use your feedback to help our supplier improve the quality checks on this ingredient.</p>
              )
            }
            {
              DAMAGED_INGREDIENTS && (
                <p>For damaged ingredients our factory team will will review the picking line where your box was packed to ensure this doesn&apos;t happen again.</p>
              )
            }
          </ItemExpandable>
        </Card>
      )}
    </section>
  )
}

GetHelpFAQ.propTypes = {
  issuesIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
}

GetHelpFAQ.defaultProps = {
  onClick: () => {},
}

export {
  GetHelpFAQ
}
