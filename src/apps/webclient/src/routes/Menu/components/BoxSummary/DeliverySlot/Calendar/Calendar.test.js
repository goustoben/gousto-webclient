import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import css from './Calendar.css'
import { Calendar } from './Calendar'
import { Title } from './Title'
import { Day } from './Day'

const buildDate = (date, disabled = false) => ({
  date,
  value: date,
  disabled,
  icon: '',
  orderId: '',
})

describe('DatePicker Calendar', () => {
  let wrapper
  let dates
  let selected
  let onClick

  beforeEach(() => {
    onClick = sinon.stub()
  })

  describe('null dates provided', () => {
    beforeEach(() => {
      dates = null
      selected = '2017-03-28'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render empty', () => {
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })

  describe('empty dates provided', () => {
    beforeEach(() => {
      dates = []
      selected = '2017-03-28'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render empty', () => {
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })

  describe('6 days delivery', () => {
    beforeEach(() => {
      dates = [
        buildDate('2017-03-21'),
        buildDate('2017-03-22'),
        buildDate('2017-03-23'),
        buildDate('2017-03-25'),
        buildDate('2017-03-26'),
        buildDate('2017-03-27'),
        buildDate('2017-03-28'),
        buildDate('2017-03-29'),
        buildDate('2017-03-30', true),
      ]
      selected = '2017-03-28'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render headings for all 7 days', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).length).toEqual(7)
    })

    test('should render 2 weeks', () => {
      expect(wrapper.find(Day).length).toEqual(14)
    })

    test('should render a Title component with the date prop mapped through', () => {
      expect(wrapper.find(Title).length).toEqual(1)
    })

    test('should render a week starting on Saturday', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).at(0).text()).toEqual('Sat')
    })

    test('should render the correct days in the correct boxes', () => {
      ;[
        '2017-03-18',
        '2017-03-25',
        '2017-03-19',
        '2017-03-26',
        '2017-03-20',
        '2017-03-27',
        '2017-03-21',
        '2017-03-28',
        '2017-03-22',
        '2017-03-29',
        '2017-03-23',
        '2017-03-30',
        '2017-03-24',
        '2017-03-31',
      ].forEach((date, index) => {
        const dateProp = wrapper.find(Day).at(index).prop('date')

        expect(dateProp).toEqual(date)
      })
    })

    test('should render the correct number of disabled days', () => {
      expect(wrapper.find('Day[disabled=true]').length).toEqual(6)
    })
  })

  describe('7 days delivery', () => {
    beforeEach(() => {
      dates = [
        buildDate('2017-03-21'),
        buildDate('2017-03-22'),
        buildDate('2017-03-23'),
        buildDate('2017-03-24'),
        buildDate('2017-03-25'),
        buildDate('2017-03-26'),
        buildDate('2017-03-27'),
        buildDate('2017-03-28'),
        buildDate('2017-03-29', true),
        buildDate('2017-03-30'),
      ]
      selected = '2017-03-23'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render headings for all 7 days', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).length).toEqual(7)
    })

    test('should render every day that its given with padding for the number of weeks', () => {
      expect(wrapper.find(Day).length).toEqual(14)
    })

    test('should render a Title component with the date prop mapped through', () => {
      expect(wrapper.find(Title).length).toEqual(1)
    })

    test('should render a week starting on Saturday', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).at(0).text()).toEqual('Sat')
    })

    test('should render the correct days in the correct boxes', () => {
      ;[
        '2017-03-18',
        '2017-03-25',
        '2017-03-19',
        '2017-03-26',
        '2017-03-20',
        '2017-03-27',
        '2017-03-21',
        '2017-03-28',
        '2017-03-22',
        '2017-03-29',
        '2017-03-23',
        '2017-03-30',
        '2017-03-24',
        '2017-03-31',
      ].forEach((date, index) => {
        const dateProp = wrapper.find(Day).at(index).prop('date')

        expect(dateProp).toEqual(date)
      })
    })

    test('should render the correct number of disabled days', () => {
      expect(wrapper.find('Day[disabled=true]').length).toEqual(5)
    })
  })

  describe('6 and 7 days delivery', () => {
    beforeEach(() => {
      dates = [
        buildDate('2017-03-26'),
        buildDate('2017-03-27'),
        buildDate('2017-03-28'),
        buildDate('2017-03-29'),
        buildDate('2017-03-30'),
        buildDate('2017-04-01'),
        buildDate('2017-04-02'),
        buildDate('2017-04-03'),
        buildDate('2017-04-04'),
        buildDate('2017-04-05'),
        buildDate('2017-04-06'),
        buildDate('2017-04-07'),
      ]
      selected = '2017-03-26'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render headings for all 7 days', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).length).toEqual(7)
    })

    test('should render every day that its given with padding for the number of weeks', () => {
      expect(wrapper.find(Day).length).toEqual(14)
    })

    test('should render a Title component with the date prop mapped through', () => {
      expect(wrapper.find(Title).length).toEqual(1)
    })

    test('should render a week starting on Saturday', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).at(0).text()).toEqual('Sat')
    })

    test('should render headings for all 7 days', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).length).toEqual(7)
    })

    test('should render the correct days in the correct boxes', () => {
      ;[
        '2017-03-25',
        '2017-04-01',
        '2017-03-26',
        '2017-04-02',
        '2017-03-27',
        '2017-04-03',
        '2017-03-28',
        '2017-04-04',
        '2017-03-29',
        '2017-04-05',
        '2017-03-30',
        '2017-04-06',
        '2017-03-31',
        '2017-04-07',
      ].forEach((date, index) => {
        const dateProp = wrapper.find(Day).at(index).prop('date')

        expect(dateProp).toEqual(date)
      })
    })

    test('should render the correct number of disabled days', () => {
      expect(wrapper.find('Day[disabled=true]').length).toEqual(2)
    })
  })

  describe('it should wrap years correctly', () => {
    beforeEach(() => {
      dates = [
        buildDate('2016-12-24'),
        buildDate('2016-12-25'),
        buildDate('2016-12-26'),
        buildDate('2016-12-27'),
        buildDate('2016-12-28'),
        buildDate('2016-12-29'),
        buildDate('2016-12-31'),
        buildDate('2017-01-01'),
        buildDate('2017-01-02'),
        buildDate('2017-01-03'),
        buildDate('2017-01-04'),
        buildDate('2017-01-05'),
      ]
      selected = '2016-12-31'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render headings for all 7 days', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).length).toEqual(7)
    })

    test('should render the correct days in the correct boxes', () => {
      ;[
        '2016-12-24',
        '2016-12-31',
        '2016-12-25',
        '2017-01-01',
        '2016-12-26',
        '2017-01-02',
        '2016-12-27',
        '2017-01-03',
        '2016-12-28',
        '2017-01-04',
        '2016-12-29',
        '2017-01-05',
      ].forEach((date, index) => {
        const dateProp = wrapper.find(Day).at(index).prop('date')

        expect(dateProp).toEqual(date)
      })
    })

    test('should render 2 weeks', () => {
      expect(wrapper.find(Day).length).toEqual(14)
    })
  })

  describe('it should wrap years correctly when weeks are offset', () => {
    beforeEach(() => {
      dates = [
        buildDate('2017-01-01', true),
        buildDate('2017-01-02', true),
        buildDate('2017-01-03'),
        buildDate('2017-01-04'),
        buildDate('2017-01-05'),
        buildDate('2017-01-06'),
        buildDate('2017-01-07'),
        buildDate('2017-01-08'),
        buildDate('2017-01-09'),
        buildDate('2017-01-10'),
        buildDate('2017-01-11'),
      ]
      selected = '2017-01-03'

      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render headings for all 7 days', () => {
      const className = `.${css.dayName.split(' ').join('.')}`
      expect(wrapper.find(className).length).toEqual(7)
    })

    test('should render the correct days in the correct boxes', () => {
      ;[
        '2016-12-31',
        '2017-01-07',
        '2017-01-01',
        '2017-01-08',
        '2017-01-02',
        '2017-01-09',
        '2017-01-03',
        '2017-01-10',
        '2017-01-04',
        '2017-01-11',
        '2017-01-05',
        '2017-01-12',
      ].forEach((date, index) => {
        const dateProp = wrapper.find(Day).at(index).prop('date')

        expect(dateProp).toEqual(date)
      })
    })

    test('should render 2 weeks', () => {
      expect(wrapper.find(Day).length).toEqual(14)
    })
  })

  describe('when one date in a week and its disabled', () => {
    beforeEach(() => {
      dates = [
        buildDate('2021-01-15', true),
        buildDate('2021-01-16', true),
        buildDate('2021-01-17', true),
        buildDate('2021-01-18', true),
        buildDate('2021-01-19', true),
        buildDate('2021-01-20'),
        buildDate('2021-01-21'),
        buildDate('2021-01-22'),
      ]
      selected = '2021-01-22'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render 1 week', () => {
      expect(wrapper.find(Day).length).toEqual(7)
    })

    test('should render the correct days in the correct boxes', () => {
      ;[
        '2021-01-16',
        '2021-01-17',
        '2021-01-18',
        '2021-01-19',
        '2021-01-20',
        '2021-01-21',
        '2021-01-22',
      ].forEach((date, index) => {
        const dateProp = wrapper.find(Day).at(index).prop('date')

        expect(dateProp).toEqual(date)
      })
    })
  })

  describe('when given dates of wednesday to next friday', () => {
    beforeEach(() => {
      dates = [
        buildDate('2021-01-06'),
        buildDate('2021-01-07', true),
        buildDate('2021-01-08', true),
        buildDate('2021-01-09'),
        buildDate('2021-01-10'),
        buildDate('2021-01-11'),
        buildDate('2021-01-12'),
        buildDate('2021-01-13'),
        buildDate('2021-01-14', true),
        buildDate('2021-01-15', true),
      ]
      selected = '2021-01-15'
      wrapper = shallow(<Calendar dates={dates} selected={selected} onClick={onClick} />)
    })

    test('should render saturday-friday 2 weeks', () => {
      ;[
        '2021-01-02',
        '2021-01-09',
        '2021-01-03',
        '2021-01-10',
        '2021-01-04',
        '2021-01-11',
        '2021-01-05',
        '2021-01-12',
        '2021-01-06',
        '2021-01-13',
        '2021-01-07',
        '2021-01-14',
        '2021-01-08',
        '2021-01-15',
      ].forEach((date, index) => {
        const dateProp = wrapper.find(Day).at(index).prop('date')

        expect(dateProp).toEqual(date)
      })
    })
  })
})
