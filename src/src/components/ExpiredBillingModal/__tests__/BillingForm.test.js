import React from 'react'
import { shallow } from 'enzyme'
import config from 'config/checkout'
import { Button } from 'goustouicomponents'
import Input from 'Form/Input'
import Dropdown from 'Form/Dropdown'
import Svg from 'Svg'

import BillingForm from '../BillingForm/BillingForm.js'
import css from '../BillingForm/BillingForm.css'

describe('BillingForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<BillingForm />)
  })

  test('should return all the relevant input fields + titles', () => {
    let className = `.${css.inputTitle.split(' ').join('.')}`
    expect(wrapper.find(className).at(0).text()).toContain('Name')
    expect(wrapper.find(Input).findWhere(c => c.prop('name') === 'formCardName')).toHaveLength(1)

    className = `.${css.inputTitle.split(' ').join('.')}`
    expect(wrapper.find(className).at(1).text()).toContain('Card number')
    expect(wrapper.find(Input).findWhere(c => c.prop('name') === 'formCardNumber')).toHaveLength(1)

    className = `.${css.inputTitle.split(' ').join('.')}`
    expect(wrapper.find(className).at(2).text()).toContain('Card type')
    expect(wrapper.find(Dropdown).findWhere(c => c.prop('name') === 'formCardType')).toHaveLength(1)

    className = `.${css.inputTitle.split(' ').join('.')}`
    expect(wrapper.find(className).at(3).text()).toContain('Security code')
    expect(wrapper.find(Input).findWhere(c => c.prop('name') === 'formSecurityCode')).toHaveLength(1)

    className = `.${css.inputTitle.split(' ').join('.')}`
    expect(wrapper.find(className).at(4).text()).toContain('Card expiry')
    expect(wrapper.find(Dropdown).findWhere(c => c.prop('name') === 'cardExpiryMonth')).toHaveLength(1)
    expect(wrapper.find(Dropdown).findWhere(c => c.prop('name') === 'cardExpiryYear')).toHaveLength(1)
  })

  test('should contain a Button', () => {
    expect(wrapper.find('Button').length).toEqual(1)
  })

  it('should return all the relevant input fields + titles', function() {
    expect(wrapper.find(Svg).findWhere(c => c.prop('fileName') === 'icon-Maestro-dark')).toHaveLength(2)
    expect(wrapper.find(Svg).findWhere(c => c.prop('fileName') === 'icon-MasterCard-dark')).toHaveLength(2)
    expect(wrapper.find(Svg).findWhere(c => c.prop('fileName') === 'icon-Visa-dark')).toHaveLength(2)
  })
})

describe('BillingForm submit button', () => {
  test('should call onSubmitFunction when clicking the button', () => {
    const onSubmitFunctionStub = jest.fn()
    const wrapper = shallow(<BillingForm submitCardDetails={onSubmitFunctionStub} />)
    wrapper.find(Button).first().simulate('click')
    expect(onSubmitFunctionStub).toHaveBeenCalledTimes(1)
  })
})

describe('BillingForm validateFormSubmit', () => {
  test('should return false if a field is missing', () => {
    const formInput = {
      payment_type: 'CARD',
      card_holder: null,
      card_number: '23497563',
      card_type: 'VISA',
      card_cvv2: '123',
      formCardExpiryYear: '',
      formCardExpiryMonth: '',
    }
    const result = BillingForm.validateFormSubmit(formInput)
    expect(result).toEqual(false)
  })

  test('should return false if CVV2 is not 3 characters', () => {
    const formInput = {
      payment_type: 'CARD',
      card_holder: 'Mr Nullington',
      card_number: '23497563',
      card_type: 'VISA',
      card_cvv2: '1',
      formCardExpiryYear: '12',
      formCardExpiryMonth: '33',
    }
    const result = BillingForm.validateFormSubmit(formInput)
    expect(result).toEqual(false)
  })

  test('should return true if all fields are present', () => {
    const formInput = {
      payment_type: 'CARD',
      card_holder: 'Mr Nullington',
      card_number: '23497563',
      card_type: 'VISA',
      card_cvv2: '123',
      formCardExpiryYear: '12',
      formCardExpiryMonth: '33',
    }
    const result = BillingForm.validateFormSubmit(formInput)
    expect(result).toEqual(true)
  })
})

describe('BillingForm validateOnBlur', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BillingForm />)
  })
  test('should return true if the value is empty', () => {
    wrapper.instance().validateOnBlur('securityCodeError', null)
    expect(wrapper.state('securityCodeError')).toEqual(true)
  })
  test('should return true if the cardNumberError value is < 9', () => {
    wrapper.instance().validateOnBlur('cardNumberError', '868376')
    expect(wrapper.state('cardNumberError')).toEqual(true)
  })
  test('should return false if the value is not empty (and valid)', () => {
    wrapper.instance().validateOnBlur('cardNumberError', '8632348376')
    expect(wrapper.state('cardNumberError')).toEqual(false)
  })
  test('should return false if the value is not empty (and valid)', () => {
    wrapper.instance().validateOnBlur('cardTypeError', 'VISA')
    expect(wrapper.state('cardTypeError')).toEqual(false)
  })
})

describe('BillingForm handleInputChange', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BillingForm />)
  })
  test('should store the value in state against the label given', () => {
    wrapper.instance().handleInputChange('payment_type', 'CARD')
    expect(wrapper.state('payment_type')).toEqual('CARD')
  })
  test('should store the value in state against the label given', () => {
    wrapper.instance().handleInputChange('card_type', 'VISA')
    expect(wrapper.state('card_type')).toEqual('VISA')
  })
  test('should store the value in state against the label given', () => {
    wrapper.instance().handleInputChange('card_cvv2', '123')
    expect(wrapper.state('card_cvv2')).toEqual('123')
  })
  test('should autodetect card_type when card_number is given', () => {
    wrapper.instance().handleInputChange('card_number', '4929 0000 0002 2')
    expect(wrapper.state('card_type')).toEqual('VISA')
  })
  test('should remove non digits when card_number is given', () => {
    wrapper.instance().handleInputChange('card_number', '4929 0000 0002 2')
    expect(wrapper.state('card_number')).toEqual('4929000000022')
  })
  test('should construct card_expires when month and/or year are entered', () => {
    wrapper.instance().handleInputChange('formCardExpiryYear', '11')
    expect(wrapper.state('formCardExpiryYear')).toEqual('11')
    expect(wrapper.state('card_expires')).toEqual('11')
    wrapper.instance().handleInputChange('formCardExpiryMonth', '04')
    expect(wrapper.state('formCardExpiryMonth')).toEqual('04')
    expect(wrapper.state('card_expires')).toEqual('0411')
  })
  test('should construct card_expires when month and/or year are entered', () => {
    wrapper.instance().handleInputChange('formCardExpiryMonth', '11')
    expect(wrapper.state('formCardExpiryMonth')).toEqual('11')
    expect(wrapper.state('card_expires')).toEqual('11')
    wrapper.instance().handleInputChange('formCardExpiryYear', '04')
    expect(wrapper.state('formCardExpiryYear')).toEqual('04')
    expect(wrapper.state('card_expires')).toEqual('1104')
  })
})

describe('BillingForm paymentOptions', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BillingForm />)
  })
  test('should process config giving giving the same number of cards as the config file', () => {
    const result = wrapper.instance().paymentOptions()
    expect(result.length).toEqual(config.cardTypeOptions.length)
  })
})
