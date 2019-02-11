import React from 'react'
import Image from 'Image'
import classnames from 'classnames'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { getFeaturedImage } from 'utils/image'
import css from './RecipeHolder.css'

const RecipeHolder = ({ recipe, view, onClick }) => (
	<span
	  className={classnames(
	    css[view],
	    { [css.borderNone]: recipe.size > 0 },
	    { [css.placeHolder]: recipe.size < 1 },
	    { [css.recipeImg]: view !== 'mobile' },
	    { [css.widthMobile]: view === 'mobile' }
	  )}
	  onClick={onClick}
	>
		{(recipe.size > 0) ?
			<Image
			  media={getFeaturedImage(recipe, '')}
			  className={classnames(
			    { [css.recipeImg]: view !== 'mobile' },
			    { [css.imgMobile]: view === 'mobile' }
			  )}
			/>
		  : 'Add Recipe'}
	</span>
)

RecipeHolder.propTypes = {
  recipe: React.PropTypes.instanceOf(Immutable.Map),
  view: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

RecipeHolder.defaultProps = {
  recipe: Immutable.Map({}),
  view: 'desktop',
}

export default RecipeHolder
