import { shallow, mount } from 'enzyme'
import React from 'react'

import Calendar from 'Form/Calendar'
import Title from 'Form/Calendar/Title'
import css from 'Form/Calendar/Calendar.css'
import Day from 'Form/Calendar/Day'

import sinon from 'sinon'

describe('Form/Calendar', () => {
	let wrapper
	let dates
	let selected
	let onClick

	beforeEach(() => {
		onClick = sinon.stub()
	})

	describe('6 days delivery', () => {
		beforeEach(() => {
			dates = [
				{
					date: '2017-03-21',
					value: '2017-03-21',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-22',
					value: '2017-03-22',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-23',
					value: '2017-03-23',
					disabled: false,
					icon: 'truck',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-25',
					value: '2017-03-25',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-26',
					value: '2017-03-26',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-27',
					value: '2017-03-27',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-28',
					value: '2017-03-28',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-29',
					value: '2017-03-29',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-30',
					value: '2017-03-30',
					disabled: true,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
			]
			selected = '2017-03-28'
			wrapper = shallow(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
		})

		test('should render only the day headings that its given dates for', () => {
			const className = `.${css.dayName.split(' ').join('.')}`
			expect(wrapper.find(className).length).toEqual(6)
		})

		test('should render every day that its given with padding for the number of weeks', () => {
			expect(wrapper.find(Day).length).toEqual(12)
		})

		test('should render a Title component with the date prop mapped through', () => {
			expect(wrapper.find(Title).length).toEqual(1)
		})

		test('should render a week starting on Saturday', () => {
			const className = `.${css.dayName.split(' ').join('.')}`
			expect(
				wrapper
					.find(className)
					.at(0)
					.text(),
			).toEqual('Sat')
		})

		test('should render the correct days in the correct boxes', () => {
			wrapper = mount(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
			expect(
				wrapper
					.find(Day)
					.at(0)
					.text(),
			).toEqual('18')
			expect(
				wrapper
					.find(Day)
					.at(1)
					.text(),
			).toEqual('25')

			expect(
				wrapper
					.find(Day)
					.at(2)
					.text(),
			).toEqual('19')
			expect(
				wrapper
					.find(Day)
					.at(3)
					.text(),
			).toEqual('26')

			expect(
				wrapper
					.find(Day)
					.at(4)
					.text(),
			).toEqual('20')
			expect(
				wrapper
					.find(Day)
					.at(5)
					.text(),
			).toEqual('27')

			expect(
				wrapper
					.find(Day)
					.at(6)
					.text(),
			).toEqual('21')
			expect(
				wrapper
					.find(Day)
					.at(7)
					.text(),
			).toEqual('28')

			expect(
				wrapper
					.find(Day)
					.at(8)
					.text(),
			).toEqual('22')
			expect(
				wrapper
					.find(Day)
					.at(9)
					.text(),
			).toEqual('29')

			expect(
				wrapper
					.find(Day)
					.at(10)
					.text(),
			).toEqual('23')
			expect(
				wrapper
					.find(Day)
					.at(11)
					.text(),
			).toEqual('30')
		})

		test('should render the correct number of disabled days', () => {
			expect(wrapper.find('Day[disabled=true]').length).toEqual(4)
		})
	})

	describe('7 days delivery', () => {
		beforeEach(() => {
			dates = [
				{
					date: '2017-03-21',
					value: '2017-03-21',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-22',
					value: '2017-03-22',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-23',
					value: '2017-03-23',
					disabled: false,
					icon: 'truck',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-24',
					value: '2017-03-24',
					disabled: false,
					icon: 'truck',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-25',
					value: '2017-03-25',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-26',
					value: '2017-03-26',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-27',
					value: '2017-03-27',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-28',
					value: '2017-03-28',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-29',
					value: '2017-03-29',
					disabled: true,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-30',
					value: '2017-03-30',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
			]
			selected = '2017-03-23'
			wrapper = shallow(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
		})

		test('should render only the day headings that its given dates for', () => {
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
			expect(
				wrapper
					.find(className)
					.at(0)
					.text(),
			).toEqual('Sat')
		})

		test('should render only the day headings that its given dates for', () => {
			const className = `.${css.dayName.split(' ').join('.')}`
			expect(wrapper.find(className).length).toEqual(7)
		})

		test('should render the correct days in the correct boxes', () => {
			wrapper = mount(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
			expect(
				wrapper
					.find(Day)
					.at(0)
					.text(),
			).toEqual('18')
			expect(
				wrapper
					.find(Day)
					.at(1)
					.text(),
			).toEqual('25')

			expect(
				wrapper
					.find(Day)
					.at(2)
					.text(),
			).toEqual('19')
			expect(
				wrapper
					.find(Day)
					.at(3)
					.text(),
			).toEqual('26')

			expect(
				wrapper
					.find(Day)
					.at(4)
					.text(),
			).toEqual('20')
			expect(
				wrapper
					.find(Day)
					.at(5)
					.text(),
			).toEqual('27')

			expect(
				wrapper
					.find(Day)
					.at(6)
					.text(),
			).toEqual('21')
			expect(
				wrapper
					.find(Day)
					.at(7)
					.text(),
			).toEqual('28')

			expect(
				wrapper
					.find(Day)
					.at(8)
					.text(),
			).toEqual('22')
			expect(
				wrapper
					.find(Day)
					.at(9)
					.text(),
			).toEqual('29')

			expect(
				wrapper
					.find(Day)
					.at(10)
					.text(),
			).toEqual('23')
			expect(
				wrapper
					.find(Day)
					.at(11)
					.text(),
			).toEqual('30')

			expect(
				wrapper
					.find(Day)
					.at(12)
					.text(),
			).toEqual('24')
			expect(
				wrapper
					.find(Day)
					.at(13)
					.text(),
			).toEqual('31')
		})

		test('should render every day that its given with padding for the number of weeks', () => {
			expect(wrapper.find(Day).length).toEqual(14)
		})

		test('should render the correct number of disabled days', () => {
			expect(wrapper.find('Day[disabled=true]').length).toEqual(5)
		})
	})

	describe('6 and 7 days delivery', () => {
		beforeEach(() => {
			dates = [
				{
					date: '2017-03-26',
					value: '2017-03-26',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-27',
					value: '2017-03-27',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-28',
					value: '2017-03-28',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-29',
					value: '2017-03-29',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-03-30',
					value: '2017-03-30',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-04-01',
					value: '2017-04-01',
					disabled: false,
					icon: 'truck',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-04-02',
					value: '2017-04-02',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-04-03',
					value: '2017-04-03',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-04-04',
					value: '2017-04-04',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-04-05',
					value: '2017-04-05',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-04-06',
					value: '2017-04-06',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
				{
					date: '2017-04-07',
					value: '2017-04-07',
					disabled: false,
					icon: '',
					orderId: '',
					orderEmpty: null,
				},
			]
			selected = '2017-03-26'
			wrapper = shallow(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
		})

		test('should render only the day headings that its given dates for', () => {
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
			expect(
				wrapper
					.find(className)
					.at(0)
					.text(),
			).toEqual('Sat')
		})

		test('should render only the day headings that its given dates for', () => {
			const className = `.${css.dayName.split(' ').join('.')}`
			expect(wrapper.find(className).length).toEqual(7)
		})

		test('should render the correct days in the correct boxes', () => {
			wrapper = mount(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
			expect(
				wrapper
					.find(Day)
					.at(0)
					.text(),
			).toEqual('25')
			expect(
				wrapper
					.find(Day)
					.at(1)
					.text(),
			).toEqual('01')

			expect(
				wrapper
					.find(Day)
					.at(2)
					.text(),
			).toEqual('26')
			expect(
				wrapper
					.find(Day)
					.at(3)
					.text(),
			).toEqual('02')

			expect(
				wrapper
					.find(Day)
					.at(4)
					.text(),
			).toEqual('27')
			expect(
				wrapper
					.find(Day)
					.at(5)
					.text(),
			).toEqual('03')

			expect(
				wrapper
					.find(Day)
					.at(6)
					.text(),
			).toEqual('28')
			expect(
				wrapper
					.find(Day)
					.at(7)
					.text(),
			).toEqual('04')

			expect(
				wrapper
					.find(Day)
					.at(8)
					.text(),
			).toEqual('29')
			expect(
				wrapper
					.find(Day)
					.at(9)
					.text(),
			).toEqual('05')

			expect(
				wrapper
					.find(Day)
					.at(10)
					.text(),
			).toEqual('30')
			expect(
				wrapper
					.find(Day)
					.at(11)
					.text(),
			).toEqual('06')

			expect(
				wrapper
					.find(Day)
					.at(12)
					.text(),
			).toEqual('31')
			expect(
				wrapper
					.find(Day)
					.at(13)
					.text(),
			).toEqual('07')
		})

		test('should render every day that its given with padding for the number of weeks', () => {
			expect(wrapper.find(Day).length).toEqual(14)
		})

		test('should render the correct number of disabled days', () => {
			expect(wrapper.find('Day[disabled=true]').length).toEqual(2)
		})
	})

	describe('it should wrap years correctly', () => {
		beforeEach(() => {
			dates = [
				{
					date: '2016-12-24',
				},
				{
					date: '2016-12-25',
				},
				{
					date: '2016-12-26',
				},
				{
					date: '2016-12-27',
				},
				{
					date: '2016-12-28',
				},
				{
					date: '2016-12-29',
				},
				{
					date: '2016-12-31',
				},
				{
					date: '2017-01-01',
				},
				{
					date: '2017-01-02',
				},
				{
					date: '2017-01-03',
				},
				{
					date: '2017-01-04',
				},
				{
					date: '2017-01-05',
				},
			]
			selected = '2016-12-31'
			wrapper = shallow(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
		})

		test('should render only the day headings that its given dates for', () => {
			const className = `.${css.dayName.split(' ').join('.')}`
			expect(wrapper.find(className).length).toEqual(6)
		})

		test('should render the correct days in the correct boxes', () => {
			wrapper = mount(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
			expect(
				wrapper
					.find(Day)
					.at(0)
					.text(),
			).toEqual('24')
			expect(
				wrapper
					.find(Day)
					.at(1)
					.text(),
			).toEqual('31')

			expect(
				wrapper
					.find(Day)
					.at(2)
					.text(),
			).toEqual('25')
			expect(
				wrapper
					.find(Day)
					.at(3)
					.text(),
			).toEqual('01')

			expect(
				wrapper
					.find(Day)
					.at(4)
					.text(),
			).toEqual('26')
			expect(
				wrapper
					.find(Day)
					.at(5)
					.text(),
			).toEqual('02')

			expect(
				wrapper
					.find(Day)
					.at(6)
					.text(),
			).toEqual('27')
			expect(
				wrapper
					.find(Day)
					.at(7)
					.text(),
			).toEqual('03')

			expect(
				wrapper
					.find(Day)
					.at(8)
					.text(),
			).toEqual('28')
			expect(
				wrapper
					.find(Day)
					.at(9)
					.text(),
			).toEqual('04')

			expect(
				wrapper
					.find(Day)
					.at(10)
					.text(),
			).toEqual('29')
			expect(
				wrapper
					.find(Day)
					.at(11)
					.text(),
			).toEqual('05')
		})

		test('should render every day that its given with padding for the number of weeks', () => {
			expect(wrapper.find(Day).length).toEqual(12)
		})
	})

	describe('it should wrap years correctly when weeks are offset', () => {
		beforeEach(() => {
			dates = [
				{
					date: '2017-01-01',
					disabled: true,
				},
				{
					date: '2017-01-02',
					disabled: true,
				},
				{
					date: '2017-01-03',
				},
				{
					date: '2017-01-04',
				},
				{
					date: '2017-01-05',
				},
				{
					date: '2017-01-07',
				},
				{
					date: '2017-01-08',
				},
				{
					date: '2017-01-09',
				},
				{
					date: '2017-01-10',
				},
				{
					date: '2017-01-11',
				},
				{
					date: '2017-01-02',
				},
			]
			selected = '2017-01-03'
			wrapper = shallow(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
		})

		test('should render only the day headings that its given dates for', () => {
			const className = `.${css.dayName.split(' ').join('.')}`
			expect(wrapper.find(className).length).toEqual(6)
		})

		test('should render the correct days in the correct boxes', () => {
			wrapper = mount(
				<Calendar dates={dates} selected={selected} onClick={onClick} />,
			)
			expect(
				wrapper
					.find(Day)
					.at(0)
					.text(),
			).toEqual('31')
			expect(
				wrapper
					.find(Day)
					.at(1)
					.text(),
			).toEqual('07')

			expect(
				wrapper
					.find(Day)
					.at(2)
					.text(),
			).toEqual('01')
			expect(
				wrapper
					.find(Day)
					.at(3)
					.text(),
			).toEqual('08')

			expect(
				wrapper
					.find(Day)
					.at(4)
					.text(),
			).toEqual('02')
			expect(
				wrapper
					.find(Day)
					.at(5)
					.text(),
			).toEqual('09')

			expect(
				wrapper
					.find(Day)
					.at(6)
					.text(),
			).toEqual('03')
			expect(
				wrapper
					.find(Day)
					.at(7)
					.text(),
			).toEqual('10')

			expect(
				wrapper
					.find(Day)
					.at(8)
					.text(),
			).toEqual('04')
			expect(
				wrapper
					.find(Day)
					.at(9)
					.text(),
			).toEqual('11')

			expect(
				wrapper
					.find(Day)
					.at(10)
					.text(),
			).toEqual('05')
			expect(
				wrapper
					.find(Day)
					.at(11)
					.text(),
			).toEqual('12')
		})

		test('should render every day that its given with padding for the number of weeks', () => {
			expect(wrapper.find(Day).length).toEqual(12)
		})
	})
})
