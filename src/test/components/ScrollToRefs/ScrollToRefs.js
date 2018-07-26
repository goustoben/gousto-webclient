import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'

import ScrollToRefs, { scrollToRefsWrapper } from 'ScrollToRefs/ScrollToRefs'
import * as domHelper from 'utils/DOMhelper'

const ExampleComponent = () => (<div />)

describe('scrollToRefsWrapper', function() {
	it('should have type ScrollToRefs', function() {
		const Hoc = scrollToRefsWrapper(ExampleComponent)
		const wrapper = shallow(<Hoc />)
		expect(wrapper.type()).to.equal(ScrollToRefs)
	})
})

describe('ScrollToRefs', function() {
	let wrapper

	beforeEach(function() {
		wrapper = shallow(
			<ScrollToRefs
				Component={ExampleComponent}
				firstProp="prop 2"
				secondProp="prop 2"
			>
				Text
			</ScrollToRefs>
		)
	})

	it('should render null by default', function() {
		wrapper = shallow(<ScrollToRefs />)
		expect(wrapper.type()).to.equal(null)
	})

	it('should render Component passed in', function() {
		expect(wrapper.type()).to.equal(ExampleComponent)
	})

	it('should pass function storeRef as "receiveRef" into Component', function() {
		const storeRef = wrapper.instance().storeRef
		expect(wrapper.prop('receiveRef')).to.equal(storeRef)
	})

	it('should pass function scrollToFirstMatchingRef as "scrollToFirstMatchingRef" into Component', function() {
		const scrollToFirstMatchingRef = wrapper.instance().scrollToFirstMatchingRef
		expect(wrapper.prop('scrollToFirstMatchingRef')).to.equal(scrollToFirstMatchingRef)
	})

	describe('componentWillReceiveProps', function() {
		it('should call scrollToFirstMatchingRef once with nextProps.refKeys when scrollToRef prop changes to true', function() {
			const instance = shallow(
				<ScrollToRefs scrollToRef={false} />
			).instance()
			const scrollToFirstMatchingRef = sinon.stub(instance, 'scrollToFirstMatchingRef')
			instance.componentWillReceiveProps({
				scrollToRef: true,
				refKeys: ['a'],
			})
			expect(scrollToFirstMatchingRef.callCount).to.equal(1)
			expect(scrollToFirstMatchingRef).to.be.calledWithExactly(['a'])
		})

		it('should NOT call scrollToFirstMatchingRef when scrollToRef prop was already true', function() {
			const instance = shallow(
				<ScrollToRefs scrollToRef />
			).instance()
			const scrollToFirstMatchingRef = sinon.stub(instance, 'scrollToFirstMatchingRef')
			instance.componentWillReceiveProps({
				scrollToRef: true,
				refKeys: ['a'],
			})
			expect(scrollToFirstMatchingRef.callCount).to.equal(0)
		})

		it('should NOT call scrollToFirstMatchingRef when scrollToRef prop is false', function() {
			const instance = shallow(
				<ScrollToRefs scrollToRef={false} />
			).instance()
			const scrollToFirstMatchingRef = sinon.stub(instance, 'scrollToFirstMatchingRef')
			instance.componentWillReceiveProps({
				scrollToRef: false,
				refKeys: ['a'],
			})
			expect(scrollToFirstMatchingRef.callCount).to.equal(0)
		})

		it('should NOT call scrollToFirstMatchingRef when there are no refKeys', function() {
			const instance = shallow(
				<ScrollToRefs scrollToRef={false} />
			).instance()
			const scrollToFirstMatchingRef = sinon.stub(instance, 'scrollToFirstMatchingRef')
			instance.componentWillReceiveProps({
				scrollToRef: true,
				refKeys: [],
			})
			expect(scrollToFirstMatchingRef.callCount).to.equal(0)
		})
	})

	describe('storeRef', function() {
		let sandbox
		let instance

		const initialRefs = {
			ExistingFieldId: { props: { name: 'ExistingField', refId: 'ExistingFieldId' } },
		}

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			instance = shallow(
				<ScrollToRefs />
			).instance()
			instance.refs = initialRefs
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should add passed in el to instance refs keyed by name if el refId is available', function() {
			instance.storeRef({ props: { name: 'AddedField', refId: 'AddedFieldrefId' } })
			expect(instance.refs).to.deep.equal({
				...initialRefs,
				AddedFieldrefId: { props: { name: 'AddedField', refId: 'AddedFieldrefId' } },
			})
		})

		it('should override passed in el in instance refs if it already exists', function() {
			instance.storeRef({ props: { name: 'ExistingField', updated: true, refId: 'ExistingFieldId' } })
			expect(instance.refs).to.deep.equal({
				ExistingFieldId: { props: { name: 'ExistingField', updated: true, refId: 'ExistingFieldId' } },
			})
		})

		it('should NOT add ref if no refId prop is available', function() {
			instance.storeRef({ props: { updated: true } })
			expect(instance.refs).to.deep.equal(initialRefs)
		})
	})

	describe('scrollToFirstMatchingRef', function() {
		let sandbox
		let scrollToFirstMatchingNode

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			scrollToFirstMatchingNode = sandbox.stub(domHelper, 'scrollToFirstMatchingNode')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should call scrollToFirstMatchingNode once with passed in refKeys and instance refs', function() {
			const instance = shallow(<ScrollToRefs />).instance()
			instance.refs = {
				a: 1,
				b: 2,
			}
			instance.scrollToFirstMatchingRef(['first', 'a', 'third'])
			expect(scrollToFirstMatchingNode.callCount).to.equal(1)
			expect(scrollToFirstMatchingNode).to.be.calledWithExactly(['first', 'a', 'third'], { a: 1, b: 2 })
		})
	})
})
