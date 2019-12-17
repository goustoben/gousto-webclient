import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { ItemExpandable } from 'goustouicomponents'
import { List } from '../List'
import { recipePropType } from '../../getHelpPropTypes'

const propTypes = {
  children: PropTypes.node.isRequired,
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
}

function RecipeList({ children, recipes }) {
  const recipeList = recipes.map(recipe => {
    const recipeContent = cloneElement(children, {...children.props, recipe })

    return (
      <ItemExpandable key={recipe.id} label={recipe.title}>
        {recipeContent}
      </ItemExpandable>
    )
  })

  return (
    <List>
      {recipeList}
    </List>
  )
}

RecipeList.propTypes = propTypes

export { RecipeList }
