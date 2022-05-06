import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InformationalPageTemplate } from 'routes/Signup/Components/InformationalPageTemplate'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton/CheckoutButton'
import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import css from './SellThePropositionPage.css'

export const items = [
  {
    key: 'itemValue',
    className: css.itemValue,
    strongText: 'Greater value',
    normalText: 'the more recipes you add',
  },
  {
    key: 'itemRecipes',
    className: css.itemRecipes,
    strongText: 'Over 60 recipes',
    normalText: 'changing weekly',
  },
  {
    key: 'itemSkip',
    className: css.itemSkip,
    strongText: 'Choose 2 to 4 recipes',
    normalText: 'or skip a box',
  },
  {
    key: 'itemDietary',
    className: css.itemDietary,
    strongText: 'Meals for every appetite',
    normalText: 'and dietary need',
  },
]

const goustoOnDemandItems = [
  {
    key: 'itemRecipes',
    className: css.itemRecipes,
    strongText: '60+ recipes',
    normalText: 'with a new menu every week',
  },
  {
    key: 'itemSelection',
    className: css.itemSelection,
    strongText: 'Choose 2, 3 or 4 recipes',
    normalText: 'in your box',
  },
  {
    key: 'itemEnvironmental',
    className: css.itemEnvironmental,
    strongText: '23% less carbon emissions',
    normalText: 'than the same shop at a supermarket',
  },
  {
    key: 'itemWorldCuisine',
    className: css.itemWorldCuisine,
    strongText: 'Meals for every appetite',
    normalText: 'and dietary need',
  },
]

export const SellThePropositionPage = ({ signupGoToMenu, isGoustoOnDemandEnabled }) => {
  const displayedItems = isGoustoOnDemandEnabled ? goustoOnDemandItems : items

  return (
    <InformationalPageTemplate
      testingSelector="sellThePropositionPage"
      isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
      headerText="Get your taste buds ready..."
    >
      <ul className={css.list}>
        {displayedItems.map(({ key, className, strongText, normalText }) => (
          <li key={key} className={classNames(css.item, className)}>
            <span className={css.strong}>{strongText}</span> {normalText}
          </li>
        ))}
      </ul>
      <CheckoutButton onClick={signupGoToMenu} isFullWidth testingSelector="sellThePropositionCTA">
        See this week’s menu
      </CheckoutButton>
      <RibbonTriggerContainer name="wizard-proposition" />
    </InformationalPageTemplate>
  )
}

SellThePropositionPage.propTypes = {
  signupGoToMenu: PropTypes.func.isRequired,
  isGoustoOnDemandEnabled: PropTypes.bool,
}

SellThePropositionPage.defaultProps = {
  isGoustoOnDemandEnabled: false,
}
