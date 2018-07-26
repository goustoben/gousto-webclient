import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallow } from 'enzyme'
import React from 'react'
import PromoCode from 'routes/Checkout/Components/PromoCode/PromoCode'
import Button from 'Button/ButtonContainer'
import Segment from 'Button/Segment'
import { promoValidationTime } from 'config/checkout'

describe('PromoCode', function() {
	let promoCode = ''
	let basketPromoCodeChange
	let basketPromoCodeAppliedChange
	let loadPrices
	let wrapper
	const previewOrderId = '123'

	beforeEach(function() {
		basketPromoCodeChange = sinon.spy()
		basketPromoCodeAppliedChange = sinon.spy()
		loadPrices = sinon.stub().returns(new Promise(resolve => { resolve() }))
		wrapper = shallow(
			<PromoCode
				promoCode={promoCode}
				previewOrderId={previewOrderId}
				basketPromoCodeChange={basketPromoCodeChange}
				basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
				loadPrices={loadPrices}
			/>
		)
	})

	describe('rendering', function() {
		it('should return a div', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should have one input', function() {
			expect(wrapper.find('input').length).to.equal(1)
		})

		it('should have one Button', function() {
			expect(wrapper.find(Button).length).to.equal(1)
		})

		it('should have one Segment', function() {
			expect(wrapper.find(Segment).length).to.equal(1)
		})

		it('should render a <div> with no props', function() {
			wrapper = shallow(
				<PromoCode />
			)
			expect(wrapper.type()).to.equal('div')
		})
	})

	describe('with promocode prop', function() {
		beforeEach(function () {
			wrapper = shallow(
				<PromoCode
					promoCode='10perm'
					promoCodeApplied
					previewOrderId={previewOrderId}
					basketPromoCodeChange={basketPromoCodeChange}
					basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
					loadPrices={loadPrices}
				/>
			)
		})

		it('should remove exisiting promocode', function() {
			wrapper.setState({ successMsg: 'Promocode applied' })
			wrapper.find(Segment).first().simulate('click')
			expect(basketPromoCodeChange).to.be.calledOnce
			expect(basketPromoCodeAppliedChange).to.be.called
			expect(loadPrices).to.be.calledOnce
		})

		it('should handle promo code change, update promoCode in the store', function() {
			const collection = wrapper.findWhere(n => n.prop('name') === 'promoCode')
			expect(collection).to.have.length(1)
			collection.forEach((node) => {
				node.simulate('input', { target: { value: 'promo' } })
				expect(basketPromoCodeChange).to.have.been.calledOnce
				expect(basketPromoCodeAppliedChange).to.have.been.called
			})
		})

		describe('handleInput', function() {
			let value
			beforeEach(function() {
				value = 'test'
			})

			it('shouldn\'t run if no event target is passed', function() {
				wrapper.find('input').simulate('input')

				expect(basketPromoCodeChange).to.not.have.been.called
			})

			it('should pass value to basketPromoCodeChange', function() {
				wrapper.find('input').simulate('input', { target: { value } })

				expect(basketPromoCodeChange).to.have.been.calledWith(value)
			})

			describe('should reset the applied promoCode', function() {
				let spy
				let clock
				beforeEach(function() {
					spy = sinon.spy()
					clock = sinon.useFakeTimers()
					wrapper.setProps({
						basketPromoCodeAppliedChange: spy,
					})
				})

				it('when given an input value shorter than 2 characters', function() {
					wrapper.find('input').simulate('input', { target: { value: 't' } })
					clock.tick(promoValidationTime + 50)

					expect(spy).to.be.calledWith(false)
					expect(wrapper.state('errorMsg')).to.be.empty
					expect(wrapper.state('successMsg')).to.be.empty
					clock.restore()
				})
			})

			describe('should call applyPromoCode', function() {
				let spy
				let clock
				beforeEach(function() {
					spy = sinon.spy()
					clock = sinon.useFakeTimers()
					wrapper.setProps({
						basketPromoCodeAppliedChange: spy,
					})
				})

				it('when given an input value longer than 2 characters', function() {
					wrapper.find('input').simulate('input', { target: { value } })
					clock.tick(promoValidationTime + 50)

					expect(spy.callCount).to.equal(1)
					clock.restore()
				})

				it('only once with consecutive inputs within threshold', function() {
					const input = wrapper.find('input')
					input.simulate('input', { target: { value } })
					clock.tick(promoValidationTime - 50)
					input.simulate('input', { target: { value } })
					clock.tick(promoValidationTime * 2)

					expect(spy.callCount).to.equal(1)
					clock.restore()
				})
			})
		})

		describe('promoCodeApplied is false', function() {
			beforeEach(function () {
				wrapper = shallow(
					<PromoCode
						promoCode='10perm'
						promoCodeApplied={false}
						previewOrderId={previewOrderId}
						basketPromoCodeChange={basketPromoCodeChange}
						basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
						loadPrices={loadPrices}
					/>
				)
			})

			it('should apply promocode if button clicked', function() {
				wrapper.find(Segment).first().simulate('click')
				expect(loadPrices).to.be.calledOnce
				expect(basketPromoCodeAppliedChange).to.be.called
			})

			it('should apply new promocode if enter pressed', function() {
				wrapper.find('input').simulate('keyUp', { keyCode: 13 })
				expect(loadPrices).to.be.calledOnce
				expect(basketPromoCodeAppliedChange).to.be.called
			})

			it('should apply new promocode if space pressed', function() {
				wrapper.find('input').simulate('keyUp', { keyCode: 32 })
				expect(loadPrices).to.be.calledOnce
				expect(basketPromoCodeAppliedChange).to.be.called
			})

			it('should NOT apply new promocode if shift pressed', function() {
				wrapper.find('input').simulate('keyUp', { keyCode: 16 })
				expect(loadPrices).to.not.be.called
			})

			it('should not call applyPromoCode with a timeout', function() {
				const spy = sinon.spy()
				const clock = sinon.useFakeTimers()
				wrapper.setProps({
					basketPromoCodeAppliedChange: spy,
				})
				const input = wrapper.find('input')
				input.simulate('input', { target: { value: 'test' } })
				input.simulate('keyUp', { keyCode: 13 })
				clock.tick(promoValidationTime * 2)

				expect(spy.callCount).to.equal(1)
				clock.restore()
			})
		})
	})
})
