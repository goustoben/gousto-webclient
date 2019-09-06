import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import Item from 'Item'
import { isAvailableRecipeList } from 'utils/recipe'
import Svg from 'Svg'
import { MoveRecipeButton } from 'MoveRecipeButton'
import classnames from 'classnames'
import { LayoutContentWrapper } from 'goustouicomponents'
import detailsCss from '../../BoxSummary/Details/Details.css'
import css from './ShortlistItem.css'

class ShortlistItem extends React.Component {
  static propTypes = {
    numPortions: PropTypes.number,
    available: PropTypes.bool,
    url: PropTypes.string,
    onImageClick: PropTypes.func,
    shortlistIds: PropTypes.instanceOf(Immutable.Map),
    onShortlistRemove: PropTypes.func,
    recipesStore: PropTypes.instanceOf(Immutable.Map)
  }

  static defaultProps = {
    showShortlistButton: false,
    onImageClick: () => { }
  }

  constructor() {
    super()
    this.state = {
      educationVisible: false,
    }
  }

  toggle = () => {
    const { educationVisible } = this.state
    this.setState({
      educationVisible: !educationVisible,
    })
  }

  render() {
    const { shortlistIds, recipesStore, numPortions, onShortlistRemove, available, url, onImageClick} = this.props
    const { educationVisible } = this.state

    const shortlist = isAvailableRecipeList(shortlistIds, recipesStore)
    const icon = !educationVisible ? css.infoIcon : css.crossIcon
    const whatIsThisText = !educationVisible ? 'What is this?' : 'Close'

    return (
    <div className={shortlist ? css.shortlist : css.noShortlist}>
      <LayoutContentWrapper>
        <div className={detailsCss.row}>
          <span className={css.flex}>
            <p className={classnames(detailsCss.titleSection, css.align)}><Svg fileName={'icon_shortlist_heart_education'} className={css.heartIcon} />Shortlist</p>
            <div role='button' onClick={this.toggle} onKeyPress={this.toggle} tabIndex={0} className={shortlist.size ? css.showWhatIsThis : css.hide}>
              <span className={icon}></span>
              {whatIsThisText}
            </div>
          </span>
        </div>
        {(!shortlist.size || educationVisible) &&
        <div>
          <p className={css.educationHeader}>You can now shortlist recipes!</p>
          <p className={css.educationText}>
            Shortlisted recipes will appear here. Compare multiple recipes, and move them to and from your box to make your final selection.
          </p>
          <div className={css.horizontalLine}/>
        </div>
        }
        {!!shortlist.size && shortlist.map(recipe => (
          <span key={recipe.get('id')}>
            <Item
              key={recipe.get('id')}
              type="recipe"
              media={recipe.get('media').getIn(['images', 0, 'urls'], Immutable.List([]))}
              title={recipe.get('title')}
              quantity={numPortions}
              onRemove={() => onShortlistRemove(recipe.get('id'))}
              available={available}
              url={url}
              showShortlistButton={false}
              onImageClick={() => onImageClick(recipe.get('id'))}
            />
            <MoveRecipeButton recipeId={recipe.get('id')} fromBox={false} />
          </span>
        ))}
      </LayoutContentWrapper>
    </div>)
  }
}

export default ShortlistItem
