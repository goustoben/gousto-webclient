import { formatTimeToHour } from '../timeFormat'

const TIME_24_HOUR_FORMAT = [
  '00:00:00',
  '00:30:00',
  '06:50:00',
  '08:00:00',
  '12:00:00',
  '12:59:59',
  '17:15:00',
  '23:00:00',
  '23:31:00',
]

const TIME_12_HOUR_FORMAT = ['12am', '1am', '7am', '8am', '12pm', '1pm', '5pm', '11pm', '12am']

describe('formatTimeToHour', () => {
  const result = TIME_24_HOUR_FORMAT.map((time) => formatTimeToHour(time))

  test('should return a modified array', () => {
    expect(result).toEqual(TIME_12_HOUR_FORMAT)
  })
})
