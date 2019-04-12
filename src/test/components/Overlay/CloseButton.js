import React from 'react'
import { shallow } from 'enzyme'
import CloseButton from 'Overlay/CloseButton'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('Overlay CloseButton', function() {
  let onCloseSpy
  let wrapper

  beforeEach(function() {
    onCloseSpy = sinon.stub()
    wrapper = shallow(
      <CloseButton onClose={onCloseSpy} />
    )
  })

  it('should return span', function() {
    expect(wrapper.type()).to.equal('span')
  })

  it('should call onClose on click', function() {
    wrapper.simulate('click')
    expect(onCloseSpy).to.have.been.calledOnce
  })
})
