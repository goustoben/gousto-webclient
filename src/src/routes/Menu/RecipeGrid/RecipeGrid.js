import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import menu from 'config/menu'
import RecipeList from '../RecipeList'
import DetailOverlay from '../DetailOverlay'

import css from '../Menu.css'

class RecipeGrid extends React.Component {
  static propTypes = {
    mobileGridView: PropTypes.bool,
    showDetailRecipe: PropTypes.func,
    menuCurrentCollectionId: PropTypes.string,
    isClient: PropTypes.bool,
    menuRecipeDetailShow: PropTypes.string,
    menuFilterExperiment: PropTypes.bool
  }

  render() {
    const {
      mobileGridView,
      showDetailRecipe,
      menuCurrentCollectionId,
      isClient,
      menuRecipeDetailShow,
      menuFilterExperiment
    } = this.props

    return (
      <div
        ref={ref => { this.masonryContainer = ref }}
        className={classnames({
          [css.masonryContainerMenu]: !menuFilterExperiment,
          [css.masonryContainer]: menuFilterExperiment,
        })}
        data-testing="menuRecipesList"
      >
        <RecipeList
          mobileGridView={mobileGridView}
          showDetailRecipe={showDetailRecipe}
          menuCurrentCollectionId={menuCurrentCollectionId}
        />
        <p className={css.legal}>{menu.legal}</p>
        <DetailOverlay
          showOverlay={isClient}
          menuRecipeDetailShow={menuRecipeDetailShow}
        />
      </div>
    )
  }
}

export { RecipeGrid }
