import { reduxForm } from 'redux-form'
import validate from 'Form/validate'
import { scrollToRefsWrapper } from 'components/ScrollToRefs/ScrollToRefs'
import dottify from 'utils/dottify'

export default (Component, rules, messages = {}, opts = {}, asyncValidate = async () => {}, asyncBlurFields = []) => (
  scrollToRefsWrapper(reduxForm({
    form: 'checkout',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    validate: (data, props) => {
      let combinedRules = {}
      let validationRules = rules
      if (!Array.isArray(validationRules)) {
        validationRules = [validationRules]
      }

      validationRules.forEach(rule => {
        let validationRule = rule
        if (typeof rule === 'function') {
          validationRule = rule(data) // eslint-disable-line no-param-reassign
        }
        combinedRules = { ...combinedRules, ...validationRule }
      })

      return validate(combinedRules, data, props, messages)
    },
    asyncValidate,
    asyncBlurFields,
    onSubmit: (values, dispatch, props) => {
      let response

      if (!props.isLastStep) {
        props.onStepChange()
        response = Promise.resolve()
      } else {
        response = new Promise(async (resolve, reject) => {
          try {
            await props.submitOrder()
            resolve()
          } catch (e) {
            reject()
          }
        })
      }

      return response
    },
    onSubmitFail: (errors, dispatch, submitError, props) => {
      props.scrollToFirstMatchingRef([dottify(errors)])
    },
    ...opts,
  })(Component))
)
