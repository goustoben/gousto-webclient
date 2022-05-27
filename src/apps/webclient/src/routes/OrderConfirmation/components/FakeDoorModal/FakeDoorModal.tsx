import React from 'react'

import {
  Box,
  ButtonColorVariant,
  Color,
  FontWeight,
  Heading5,
  Heading6,
  Modal,
  ModalBody,
  ModalButton,
  ModalClose,
  ModalFooter,
  ModalHeader,
  Text,
} from '@gousto-internal/citrus-react'
import GoustoImage from 'Image'

import css from './FakeDoorModal.css'

interface Props {
  bundleName: string
  bundleProducts: any[]
  isOpen: boolean
  close: () => void
}

const locale = {
  header: 'You’re almost there…',
  callToAction: `We’re currently working on this concept - the good news is you can still add the `,
  browseItems: 'Browse Items',
  productTitle: (numberOfItems: number, title: string) => `${numberOfItems} x ${title}`,
  items: ' items individually.',
}

export const FakeDoorModal = (props: Props) => {
  const { bundleName, bundleProducts, isOpen, close } = props
  const { browseItems, callToAction, header, items, productTitle } = locale

  return (
    <Modal name="FakeDoorModal" isOpen={isOpen}>
      <ModalHeader>
        <Heading5>{header}</Heading5>
        <ModalClose onClose={close} />
      </ModalHeader>
      <ModalBody>
        <Box className={css.callToAction}>
          <Text>
            {callToAction}
            <Text className={css.occasions} fontWeight={FontWeight.Bold}>
              {bundleName}
            </Text>
            {items}
          </Text>
        </Box>
        <Box bg={Color.NeutralGrey_50} className={css.productsContainer}>
          {bundleProducts.map((product: any) => (
            <div className={css.item} key={product.id} data-testid="bundleProducts">
              <GoustoImage media={product.image} title={product.title} className={css.img} />
              <Box className={css.details}>
                <Heading6 size={2} className={css.productTitle}>
                  {productTitle(product.quantity, product.title)}
                </Heading6>
              </Box>
            </div>
          ))}
        </Box>
      </ModalBody>
      <ModalFooter>
        <ModalButton colorVariant={ButtonColorVariant.Primary}>{browseItems}</ModalButton>
      </ModalFooter>
    </Modal>
  )
}
