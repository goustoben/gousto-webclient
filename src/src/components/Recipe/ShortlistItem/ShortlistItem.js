import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import Item from 'Item'
import { isAvailableRecipeList } from 'utils/recipe'
import Svg from 'Svg'
import css from './ShortlistItem.css'
import detailsCss from '../../BoxSummary/Details/Details.css'

const ShortlistItem = (props) => {

  const { shortlistIds, recipesStore, numPortions, onShortlistRemove, available, url, onImageClick} = props
  const shortlist = isAvailableRecipeList(shortlistIds, recipesStore)

  return (
  <div className={shortlist ? css.shortlist : css.noShortlist}>
    <div className={detailsCss.row}>
      <p className={detailsCss.titleSection}><Svg fileName={'icon_shortlist_heart_education'} className={css.heartIcon} />Shortlist</p>
    </div>
  {!!shortlist.size ? shortlist.map(recipe => (
    <Item
      key={recipe.get('id')}
      type="recipe"
      media={recipe.get('media').getIn(['images', 0, 'urls'], Immutable.List([]))}
      title={recipe.get('title')}
      quantity={numPortions}
      onRemove={() => onShortlistRemove(recipe.get('id'))}
      available={available}
      url={url}
      showLine
      onImageClick={() => onImageClick(recipe.get('id'))}
    />))
    :
    <div>
      <p className={css.educationHeader}>You can now shortlist recipes!</p>
      <p>
        Shortlisted recipes will appear here. Compare multiple recipes, and move them to and from your box to make your final selection.
      </p>
      <div className={css.horizontalLine}/>
    </div> }
  </div>)
}

ShortlistItem.propTypes = {
  numPortions: PropTypes.number,
  available: PropTypes.bool,
  url: PropTypes.string,
  onImageClick: PropTypes.func,
  shortlistIds: PropTypes.instanceOf(Immutable.Map),
  onShortlistRemove: PropTypes.func,
  recipesStore: PropTypes.instanceOf(Immutable.Map)
}

ShortlistItem.defaultProps = {
  showLine: false,
  onImageClick: () => { }
}

export default ShortlistItem
