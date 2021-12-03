import React from 'react'
import classNames from 'classnames'
import css from './InformationBox.module.css'

const items = [
  { iconClassName: 'icon-menu', text: 'New menu', secondary: 'every Tuesday' },
  { iconClassName: 'icon-recipes', text: 'Over 50 recipes', secondary: 'to choose from' },
  { iconClassName: 'icon-meals', text: 'Meals for every appetite', secondary: 'and dietary need' },
  { iconClassName: 'icon-fresh', text: 'Fresh ingredients', secondary: 'from trusted suppliers' },
]

export const InformationBox = () => (
  <React.Fragment>
    <div className={css.informationBoxToLarge}>
      <div className={css.informationContainer}>
        <ul className={css.informationToLarge}>
          {items.map(({ iconClassName, text, secondary }) => (
            <li key={iconClassName} className={css.item}>
              <div className={classNames(css.icon, css[iconClassName])} />
              <div className={css.explanation}>
                <span className={css.primaryLine}>{text}&nbsp;</span>
                <span className={css.secondaryLine}>{secondary}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.seedsBottom} />
    </div>
    <div className={css.informationBoxFromLarge}>
      <div className={css.seedsLeft} />
      <div className={css.informationFromLarge}>
        {items.map(({ iconClassName, text, secondary }) => (
          <div key={iconClassName} className={css.item}>
            <div className={classNames(css.icon, css[iconClassName])} />
            <div className={css.primaryLine}>{text}</div>
            <div className={css.secondaryLine}>{secondary}</div>
          </div>
        ))}
      </div>
      <div className={css.seedsRight} />
    </div>
  </React.Fragment>
)
