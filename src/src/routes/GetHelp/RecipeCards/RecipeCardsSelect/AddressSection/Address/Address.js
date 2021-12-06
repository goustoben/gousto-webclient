import React from 'react'
import { addressPropType } from '../../../../getHelpPropTypes'
import css from './Address.css'

const Address = ({ line1, line2, line3, name, postcode, town }) => (
  <>
    <p className={css.name}>{name}</p>
    <p>
      {line1}
      {line2 ? `, ${line2}` : null}
      {line3 ? `, ${line3}` : null}
      {`, ${town}`}
      {`, ${postcode}`}
    </p>
  </>
)

Address.propTypes = addressPropType.isRequired

export { Address }
