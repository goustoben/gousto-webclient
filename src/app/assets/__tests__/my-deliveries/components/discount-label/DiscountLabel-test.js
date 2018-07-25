import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import DiscountLabel from 'my-deliveries/components/discount-label/DiscountLabel'

describe('DiscountLabel', () => {
	it('should return a <div>', () => {
		const wrapper = shallow(<DiscountLabel />)
		expect(wrapper.type()).to.be.equal('div')
	})
	describe('Classes', () => {
		it ('should contain a "hidden" class by default' , () => {
			const wrapper = shallow(<DiscountLabel />)
			expect(wrapper.prop('className')).to.contain('hidden')

		})
		it ('should contain a "hidden" class if hidden true' , () => {
			const wrapper = shallow(<DiscountLabel hidden={true} />)
			expect(wrapper.prop('className')).to.contain('hidden')

		})
		it ('should not contain a "hidden" class if hidden false' , () => {
			const wrapper = shallow(<DiscountLabel hidden={false} />)
			expect(wrapper.prop('className')).to.not.contain('hidden')

		})
	})
	describe('Label text', () => {
		it('should contain empty string if recipe discount is zero', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeDiscount={0.00}
					recipeTotal={34.99}
				/>
			)
			expect(wrapper.text()).to.be.equal('')
		})
		it('should contain "free" if recipe discount is equal to recipe total', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeDiscount={34.99}
					recipeTotal={34.99}
				/>
			)
			expect(wrapper.text().toLowerCase()).to.be.equal('free')
		})
		it('should contain a percentage discount if recipeTotal mod recipeDiscount is zero', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeDiscount={17.49}
					recipeTotal={34.99}
				/>
			)
			expect(wrapper.text().toLowerCase()).to.be.equal('50% off')
		})
		it('should contain a percentage discount if recipeTotal mod recipeDiscount is zero', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeDiscount={8.24}
					recipeTotal={27.49}
				/>
			)
			expect(wrapper.text().toLowerCase()).to.be.equal('30% off')
		})
		it('should contain a £ discount (showing pounds) if a round pound value recipeDiscount is set', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeDiscount={10.00}
					recipeTotal={34.99}
				/>
			)
			expect(wrapper.text().toLowerCase()).to.be.equal('£10 off')
		})
		it('should contain a £ discount (showing pounds and pence) if a non-round pound value recipeDiscount is set', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeDiscount={10.01}
					recipeTotal={34.99}
				/>
			)
			expect(wrapper.text().toLowerCase()).to.be.equal('£10.01 off')
		})
		it('should contain a £ discount if recipeDiscount is set', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeDiscount={12.50}
					recipeTotal={34.99}
				/>
			)
			expect(wrapper.text().toLowerCase()).to.be.equal('£12.50 off')
		})
		it('should contain empty string if no discount is set', () => {
			const wrapper = shallow(
				<DiscountLabel
					recipeTotal={34.99}
				/>
			)
			expect(wrapper.text()).to.be.equal('')
		})
	})
})
