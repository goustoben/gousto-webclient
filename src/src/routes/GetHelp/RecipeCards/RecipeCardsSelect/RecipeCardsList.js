import React from 'react'
import PropTypes from 'prop-types'
import { Card, InputCheck } from 'goustouicomponents'
import { recipePropType } from '../../getHelpPropTypes'
import layoutCss from '../../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './RecipeCardsSelect.css'

const RecipeCardsList = ({ recipes, recipeIds, onInputChange }) => (
  <Card
    hasLateralBordersOnSmallScreens={false}
    className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
  >
    <div className={css.recipeCardsList}>
      {recipes.map((recipe) => {
        const label = (
          <div className={css.recipeRow}>
            <img className={css.recipeImage} src={recipe.imageUrl} alt={recipe.title} />
            <p className={css.recipeTitle}>
              {recipe.title}
            </p>
          </div>
        )

        return (
          <InputCheck
            id={recipe.id}
            key={recipe.id}
            label={label}
            onChange={onInputChange}
            defaultValue={recipeIds.includes(recipe.id)}
          />
        )
      })}
    </div>
  </Card>
)

RecipeCardsList.propTypes = {
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  recipeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onInputChange: PropTypes.func.isRequired,
}

export { RecipeCardsList }
