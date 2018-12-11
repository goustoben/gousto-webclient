import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { BottomButton } from '../components/BottomButton'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  buttonLeftUrl: PropTypes.string,
  buttonRightUrl: PropTypes.string,
}

const defaultProps = {
  ingredients: []
}

const renderIngredients = (ingredients) => (
  ingredients.map((ingredient) => (
    <p key={ingredient.id}>{ingredient.label}</p>
  ))
)

const IngredientIssuesPresentation = ({
  content: {
    title,
    body,
    button1Copy,
    button2Copy,
  },
  ingredients,
  buttonLeftUrl,
  buttonRightUrl,
}) => (
  <GetHelpLayout title={title} body={body}>
    {renderIngredients(ingredients)}
    <BottomBar>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        {button1Copy}
      </BottomButton>
      <BottomButton color="primary" url={buttonRightUrl} clientRouted>
        {button2Copy}
      </BottomButton>
    </BottomBar>
  </GetHelpLayout>
)

IngredientIssuesPresentation.propTypes = propTypes
IngredientIssuesPresentation.defaultProps = defaultProps

export {
  IngredientIssuesPresentation
}
