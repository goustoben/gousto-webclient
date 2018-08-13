import React from 'react'
import { shallow } from 'enzyme'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import SectionHeader from 'SectionHeader'
import { PageHeader, PageContent } from 'Page'

describe('Page', () => {
	let wrapper

	describe('PageHeader rendering', function() {
		beforeEach(function() {
			wrapper = shallow(
				<PageHeader
					a={1}
					b="2"
					type="something"
				/>
			)
		})

		it('should return a <SectionHeader>', function() {
			expect(wrapper.type()).to.equal(SectionHeader)
		})

		it('should set prop type to page', function() {
			expect(wrapper.prop('type')).to.equal('page')
		})

		it('should pass on all props', function() {
			expect(wrapper.prop('a')).to.equal(1)
			expect(wrapper.prop('b')).to.equal('2')
		})
	})

	describe('PageContent rendering', function() {
		beforeEach(function() {
			wrapper = shallow(
				<PageContent
					disabled
					data-tracking={1}
					aria-something="2"
					b
					type="something"
				/>
			)
		})

		it('should return a <div>', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should add class pageContainer', function() {
			expect(wrapper.prop('className')).to.contain('layout__pageContainer')
		})

		it('should pass on all supported props', function() {
			expect(wrapper.prop('disabled')).to.equal(true)
			expect(wrapper.prop('data-tracking')).to.equal(1)
			expect(wrapper.prop('aria-something')).to.equal('2')
			expect(wrapper.prop('b')).to.equal(undefined)
		})
	})
})
