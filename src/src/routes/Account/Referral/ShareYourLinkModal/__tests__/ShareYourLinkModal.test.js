import React from 'react'
import { shallow } from 'enzyme'
import { ShareYourLinkModal } from '../ShareYourLinkModal'

describe('Share Your Link Modal', () => {
  describe('rendering', () => {
    let wrapper
    const mockOnClose = jest.fn()

    beforeEach(() => {
      wrapper = shallow(<ShareYourLinkModal onClose={mockOnClose} />)
    })

    test('should render a Modal Panel with onClose prop', () => {
      const modalPanelWithOnCloseProp = wrapper.find('ModalPanel').find({ closePortal: mockOnClose })
      expect(modalPanelWithOnCloseProp.length).toEqual(1)
    })

  })
})
