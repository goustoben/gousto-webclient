
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Text, RadioGroup } from '@gousto-internal/citrus-react'
import css from './MealsPerBox.css'
import {
  SubscriptionContext,
} from '../../../../context'
import { actionTypes } from '../../../../context/reducers'
import {
  getMealsPerBox,
  getBoxPricesNumPortion,
  getIsBoxAndPricesLoaded,
  getDietaryPreference,
  getTotalBoxPriceDiscounted,
  getNumPortions,
  getNumRecipes
} from '../../../../context/selectors/box'

import { SettingSection } from '../../../../components/SettingSection'

import { trackSubscriptionSettingsChange } from '../../../../tracking'

import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'
import { useFiveRecipeSubscriptionOption } from '../../../../hooks/useFiveRecipeSubscriptionOption'

import { MEALS_PER_BOX_MAP, MEALS_PER_BOX_MAP_5R } from '../../../../enum/box'

export const MealsPerBox = ({ accessToken, isMobile }) => {
  const context = useContext(SubscriptionContext)
  const { state, dispatch } = context

  const isBoxAndPricesLoaded = getIsBoxAndPricesLoaded(state)
  const currentBoxSize = getNumPortions(state)
  const currentMealsPerBox = getNumRecipes(state)
  const selectedMealsPerBox = getMealsPerBox(state)
  const boxPrices = getBoxPricesNumPortion(state)
  const totalBoxPrice = getTotalBoxPriceDiscounted(state)
  const dietaryPreference = getDietaryPreference(state)

  const [shouldSubmit, setShouldSubmit] = useState(false)

  const settingName = 'meals_per_box'

  const mealsPerBoxMap = useFiveRecipeSubscriptionOption() && currentBoxSize === '2'
    ? MEALS_PER_BOX_MAP_5R
    : MEALS_PER_BOX_MAP

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      num_recipes: selectedMealsPerBox
    },
    settingName,
  })

  useSubscriptionToast(updateResponse, updateError)

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update' })()
    setShouldSubmit(true)
  }
  const setSelectedMealsPerBox = (numRecipes) => {
    dispatch({
      type: actionTypes.UPDATE_SELECTED_MEALS_PER_BOX,
      data: { numRecipes }
    })
  }
  const isCtaDisabled = selectedMealsPerBox === currentMealsPerBox
    || !selectedMealsPerBox

  return (
    <SettingSection
      icon="mealPerBox"
      title="Meals Per Box"
      instruction="Choose meals per box"
      ctaText="Save meals per box"
      isCtaDisabled={isCtaDisabled}
      renderCurrentValue={(
        isBoxAndPricesLoaded ? (
          <>
            <p className={css.currentSetting} data-testing="current-meals-per-box">
              {`${mealsPerBoxMap[selectedMealsPerBox || currentMealsPerBox]} meals (£${boxPrices[selectedMealsPerBox || currentMealsPerBox][dietaryPreference].pricePerPortionDiscounted} per serving)`}
            </p>
            <Text size={1} data-testing="total-box-price">
              {`Recipe box price £${totalBoxPrice}`}
            </Text>
          </>
        ) : null
      )}
      onSubmit={onSubmit}
      onEditClick={trackSubscriptionSettingsChange({ settingName, action: 'edit' })}
      isMobile={isMobile}
      testingSelector="meals-per-box"
    >
      {
        isMobile ? (
          <p data-testing="expanded-text">
            Please select your meals per box.
          </p>
        ) : null
      }
      {
        isBoxAndPricesLoaded
          ? (
            <RadioGroup
              outline
              defaultValue={selectedMealsPerBox || currentMealsPerBox}
              onChange={({ target: { value } }) => setSelectedMealsPerBox(value)}
              options={Object.keys(mealsPerBoxMap).map((mealsPerBox) => ({
                label: `${mealsPerBox} meals (£${boxPrices[mealsPerBox][dietaryPreference].pricePerPortionDiscounted} per serving)`,
                name: mealsPerBox,
                value: mealsPerBox,
              }))}
            />
          )
          : null
      }
    </SettingSection>
  )
}

MealsPerBox.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
