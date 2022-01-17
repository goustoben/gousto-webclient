import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { trackRecipeOrderDisplayed } from 'actions/tracking'

import { RecipeList } from './RecipeList'
import { useCurrentCollectionId } from '../domains/collections/useCollections'
import { useMenu } from '../domains/menu'
import { RecipeTile } from '../components/RecipeTile'
import { RecipeContextProvider } from '../context/recipeContext'
import { CTAToAllRecipesContainer } from '../Recipe/CTAToAllRecipes'
import css from './RecipeList.css'

const HEADER_HEIGHT = 150

const NUMBER_OF_INITIALLY_LOADED_RECIPES = 20

/**
 * Determine the Y scroll point the view port has to go upon switching to new Collection/Category
*/
const getTheTopScrollingPoint = () => {
  const currentScrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0

  if (currentScrollTop < HEADER_HEIGHT) {
    return currentScrollTop
  }

  return HEADER_HEIGHT
}

const RecipeListWrapper = (ownProps) => {
  const dispatch = useDispatch()
  const currentCollectionId = useCurrentCollectionId()
  const { getRecipesForCollectionId } = useMenu()
  const { recipes } = getRecipesForCollectionId(currentCollectionId)

  const actionDispatchers = bindActionCreators({
    trackRecipeOrderDisplayed
  }, dispatch)

  const ref = useRef()
  const [onScreen, resetOnScreen] = useOnScreen(ref, '600px')
  const [expanded, setExpanded] = useState(false)
  const [previousCategoryId, setPreviousCategoryId] = useState(currentCollectionId)

  const categoryWasFlipped = previousCategoryId !== currentCollectionId

  useEffect(
    () => window.scrollTo(0, getTheTopScrollingPoint()),
    [currentCollectionId]
  )

  if (categoryWasFlipped) {
    resetOnScreen()
    setExpanded(false)
    setPreviousCategoryId(currentCollectionId)
  }

  console.log(`>>>>>>>>> onScreen(${onScreen}) || expanded(${expanded}) || recipesNumber(${recipes?.size})`)

  const limitedRecipes = expanded ? recipes : recipes.slice(0, NUMBER_OF_INITIALLY_LOADED_RECIPES)

  if (onScreen && ! expanded) {
    setExpanded(true)
  }

  return (
    <div className={css.emeRecipeList}>
      {limitedRecipes.map((value) => (
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
  )
}

export { RecipeListWrapper }

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
