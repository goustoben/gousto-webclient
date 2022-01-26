import React from 'react'
import { shallow } from 'enzyme'
import { ScheduleTimeline } from '../ScheduleTimeline'

describe('ScheduleTimeline', () => {
  let wrapper
  const eventsList = [
    {
      meta: {
        label: 'Now!',
      },
      body: {
        title: '1st box selection',
        details: 'Choose your recipes',
      },
    },
    {
      meta: {
        head: 'Mar',
        date: '27',
        day: 'Sat',
      },
      body: {
        title: '2nd box selection',
        details: 'Choose your recipes',
      },
    },
    {
      meta: {
        head: 'Mar',
        date: '31',
        day: 'Wed',
      },
      body: {
        title: '3rd box selection',
        details: 'Choose your recipes',
      },
    },
  ]

  beforeEach(() => {
    wrapper = shallow(<ScheduleTimeline eventsList={eventsList} />)
  })

  test('should render events list properly', () => {
    expect(wrapper.find('.event')).toHaveLength(3)
    expect(wrapper.find('.event').first().find('.eventMetaLabel').text()).toBe('Now!')
    expect(wrapper.find('.event').last().find('.eventMetaHead').text()).toBe('Mar')
    expect(wrapper.find('.event').last().find('.eventMetaBody').text()).toContain('31Wed')
  })
})
