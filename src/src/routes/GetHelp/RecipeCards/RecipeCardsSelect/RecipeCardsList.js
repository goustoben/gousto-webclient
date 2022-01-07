import React from 'react'
import PropTypes from 'prop-types'
import { Card, InputCheck, InfoTip } from 'goustouicomponents'
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
            <img className={recipe.isRecipeCardEligible ? css.recipeImage : css.recipeImageDisabled} src={recipe.imageUrl} alt={recipe.title} />
            <p className={css.recipeTitle}>
              {recipe.title}
            </p>
          </div>
        )

        return (
          <div className={css.recipeCardInputCheck} key={recipe.id}>
            <InputCheck
              id={recipe.id}
              label={label}
              onChange={onInputChange}
              defaultValue={recipeIds.includes(recipe.id)}
              testingSelector="getHelpRecipeSelect"
              disabled={!recipe.isRecipeCardEligible}
            />
            {!recipe.isRecipeCardEligible && (
            <InfoTip isCloseIconVisible={false} color="lightGrey" position="relative">
              You have already requested a printed card for this recipe.
            </InfoTip>
            )}
          </div>
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
