import React from 'react'

import {
  Box,
  Color,
  FontFamily,
  Heading5,
  Heading6,
  Image,
  Modal,
  ModalBody,
  ModalClose,
  ModalHeader,
  Paragraph,
} from '@gousto-internal/citrus-react'
import { fromJS } from 'immutable'

import { getAllergenListFromAttributes } from 'components/Product/Detail/Detail'
import { Divider } from 'routes/Account/Subscription/components/Divider'
import { SubIngredients } from 'routes/Menu/components/Detail/SubIngredients'
import { BundleProduct } from 'routes/OrderConfirmation/types'

import css from './ProductBundleDetails.css'

interface Props {
  bundleDescription: string
  bundleImage: string
  bundleName: string
  bundlePrice: string
  bundleProducts: BundleProduct[]
  isOpen: boolean
  close: () => void
}

export const ProductBundleDetails = (props: Props) => {
  const { bundleDescription, bundleImage, bundleName, bundlePrice, bundleProducts, isOpen, close } =
    props

  return (
    <Modal name="BundleDetails" isOpen={isOpen}>
      <ModalHeader>
        <Heading5>{bundleName}</Heading5>
        <ModalClose onClose={close} />
      </ModalHeader>
      <ModalBody>
        <Image src={bundleImage} alt={bundleName} />
        <Heading6
          className={css.bundleDescription}
          size={2}
          fontFamily={FontFamily.Bold}
          color={Color.ColdGrey_300}
        >
          {bundleDescription}
        </Heading6>
        <Heading6 fontFamily={FontFamily.Bold} size={2} className={css.bundlePrice}>
          £{bundlePrice}
        </Heading6>
        <Box className={css.divider}>
          <Divider />
        </Box>
        {bundleProducts.map((product: BundleProduct) => (
          <Box key={product.id} data-testid="bundleProducts">
            <Paragraph className={css.bundleTitle} fontFamily={FontFamily.SemiBold}>
              {product.title}
            </Paragraph>
            <SubIngredients
              className={css.productDetailsDescription}
              subIngredients={product.description}
              allergens={getAllergenListFromAttributes(fromJS(product.attributes))}
            />
          </Box>
        ))}
      </ModalBody>
    </Modal>
  )
}
