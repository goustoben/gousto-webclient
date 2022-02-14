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

const ReceiptLineContainer = ({children}) => (
  <Box
    display="flex"
    flexDirection={FlexDirection.Row}
    justifyContent={JustifyContent.SpaceBetween}
    alignItems={AlignItems.FlexEnd}
  >
    {children}
  </Box>
)

const ReceptLineBoldStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text fontWeight={FontWeight.Bold} size={2}>{label}</Text>
      <Text data-testing={dataTesting} fontWeight={FontWeight.Bold} size={2}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={2} />
  </>
)

const ReceptLinePrimaryStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text fontWeight={FontWeight.Bold} size={2} color={Color.Success_600}>{label}</Text>
      <Text data-testing={dataTesting} fontWeight={FontWeight.Bold} size={2} color={Color.Success_600}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={2} />
  </>
)

const ReceptLineHighlightedStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text uppercase size={2}>{label}</Text>
      <Text data-testing={dataTesting} size={4}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={2} />
  </>
)

const ReceptLineCheckoutBoldStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text fontWeight={FontWeight.Bold} size={3}>{label}</Text>
      <Text data-testing={dataTesting} fontWeight={FontWeight.Bold} size={3}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={6} />
  </>
)

const ReceptLineCheckoutPrimaryStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text fontWeight={FontWeight.SemiBold} color={Color.Success_800}>{label}</Text>
      <Text data-testing={dataTesting} fontWeight={FontWeight.SemiBold} color={Color.Success_800}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={0} />
  </>
)

const ReceptLineCheckoutNormalStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text>{label}</Text>
      <Text data-testing={dataTesting}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={0} />
  </>
)

const ReceptLineTruncateLabelStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{label}</Text>
      <Text data-testing={dataTesting}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={0} />
  </>
)

const ReceptLineDefaultStyle = ({label, children, dataTesting}) => (
  <>
    <ReceiptLineContainer>
      <Text>{label}</Text>
      <Text data-testing={dataTesting}>
        {children}
      </Text>
    </ReceiptLineContainer>
    <Space size={2} />
  </>
)

export const ReceiptLine = ({
  label,
  children,
  lineStyle,
  showLineAbove,
  dataTesting,
  isReceiptInCheckout,
}) => {
  const renderStyledReceiptLine = () => {
    switch (lineStyle) {
    case 'bold':
      return (
        <ReceptLineBoldStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLineBoldStyle>
      )
    case 'primary':
      return (
        <ReceptLinePrimaryStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLinePrimaryStyle>
      )
    case 'highlighted':
      return (
        <ReceptLineHighlightedStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLineHighlightedStyle>
      )
    case 'checkoutBold':
      return (
        <ReceptLineCheckoutBoldStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLineCheckoutBoldStyle>
      )
    case 'checkoutPrimary':
      return (
        <ReceptLineCheckoutPrimaryStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLineCheckoutPrimaryStyle>
      )
    case 'checkoutNormal':
      return (
        <ReceptLineCheckoutNormalStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLineCheckoutNormalStyle>
      )
    case 'truncateLabel':
      return (
        <ReceptLineTruncateLabelStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLineTruncateLabelStyle>
      )
    default:
      return (
        <ReceptLineDefaultStyle label={label} dataTesting={dataTesting}>
          {children}
        </ReceptLineDefaultStyle>
      )
    }
  }

  return (
    <>
      {showLineAbove && (
        <>
          <Space size={isReceiptInCheckout ? 2 : 1} />
          <Box height="1px" bg={Color.NeutralGrey_100} />
          <Space size={isReceiptInCheckout ? 2 : 1} />
        </>
      )}
      {renderStyledReceiptLine()}
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

ReceiptLineContainer.propTypes = {
  children: PropTypes.node,
}

const lineStylePropTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  dataTesting: PropTypes.string,
}

ReceptLineBoldStyle.propTypes = {
  ...lineStylePropTypes
}

ReceptLinePrimaryStyle.propTypes = {
  ...lineStylePropTypes
}

ReceptLineHighlightedStyle.propTypes = {
  ...lineStylePropTypes
}

ReceptLineCheckoutBoldStyle.propTypes = {
  ...lineStylePropTypes
}

ReceptLineCheckoutPrimaryStyle.propTypes = {
  ...lineStylePropTypes
}

ReceptLineCheckoutNormalStyle.propTypes = {
  ...lineStylePropTypes
}

ReceptLineTruncateLabelStyle.propTypes = {
  ...lineStylePropTypes
}

ReceptLineDefaultStyle.propTypes = {
  ...lineStylePropTypes
}
