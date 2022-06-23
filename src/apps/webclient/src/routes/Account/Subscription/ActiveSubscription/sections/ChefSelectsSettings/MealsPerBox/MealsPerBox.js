import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup, InputRadio } from 'goustouicomponents'
import { Text } from '@gousto-internal/citrus-react'
import css from './MealsPerBox.css'
import {
  SubscriptionContext,
} from '../../../../context'
import {
  getMealsPerBox,
  getBoxPricesNumPortion,
  getIsBoxAndPricesLoaded,
  getDietaryPreference,
  getTotalBoxPriceDiscounted
} from '../../../../context/selectors/box'

import { SettingSection } from '../../../../components/SettingSection'

import { trackSubscriptionSettingsChange } from '../../../../tracking'

import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'

import { MEALS_PER_BOX_MAP } from '../../../../enum/box'

export const MealsPerBox = ({ accessToken, isMobile }) => {
  const context = useContext(SubscriptionContext)
  const { state } = context

  const isBoxAndPricesLoaded = getIsBoxAndPricesLoaded(state)

  const currentMealsPerBox = getMealsPerBox(state)
  const boxPrices = getBoxPricesNumPortion(state)
  const totalBoxPrice = getTotalBoxPriceDiscounted(state)
  const dietaryPreference = getDietaryPreference(state)

  const [selectedMealsPerBox, setSelectedMealsPerBox] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const settingName = 'meals_per_box'

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
              {`${MEALS_PER_BOX_MAP[selectedMealsPerBox || currentMealsPerBox]} meals (£${boxPrices[selectedMealsPerBox || currentMealsPerBox][dietaryPreference].pricePerPortionDiscounted} per serving)`}
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
        isBoxAndPricesLoaded ? (
          <RadioGroup
            name="meals-per-box-radios"
            testingSelector="meals-per-box-radios"
            onChange={({ target: { value } }) => setSelectedMealsPerBox(value)}
          >
            {Object.keys(MEALS_PER_BOX_MAP).map(mealsPerBox => (
              <InputRadio
                id={`${mealsPerBox}-meals-radio`}
                key={mealsPerBox}
                name={`${mealsPerBox}-meals-radio`}
                value={mealsPerBox}
                variant="tile"
                isChecked={mealsPerBox === (selectedMealsPerBox || currentMealsPerBox)}
              >
                {`${mealsPerBox} meals (£${boxPrices[mealsPerBox][dietaryPreference].pricePerPortionDiscounted} per serving)`}
              </InputRadio>
            ))}
          </RadioGroup>
        ) : null
      }
    </SettingSection>
  )
}

MealsPerBox.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
