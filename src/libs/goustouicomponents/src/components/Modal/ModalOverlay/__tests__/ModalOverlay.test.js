import React from 'react'
import { mount } from 'enzyme'

import { ModalOverlay } from '../ModalOverlay.logic'

const mockProps = {
  useOverlay: true,
  isOpen: true,
}

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(<ModalOverlay {...mockProps} {...props} />)
}

describe('Given ModalOverlay is rendered', () => {
  beforeEach(() => {
    mountWithProps()
  })

  describe('And useOverlay is true', () => {
    test('Then overlay is rendered', () => {
      expect(
        wrapper.find('[data-testing="modal-overlay"]').exists(),
      ).toBeTruthy()
    })
  })

  describe('And useOverlay is false', () => {
    beforeEach(() => {
      mountWithProps({ useOverlay: false })
    })

    test('Then overlay is not rendered', () => {
      expect(
        wrapper.find('[data-testing="modal-overlay"]').exists(),
      ).toBeFalsy()
    })
  })
})
