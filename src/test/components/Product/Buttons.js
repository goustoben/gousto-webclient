
import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'
import Buttons from 'Product/Buttons/Buttons'
import AgeVerification from 'Product/AgeVerification'
import { Button, Control, Segment } from 'goustouicomponents'
chai.use(sinonChai)

describe('Product Buttons', function() {
  let wrapper
  let onAddSpy
  let onRemoveSpy

  beforeEach(function() {
    onAddSpy = sinon.stub()
    onRemoveSpy = sinon.stub()
  })

  it('should return a <Button />', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} />)

    expect(wrapper.find(Button).length).to.deep.equal(1)
  })

  it('should return a <Button /> with color set to primary, fill set to false, and width set to full by default', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} />)
    const button = wrapper.find(Button)

    expect(button.prop('color')).to.equal('primary')
    expect(button.prop('fill')).to.equal(false)
    expect(button.prop('width')).to.equal('full')
  })

  it('should return a <Button /> with pending set to true when inProgress is true', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} inProgress />)

    expect(wrapper.find(Button).node.props.pending).to.equal(true)
  })

  it('should return a <Segment> when qty is 0', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} />)

    expect(wrapper.find(Segment).length).to.deep.equal(1)
  })

  it('should return 3 <Segment> when qty is greater than 0', function() {
    wrapper = shallow(<Buttons productId="123" qty={2} />)

    expect(wrapper.find(Segment).length).to.deep.equal(3)
  })

  it('should call onAdd when add button is clicked, prop isAvailable is true, & ageVerificationRequired is false', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} onAdd={onAddSpy} isAvailable />)

    wrapper.find(Segment).last().simulate('click')

    expect(onAddSpy.callCount).to.equal(1)
    expect(onAddSpy.getCall(0).args[0]).to.equal('123')
  })

  it('should NOT call onAdd when ageVerificationRequired is true', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} onAdd={onAddSpy} isAvailable ageVerificationRequired />)

    wrapper.find(Segment).last().simulate('click')

    expect(onAddSpy).not.to.have.been.calledOnce
  })

  it('should NOT call onAdd when add button is clicked but prop isAvailable is false', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} onAdd={onAddSpy} isAvailable={false} />)

    wrapper.find(Segment).last().simulate('click')

    expect(onAddSpy).not.to.have.been.calledOnce
  })

  it('should call onRemove when remove button is clicked', function() {
    wrapper = shallow(<Buttons productId="123" qty={1} onRemove={onRemoveSpy} />)

    wrapper.find(Segment).first().simulate('click')

    expect(onRemoveSpy.callCount).to.equal(1)
    expect(onRemoveSpy.getCall(0).args[0]).to.equal('123')
  })

  it('should display Add Product if qty = 0', function() {
    wrapper = shallow(<Buttons productId="123" qty={0} />)

    expect(wrapper.find(Segment)
      .last()
      .children()
      .last()
      .text()
    ).to.equal('Add Product')
  })

  it('should display - Control if qty > 0', function() {
    wrapper = shallow(<Buttons productId="123" qty={1} />)

    expect(wrapper.find(Control).at(0).contains('-')).to.equal(true)
  })

  it('should display <qty> Added if qty > 0', function() {
    wrapper = shallow(<Buttons productId="123" qty={1} />)

    expect(wrapper.find(Segment)
      .at(1)
      .children()
      .first()
      .text()
    ).to.equal('1 Added')
  })

  it('should display + Control if qty > 0', function() {
    wrapper = shallow(<Buttons productId="123" qty={1} />)

    expect(wrapper.find(Control).at(1).contains('+')).to.equal(true)
  })

  describe('when age verification is required', function() {

    it('should display 1 AgeVerification', function() {
      wrapper = shallow(<Buttons productId="123" ageVerificationRequired />)

      expect(wrapper.find(AgeVerification).length).to.equal(1)
    })

    it('should pass ageVerifyShowError state (defaults to false) as showError to AgeVerification', function() {
      wrapper = shallow(<Buttons productId="123" ageVerificationRequired />)

      expect(wrapper.find(AgeVerification).prop('showError')).to.equal(false)
    })

    it('should change state of ageVerifyTooltipVisible & call onVerifyAge prop when handleAgeVerify is called', function() {
      const onVerifyAgeSpy = sinon.stub()

      wrapper = shallow(
        <Buttons
          productId="123"
          ageVerificationRequired
          onVerifyAge={onVerifyAgeSpy}
        />
      )

      wrapper.instance().handleAgeVerify(true)
      wrapper.update()
      expect(onVerifyAgeSpy.getCall(0).args).to.deep.equal([true, true])
      expect(wrapper.state('ageVerifyTooltipVisible')).to.equal(false)
    })

    it('should change state of ageVerifyShowError when handleAgeVerify throws an error', function() {
      const onVerifyAgeSpy = sinon.stub().throws('Error')
      const clock = sinon.useFakeTimers()
      wrapper = shallow(
        <Buttons
          productId="123"
          ageVerificationRequired
          onVerifyAge={onVerifyAgeSpy}
        />
      )
      const setStateSpy = sinon.spy(wrapper.instance(), 'setState')
      wrapper.instance().handleAgeVerify(true)
      wrapper.update()

      clock.tick(6000)

      expect(setStateSpy.callCount).to.equal(3)
      expect(setStateSpy.getCall(1).args[0]).to.deep.equal({ ageVerifyShowError: true })
      expect(setStateSpy.getCall(2).args[0]).to.deep.equal({ ageVerifyShowError: false })
    })
  })
})
