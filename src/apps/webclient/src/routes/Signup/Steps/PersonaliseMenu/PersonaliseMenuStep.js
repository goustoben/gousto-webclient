import React, { useState, useCallback } from 'react'

import { Checkbox } from '@gousto-internal/citrus-react'
import classNames from 'classnames'
import { Heading } from 'goustouicomponents'
import { useDispatch } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { redirect } from 'actions/redirect'
import routes from 'config/routes'
import { useIsFiveRecipesEnabled } from 'hooks/useIsFiveRecipesEnabled'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton/CheckoutButton'

import goustoBoxesImage from 'media/images/gousto-boxes.jpg'

import { items } from '../../Components/SellThePropositionPage/SellThePropositionPage'
import {
  trackCuisineSelected,
  trackCuisineDeselected,
  trackSignupPersonalisationComplete,
} from '../../signupActions'

import signupCss from '../../Signup.css'
import css from './PersonaliseMenuStep.css'

const cuisines = [
  { text: 'American' },
  { text: 'British' },
  { text: 'East Asian' },
  { text: 'Indian' },
  { text: 'Italian' },
  { text: 'Mediterranean' },
  { text: 'Mexican' },
  { text: 'None of these' },
]

const PersonaliseMenuStep = () => {
  const { isFiveRecipesEnabled } = useIsFiveRecipesEnabled()
  const [selected, setSelected] = useState([])
  const dispatch = useDispatch()
  const onSelect = useCallback(
    (text) => {
      if (text === 'None of these' && !selected.includes('None of these')) {
        setSelected([text])
        dispatch(trackCuisineSelected(text))
      } else if (!selected.includes(text)) {
        setSelected([...selected, text])
        dispatch(trackCuisineSelected(text))
      } else {
        setSelected(selected.filter((x) => x !== text))
        dispatch(trackCuisineDeselected(text))
      }
    },
    [selected, dispatch],
  )
  const handleCheckoutButtonClick = useCallback(() => {
    window.sessionStorage.setItem('selectedCuisines', JSON.stringify(selected))

    dispatch({ type: actionTypes.WIZARD_SEEN })
    dispatch(trackSignupPersonalisationComplete(selected))
    dispatch(redirect(routes.client.menu))
  }, [selected, dispatch])

  return (
    <div className={signupCss.stepContainer} data-testing="personaliseMenuStep">
      <div className={signupCss.fullWidth}>
        <div className={signupCss.header}>
          <Heading type="h1" aria-label="Get your taste buds ready">
            Get your taste buds ready...
          </Heading>
        </div>
        <p
          className={css.subtitle}
          aria-label="Select up to three of your favourite cuisines and we’ll show you recipes we think you’ll love"
        >
          Select up to <span className={css.bold}>three</span> of your favourite cuisines and we’ll
          show you recipes we think you’ll love
        </p>
        <div className={css.cuisinesContainer}>
          {cuisines.map(({ text }, index) => (
            <Checkbox
              key={text}
              checked={selected.includes(text)}
              onChange={() => onSelect(text)}
              outline
              paddingH={3}
              paddingV={3}
              disabled={
                (selected.length >= 3 && !selected.includes(text)) ||
                (selected.includes('None of these') && index !== cuisines.length - 1)
              }
            >
              {text}
            </Checkbox>
          ))}
        </div>
        <div className={css.sellTheProposition}>
          <ul className={css.list}>
            {items.map(({ key, className, strongText, fiveRecipesStrongText, normalText }) => (
              <li key={key} className={classNames(css.item, className)}>
                <span className={css.strong}>
                  {isFiveRecipesEnabled ? fiveRecipesStrongText : strongText}
                </span>{' '}
                {normalText}
              </li>
            ))}
          </ul>
          <img className={css.responsive} src={goustoBoxesImage} alt="stack of gousto boxes" />
        </div>
        <div className={signupCss.footer}>
          <div className={signupCss.inputContainer}>
            <CheckoutButton
              data-testing="personaliseMenuCTA"
              width="full"
              isDisabled={selected.length === 0}
              onClick={handleCheckoutButtonClick}
            >
              See this week’s menu
            </CheckoutButton>
          </div>
        </div>
      </div>
    </div>
  )
}

PersonaliseMenuStep.defaultProps = {
  next: () => {},
  showcaseMenuSeen: false,
  isGoustoOnDemandEnabled: false,
  isWizardWithoutImagesEnabled: false,
}

export { PersonaliseMenuStep }
