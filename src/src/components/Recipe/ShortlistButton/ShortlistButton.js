import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import classnames from 'classnames'
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
    display: PropTypes.string
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
    display: ''
  }

  onShortlistClick = () => {
    const { removeFromShortlist, recipeInShortlist, id, shortlistLimitReached } = this.props

    if(recipeInShortlist) {
      removeFromShortlist(id)
    } else if (!shortlistLimitReached) {
      this.handleAdd()
    }
  }

  handleAdd = () => {
    const { addToShortlist, menuBrowseCTAVisibilityChange, id, position, stock } = this.props
    const positionObject = { position }

    if (stock !== null) {
      addToShortlist(id, false, positionObject)
    } else {
      menuBrowseCTAVisibilityChange(true)
    }
  }

  render() {
    const { shortlistLimitReached, recipeInShortlist, display } = this.props
    const heartIcon = recipeInShortlist ? "icon_shortlist_heart_selected" : "icon_shortlist_heart_deselected"
    const classes = classnames(
      (recipeInShortlist ? css.redHeartButton : (shortlistLimitReached ? css.greyHeartButton : css.blueHeartButton)),
      (display === 'detailOverlay' ? css.defaultDetailView : null)
    )

    return (
      <button type="button" disabled={shortlistLimitReached &&!recipeInShortlist} onClick={this.onShortlistClick} onKeyPress={this.onShortlistClick} className={classes} tabIndex={0}>
        <Svg fileName={heartIcon} className={css.heartIcon}/>
      </button>
    )
  }
}

export { ShortlistButton }
