import { addPrefix } from 'validations/util'
import goustoStore from 'store'
import { getFormValues, getFormMeta, getFormSyncErrors } from 'redux-form'
import logger from 'utils/logger'

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

        logger.error(`deliverable (in validation) = ${deliverable}`)
        if (addressesFetched && !deliverable && (sectionName === 'delivery')) {
          valid = { errorMessage: `Welp, how about this info: FORM VALUES: ${JSON.stringify(formValues[sectionName])}, SECTION NAME: ${JSON.stringify(sectionName)}` }
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

        const isAddressSelected = formValues && formValues[sectionName] && formValues[sectionName].addressId && (formValues[sectionName].addressId !== 'placeholder')
        const valid = isAddressSelected && !fields.find(field => errors[field] && meta[field] && meta[field].touched)

        return valid ? true : { errorMessage: 'Address is required' }
      },
    ],
  },
}

/**
 * Validation rules
 * @param formValues
 * @param formSectionName
 * @returns {{}}
 */
export default formSectionName => formValues => (
  addPrefix(formSectionName, {
    ...rules
  })
)
