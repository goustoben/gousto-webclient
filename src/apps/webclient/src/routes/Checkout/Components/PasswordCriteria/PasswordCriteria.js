import React from 'react'

import {
  Text,
  Color,
  FontWeight,
  Box,
  Icon,
  Space,
  IconVariant,
  AlignItems,
} from '@gousto-internal/citrus-react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { passwordCriteria } from './errors'

const max = 'validation.max.string.password'
const min = 'validation.min.string.password'

export const PasswordCriteria = ({ password, passwordErrors, showFailedCriteria }) => {
  const maxValue = passwordErrors.length > 0 && passwordErrors.includes(max)
  const requirements = passwordCriteria.filter((item) =>
    maxValue ? item.rule !== min : item.rule !== max,
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
    <Box data-testing="criteria-container">
      <Text size={1} fontWeight={FontWeight.SemiBold}>
        Password requirements:
      </Text>
      <Space size={2} />
      <Box data-testing="errors-list" paddingBottom={4}>
        {requirements.map(({ message, rule }) => {
          const { textColor, iconName, iconVariant } = getCriteriaStyle(rule)

          return (
            <Box key={rule} display="flex" alignItems={AlignItems.Center}>
              <Icon name={iconName} variant={iconVariant} />
              <Space size={2} direction="horizontal" />
              <Text size={1} color={textColor}>
                {message}
              </Text>
            </Box>
          )
        })}
      </Box>
    </Box>
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
