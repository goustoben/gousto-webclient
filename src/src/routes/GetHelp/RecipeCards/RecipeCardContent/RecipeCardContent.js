import React from 'react'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { windowOpen } from 'utils/window'
import css from './RecipeCardContent.css'
import { recipePropType } from '../../getHelpPropTypes'

const propTypes = {
  recipe: recipePropType,
  trackRecipeCardClick: PropTypes.func.isRequired,
  trackRecipeCardGetInTouchClick: PropTypes.func.isRequired,
}

const defaultProps = {
  recipe: { id: '', title: '', ingredients: [] }
}

const redirectToContactPage = () => {
  browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
}

const RecipeCardContent = ({ recipe, trackRecipeCardClick, trackRecipeCardGetInTouchClick }) => {
  const { id } = recipe

  const redirectToCookbook = () => {
    trackRecipeCardClick(id)
    windowOpen(`${client.cookbookRecipeById}/${id}`)
  }

  return (
    <div>
      <div className={css.textButtonContainer}>
        <p className={css.text}>{'If it\'s missing or damaged, you can find this recipe detail in the cookbook.'}</p>
        <CTA
          size="small"
          onClick={redirectToCookbook}
        >
          View recipe
        </CTA>
      </div>
      <div className={css.textButtonContainer}>
        <p className={css.text}>If you want a replacement card, please get in touch.</p>
        <CTA
          size="small"
          onClick={() => {
            trackRecipeCardGetInTouchClick()
            redirectToContactPage()
          }}
          variant="secondary"
        >
          Get in touch
        </CTA>
      </div>
    </div>
  )
}

RecipeCardContent.propTypes = propTypes
RecipeCardContent.defaultProps = defaultProps

export { RecipeCardContent }
