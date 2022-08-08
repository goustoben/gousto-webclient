import React from 'react'

import { Login } from 'Login'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import { useSelector } from 'react-redux'

import css from 'routes/Checkout/Checkout.css'
import { closeLoginModal } from 'routes/Checkout/utils/loginModal'

export const LoginModal = () => {
  const isLoginOpened = useSelector((state: any) => state.loginVisibility.get('login'))

  return (
    <Overlay open={isLoginOpened} contentClassName={css.modalOverlay} from="top">
      <ModalPanel
        closePortal={closeLoginModal}
        className={css.modal}
        containerClassName={css.modalContainer}
        disableOverlay
        isNarrow
      >
        <Login />
      </ModalPanel>
    </Overlay>
  )
}
