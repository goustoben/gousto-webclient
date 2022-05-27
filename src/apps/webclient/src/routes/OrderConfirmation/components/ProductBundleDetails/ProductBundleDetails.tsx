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
  useModal,
} from '@gousto-internal/citrus-react'

import { getAllergenListFromAttributes } from 'components/Product/Detail/Detail'
import { Divider } from 'routes/Account/Subscription/components/Divider'
import { SubIngredients } from 'routes/Menu/components/Detail/SubIngredients'
import { Product } from 'routes/OrderConfirmation/types'

import css from './ProductBundleDetails.css'

interface Props {
  bundleDescription: string
  bundleImage: string
  bundleName: string
  bundlePrice: string
  bundleProducts: any[]
  isOpen: boolean
}

export const ProductBundleDetails = (props: Props) => {
  const { bundleDescription, bundleImage, bundleName, bundlePrice, bundleProducts, isOpen } = props
  const { closeCurrentModal } = useModal()

  const handleModalClose = () => closeCurrentModal()

  return (
    <Modal name="BundleDetails" isOpen={isOpen}>
      <ModalHeader>
        <Heading5>{bundleName}</Heading5>
        <ModalClose onClose={handleModalClose} />
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
        {bundleProducts.map((product: Product) => (
          <Box key={product.id} data-testid="bundleProducts">
            <Paragraph className={css.bundleTitle} fontFamily={FontFamily.SemiBold}>
              {product.title}
            </Paragraph>
            <SubIngredients
              className={css.productDetailsDescription}
              subIngredients={product.description}
              allergens={getAllergenListFromAttributes(product.attributes)}
            />
          </Box>
        ))}
      </ModalBody>
    </Modal>
  )
}
