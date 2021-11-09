import moment from 'moment'
import { timeFormat } from 'utils/timeFormat'

describe('time format util methods', () => {
  test('the method timeFormat should work with the format "day"', () => {
    expect(timeFormat('2017-09-04 00:00:00', 'day')).toEqual(
      'Monday 4th September',
    )
    expect(timeFormat('2017-06-30 23:59:59', 'day')).toEqual(
      'Friday 30th June',
    )
  })

  test('the method timeFormat should work with the format "dayAndMonth"', () => {
    expect(timeFormat('2017-09-05 00:00:00', 'dayAndMonth')).toEqual(
      '5 September',
    )
    expect(timeFormat('2017-07-31 23:59:59', 'dayAndMonth')).toEqual(
      '31 July',
    )
  })

  test('the method timeFormat should work with the format "hour"', () => {
    expect(timeFormat('00:00:00', 'hour')).toEqual('12am')
    expect(timeFormat('19:00:01', 'hour')).toEqual('8pm')
    expect(timeFormat('13:01:00', 'hour')).toEqual('2pm')
    expect(timeFormat('18:59:59', 'hour')).toEqual('7pm')
  })

  test('the method timeFormat should work with the format "hourAndDay"', () => {
    expect(timeFormat('2017-09-04 00:00:00', 'hourAndDay')).toEqual(
      '12am, 4 September',
    )
    expect(timeFormat('2017-06-30 23:59:59', 'hourAndDay')).toEqual(
      '11pm, 30 June',
    )
  })

  test('the method timeFormat should work with the format "timeLeft"', () => {
    const time = moment()
    time.add({ minutes: 60 })
    expect(timeFormat(time, 'timeLeft')).toEqual('an hour')
    time.add({ minutes: 60 })
    expect(timeFormat(time, 'timeLeft')).toEqual('2 hours')
    time.add({ hours: 22 })
    expect(timeFormat(time, 'timeLeft')).toEqual('a day')
    time.add({ days: 15 })
    expect(timeFormat(time, 'timeLeft')).toEqual('16 days')
  })
})
