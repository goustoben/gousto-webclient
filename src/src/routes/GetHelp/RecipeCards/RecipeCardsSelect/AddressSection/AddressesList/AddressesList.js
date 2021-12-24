import React from 'react'
import PropTypes from 'prop-types'
import { InputRadio } from 'goustouicomponents'
import Link from 'components/Link'
import { client } from 'config/routes'
import { Address } from '../Address'
import { addressPropType } from '../../../../getHelpPropTypes'
import css from './AddressesList.css'

const AddressesList = ({
  userAddresses,
  selectedAddress,
  setSelectedAddress,
  trackRecipeCardsAddressChangeArticle,
  inputVariant
}) => {
  const howToChangeAddressArticle = '/article/4402897919761'
  const changeSelectedAddress = ({ target: { id }}) => {
    const address = userAddresses.find(({id: addressId}) => addressId === id)
    setSelectedAddress(address)
  }

  return (
    <>
      <p className={css.addressesListSubHeader}>Please select the address you would like us to deliver to.</p>
      {
        userAddresses.map((address) => {
          const {id, line1, line2, line3, name, postcode, town } = address

          return (
            <InputRadio
              id={id}
              key={`address-${id}`}
              name="recipe-card-addresses"
              isChecked={id === selectedAddress.id}
              value={id}
              onChange={changeSelectedAddress}
              variant={inputVariant}
            >
              <Address
                line1={line1}
                line2={line2}
                line3={line3}
                name={name}
                postcode={postcode}
                town={town}
              />
            </InputRadio>
          )
        })

      }
      <Link
        className={css.helpArticle}
        clientRouted={false}
        tracking={trackRecipeCardsAddressChangeArticle}
        to={`${client.helpCentre}${howToChangeAddressArticle}`}
      >
        How can I add a new address?
      </Link>
    </>
  )
}

AddressesList.propTypes = {
  userAddresses: PropTypes.arrayOf(addressPropType).isRequired,
  selectedAddress: addressPropType.isRequired,
  setSelectedAddress: PropTypes.func.isRequired,
  trackRecipeCardsAddressChangeArticle: PropTypes.func.isRequired,
  inputVariant: PropTypes.oneOf(['tile', 'default']).isRequired,
}

export { AddressesList }
