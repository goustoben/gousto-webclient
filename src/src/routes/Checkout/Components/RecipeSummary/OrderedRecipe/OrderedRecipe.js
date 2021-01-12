import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'
import config from 'config/menu'
import GoustoImage from 'Image'
import Button from '../Buttons'
import css from './OrderedRecipe.css'

export const OrderedRecipes = ({
  title,
  recipeId,
  stock,
  media,
  basics,
  serving,
  featureBtn,
  featureLink,
  view,
  isFineDineIn,
  isCheckoutOverhaulEnabled,
}) => (
  <div className={classnames(css.container, { [css.redesignContainer]: isCheckoutOverhaulEnabled })}>
    <GoustoImage media={media} title={title} className={classnames(css[`${view}Img`], { [css.redesignImg]: isCheckoutOverhaulEnabled })} />
    <div className={classnames(
      css.recipeContainer,
      css[`${view}Flex`],
      { [css.redesignRecipeContainer]: isCheckoutOverhaulEnabled }
    )}
    >
      <div className={css.recipeName}>
        <span className={classnames({
          [css.link]: featureLink,
          [css.details]: !featureLink,
          [css.detailsRedesign]: isCheckoutOverhaulEnabled,
        })}
        >
          <span className={classnames({
            [css.textBold]: !isCheckoutOverhaulEnabled,
            [css.redesignRecipeName]: isCheckoutOverhaulEnabled,
          })}
          >
            {title}
          </span>
          {(featureLink) ? <span className={css.arrowRight} /> : null}
        </span>
        {isFineDineIn ? <span className={css.detailsRow}><span className={css.fineDineIn}>Fine Dine In</span></span> : null}
        {(basics.size > 0 && view === 'boxdetails' && !isCheckoutOverhaulEnabled) ? (
          <p className={css.details}>
            <span className={css.basics}>
              You&apos;ll need:
              {' '}
              {basics.toJS().join(', ')}
            </span>
          </p>
        ) : null}
        {!isCheckoutOverhaulEnabled && <span className={css.textSM}>{`${serving} Servings`}</span>}
        {(featureBtn) && (
          <Button
            view="checkout"
            recipeId={recipeId}
            outOfstock={stock <= config.stockThreshold && stock !== null}
            stock={stock}
            disabled={false}
            showControl
          />
        )}
      </div>
    </div>
  </div>
)

OrderedRecipes.propTypes = {
  title: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  basics: PropTypes.instanceOf(Immutable.List),
  stock: PropTypes.number,
  serving: PropTypes.number,
  featureBtn: PropTypes.bool,
  featureLink: PropTypes.bool,
  media: PropTypes.instanceOf(Immutable.List),
  view: PropTypes.oneOf(['boxdetails', 'summary']),
  isFineDineIn: PropTypes.bool.isRequired,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

OrderedRecipes.defaultProps = {
  basics: Immutable.List([]),
  stock: 0,
  serving: 0,
  media: Immutable.List([]),
  featureBtn: false,
  featureLink: false,
  view: 'boxdetails',
  isCheckoutOverhaulEnabled: false,
}
