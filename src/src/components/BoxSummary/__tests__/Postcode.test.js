import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import Postcode from 'BoxSummary/Postcode/Postcode'
import TextInput from 'Form/Input'
import Form from 'Form'
import DropdownInput from 'Form/Dropdown'
import css from 'BoxSummary/Postcode/Postcode.css'
import { LayoutContentWrapper, Button, Segment } from 'goustouicomponents'

describe('Postcode', () => {
  let wrapper
  let addresses
  let setTempPostcodeSpy

  beforeEach(() => {
    setTempPostcodeSpy = jest.fn()
    wrapper = shallow(<Postcode setTempPostcode={setTempPostcodeSpy} />)
  })

  test('should return a LayoutContentWrapper', () => {
    expect(wrapper.type()).toEqual(LayoutContentWrapper)
  })

  test('should render a Form', () => {
    expect(wrapper.childAt(0).type()).toEqual(Form)
  })

  test('should render a TextInput', () => {
    expect(wrapper.find(TextInput)).toHaveLength(1)
  })

  test('should render a Button', () => {
    expect(wrapper.find(Button)).toHaveLength(1)
  })

  describe('by default', () => {
    test('should ask me to enter my postcode', () => {
      expect(wrapper.find('p').at(1).text()).toEqual('Enter your Postcode:')
    })
    test('should have a secondary colored TextInput', () => {
      expect(wrapper.find(TextInput).prop('color')).toEqual('secondary')
    })
    test('should not change the className of the leading text to be .errorText', () => {
      expect(wrapper.find('p').at(1).prop('className')
        .indexOf(css.errorText)).toEqual(-1)
    })
    test('should not show the button to be pending', () => {
      expect(wrapper.find(Button).prop('pending')).toEqual(false)
    })

    describe('when the button is clicked', () => {
      test('should call the boxSummaryNext function prop', () => {
        const boxSummaryNextSpy = jest.fn()
        wrapper = shallow(<Postcode tempPostcode="w30df" boxSummaryNext={boxSummaryNextSpy} setTempPostcode={setTempPostcodeSpy} />)
        wrapper.find(Button).simulate('click')
        expect(boxSummaryNextSpy).toHaveBeenCalled()
      })
    })

    test('should show "continue" text on the button', () => {
      wrapper = mount(<Postcode setTempPostcode={setTempPostcodeSpy} />)
      expect(wrapper.find(Segment).at(1).text()).toEqual('Continue')
    })
    test('should show the button as disabled', () => {
      expect(wrapper.find(Button).at(0).prop('disabled')).toEqual(true)
    })

    describe('when the Form is submitted', () => {
      test('should call the boxSummaryNextSpy function prop when the Form is submitted', () => {
        const boxSummaryNextSpy = jest.fn()
        wrapper = shallow(<Postcode boxSummaryNext={boxSummaryNextSpy} tempPostcode="w30df" setTempPostcode={setTempPostcodeSpy} />)
        wrapper.find(Form).simulate('submit')
        expect(boxSummaryNextSpy).toHaveBeenCalled()
      })
    })

    test('should not show the cancel link', () => {
      expect(wrapper.find('a')).toHaveLength(0)
    })
  })

  describe('when the deliveryDaysError prop is set', () => {
    beforeEach(() => {
      wrapper = shallow(<Postcode deliveryDaysError setTempPostcode={setTempPostcodeSpy} />)
    })

    test('should show me error text', () => {
      expect(wrapper.find('p').at(1).text()).toEqual('Please enter a valid postcode')
    })
    test('should change the color of the TextInput to be primary', () => {
      expect(wrapper.find(TextInput).prop('color')).toEqual('primary')
    })
    test('should change the className of the error text to be .errorText', () => {
      expect(wrapper.find('p').at(1).prop('className')
        .indexOf(css.errorText)).not.toEqual(-1)
    })
  })

  describe('when the postcodePending prop is set', () => {
    beforeEach(() => {
      wrapper = shallow(<Postcode postcodePending setTempPostcode={setTempPostcodeSpy} />)
    })

    test('should show the button to be pending', () => {
      expect(wrapper.find(Button).prop('pending')).toEqual(true)
    })
  })

  describe('when the prevPostcode prop is set', () => {
    beforeEach(() => {
      wrapper = mount(<Postcode prevPostcode="w30df" setTempPostcode={setTempPostcodeSpy} />)
    })

    test('should show different text on the button', () => {
      expect(wrapper.find(Segment).at(1).text()).toEqual('Show Delivery Slots')
    })

    test('should render a link with "Cancel" in it which calls the basketRestorePreviousValues prop on click', () => {
      const basketRestorePreviousValuesSpy = jest.fn()
      wrapper = shallow(<Postcode basketRestorePreviousValues={basketRestorePreviousValuesSpy} prevPostcode="w30df" setTempPostcode={setTempPostcodeSpy} />)
      expect(wrapper.find('a').text()).toEqual('Cancel')
      wrapper.find('a').simulate('click')
      expect(basketRestorePreviousValuesSpy).toHaveBeenCalled()
    })
  })

  describe('with no postcode', () => {
    beforeEach(() => {
      wrapper = mount(<Postcode setTempPostcode={setTempPostcodeSpy} />)
    })

    test('should disable the button', () => {
      expect(wrapper.find(Button).prop('disabled')).toEqual(true)
    })
  })

  describe('when the addresses prop is set', () => {
    let basketChosenAddressChangeSpy
    beforeEach(() => {
      addresses = Immutable.fromJS([
        {
          id: '321250',
          deleted: false,
          user_id: '77213',
          name: 'Home',
          companyname: '',
          line1: 'Flat 4',
          line2: '67 Cloister Road',
          line3: '',
          town: 'London',
          county: 'Greater London',
          postcode: 'W3 0DF',
          delivery_instructions: 'Front Porch',
          shipping_default: true,
          billing_default: false,
          state: 'valid',
          premium_delivery: true,
        }, {
          id: '325007',
          deleted: false,
          user_id: '77213',
          name: 'work',
          companyname: '',
          line1: 'Unit 2 Issigonis House',
          line2: 'Cowley Road',
          line3: '',
          town: 'London',
          county: 'Greater London',
          postcode: 'W3 7UN',
          delivery_instructions: 'Front Porch',
          shipping_default: false,
          billing_default: false,
          state: 'valid',
          premium_delivery: true,
        }])
      basketChosenAddressChangeSpy = jest.fn()
      wrapper = shallow(<Postcode addresses={addresses} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
    })

    test('should not show me a textinput', () => {
      expect(wrapper.find(TextInput)).toHaveLength(0)
    })

    test('should instead show me a dropdowninput', () => {
      expect(wrapper.find(DropdownInput)).toHaveLength(1)
    })

    test('should have a dropdowninput with the addresses mapped to it', () => {
      const actual = wrapper.find(DropdownInput).prop('options')
      const expected = addresses.map(address => ({
        label: `${address.get('name')}, ${address.get('postcode')}`,
        value: address.get('id'),
      })).toArray()
      expect(actual).toEqual(expected)
    })

    test('should call the basketChosenAddressChange on dropdown change', () => {
      const address = addresses.get(1)
      const changePostcodeSpy = jest.fn()
      const changeAddressSpy = jest.fn()

      wrapper = shallow(<Postcode addresses={addresses} changePostcode={changePostcodeSpy} basketChosenAddressChange={basketChosenAddressChangeSpy} changeAddress={changeAddressSpy} setTempPostcode={setTempPostcodeSpy} />)
      wrapper.find(DropdownInput).simulate('change', address.get('id'))

      expect(basketChosenAddressChangeSpy).toHaveBeenCalledTimes(1)
      expect(basketChosenAddressChangeSpy).toHaveBeenCalledWith(address)
    })

    test('should have a button which calls the boxSummaryNext', () => {
      const boxSummaryNextSpy = jest.fn()
      const changePostcodeSpy = jest.fn()
      const address = addresses.get(1)

      wrapper = shallow(<Postcode addresses={addresses} boxSummaryNext={boxSummaryNextSpy} changePostcode={changePostcodeSpy} chosenAddress={address} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
      wrapper.find(DropdownInput).simulate('change', address.get('id'))
      wrapper.find(Button).simulate('click')

      expect(boxSummaryNextSpy).toHaveBeenCalledTimes(1)
    })

    describe('when the user has chosen an option', () => {
      test('should enable the continue button', () => {
        const address = addresses.get(1)
        wrapper = shallow(<Postcode addresses={addresses} chosenAddress={address} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
        wrapper.find(DropdownInput).simulate('change', address.get('id'))
        expect(wrapper.find(Button).at(0).prop('disabled')).toEqual(false)
      })
    })

    describe('if the chosenAddress prop is not set', () => {
      test('should disable the next button', () => {
        wrapper = shallow(<Postcode addresses={addresses} basketChosenAddressChange={basketChosenAddressChangeSpy} setTempPostcode={setTempPostcodeSpy} />)
        expect(wrapper.find(Button).at(0).prop('disabled')).toEqual(true)
      })
    })
  })
})
