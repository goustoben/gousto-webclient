import PropTypes from 'prop-types'
import React from 'react'
import menu from 'config/menu'
import Button from "../../Button"

import css from './RecipesStep.css'
import signupCss from '../../Signup.css'

import Image from '../../Image'

const RecipesStep = ({ basketSignupCollectionReceive, next }) => {
  const createGroupedArray = (arr, chunkSize) => {
    const groups = []

    arr.forEach((el, index, array) => {
      if (index % chunkSize === 0) {
        groups.push(array.slice(index, index + chunkSize))
      }
    })

    return groups
  }

  const renderRecipe = (side, collection, label) => (
		<div className={css[side]} key={collection}>
			<Button
			  className="recipesType"
			  fill={false}
			  onClick={() => { basketSignupCollectionReceive(collection); next() }}
			  width="full"
			>
				{label}
			</Button>
		</div>
  )

  const renderRow = (elements, first) => (
		<div className={first ? css.rowFirst : css.row}>
			{elements.map(el => renderRecipe(...Object.values(el)))}
		</div>
  )

  const renderRecipes = elements => (
		<div className={css.container}>
			{elements.map((el, index) => (
				<div key={`row${index}`}>{renderRow(el, !index)}</div>
			))}
		</div>
  )

  const elementsArray = createGroupedArray(menu.collections.map((el, index) => (Object.assign({}, { side: index % 2 === 0 ? 'left' : 'right' }, el))), 2)

  return (
		<span className={signupCss.stepContainer}>
			<div className={css.fullWidth}>
				<div className={signupCss.header}>
					<Image name="collection-selection" />
					<h1 className={signupCss.heading}>Which recipes work best for you?</h1>
				</div>
				<div className={signupCss.body}>
					{renderRecipes(elementsArray)}
					<div className={css.link}>
						<span onClick={next}>I like everything</span>
					</div>
				</div>
			</div>
		</span>
  )
}

RecipesStep.propTypes = {
  basketSignupCollectionReceive: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
}

RecipesStep.defaultProps = {
  basketSignupCollectionReceive: () => {},
  next: () => {},
}

export default RecipesStep
