import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { useDebounce, usePrevious } from 'react-use'
import {
  Box,
  Display,
  Link,
  LinkVariant,
  useTheme,
  Color,
  AlignItems,
  JustifyContent,
  Button,
  InputField,
  FormFieldStatus,
} from '@gousto-internal/citrus-react'
import { actionTypes } from 'actions/actionTypes'
import { InformationalPageTemplate } from 'routes/Signup/Components/InformationalPageTemplate'
import { promoGet, promoChange } from 'actions/promos'

import { getPromoStore } from 'routes/Signup/signupSelectors'

const DEBOUNCE_MS = 500

export const createSelectPromoStoreEntryByPromoCode = (promoCode: string) =>
  createSelector(getPromoStore, (promoStore) => {
    return promoStore.get(promoCode, null)
  })

export const selectPendingSlice = (state: any) => state.pending

export const createSelectIsPendingByActionType = (actionType: string) =>
  createSelector(selectPendingSlice, (pendingSlice) => pendingSlice.get(actionType))

export type Status = 'empty' | 'success' | 'error'

const checkPromoCode = (
  value: any,
  isPending: any,
  dispatch: any,
  promoStoreEntry: any,
  setStatus: (status: Status) => void
) => {
  console.log('checkPromoCode starts', value, isPending, promoStoreEntry)
  if (!value) {
    setStatus('empty')
    return
  }
  if (isPending) {
    return
  }
  if (promoStoreEntry) {
    const hasError = !!promoStoreEntry.get('errorText')
    setStatus(hasError ? 'error' : 'success')
  } else {
    dispatch(promoGet(value))
  }
}

export const EnterPromoCodeManuallyPage = () => {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<Status>('empty')

  const dispatch = useDispatch()

  const promoStoreEntry = useSelector(createSelectPromoStoreEntryByPromoCode(value))

  const isPending = useSelector(createSelectIsPendingByActionType(actionTypes.PROMO_GET))

  const previousIsPending = usePrevious(isPending)

  const [_isReady, cancel] = useDebounce(
    () => {
      checkPromoCode(value, isPending, dispatch, promoStoreEntry, setStatus)
    },
    DEBOUNCE_MS,
    [value]
  )

  useEffect(() => {
    if (previousIsPending !== isPending) {
      checkPromoCode(value, isPending, dispatch, promoStoreEntry, setStatus)
    }
  }, [previousIsPending, isPending, value, dispatch, promoStoreEntry, setStatus])

  useEffect(() => {
    return () => {
      cancel()
    }
  }, [cancel])

  return (
    <InformationalPageTemplate
      testingSelector="enterPromoCodeManuallyPage"
      headerText="Enter your discount code!"
      headerSize="fontStyle2XL"
    >
      <InputField
        id="enterPromoCodeManuallyInputField"
        label=""
        placeholder="45-56-69"
        status={
          status === 'empty'
            ? undefined
            : status === 'success'
            ? FormFieldStatus.Success
            : FormFieldStatus.Error
        }
        validationMessage={status === 'error' ? 'This discount code is not valid.' : undefined}
        value={value}
        onChange={(event) => {
          const inputValue = event.target.value
          setValue(inputValue.toUpperCase())
        }}
      />
    </InformationalPageTemplate>
  )
}
