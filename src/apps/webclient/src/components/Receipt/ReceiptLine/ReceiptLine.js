import PropTypes from 'prop-types'
import React from 'react'
import {
  Text,
  FontWeight,
  Box,
  FlexDirection,
  JustifyContent,
  Color,
  Space,
  AlignItems,
} from '@gousto-internal/citrus-react'

export const ReceiptLine = ({
  label,
  children,
  lineStyle,
  showLineAbove,
  dataTesting,
  isReceiptInCheckout,
}) => {
  const getLineProps = () => {
    const defaultProps = {
      labelProps: {},
      contentProps: {},
      spaceSize: 2,
    }

    const styles = {
      bold: {
        labelProps: {
          fontWeight: FontWeight.Bold,
          size: 2,
        },
        contentProps: {
          fontWeight: FontWeight.Bold,
          size: 2,
        },
        spaceSize: 2,
      },
      primary: {
        labelProps: {
          fontWeight: FontWeight.Bold,
          size: 2,
          color: Color.Success_600,
        },
        contentProps: {
          fontWeight: FontWeight.Bold,
          size: 2,
          color: Color.Success_600,
        },
        spaceSize: 2,
      },
      highlighted: {
        labelProps: {
          size: 2,
          uppercase: true,
        },
        contentProps: {
          size: 4,
        },
        spaceSize: 2,
      },
      checkoutBold: {
        labelProps: {
          fontWeight: FontWeight.Bold,
          size: 3,
        },
        contentProps: {
          fontWeight: FontWeight.Bold,
          size: 3,
        },
        spaceSize: 6,
      },
      checkoutPrimary: {
        labelProps: {
          fontWeight: FontWeight.SemiBold,
          color: Color.Success_800,
        },
        contentProps: {
          fontWeight: FontWeight.SemiBold,
          color: Color.Success_800,
        },
        spaceSize: 0,
      },
      checkoutNormal: { labelProps: {}, contentProps: {}, spaceSize: 0 },
      truncateLabel: {
        labelProps: {
          style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
          size: 3,
        },
        contentProps: {},
        spaceSize: 0,
      },
    }

    return styles[lineStyle] || defaultProps
  }

  const { contentProps, labelProps, spaceSize } = getLineProps()

  return (
    <>
      {showLineAbove && (
        <>
          <Space size={isReceiptInCheckout ? 2 : 1} />
          <Box height="1px" bg={Color.NeutralGrey_100} />
          <Space size={isReceiptInCheckout ? 2 : 1} />
        </>
      )}
      <Box
        display="flex"
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.SpaceBetween}
        alignItems={AlignItems.FlexEnd}
      >
        {/* eslint-disable react/jsx-props-no-spreading */}
        <Text {...labelProps}>{label}</Text>
        <Text data-testing={dataTesting} {...contentProps}>
          {children}
        </Text>
      </Box>
      <Space size={spaceSize} />
    </>
  )
}

ReceiptLine.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  lineStyle: PropTypes.oneOf([
    'small',
    'normal',
    'bold',
    'primary',
    'highlighted',
    'truncateLabel',
    'checkoutPrimary',
    'checkoutBold',
    'checkoutNormal',
  ]),
  showLineAbove: PropTypes.bool,
  dataTesting: PropTypes.string,
  isReceiptInCheckout: PropTypes.bool,
}

ReceiptLine.defaultProps = {
  label: null,
  children: null,
  lineStyle: 'small',
  showLineAbove: false,
  dataTesting: null,
  isReceiptInCheckout: false,
}
