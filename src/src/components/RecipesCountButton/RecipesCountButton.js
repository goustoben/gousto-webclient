import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import css from './RecipesCountButton.css'

class RecipesCountButton extends PureComponent {
  state = {
    boxRecipesChange: false,
    shortlistRecipesChange: false,
  }

  componentDidUpdate(nextProps) {
    const { basketRecipes, shortlistRecipes } = this.props
    if (basketRecipes !== nextProps.basketRecipes) {
      this.updateState(true, false)
    }
    if (shortlistRecipes !== nextProps.shortlistRecipes) {
      this.updateState(false, true)
    }
  }

  updateState = (boxRecipesChange, shortlistRecipesChange) => {
    this.setState({
      boxRecipesChange, shortlistRecipesChange
    })
  }

  render() {
    const { basketRecipes, shortlistRecipes } = this.props
    const { boxRecipesChange, shortlistRecipesChange } = this.state

    return (
      <div className={css.recipeCountContainer}>
        <div className={classnames(css.boxRecipes, ({ [css.boxRecipesChange]: boxRecipesChange }))} onAnimationEnd={() => this.updateState(false, false)}>
          <div className={classnames(css.box, { [css.withRecipesBox]: basketRecipes > 0 })} />
          <p className={css.text}>
            Recipe Box:
          </p>
          <span className={css.recipeNumber}>{basketRecipes}</span>
        </div>
        <div className={classnames(css.shortlistRecipes, ({ [css.shortlistRecipesChange]: shortlistRecipesChange }))} onAnimationEnd={() => this.updateState(false, false)}>
          <div className={classnames(css.shortlist, { [css.withRecipesShortlist]: shortlistRecipes > 0 })} />
          <p className={css.text}>
            Shortlist:
          </p>
          <span className={css.recipeNumber}>{shortlistRecipes}</span>
        </div>
      </div >
    )
  }
}

RecipesCountButton.propTypes = {
  basketRecipes: PropTypes.number,
  shortlistRecipes: PropTypes.number
}

export { RecipesCountButton }
