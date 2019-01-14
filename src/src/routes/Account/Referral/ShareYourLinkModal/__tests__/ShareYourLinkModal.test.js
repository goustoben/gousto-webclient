import React from 'react'
import { shallow } from 'enzyme'
import { ShareYourLinkModal } from '../ShareYourLinkModal'
import ReferAFriend from '../../ReferAFriend'


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

    test('should render row containing email icon and text label', () => {
      const emailRow = wrapper.find('div.row').at(1)
      const emailSvg = emailRow.find('Svg').find({fileName:'icon-email-colour'})
      
      expect(emailSvg.length).toEqual(1)
      expect(emailRow.find('span').text()).toEqual('E-mail')
    })

    test('should render row containing facebook icon and text label', () => {
      const facebookRow = wrapper.find('div.row').at(2)
      const facebookSvg = facebookRow.find('Svg').find({fileName:'icon-facebook-colour'})
      
      expect(facebookSvg.length).toEqual(1)
      expect(facebookRow.find('span').text()).toEqual('Facebook')
    })

    test('should render row containing messenger icon and text label', () => {
      const messengerRow = wrapper.find('div.row').at(3)
      const messengerSvg = messengerRow.find('Svg').find({fileName:'icon-facebook-messenger-colour'})
      
      expect(messengerSvg.length).toEqual(1)
      expect(messengerRow.find('span').text()).toEqual('Messenger')
    })

    test('should render ReferAFriend when isEmailFormOpen is true', () => {
      
      wrapper.setState({ isEmailFormOpen: true })
      expect(wrapper.find(ReferAFriend).length).toEqual(1)
    })

  })
})
