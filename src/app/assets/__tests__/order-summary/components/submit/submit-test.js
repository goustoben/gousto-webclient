import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
import { Button } from '@fe/gousto-generic'
import Submit from 'order-summary/components/submit/Submit'
import { shallow, mount } from 'enzyme'


describe('order-summary/components/submit', () => {
	describe('rendering', () => {
		const onClickSpy = sinon.spy()
		const wrapper = shallow(<Submit onSaveChoices={onClickSpy}/>)

		it('should be a <div>', () => {
			expect(wrapper.type()).to.be.equal('div')
		})
		it('should render one <Button>', () => {
			expect(wrapper.find(Button).length).to.be.equal(1)
		})
		it('should call handleSaveChoices on click', () => {
			wrapper.find(Button).simulate('click', {
				preventDefault(){},
				nativeEvent: {
					preventDefault(){}}
				})

			expect(onClickSpy).to.have.been.calledOnce

		})
		it('should contain one link to my deliveries', () => {
			const linkElement = wrapper.find('a')
			expect(linkElement.length).to.be.equal(1)
			expect(linkElement.prop('href')).to.be.equal('/my-deliveries')
		})
		it('should contain props.statusText as button text', () => {
			const wrapper = shallow(<Submit statusText="MY BUTTON TEXT" />)
			expect(wrapper.find('GoustoButton').children(0).node).to.be.equal('MY BUTTON TEXT')
		})
		it('should show a spinner when loading', () => {
			const wrapper = shallow(<Submit canSave={false} />)
			expect(wrapper.find('GoustoButton').prop('disabled')).to.be.equal(true)
		})
	})
})
