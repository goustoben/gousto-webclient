import React from 'react'
import PropTypes from 'prop-types'

import { recipePropTypes } from 'Recipe'
import css from './SmallRecipe.css'
import Title from '../Title'
import Image from '../Image'
import AddButton from '../AddButton'
import DisabledOverlay from '../DisabledOverlay'

const SmallRecipe = ({onClick, media, title, view, id, stock, inBasket, position, surcharge}) => (
  <div>
    <div className={css.recipeDetails}>
      <div className={css.link} onClick={onClick}>
        <Image
          media={media}
          alt={title}
          view={view}
        />
      </div>
      <div className={css.textContainer}>
        <span onClick={onClick} className={css.linkUnderlined}>
          <Title
            title={title}
            view={view}
          />
        </span>
        <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} surcharge={surcharge} />
        <DisabledOverlay stock={stock} inBasket={inBasket} />
      </div>
    </div>
  </div>
)

SmallRecipe.propTypes = {
  ...recipePropTypes,
  id: PropTypes.string.isRequired,
  position: PropTypes.number,
  inBasket: PropTypes.bool,
}

SmallRecipe.defaultProps = {
  view: 'gridSmall',
}

export default SmallRecipe
