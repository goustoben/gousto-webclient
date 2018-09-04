import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'

import Button from 'Button/ButtonContainer'
import Segment from 'Button/Segment'

describe('Button', () => {
	let segments
	const color = 'primary'
	const content = 'test'

	beforeEach(() => {
		segments = [<Segment>{content}</Segment>]
	})

	test('should return a <div>', () => {
		const wrapper = shallow(<Button color={color}>{segments}</Button>)

		expect(wrapper.type()).toBe('div')
	})

	test('should render one <Segment />', () => {
		const wrapper = shallow(<Button color={color}>{segments}</Button>)
		const segs = []
		wrapper.find(Segment).findWhere(ele => {
			if (ele.text() === content) {
				segs.push(ele)
			}
		})
		expect(segs.length).toBe(1)
	})

	test('should render multiple <Segment />', () => {
		segments = [
			<Segment>{content}</Segment>,
			<Segment>{content}</Segment>,
			<Segment>{content}</Segment>,
		]
		const wrapper = shallow(<Button color={color}>{segments}</Button>)
		const segs = []
		wrapper.find(Segment).findWhere(ele => {
			if (ele.text() === content) {
				segs.push(ele)
			}
		})
		expect(segs.length).toBe(3)
	})

	test('should disable Segment when Button is disabled', () => {
		segments = [<Segment disabled={false}>{content}</Segment>]
		const wrapper = shallow(
			<Button color={color} disabled>
				{segments}
			</Button>,
		)

		expect(wrapper.find(Segment).get(1).props.btnDisabled).toBe(true)
		expect(wrapper.find(Segment).get(1).props.disabled).toBe(false)
	})

	test('should disable Segment when Segment is disabled', () => {
		segments = [<Segment disabled>{content}</Segment>]
		const wrapper = shallow(
			<Button color={color} disabled={false}>
				{segments}
			</Button>,
		)
		expect(wrapper.find(Segment).get(1).props.btnDisabled).toBe(false)
		expect(wrapper.find(Segment).get(1).props.disabled).toBe(true)
	})

	test('should not disable Segment when neither Button nor Segment is disabled', () => {
		segments = [<Segment disabled={false}>{content}</Segment>]
		const wrapper = shallow(
			<Button color={color} disabled={false}>
				{segments}
			</Button>,
		)
		expect(wrapper.find(Segment).get(1).props.btnDisabled).toBe(false)
		expect(wrapper.find(Segment).get(1).props.disabled).toBe(false)
	})

	test('should disable Segment when both Button and Segment is disabled', () => {
		segments = [<Segment disabled>{content}</Segment>]
		const wrapper = shallow(
			<Button color={color} disabled>
				{segments}
			</Button>,
		)
		const seg = wrapper.find(Segment).get(1)
		expect(seg.props.btnDisabled).toBe(true)
		expect(seg.props.disabled).toBe(true)
	})

	test('should not be able to click when Segment is disabled', () => {
		let segmentSpy = sinon.spy()
		segments = [
			<Segment onClick={segmentSpy} disabled>
				{content}
			</Segment>,
		]
		const wrapper = mount(
			<Button color={color} disabled={false}>
				{segments}
			</Button>,
		)
		wrapper
			.find('Button')
			.children()
			.at(1)
			.simulate('click')

		expect(segmentSpy.callCount).toBe(0)
	})

	test('should not be able to click when Button is disabled', () => {
		let segmentSpy = sinon.spy()
		segments = [
			<Segment onClick={segmentSpy} disabled={false}>
				{content}
			</Segment>,
		]
		const wrapper = mount(
			<Button color={color} disabled>
				{segments}
			</Button>,
		)

		wrapper
			.find('Button')
			.children()
			.at(1)
			.simulate('click')

		expect(segmentSpy.callCount).toBe(0)
	})

	test('should not be able to click when both Segment and Button is disabled', () => {
		let segmentSpy = sinon.spy()
		segments = [
			<Segment onClick={segmentSpy} disabled>
				{content}
			</Segment>,
		]
		const wrapper = mount(
			<Button color={color} disabled>
				{segments}
			</Button>,
		)

		wrapper
			.find('Button')
			.children()
			.at(1)
			.simulate('click')

		expect(segmentSpy.callCount).toBe(0)
	})

	test('should be able to click when neither Segment nor Button is disabled', () => {
		let segmentSpy = sinon.spy()
		segments = [
			<Segment onClick={segmentSpy} disabled={false}>
				{content}
			</Segment>,
		]
		const wrapper = mount(
			<Button color={color} disabled={false}>
				{segments}
			</Button>,
		)

		wrapper
			.find('Button')
			.children()
			.at(1)
			.simulate('click')

		expect(segmentSpy.callCount).toBe(1)
	})

	test('should click Segments that are not disabled', () => {
		let segmentSpy = sinon.spy()
		segments = [
			<Segment onClick={segmentSpy} disabled={false}>
				{content}
			</Segment>,
			<Segment onClick={segmentSpy} disabled>
				{content}
			</Segment>,
		]
		const wrapper = mount(
			<Button color={color} disabled={false}>
				{segments}
			</Button>,
		)

		wrapper
			.find('Button')
			.children()
			.forEach(function(node) {
				node.simulate('click')
			})

		expect(segmentSpy.callCount).toBe(1)
	})

	test('should not pass onClick to Segment', () => {
		const buttonClickSpy = sinon.spy()
		const segmentClickSpy = sinon.spy()
		segments = [
			<Segment onClick={segmentClickSpy} disabled={false}>
				{content}
			</Segment>,
			<Segment disabled={false}>{content}</Segment>,
		]

		const wrapper = shallow(
			<Button onClick={buttonClickSpy}>{segments}</Button>,
		)

		expect(
			wrapper
				.find(Segment)
				.at(1)
				.prop('onClick'),
		).toBe(segmentClickSpy)
		expect(
			wrapper
				.find(Segment)
				.at(2)
				.prop('onClick'),
		).toBe(undefined)
	})

	test('should render a bluecheese spinner when button color is secondary', () => {
		const wrapper = shallow(<Button color="secondary">Hello world</Button>)

		expect(wrapper.find('Spinner')).toHaveLength(1)
		expect(wrapper.find('Spinner').prop('color')).toBe('bluecheese')
	})

	test('should render a white spinner when button color is not secondary', () => {
		const wrapper = shallow(<Button color="primary">Hello world</Button>)

		expect(wrapper.find('Spinner')).toHaveLength(1)
		expect(wrapper.find('Spinner').prop('color')).toBe('white')
	})

	describe('when child is a string', () => {
		let wrapper
		let onClickSpy

		beforeEach(() => {
			onClickSpy = sinon.stub()

			wrapper = shallow(
				<Button
					color="primary"
					width="auto"
					disabled={false}
					onClick={onClickSpy}
					data-testing="testing-value"
				>
					Plain Text
				</Button>,
			)
		})

		test('should wrap string in Segment', () => {
			expect(
				wrapper
					.find(Segment)
					.at(1)
					.contains('Plain Text'),
			).toBe(true)
		})

		test('should pass color, width, disabled, onClick, and data-testing props to Segment', () => {
			expect(
				wrapper
					.find(Segment)
					.at(1)
					.prop('color'),
			).toBe('primary')
			expect(
				wrapper
					.find(Segment)
					.at(1)
					.prop('width'),
			).toBe('auto')
			expect(
				wrapper
					.find(Segment)
					.at(1)
					.prop('disabled'),
			).toBe(false)
			expect(
				wrapper
					.find(Segment)
					.at(1)
					.prop('data-testing'),
			).toBe('testing-value')
			expect(
				wrapper
					.find(Segment)
					.at(1)
					.prop('onClick'),
			).toBe(onClickSpy)
		})
	})

	describe('when the prop areChildrenInSegment is true', () => {
		test('should render the children in <Segment>s', () => {
			const SimpleComponent = () => (<div>'hi'</div>)
			const wrapper = shallow(
				<Button areChildrenInSegment>
					<SimpleComponent />
					<SimpleComponent />
				</Button>
			)

			// Expected to be 3 because the button also renders the spinner on a Segment
			expect(wrapper.find(Segment).length).toBe(3)
		})
	})
})
