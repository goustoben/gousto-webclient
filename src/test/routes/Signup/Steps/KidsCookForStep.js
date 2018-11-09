import React from 'react'
import Image from 'routes/Signup/Image'
import Button from 'routes/Signup/Button'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallow } from 'enzyme'
import KidsCookFor from 'routes/Signup/Steps/KidsCookFor/KidsCookForStep'

describe('KidsCookFor', function() {
  let wrapper
  let cookForKidsChange
  let next

  beforeEach(function() {
    cookForKidsChange = sinon.spy()
    next = sinon.spy()
    wrapper = shallow(
			<KidsCookFor
			  cookForKidsChange={cookForKidsChange}
			  next={next}
			/>
    )
  })

  it('should return a div', function() {
    expect(wrapper.type()).to.equal('div')
  })

  it('should render an Image', function() {
    expect(wrapper.find(Image)).to.have.length(1)
  })

  it('should render 2 Buttons', function() {
    expect(wrapper.find(Button)).to.have.length(2)
  })

  it('should display "Yes" as first Button text', function() {
    expect(wrapper.find(Button).at(0).prop('children')).to.equal('Yes')
  })

  it('should render "No" as second Button text', function() {
    expect(wrapper.find(Button).at(1).prop('children')).to.equal('No')
  })

  it('should call cookForKidsChange with true then next prop when the first segment is clicked', function() {
    wrapper.find(Button).at(0).simulate('click')
    expect(cookForKidsChange.callCount).to.equal(1)
    expect(cookForKidsChange.firstCall).to.be.calledWithExactly(true)
    expect(next.callCount).to.equal(1)
    expect(next.firstCall).to.be.calledWithExactly()
  })

  it('should call cookForKidsChange with false then next prop when the second segment is clicked', function() {
    wrapper.find(Button).at(1).simulate('click')
    expect(cookForKidsChange.callCount).to.equal(1)
    expect(cookForKidsChange.firstCall).to.be.calledWithExactly(false)
    expect(next.callCount).to.equal(1)
    expect(next.firstCall).to.be.calledWithExactly()
  })
})
