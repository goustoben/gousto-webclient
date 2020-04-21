import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import config from 'config'
import { recipePropTypes } from 'routes/Menu/Recipe'
import { getChef } from 'utils/recipe'
import { RangeBadge } from 'routes/Menu/Recipe/RangeBadge'
import { Pill } from 'goustouicomponents'
import css from './FineDineInRecipe.css'
import Title from '../Title'
import { AddButton } from '../AddButton'
import { RecipeAttribute } from '../RecipeAttribute'
import { SoldOutOverlay } from '../SoldOutOverlay'

const propTypes = {
  ...recipePropTypes,
  id: PropTypes.string.isRequired,
  position: PropTypes.number,
  chef: PropTypes.shape({
    media: PropTypes.shape({
      images: PropTypes.array,
    }),
    name: PropTypes.string,
    celebrity: PropTypes.bool,
  }),
  inBasket: PropTypes.bool.isRequired,
  cookingTime: PropTypes.number.isRequired,
  highlight: PropTypes.func,
  unhighlight: PropTypes.func,
  detailHover: PropTypes.bool,
  isFoodBrandClickable: PropTypes.bool,
  selectFoodBrand: PropTypes.func,
  view: PropTypes.string,
}

const defaultProps = {
  view: 'fineDineIn',
  chef: Immutable.Map({}),
  media: Immutable.List([]),
}

const FineDineInRecipe = ({ media, onClick, selectFoodBrand, isFoodBrandClickable, highlight, unhighlight,
  title, view, detailHover, cookingTime, chef,
  stock, inBasket, position, id, range }) => {
  const image = media.find(url => url.get('width') === 700) || Immutable.Map({})
  const outOfStock = stock <= config.menu.stockThreshold && stock !== null && !inBasket

  return (
    <div className={css.overlay}>
      <div style={{ backgroundImage: `url(${image.get('src')})` }} className={css.recipeCover}>

        <div className={css.viewDetails}>
          {outOfStock || (
          <Pill
            mouseEnter={highlight}
            mouseLeave={unhighlight}
            onClick={() => { onClick(true) }}
            icon
          >
            View details
          </Pill>
          )}
        </div>
        <div className={css.rangeBadgeWrapper}>
          <RangeBadge range={range} selectFoodBrand={selectFoodBrand} isFoodBrandClickable={isFoodBrandClickable} />
        </div>
        <div
          role="button"
          tabIndex={0}
          className={css.clickContainer}
          onClick={onClick}
          onKeyPress={onClick}
          onMouseEnter={highlight}
          onMouseLeave={unhighlight}
        >
          <SoldOutOverlay stock={stock} inBasket={inBasket} />
        </div>
        <div className={css.recipeDetails}>
          <div className={css.textContainer}>
            <div
              role="link"
              tabIndex={0}
              onClick={onClick}
              onKeyPress={onClick}
              className={classnames(css.linkUnderlined, { [css.linkIfChef]: getChef(chef) })}
            >
              <Title
                title={title}
                view={view}
                mouseEnter={highlight}
                mouseLeave={unhighlight}
                detailHover={detailHover}
              />
            </div>
            <div className={css.badgeItem}>
              {
                (!outOfStock)
                  && (
                  <RecipeAttribute name="cookingTime" value={cookingTime} icon="icon-time-white" />
                  )
              }
            </div>
            <div className={css.buttonContainer}>
              <div className={css.addButton}>
                <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

FineDineInRecipe.propTypes = propTypes

FineDineInRecipe.defaultProps = defaultProps

export { FineDineInRecipe }
