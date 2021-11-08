import { reduxForm } from 'redux-form'
import { validate } from 'Form/validate'
import { scrollToRefsWrapper } from 'components/ScrollToRefs/ScrollToRefs'
import dottify from 'utils/dottify'

export const formContainer = (
  Component,
  rules,
  formName,
  messages = {},
  opts = {},
  asyncValidate = async () => {},
  asyncBlurFields = []
) =>
  scrollToRefsWrapper(
    reduxForm({
      form: formName,
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true,
      validate: (data, props) => {
        let combinedRules = {}
        let validationRules = rules
        if (!Array.isArray(validationRules)) {
          validationRules = [validationRules]
        }

        validationRules.forEach((rule) => {
          let validationRule = rule
          if (typeof rule === 'function') {
            validationRule = rule(data)
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
          response = new Promise((resolve, reject) => {
            props
              .submitOrder()
              .then(() => resolve())
              .catch(() => reject())
          })
        }

        return response
      },
      onSubmitFail: (errors, dispatch, submitError, props) => {
        props.scrollToFirstMatchingRef([dottify(errors)])
      },
      ...opts,
    })(Component)
  )
