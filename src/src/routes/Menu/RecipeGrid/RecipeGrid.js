import React, { PureComponent } from 'react'
import menu from 'config/menu'
import { RecipeList } from '../RecipeList'
import DetailOverlay from '../DetailOverlay'

import css from '../Menu.css'

class RecipeGrid extends PureComponent {
  state = {
    shouldShowOverlay: false,
  }

  componentDidMount() {
    this.setState({ shouldShowOverlay: true })
  }

  render() {
    const { shouldShowOverlay } = this.state

    return (
      <div
        className={css.menuContainer}
        data-testing="menuRecipesList"
      >
        <RecipeList />
        <p className={css.legal}>{menu.legal}</p>
        <DetailOverlay
          showOverlay={shouldShowOverlay}
        />
      </div>
    )
  }
}

export { RecipeGrid }
