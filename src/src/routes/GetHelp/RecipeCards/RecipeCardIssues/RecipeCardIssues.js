import React, { useState, useEffect, useMemo } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { BottomFixedContent, Card, CTA, InputRadio } from 'goustouicomponents'
import { client } from 'config/routes'
import { Error } from '../../components/Error'
import { recipePropType } from '../../getHelpPropTypes'
import { GetHelpLayout2 } from '../../layouts/GetHelpLayout2'
import layoutCss from '../../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './RecipeCardIssues.css'

const RecipeCardIssues = ({
  cleanErrorForRecipeCards,
  didRequestError,
  isRequestPending,
  params: {
    userId,
    orderId,
  },
  selectedRecipeCardsDetails,
  setRecipeCardRequestWithIssueReasons,
}) => {
  const [selectedIssueTypes, setSelectedIssueTypes] = useState({})

  useEffect(() => {
    if (!selectedRecipeCardsDetails.length) {
      browserHistory.push(`${client.getHelp.recipeCards({ userId, orderId })}/select`)
    }
    cleanErrorForRecipeCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const reducedSelectedRecipeCardIssues = selectedRecipeCardsDetails.reduce((obj, item) => Object.assign(obj, {[item.id]: { coreRecipeId: item.id, complaintCategoryId: null }}), {})
    setSelectedIssueTypes(reducedSelectedRecipeCardIssues)
  }, [selectedRecipeCardsDetails])

  const isContinueButtonDisabled = useMemo(
    () => {
      const issues = Object.values(selectedIssueTypes)

      if (issues.length === 0) {
        return true
      }

      return issues.some(({complaintCategoryId}) => complaintCategoryId === null)
    },
    [selectedIssueTypes]
  )

  const handleChange = (id, recipeId) => {
    setSelectedIssueTypes({
      ...selectedIssueTypes,
      [recipeId]: {
        coreRecipeId: recipeId,
        complaintCategoryId: Number(id)
      }})
  }

  if (didRequestError) {
    return <Error />
  }

  return (
    <GetHelpLayout2 headingText="What was the issue with the recipe cards?" hasBackButton>
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >

        {selectedRecipeCardsDetails.map((recipe) => (
          <div key={recipe.id} className={css.recipeRadioButtonGroup}>
            <div className={css.recipeTitleImage}>
              <img className={css.recipeImage} src={recipe.imageUrl} alt={recipe.title} />
              <p className={css.recipeTitle}>
                {recipe.title}
              </p>
            </div>
            <InputRadio
              id={`${recipe.id}-missing`}
              value="1"
              name={`${recipe.id}-complaint`}
              onChange={({ target: { value } }) => handleChange(value, recipe.id)}
              isChecked={selectedIssueTypes[recipe.id]?.complaintCategoryId === 1 }
            >
              Missing
            </InputRadio>
            <InputRadio
              id={`${recipe.id}-wrong`}
              value="2"
              name={`${recipe.id}-complaint`}
              onChange={({ target: { value } }) => handleChange(value, recipe.id)}
              isChecked={selectedIssueTypes[recipe.id]?.complaintCategoryId === 2 }
            >
              Wrong
            </InputRadio>
          </div>

        ))}
      </Card>
      <BottomFixedContent>
        <CTA
          isFullWidth
          size="small"
          isDisabled={isContinueButtonDisabled}
          isLoading={isRequestPending}
          onClick={() => {
            setRecipeCardRequestWithIssueReasons(userId, orderId, selectedIssueTypes)
          }}
          testingSelector="getHelpRecipeCardConfirm"
        >
          Confirm
        </CTA>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}
RecipeCardIssues.propTypes = {
  cleanErrorForRecipeCards: PropTypes.func.isRequired,
  didRequestError: PropTypes.bool.isRequired,
  isRequestPending: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  selectedRecipeCardsDetails: PropTypes.arrayOf(recipePropType).isRequired,
  setRecipeCardRequestWithIssueReasons: PropTypes.func.isRequired,
}

export { RecipeCardIssues }
