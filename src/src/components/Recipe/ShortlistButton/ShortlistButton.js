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
    tutorialTracking: PropTypes.func
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
    shortlistTutorialStep1Viewed: false
  }

  closeTutorialStep1 = () => {
    const { incrementTutorialViewed, tutorialTracking } = this.props
    const tutorialName = 'shortlistStep1'
    incrementTutorialViewed(tutorialName)
    tutorialTracking(tutorialName, 0, true)
  }

  onShortlistClick = () => {
    const { removeFromShortlist, recipeInShortlist, id, shortlistLimitReached } = this.props

    if (recipeInShortlist) {
      removeFromShortlist(id)
    } else if (!shortlistLimitReached) {
      this.handleAdd()
    }
  }

  handleAdd = () => {
    const { addToShortlist, menuBrowseCTAVisibilityChange, id, position, stock, shortlistTutorialStep1Viewed } = this.props
    const positionObject = { position }

    if (stock !== null) {
      if (!shortlistTutorialStep1Viewed) {
        this.closeTutorialStep1()
      }
      addToShortlist(id, false, positionObject)
    } else {
      menuBrowseCTAVisibilityChange(true)
    }
  }

  render() {
    const { shortlistLimitReached, recipeInShortlist, display, showShortListTutorial } = this.props
    const heartIcon = recipeInShortlist ? "icon_shortlist_heart_selected" : "icon_shortlist_heart_deselected"
    const classes = classnames(
      (recipeInShortlist ? css.redHeartButton : (shortlistLimitReached ? css.greyHeartButton : css.blueHeartButton)),
      (display === 'detailOverlay' ? css.defaultDetailView : null)
    )

    return (
      <button type="button" disabled={shortlistLimitReached && !recipeInShortlist} data-slug="heart" onClick={this.onShortlistClick} onKeyPress={this.onShortlistClick} className={classes} tabIndex={0}>
        <Svg fileName={heartIcon} className={css.heartIcon} />
        {showShortListTutorial && <ShortlistTutorial />}
      </button>
    )
  }
}

export { ShortlistButton }
