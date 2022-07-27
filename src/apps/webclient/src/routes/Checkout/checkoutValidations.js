import { getFormValues, getFormMeta, getFormSyncErrors } from 'redux-form'
import { goustoStore } from 'store'
import { regularExpressions } from 'validations/regularExpressions'
import { addPrefix } from 'validations/util'

/**
 * Delivery validations.
 */

const deliveryRules = {
  firstName: {
    field: 'first name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 50 } },
      { name: 'matches', options: regularExpressions.name },
    ],
  },
  lastName: {
    field: 'last name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 50 } },
      { name: 'matches', options: regularExpressions.name },
    ],
  },
  deliveryInstruction: {
    field: 'dropdown',
    rules: [
      (formValues) => {
        const isDeliveryInstruction =
          formValues &&
          formValues.delivery &&
          formValues.delivery.deliveryInstruction &&
          formValues.delivery.deliveryInstruction === 'Please select an option'

        return isDeliveryInstruction ? { errorMessage: 'Delivery instruction is required' } : true
      },
    ],
  },
}

/**
 * Dynamic delivery rules, designed for
 * "other" value on the instruction dropdown
 * @param formValues
 * @returns {{}}
 */
const deliveryExtraRules = (formValues, formSectionName = 'delivery') => {
  const validationRules = {}
  if (!formValues || !formValues[formSectionName]) return validationRules
  const values = formValues[formSectionName]
  if (typeof values.addressType === 'string' && values.addressType.toLowerCase() === 'other') {
    validationRules.customAddressType = {
      rules: [
        { name: 'isLength', options: { min: 1 } },
        { name: 'isLength', options: { max: 200 } },
      ],
      field: 'address type',
    }
  }

  if (
    typeof values.deliveryInstruction === 'string' &&
    ['neighbour', 'other'].includes(values.deliveryInstruction.toLowerCase())
  ) {
    validationRules.deliveryInstructionsCustom = {
      rules: [
        { name: 'isLength', options: { min: 5 } },
        { name: 'isLength', options: { max: 32 } },
      ],
      field: 'delivery instruction',
    }
  }

  return validationRules
}

export const deliveryValidations = (formSectionName) => (formValues) => {
  const combinedRulesWithPrefix = addPrefix(formSectionName, {
    ...deliveryRules,
    ...deliveryExtraRules(formValues, formSectionName),
  })
  const addressRulesWithPrefix = addressRules(formSectionName)(formValues)

  return {
    ...combinedRulesWithPrefix,
    ...addressRulesWithPrefix,
  }
}

/**
 * Address validations.
 */

const addressRulesObject = {
  postcodeTemp: {
    field: 'postcode',
    rules: [
      { name: 'isLength', options: { min: 5 } },
      { name: 'isLength', options: { max: 8 } },
      (data, props) => {
        let valid = true
        const state = goustoStore.store.getState()
        const { form: formName, sectionName } = props
        const formValues = getFormValues(formName)(state)

        const addressesFetched =
          formValues && formValues[sectionName] && formValues[sectionName].addressesFetched
        const addresses = formValues && formValues[sectionName] && formValues[sectionName].addresses

        if (addresses && addresses.length === 1 && addressesFetched) {
          valid = { errorMessage: 'Please enter a valid UK postcode' }
        }

        return valid
      },
      (data, props) => {
        let valid = true
        const state = goustoStore.store.getState()
        const { form: formName, sectionName } = props
        const formValues = getFormValues(formName)(state)

        const addressesFetched =
          formValues && formValues[sectionName] && formValues[sectionName].addressesFetched
        const deliverable =
          formValues && formValues[sectionName] && formValues[sectionName].deliverable

        if (addressesFetched && !deliverable && sectionName === 'delivery') {
          valid = { errorMessage: "Sorry, we don't deliver to this postcode yet" }
        }

        return valid
      },
    ],
  },

  postcode: {
    field: 'postcode',
    rules: [
      { name: 'isLength', options: { min: 5 } },
      { name: 'isLength', options: { max: 8 } },
    ],
  },

  houseNo: {
    field: 'house number',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
    ],
  },

  street: {
    field: 'street',
    rules: [{ name: 'isLength', options: { max: 200 } }],
  },

  town: {
    field: 'town',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
    ],
  },

  county: {
    field: 'county',
    rules: [{ name: 'isLength', options: { max: 200 } }],
  },

  addressId: {
    field: 'dropdown',
    rules: [
      (data, props) => {
        const { form: formName, sectionName } = props

        const state = goustoStore.store.getState()
        const formValues = getFormValues(formName)(state)
        const formFields = getFormMeta(formName)(state)
        const formErrors = getFormSyncErrors(formName)(state)

        const errors = (formErrors && formErrors[sectionName]) || {}
        const meta = (formFields && formFields[sectionName]) || {}
        const fields = ['postcode', 'houseNo', 'street', 'town', 'county']

        const isAddressSelected =
          formValues &&
          formValues[sectionName] &&
          formValues[sectionName].addressId &&
          formValues[sectionName].addressId !== 'placeholder'
        const valid =
          isAddressSelected &&
          !fields.find((field) => errors[field] && meta[field] && meta[field].touched)

        return valid ? true : { errorMessage: 'Address is required' }
      },
    ],
  },
}

/**
 * Validation rules
 * @param formSectionName
 * @returns {{}}
 */
export const addressRules = (formSectionName) => () =>
  addPrefix(formSectionName, {
    ...addressRulesObject,
  })

export const validationRules = {
  cardName: {
    field: 'Card name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
    ],
  },
}

/**
 * Rules messages
 */

export const ruleMessages = {
  isEmail: 'Please provide a valid email address',
  isLength: (field, { min, max }) => {
    let error = ''
    if (min === 1) {
      error = `${field} is required`
    } else if (min > 1) {
      error = `${field} must be at least ${min} characters`
    } else {
      error = `${field} must be under ${max} characters`
    }

    return error
  },
  matches: () =>
    "Please use only letters (a-z), hyphens (-), apostrophes (' and ‘) and European special characters.",
}
