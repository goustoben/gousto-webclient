import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import config from 'config'
import css from './GridRecipeSmallTiles.css'
import Image from '../../Recipe/Image'
import Rating from '../../Recipe/Rating'
import AddButton from '../../Recipe/AddButton'
import Title from '../../Recipe/Title'
import { AttributeGrid } from '../../Recipe/AttributeGrid'

const GridRecipeSmallTiles = ({ onClick, media, title, view,
  stock, averageRating, ratingCount, cookingTime, useWithin,
  inBasket, position, id, fiveADay, isNew, diet,
  highlight, unhighlight, detailHover
}) => {
  const outOfStock = stock <= config.menu.stockThreshold && stock !== null && !inBasket

  return (
    <div className={classnames(css.smallRecipeTile, {[css.recipeHover]: detailHover})}>
      <span onClick={() => onClick(id)} onKeyPress={() => onClick(id)} role="button" tabIndex="0" className={css.recipeImage}>
        <Image
          media={media}
          alt={title}
          stock={stock}
          inBasket={inBasket}
          mouseEnter={highlight}
          mouseLeave={unhighlight}
        />
      </span>
      <div className={css.recipeContentWrapper}>
        <div onClick={() => onClick(id)} onKeyPress={() => onClick(id)} role="button" tabIndex="0" className={css.titleWrapper}>
          <Title
            title={title}
            view={view}
            mouseEnter={highlight}
            mouseLeave={unhighlight}
            detailHover={detailHover}
          />
        </div>
        <div>
          {outOfStock || (
            <Rating
              average={averageRating}
              count={ratingCount}
              isNew={isNew}
            />
          )}
        </div>
        <div className={css.recipeAttributes}>
          {outOfStock || (
          <AttributeGrid
            maxNoAttributes={2}
            cookingTime={cookingTime}
            useWithin={useWithin}
            fiveADay={fiveADay}
            diet={diet}
          />
          )}
        </div>
        <RecipeDisclaimerContainer id={id} />
        <div className={css.buttonContainer}>
          <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} />
        </div>
      </div>
    </div>
  )
}

GridRecipeSmallTiles.propTypes = {
  id: PropTypes.string.isRequired,
  inBasket: PropTypes.bool,
  averageRating: PropTypes.number,
  cookingTime: PropTypes.number.isRequired,
  ratingCount: PropTypes.number,
  useWithin: PropTypes.string.isRequired,
  fiveADay: PropTypes.number,
  view: PropTypes.string,
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  stock: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
  diet: PropTypes.string.isRequired,
  highlight: PropTypes.func.isRequired,
  unhighlight: PropTypes.func.isRequired,
  detailHover: PropTypes.bool.isRequired
}

GridRecipeSmallTiles.defaultProps = {
  view: 'grid',
  averageRating: 0,
  ratingCount: 0,
  fiveADay: 0,
  inBasket: false
}

export { GridRecipeSmallTiles }
