import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { jsx } from '@emotion/react'
import {
  Text,
  Color,
  FontWeight,
  Box,
  Icon,
  Space,
  IconVariant,
} from '@gousto-internal/citrus-react'
import { passwordCriteria } from './errors'
import css from './PasswordCriteria.css'

const max = 'validation.max.string.password'
const min = 'validation.min.string.password'

export const PasswordCriteria = ({ password, passwordErrors, showFailedCriteria }) => {
  const maxValue = passwordErrors.length > 0 && passwordErrors.includes(max)
  const requirements = passwordCriteria.filter((item) =>
    maxValue ? item.rule !== min : item.rule !== max
  )

  const getCriteriaStyle = (rule) => {
    if (!passwordErrors.includes(rule) && password) {
      return {
        textColor: Color.Success_800,
        iconName: 'tick',
        iconVariant: IconVariant.Confirmation,
      }
    } else if (showFailedCriteria) {
      return { textColor: Color.Error_800, iconName: 'close', iconVariant: IconVariant.Error }
    }

    return { textColor: Color.Inherit, iconName: 'bullet_point', iconVariant: IconVariant.Inherit }
  }

  return (
    <div className={css.criteriaContainer}>
      {/* <div className={css.criteriaTitle}>Password requirements:</div> */}
      <Box paddingBottom={2}>
        <Text fontWeight={FontWeight.SemiBold}>Password requirements:</Text>
      </Box>

      <ul className={css.errorsList}>
        {requirements.map(({ message, rule }) => {
          // const className =
          //   !passwordErrors.includes(rule) && password ? css.success : css.defaultMessage
          // const errorClassName =
          //   showFailedCriteria && className === css.defaultMessage ? css.error : ''

          const { textColor, iconName, iconVariant } = getCriteriaStyle(rule)

          return (
            <>
              {/* <li key={rule} className={classNames(css.message, className, errorClassName)}>
                {message}
              </li> */}
              <Box key={rule} display="flex">
                <Icon name={iconName} variant={iconVariant} />
                <Space size={2} direction="horizontal" />
                <Text color={textColor}>{message}</Text>
              </Box>
            </>
          )
        })}
      </ul>
    </div>
  )
}

PasswordCriteria.propTypes = {
  passwordErrors: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  password: PropTypes.string,
  showFailedCriteria: PropTypes.bool,
}

PasswordCriteria.defaultProps = {
  passwordErrors: Immutable.List([]),
  password: '',
  showFailedCriteria: false,
}
