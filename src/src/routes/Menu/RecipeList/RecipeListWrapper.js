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

// const RefTile = React.forwardRef((props, ref) => <RecipeTile />)

const RecipeListWrapper = (ownProps) => {
  const dispatch = useDispatch()
  const { currentCollectionId } = useCollections()
  const { getRecipesForCollectionId } = useMenu()
  const { recipes } = getRecipesForCollectionId(currentCollectionId)

  const actionDispatchers = bindActionCreators({
    trackRecipeOrderDisplayed
  }, dispatch)

  const ref = useRef()
  const onScreen = useOnScreen(ref)

  const [expanded, setExpanded] = useState({[currentCollectionId]: false})


  useEffect(() => {
    setExpanded(false)
  }, [currentCollectionId])

  // console.log(`>>>>>>>>> ${onScreen}`)
  // console.log('>>>>>>>>>> ref after init:', JSON.stringify(expanded, null, 2))

  // const [limitedRecipes, setLimitedRecipes] = useState(recipes.slice(0, 20))
  // console.log(`>>>> limitedRecipes?.length ${limitedRecipes?.length}`)
  const limitedRecipes = onScreen || expanded ? recipes : recipes.slice(0, 20)

  if (onScreen && ! expanded) {
    setExpanded(true)
  }

  // React.forwardRef()

  // const onScreen = useOnScreen(ref)
  // useEffect(() => {
  //   if (onScreen) {
  //     setLimitedRecipes(recipes)
  //   }
  // }, [onScreen, recipes])

  return (
    <div className={css.emeRecipeList}>
      {limitedRecipes.map((value, index) => (
        <RecipeContextProvider key={value.recipe.get('id')} value={value.recipe}>
          <RecipeTile
            recipeId={value.recipe.get('id')}
            originalId={value.originalId}
            categoryId={currentCollectionId}
            // ref={index === 19 ? ref : undefined}
            // ref={ref}
          />
        </RecipeContextProvider>
      ))}
      <div ref={ref}>VPP!</div>
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

  return isIntersecting
}

// const OPTIONS = {
//   root: null,
//   rootMargin: '0px 0px 0px 0px',
//   threshold: 0,
// }

// const useOnScreen = (elementRef) => {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     if (elementRef.current) {
//       const observer = new IntersectionObserver((entries, obs) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true)
//             obs.unobserve(elementRef.current)
//           }
//         })
//       }, OPTIONS)
//       observer.observe(elementRef.current)
//     }
//   }, [elementRef])

//   return isVisible
// }
