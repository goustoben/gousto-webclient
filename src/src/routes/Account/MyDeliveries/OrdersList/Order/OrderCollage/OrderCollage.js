import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Image from 'Image'
import css from './OrderCollage.css'

class OrderCollage extends React.PureComponent {
  render() {
    const recipes = this.props.recipes
    const maxRecipes = ['confirmed', 'dispatched'].indexOf(this.props.orderState) > -1 ? recipes.size : 4
    const blankCards = []
    const recipeCollage = recipes.map((recipe) =>
			<div className={css.collageItem} key={recipe.get('recipeId')}>
				<div className={css.collageImage}>
					<Image media={recipe.get('image')} />
				</div>
			</div>
    )
    for (let i = recipes.size; i < maxRecipes; i++) {
      blankCards.push(<div className={css.empty} key={i}>
				<div className={css.emptyItem}></div>
                      </div>)
    }

    return (
			<div className={css.collageContainer}>
				{recipeCollage}
				{blankCards}
			</div>
    )
  }

}

OrderCollage.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List),
  orderState: PropTypes.string,
}

OrderCollage.defaultProps = {
  recipes: Immutable.List(Immutable.fromJS([])),
  orderState: '',
}

export default OrderCollage
