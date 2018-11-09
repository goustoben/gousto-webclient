import { addPrefix } from 'validations/util'
import goustoStore from 'store'
import { getFormValues, getFormMeta, getFormSyncErrors } from 'redux-form'

const rules = {
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

        const addressesFetched = formValues && formValues[sectionName] && formValues[sectionName].addressesFetched
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

        const addressesFetched = formValues && formValues[sectionName] && formValues[sectionName].addressesFetched
        const deliverable = formValues && formValues[sectionName] && formValues[sectionName].deliverable

        if (addressesFetched && !deliverable) {
          valid = { errorMessage: 'Sorry, we don\'t deliver to this postcode yet' }
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
    rules: [
      { name: 'isLength', options: { max: 200 } },
    ],
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
    rules: [
      { name: 'isLength', options: { max: 200 } },
    ],
  },

  phone: {
    field: 'phone number',
    rules: [
      { name: 'isLength', options: { min: 10 } },
      { name: 'isLength', options: { max: 10 } },
    ],
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

        const isAddressSelected = formValues && formValues[sectionName] && (formValues[sectionName].addressId !== 'placeholder' || formValues[sectionName].notFound)
        const valid = isAddressSelected || !fields.find(field => errors[field] && meta[field] && meta[field].touched)

        return valid
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
  if (
    typeof values.addressType === 'string' &&
		values.addressType.toLowerCase() === 'other'
  ) {
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
        { name: 'isLength', options: { max: 50 } },
      ],
      field: 'delivery instruction',
    }
  }

  return validationRules
}

/**
 * Validation rules
 * @param formValues
 * @param formSectionName
 * @returns {{}}
 */
export default formSectionName => formValues => (
  addPrefix(formSectionName, {
    ...rules,
    ...deliveryExtraRules(formValues, formSectionName),
  })
)
