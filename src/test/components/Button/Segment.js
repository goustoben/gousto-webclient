import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import { Segment } from 'goustouicomponents'

describe('Segment', function() {
  const color = 'primary'
  const children = 'test'

  it('should return a <div>', function() {
    const wrapper = shallow(<Segment color={color}>{children}</Segment>)

    expect(wrapper.type()).to.equal('div')
  })

  it('should not call onClick when Segment is disabled', function() {
    const segmentOnClickSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentOnClickSpy} color={color} disabled btnDisabled={false}>{children}</Segment>)
    wrapper.find('div').simulate('click')

    expect(segmentOnClickSpy.callCount).to.equal(0)
  })

  it('should call disabledClick when Segment is disabled', function() {
    const segmentOnClickSpy = sinon.spy()
    const disabledClickSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentOnClickSpy} disabledClick={disabledClickSpy} color={color} disabled btnDisabled={false}>{children}</Segment>)
    wrapper.find('div').simulate('click')

    expect(segmentOnClickSpy.callCount).to.equal(0)
    expect(disabledClickSpy.callCount).to.equal(1)
  })

  it('should have disabled class if no onClick prop is given or if segment is disabled', () => {
    const wrapper = shallow(<Segment color={color}>{children}</Segment>)
    expect(wrapper.prop('className')).to.contain('disabled')
  })

  it('should not have noCursor class if onClick prop is given', () => {
    const wrapper = shallow(<Segment onClick={() => {}} color={color}>{children}</Segment>)
    expect(wrapper.prop('className')).not.to.contain('noCursor')
  })

  it('should have tabIndex and role props when not a spinner', function() {
    let segmentSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentSpy} color={color} disabled btnDisabled={false}>{children}</Segment>)

    expect(wrapper.find('div').first().prop('tabIndex')).to.equal('0')
    expect(wrapper.find('div').first().prop('role')).to.equal('button')
  })

  it('should not be able to click when Button is disabled', function() {
    let segmentSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentSpy} color={color} disabled={false} btnDisabled>{children}</Segment>)
    wrapper.find('div').simulate('click')

    expect(segmentSpy.callCount).to.equal(0)
  })

  it('should be able to click when neither Segment nor Button is disabled', function() {
    let segmentSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentSpy} color={color} disabled={false} btnDisabled={false}>{children}</Segment>)
    wrapper.find('div').simulate('click')

    expect(segmentSpy.callCount).to.equal(1)
  })

  it('should not be able to click when both Segment and Button is disabled', function() {
    let segmentSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentSpy} color={color} disabled btnDisabled>{children}</Segment>)
    wrapper.find('div').simulate('click')

    expect(segmentSpy.callCount).to.equal(0)
  })

  it('should be able to invoke click by pressing enter', function() {
    let segmentSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentSpy} color={color} disabled={false} btnDisabled={false}>{children}</Segment>)
    wrapper.find('div').simulate('keyUp', { keyCode: 13 })

    expect(segmentSpy.callCount).to.equal(1)
  })

  it('should be able to invoke click by pressing space', function() {
    let segmentSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentSpy} color={color} disabled={false} btnDisabled={false}>{children}</Segment>)
    wrapper.find('div').simulate('keyUp', { keyCode: 32 })

    expect(segmentSpy.callCount).to.equal(1)
  })

  it('should be not able to invoke click handler with keyboard if disabled', function() {
    let segmentSpy = sinon.spy()
    const wrapper = shallow(<Segment onClick={segmentSpy} color={color} disabled btnDisabled={false}>{children}</Segment>)
    wrapper.find('div').simulate('keyUp', { keyCode: 32 })

    expect(segmentSpy.callCount).to.equal(0)
  })
})
