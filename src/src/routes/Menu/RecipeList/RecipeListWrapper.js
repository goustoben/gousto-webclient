import React, { useEffect, useRef, useState } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { trackRecipeOrderDisplayed } from 'actions/tracking'

import { RecipeList } from './RecipeList'
import { useCollections } from '../domains/collections/useCollections'
import { useMenu } from '../domains/menu'
import { RecipeTile } from '../components/RecipeTile'
import { RecipeContextProvider } from '../context/recipeContext'
import { CTAToAllRecipesContainer } from '../Recipe/CTAToAllRecipes'
import css from './RecipeList.css'

const RecipeListWrapper = (ownProps) => {
  const dispatch = useDispatch()
  const { currentCollectionId } = useCollections()
  const { getRecipesForCollectionId } = useMenu()
  const { recipes } = getRecipesForCollectionId(currentCollectionId)

  const actionDispatchers = bindActionCreators({
    trackRecipeOrderDisplayed
  }, dispatch)

  const ref = useRef()
  const [onScreen, resetOnScreen] = useOnScreen(ref)

  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    setExpanded(false)
    resetOnScreen()
  }, [currentCollectionId])

  if (expanded !== null && expanded !== currentCollectionId) {
    setExpanded(null)
  }

  console.log(`>>>>>>>>> onScreen(${onScreen}) || expanded(${JSON.stringify(expanded)}) || recipesNumber(${recipes?.size})`)

  const limitedRecipes = expanded === currentCollectionId ? recipes : recipes.slice(0, 20)

  if (onScreen && expanded == null) {
    setExpanded(currentCollectionId)
  }

  return (
    <div className={css.emeRecipeList}>
      {limitedRecipes.map((value, index) => (
        <RecipeContextProvider key={value.recipe.get('id')} value={value.recipe}>
          <RecipeTile
            recipeId={value.recipe.get('id')}
            originalId={value.originalId}
            categoryId={currentCollectionId}
          />
        </RecipeContextProvider>
      ))}
      <div ref={ref}>&nbsp;</div>
      <CTAToAllRecipesContainer />
    </div>

  // <RecipeList
  //   // eslint-disable-next-line react/jsx-props-no-spreading
  //   {...ownProps}
  //   currentCollectionId={currentCollectionId}
  //   recipes={limitedRecipes}
  //   trackRecipeOrderDisplayed={actionDispatchers.trackRecipeOrderDisplayed}
  //   ref={ref}
  // />
  )
}

export { RecipeListWrapper }

// Hook
const useOnScreen = (ref, rootMargin = '0px') => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.unobserve(ref.current)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return [isIntersecting, () => setIntersecting(false)]
}
