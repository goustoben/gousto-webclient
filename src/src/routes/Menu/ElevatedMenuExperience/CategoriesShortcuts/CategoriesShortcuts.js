import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import {
  ALL_RECIPES_COLLECTION_ID,
  VEGETARIAN_COLLECTION_ID,
  ALL_RECIPES_SHORT_NAME,
  DIETARY_REQUIREMENTS_SHORT_NAME
} from 'config/collections'
import classnames from 'classnames'
import css from './CategoriesShortcuts.css'
import { CategoriesThumbnailContainer } from '../CategoriesThumbnail'

class CategoriesShortcuts extends PureComponent {
  constructor() {
    super()

    this.recipeCategoriesButtonOuterRef = createRef()
    this.state = {
      isRecipeCategoriesButtonFixed: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll)
    this.handleWindowScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  handleWindowScroll = () => {
    const isRecipeCategoriesButtonFixed = window.scrollY >= this.recipeCategoriesButtonOuterRef.current.offsetTop

    this.setState({ isRecipeCategoriesButtonFixed })
  }

  render() {
    const { collectionFilterChange, showCategoriesModal, categoryShortcutClicked, push } = this.props
    const { isRecipeCategoriesButtonFixed } = this.state

    return (
      <div className={css.shortcutsWrapper}>
        <div className={css.smallButtons}>
          <button
            type="button"
            className={css.smallShortcut}
            onClick={() => {
              collectionFilterChange(ALL_RECIPES_COLLECTION_ID)
              categoryShortcutClicked({ shortcutName: ALL_RECIPES_SHORT_NAME })
            }}
          >
            <CategoriesThumbnailContainer collectionId={ALL_RECIPES_COLLECTION_ID} />
            <span className={css.title}>All recipes</span>
          </button>
          <button
            type="button"
            className={css.smallShortcut}
            onClick={() => {
              categoryShortcutClicked({ shortcutName: DIETARY_REQUIREMENTS_SHORT_NAME })
              push('/menu/dietary-requirements')
            }}
          >
            <CategoriesThumbnailContainer collectionId={VEGETARIAN_COLLECTION_ID} />
            <span className={css.title}>Dietary requirements</span>
          </button>
        </div>
        <div ref={this.recipeCategoriesButtonOuterRef} className="recipeCategoriesButtonOuter">
          <button
            type="button"
            onClick={showCategoriesModal}
            className={
              classnames(
                css.recipeCategoriesButton,
                { [css.recipeCategoriesButtonFixed]: isRecipeCategoriesButtonFixed },
              )
            }
          >
            View recipe categories
          </button>
        </div>
      </div>
    )
  }
}

CategoriesShortcuts.propTypes = {
  collectionFilterChange: PropTypes.func,
  showCategoriesModal: PropTypes.func,
  categoryShortcutClicked: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

CategoriesShortcuts.defaultProps = {
  collectionFilterChange: () => {},
  showCategoriesModal: () => {},
}

export { CategoriesShortcuts }
