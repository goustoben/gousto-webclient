import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import React from 'react'
import Button from 'routes/Signup/Button'

import FinishStep from 'routes/Signup/Steps/Finish/FinishStep'
import Image from 'routes/Signup/Image'

describe('Signup/Steps/Finish', function() {
  let wrapper
  let boxSummaryDeliveryDays
  let date
  let slotId
  let postcode
  let numPortions
  let nextSpy

  beforeEach(function() {
    boxSummaryDeliveryDays = Immutable.fromJS({
      '2017-01-01': {
        date: '2017-01-01',
        slots: [
          {
            deliveryStartTime: '17:00:00',
            deliveryEndTime: '18:00:00',
            deliveryPrice: 1.99,
            id: '123-123-123',
            whenCutoff: '2018-01-01',
            coreSlotId: 5,
          },
        ],
      },
      '2017-01-02': {
        date: '2017-01-02',
        slots: [
          {
            deliveryStartTime: '17:00:00',
            deliveryEndTime: '18:00:00',
            deliveryPrice: 1.99,
            id: '1234567-uuid-value',
            whenCutoff: '2018-01-01',
            coreSlotId: 10,
          },
        ],
      },
    })

    date = '2017-01-01'
    slotId = '123-123-123'
    postcode = 'w30df'
    numPortions = 4
    nextSpy = sinon.spy()

    wrapper = shallow(<FinishStep
      boxSummaryDeliveryDays={boxSummaryDeliveryDays}
      date={date}
      slotId={slotId}
      postcode={postcode}
      numPortions={numPortions}
      next={nextSpy}
    />)
  })

  it('should render a div', function() {
    expect(wrapper.type()).to.equal('div')
  })

  it('should render an image', function() {
    expect(wrapper.find(Image)).to.have.length(1)
  })

  it('should render a Button', function() {
    expect(wrapper.find(Button)).to.have.length(1)
  })

  it('should call the goToMenu prop on Button click', function() {
    wrapper.find(Button).at(0).simulate('click')
    expect(nextSpy).to.have.been.calledOnce
  })

  it('should render the correct heading for "default" style by default', function() {
    expect(wrapper.find('h1').at(0).text()).to.equal('All set')
  })

  it('should render the correct copy for "default" style by default', function() {
    expect(wrapper.find('p').at(0).text()).to.equal('Now choose recipes for your 4-person box, to arrive Sunday the 1st of Jan between 5pm and 6pm at w30df')
  })

  describe('family style', function() {
    beforeEach(function() {
      wrapper = shallow(<FinishStep
        boxSummaryDeliveryDays={boxSummaryDeliveryDays}
        date={date}
        slotId={slotId}
        postcode={postcode}
        numPortions={2}
        redirect={nextSpy}
        style="family"
      />)
    })

    it('should render the correct heading for numPortions 2', function() {
      const heading = wrapper.find('h1')

      expect(heading.at(0).text()).to.contain('The best box for you is the')
      expect(heading.find('div').text()).to.equal('2-Person Box')
    })

    it('should render the correct heading for numPortions 4', function() {
      wrapper = shallow(<FinishStep
        boxSummaryDeliveryDays={boxSummaryDeliveryDays}
        date={date}
        slotId={slotId}
        postcode={postcode}
        numPortions={4}
        redirect={nextSpy}
        style="family"
      />)

      const heading = wrapper.find('h1')

      expect(heading.at(0).text()).to.contain('The best box for you is the')
      expect(heading.find('div').text()).to.equal('Family Box')
    })

    it('should render the correct copy', function() {
      expect(wrapper.find('p').at(0).text()).to.equal('Delivered Sunday the 1st of Jan, between 5pm and 6pm to w30df.You can change your delivery day & address on our menu.')
    })
  })
})
