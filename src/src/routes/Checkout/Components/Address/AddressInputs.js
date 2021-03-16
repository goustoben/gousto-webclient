import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import classNames from 'classnames'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import css from './Address.css'
import redesignCss from '../../CheckoutRedesignContainer.css'

const AddressInputs = ({ receiveRef, sectionName, isCheckoutOverhaulEnabled }) => {
  const className = classNames({
    [css.fieldContainer]: !isCheckoutOverhaulEnabled,
    [redesignCss.inputContainer]: isCheckoutOverhaulEnabled,
  })

  return (
    <div>
      <div className={className}>
        <Field
          name="houseNo"
          component={ReduxFormInput}
          inputType="Input"
          placeholder={isCheckoutOverhaulEnabled ? '' : 'House number or name'}
          required
          color="gray"
          label="House number or name"
          mask
          withRef
          ref={receiveRef}
          refId={`${sectionName}.houseNo`}
          data-testing="houseNo"
          isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
        />
      </div>
      <div className={className}>
        <Field
          name="street"
          component={ReduxFormInput}
          inputType="Input"
          placeholder={isCheckoutOverhaulEnabled ? '' : 'Enter Street name'}
          required
          color="gray"
          label="Street"
          mask
          withRef
          ref={receiveRef}
          refId={`${sectionName}.street`}
          isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
        />
      </div>
      <div className={className}>
        <Field
          name="town"
          component={ReduxFormInput}
          inputType="Input"
          placeholder={isCheckoutOverhaulEnabled ? '' : 'Enter Town'}
          required
          color="gray"
          label={isCheckoutOverhaulEnabled ? 'City' : 'Town'}
          mask
          withRef
          ref={receiveRef}
          refId={`${sectionName}.town`}
          isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
        />
      </div>
      {!isCheckoutOverhaulEnabled && (
        <Fragment>
          <div className={css.fieldContainer}>
            <Field
              name="county"
              component={ReduxFormInput}
              inputType="Input"
              placeholder="Enter County"
              required
              color="gray"
              label="County"
              mask
              withRef
              ref={receiveRef}
              refId={`${sectionName}.county`}
            />
          </div>
          <div className={css.fieldContainer}>
            <Field
              name="postcode"
              component={ReduxFormInput}
              inputType="Input"
              placeholder="Enter Postcode"
              required
              color="gray"
              label="Postcode"
              mask
              disabled
              withRef
              ref={receiveRef}
              refId={`${sectionName}.postcode`}
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

AddressInputs.propTypes = {
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

AddressInputs.defaultProps = {
  receiveRef: () => {},
  sectionName: '',
  isCheckoutOverhaulEnabled: false,
}

export {
  AddressInputs
}
