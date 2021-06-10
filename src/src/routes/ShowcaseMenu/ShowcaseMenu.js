import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import SignupLayout from 'layouts/SignupLayout'
import { HotjarTrigger } from 'HotjarTrigger'
import { RibbonTriggerContainer } from 'RibbonTrigger'
import { DiscountAppliedBarContainer } from 'routes/Signup/Components/DiscountAppliedBar/DiscountAppliedBarContainer'
import { DetailOverlayContainer } from 'routes/Menu/DetailOverlay'
import {
  collectionDescriptorsInLinesPropType,
  collectionDescriptorsLinePropType,
} from './propTypes'
import { CollectionPicker } from './CollectionPicker'
import { Recipes } from './Recipes'
import { InformationBox } from './InformationBox'
import { CTASection } from './CTASection'
import { PriceExplanationSection } from './PriceExplanationSection'
import css from './ShowcaseMenu.css'

export const ShowcaseMenu = ({
  proceed,
  currentCollectionId,
  recipes,
  collectionDescriptorsInLines,
  collectionDescriptorsSingleLine,
  changeCollection,
  openRecipeDetails,
  trackScrollOneStep,
  trackShowcaseMenuView,
}) => {
  useEffect(() => {
    trackShowcaseMenuView()
  }, [trackShowcaseMenuView])

  return (
    <SignupLayout hasWhiteBackground showLoginCTA>
      <HotjarTrigger name="showcase_menu" />
      <RibbonTriggerContainer name="variant_showcasemenu" probabilityPercentage={50} />
      <DiscountAppliedBarContainer wizardStep="showcase_menu" page="showcaseMenu" />
      <div className={css.showcaseMenuContainer}>
        <h1 className={css.heading}>Explore this week’s menu</h1>
        <CollectionPicker
          currentCollectionId={currentCollectionId}
          collectionDescriptorsInLines={collectionDescriptorsInLines}
          collectionDescriptorsSingleLine={collectionDescriptorsSingleLine}
          changeCollection={changeCollection}
        />
        <Recipes
          currentCollectionId={currentCollectionId}
          recipes={recipes}
          openRecipeDetails={openRecipeDetails}
          trackScrollOneStep={trackScrollOneStep}
        />
        <InformationBox />
        <CTASection onClick={proceed} />
        <PriceExplanationSection />
        <DetailOverlayContainer showOverlay isFromShowcaseMenu />
      </div>
    </SignupLayout>
  )
}

ShowcaseMenu.propTypes = {
  proceed: PropTypes.func.isRequired,
  currentCollectionId: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  collectionDescriptorsInLines: collectionDescriptorsInLinesPropType.isRequired,
  collectionDescriptorsSingleLine: collectionDescriptorsLinePropType.isRequired,
  changeCollection: PropTypes.func.isRequired,
  openRecipeDetails: PropTypes.func.isRequired,
  trackScrollOneStep: PropTypes.func.isRequired,
  trackShowcaseMenuView: PropTypes.func.isRequired,
}

ShowcaseMenu.defaultProps = {
  currentCollectionId: null,
}
