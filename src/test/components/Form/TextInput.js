import React from 'react'
import { shallow } from 'enzyme'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { TextInput } from 'Form/Input/TextInput'
import css from 'Form/Input/input.css'
import typographyCss from 'styles/typography.css'

describe('TextInput', function() {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<TextInput />)
  })

  it('should return a <span>', function() {
    expect(wrapper.type()).to.equal('span')
  })

  it('should contain an <input>', function() {
    expect(wrapper.find('input').length).to.equal(1)
  })

  it('should populate the input with the given placeholder prop', function() {
    const placeholder = 'testing'
    wrapper = shallow(<TextInput placeholder={placeholder} />)
    expect(wrapper.find('input').prop('placeholder')).to.equal(placeholder)
  })

  it('should pass on each item in additionalProps to input', function() {
    const additionalProps = {
      someKey: 1,
      'something-else': false,
      somethingThird: 'string value',
    }
    wrapper = shallow(<TextInput additionalProps={additionalProps} />)
    const input = wrapper.find('input')

    expect(input.prop('someKey')).to.equal(1)
    expect(input.prop('something-else')).to.equal(false)
    expect(input.prop('somethingThird')).to.equal('string value')
  })

  it('should default to not required', function() {
    expect(wrapper.find('input').prop('required')).to.equal(false)
  })

  it('should populate the required attribute with the given required prop', function() {
    wrapper = shallow(<TextInput required />).first().shallow()
    expect(wrapper.find('input').prop('required')).not.to.equal(false)
  })

  it('should default to not disabled', function() {
    expect(wrapper.find('input').prop('disabled')).to.equal(false)
  })

  it('should default to text align left', function() {
    expect(wrapper.find('input').prop('className').indexOf(typographyCss.textLeft)).not.to.equal(-1)
  })

  it('should set correct text align prop', function() {
    wrapper = shallow(<TextInput textAlign="right" />).first().shallow()
    expect(wrapper.find('input').prop('className').indexOf(typographyCss.textRight)).not.to.equal(-1)

    wrapper = shallow(<TextInput textAlign="center" />).first().shallow()
    expect(wrapper.find('input').prop('className').indexOf(typographyCss.textCenter)).not.to.equal(-1)

  })

  it('should populate the disabled attribute with the given disabled prop', function() {
    wrapper = shallow(<TextInput disabled />).first().shallow()
    expect(wrapper.find('input').prop('disabled')).not.to.equal(undefined)
  })

  it('should default to unlimited length', function() {
    expect(wrapper.find('input').prop('maxLength')).to.equal(undefined)
  })

  it('should populate the maxLength attribute with the given maxLength prop', function() {
    wrapper = shallow(<TextInput maxLength={8} />).first().shallow()
    expect(wrapper.find('input').prop('maxLength')).to.equal(8)
  })

  it('should default to an empty box', function() {
    expect(wrapper.find('input').prop('value')).to.equal(undefined)
  })

  it('should populate it\'s value attribute with the given value prop', function() {
    const testing = 'testing'
    wrapper = shallow(<TextInput value={testing} />).first().shallow()
    expect(wrapper.find('input').prop('value')).to.equal(testing)
  })

  it('should default to regular text input box', function() {
    expect(wrapper.find('input').prop('type')).to.equal('text')
  })

  it('should let me define the input box as a text input box', function() {
    wrapper = shallow(<TextInput type="text" />).first().shallow()
    expect(wrapper.find('input').prop('type')).to.equal('text')
  })

  it('should change it\'s type to a password field when the type prop is "password"', function() {
    wrapper = shallow(<TextInput type="password" />).first().shallow()
    expect(wrapper.find('input').prop('type')).to.equal('password')
  })

  it('should change it\'s type to an email field when the type prop is "email"', function() {
    wrapper = shallow(<TextInput type="email" />).first().shallow()
    expect(wrapper.find('input').prop('type')).to.equal('email')
  })

  it('should populate it\'s pattern attribute when given the pattern prop', function() {
    const numericPattern = '[0-9]*'
    wrapper = shallow(<TextInput pattern={numericPattern} />).first().shallow()
    expect(wrapper.find('input').prop('pattern')).to.equal(numericPattern)
  })

  it('should not have a pattern attribute when given an empty pattern prop', function() {
    wrapper = shallow(<TextInput pattern="" />).first().shallow()
    expect(wrapper.find('input').prop('pattern')).to.not.exist
  })

  it('should call the onChange prop function when the value is changed', function() {
    const newValue = 'testing'
    const onChangeSpy = sinon.spy()
    wrapper = shallow(<TextInput onChange={onChangeSpy} />).first().shallow()
    wrapper.find('input').simulate('input', { target: { value: newValue } })
    expect(onChangeSpy).calledWith(newValue)
  })

  it('should call the validator prop function when the value is changed with the new value', function() {
    const newValue = 'testing'
    const validatorSpy = sinon.spy()
    wrapper = shallow(<TextInput validator={validatorSpy} />).first().shallow()
    wrapper.find('input').simulate('input', { target: { value: newValue } })
    expect(validatorSpy).calledWith(newValue)
  })

  it('if the validator prop returns false when called with newValue onChange should not be called', function() {
    const newValue = 'testing'
    const validator = () => false
    const onChangeSpy = sinon.spy()
    wrapper = shallow(<TextInput validator={validator} onChange={onChangeSpy} />).first().shallow()
    wrapper.find('input').simulate('input', { target: { value: newValue } })
    sinon.assert.notCalled(onChangeSpy)
  })

  it('should call the onKeyDown prop function on key down', function() {
    const newValue = '5'
    const onKeyDownSpy = sinon.spy()
    wrapper = shallow(<TextInput onKeyDown={onKeyDownSpy} />).first().shallow()
    wrapper.find('input').simulate('keydown', newValue)
    expect(onKeyDownSpy).calledWith(newValue)
  })

  it('should render fine with a null value', function() {
    wrapper = shallow(<TextInput value={null} />).first().shallow()
    expect(wrapper.find('input').length).to.equal(1)
  })

  it('should render autocomplete=off when autocompleteOff prop is passed', function() {
    wrapper = shallow(<TextInput autocompleteOff />).first().shallow()
    expect(wrapper.find('input').prop('autoComplete')).to.equal('off')
  })

  it('should not render autocomplete when autocompleteOff prop not passed', function() {
    wrapper = shallow(<TextInput />).first().shallow()
    expect(wrapper.find('input').prop('autoComplete')).to.equal('on')
  })
})
