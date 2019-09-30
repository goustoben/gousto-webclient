import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import classnames from 'classnames'
import { ShortlistTutorial } from 'routes/Menu/ShortlistTutorial'
import css from './ShortlistButton.css'

class ShortlistButton extends React.PureComponent {

  static propTypes = {
    shortlistLimitReached: PropTypes.bool,
    recipeInShortlist: PropTypes.bool,
    addToShortlist: PropTypes.func,
    removeFromShortlist: PropTypes.func,
    menuBrowseCTAVisibilityChange: PropTypes.func,
    stock: PropTypes.number,
    id: PropTypes.string,
    position: PropTypes.number,
    display: PropTypes.string,
    showShortListTutorial: PropTypes.bool,
    shortlistTutorialStep1Viewed: PropTypes.bool,
    incrementTutorialViewed: PropTypes.func,
    tutorialTracking: PropTypes.func,
    view: PropTypes.string,
    notInStock: PropTypes.bool,
  }

  static defaultProps = {
    shortlistLimitReached: false,
    recipeInShortlist: false,
    addToShortlist: () => { },
    removeFromShortlist: () => { },
    menuBrowseCTAVisibilityChange: () => { },
    stock: 0,
    id: '',
    position: 0,
    display: '',
    showShortListTutorial: false,
    shortlistTutorialStep1Viewed: false,
    view: 'grid',
    notInStock: false
  }

  closeTutorialStep1 = () => {
    const { incrementTutorialViewed, tutorialTracking } = this.props
    const tutorialName = 'shortlistStep1'
    incrementTutorialViewed(tutorialName)
    tutorialTracking(tutorialName, 0, true)
  }

  onShortlistClick = () => {
    const { removeFromShortlist, recipeInShortlist, id, shortlistLimitReached, view } = this.props

    if (recipeInShortlist) {
      removeFromShortlist(id, { view })
    } else if (!shortlistLimitReached) {
      this.handleAdd()
    }
  }

  handleAdd = () => {
    const { addToShortlist, menuBrowseCTAVisibilityChange, id, position, stock, shortlistTutorialStep1Viewed, view } = this.props
    const recipeInfo = { position, view }

    if (stock !== null) {
      if (!shortlistTutorialStep1Viewed) {
        this.closeTutorialStep1()
      }
      addToShortlist(id, false, recipeInfo)
    } else {
      menuBrowseCTAVisibilityChange(true)
    }
  }

  render() {
    const { shortlistLimitReached, recipeInShortlist, display, showShortListTutorial, notInStock } = this.props
    const heartIcon = recipeInShortlist ? 'icon_shortlist_heart_selected' : 'icon_shortlist_heart_deselected'
    const classes = classnames(
      css.shortlistButton,
      (recipeInShortlist ? css.shortlisted : null),
      (display === 'detailOverlay' ? css.defaultDetailView : null)
    )

    const text = recipeInShortlist ? 'Shortlisted' : 'Shortlist'

    if (notInStock) {
      return null
    }

    return (
      <button type="button" disabled={shortlistLimitReached && !recipeInShortlist} data-slug="heart" onClick={this.onShortlistClick} onKeyPress={this.onShortlistClick} className={classes} tabIndex={0}>
        <Svg fileName={heartIcon} className={css.heartIcon} />

        <span className={css.shortlistText}>{text}</span>

        {showShortListTutorial && <ShortlistTutorial />}
      </button>
    )
  }
}

export { ShortlistButton }
