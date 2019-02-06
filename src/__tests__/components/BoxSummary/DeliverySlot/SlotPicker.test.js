import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import SlotPicker from 'BoxSummary/DeliverySlot/SlotPicker'

import { Button, Segment } from 'goustouicomponents'

describe('SlotPicker', () => {
  let wrapper
  let slots
  let slotsDisabled
  let date
  let slotId
  let onClick

  beforeEach(() => {
    slots = {
      '2016-02-03': [
        {
          value: '123-123-123',
          label: '1-2am',
          subLabel: '£99.99',
        },
        {
          value: '234-234-234',
          label: '3-5am',
          subLabel: '£0.99',
        },
      ],
      '2017-02-03': [
        {
          value: '234-234-234',
          label: '9-10pm',
          subLabel: '£0.09',
        },
      ],
    }
    slotsDisabled = {
      '2016-02-03': [
        {
          value: '123-123-123',
          label: '1-2am',
          subLabel: '£99.99',
          disabled: true,
        },
        {
          value: '234-234-234',
          label: '3-5am',
          subLabel: '£0.99',
          disabled: false,
        },
      ],
      '2017-02-03': [
        {
          value: '234-234-234',
          label: '9-10pm',
          subLabel: '£0.09',
          disabled: true,
        },
      ],
    }
    date = '2016-02-03'
    slotId = '234-234-234'
    onClick = sinon.spy()
    wrapper = shallow(
      <SlotPicker
        slots={slots}
        date={date}
        slotId={slotId}
        onClick={onClick}
      />,
    )
  })

  test('should render a Button', () => {
    expect(wrapper.find(Button).length).toBe(1)
  })

  test('should call the onClick prop if slot is not disabled with the slot ID of the clicked on slot', () => {
    wrapper
      .find(Segment)
      .at(1)
      .simulate('click')
    expect(onClick.callCount).toBe(1)
    expect(onClick.getCall(0).args[0]).toBe('234-234-234')
  })
  
  test('should not render any lines when no slots are disabled', () => {
    expect(wrapper.find('.bigDisabledLine1').length).toEqual(0)
    expect(wrapper.find('.bigDisabledLine2').length).toEqual(0)
  })

  test('should put the label and sublabel for each slot into the respective segments', () => {
    expect(
      wrapper
        .find(Segment)
        .at(0)
        .children('span')
        .at(0)
        .text(),
    ).toEqual('1-2am£99.99')
    expect(
      wrapper
        .find(Segment)
        .at(1)
        .children('span')
        .at(0)
        .text(),
    ).toEqual('3-5am£0.99')
  })

  test('should fill the segment when not disabled for which the slotId is chosen for', () => {
    expect(
      wrapper
        .find(Segment)
        .at(1)
        .prop('fill'),
    ).toEqual(true)
  })

  describe('with 2 slots for the date', () => {
    test('should render 2 Segments', () => {
      expect(wrapper.find(Segment).length).toBe(2)
    })
  })

  describe('with 1 slots for the date', () => {
    beforeEach(() => {
      date = '2017-02-03'
      wrapper = shallow(
        <SlotPicker
          slots={slots}
          date={date}
          slotId={slotId}
          onClick={onClick}
        />,
      )
    })

    test('should render 1 Segment', () => {
      expect(wrapper.find(Segment).length).toBe(1)
    })
  })

  describe('with 1 disabled slot for the date', () => {
    beforeEach(() => {
      date = '2016-02-03'
      wrapper = shallow(
        <SlotPicker
          slots={slotsDisabled}
          date={date}
          slotId={slotId}
          onClick={onClick}
        />,
      )})
      
    test('should not call the onClick prop if slot is disabled', () => {
      wrapper
        .find(Segment)
        .at(0)
        .simulate('click')
      expect(onClick.callCount).toBe(0)
    })
    
    test('should render one set of lines when one slot on one day is disabled', () => {          
      expect(wrapper.find('.bigDisabledLine1').length).toEqual(1)
      expect(wrapper.find('.bigDisabledLine2').length).toEqual(1)
    })

    test('should not fill the segment when disabled', () => {
      expect(
        wrapper
          .find(Segment)
          .at(0)
          .prop('fill'),
      ).toEqual(false)
    })
  })
})
