import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
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
    strongText: 'Over 50 recipes',
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

export const TextFrame = ({ signupGoToMenu, isFullWidth }) => (
  <div className={css.textFrame}>
    <h1 className={css.heading}>Get your taste buds ready...</h1>
    <ul className={css.list}>
      {items.map(({ key, className, strongText, normalText }) => (
        <li key={key} className={classNames(css.item, className)}>
          <span className={css.strong}>{strongText}</span> {normalText}
        </li>
      ))}
    </ul>
    <CTA onClick={signupGoToMenu} isFullWidth={isFullWidth}>
      See this week’s menu
    </CTA>
  </div>
)

TextFrame.propTypes = {
  signupGoToMenu: PropTypes.func.isRequired,
  isFullWidth: PropTypes.bool.isRequired,
}
