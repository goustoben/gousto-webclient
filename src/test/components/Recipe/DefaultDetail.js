import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'

import Image from 'Recipe/Image'
import Title from 'Recipe/Title'
import Rating from 'Recipe/Rating'
import Nutrition from 'Recipe/Detail/Nutrition'
import IngredientsList from 'Recipe/Detail/IngredientsList'
import Allergens from 'Recipe/Detail/Allergens'
import Immutable from 'immutable' /* eslint-disable new-cap */
import CookingTime from 'Recipe/CookingTime'
import UseWithin from 'Recipe/UseWithin'
import Availability from 'Recipe/Availability'
import Cuisine from 'Recipe/Cuisine'
import Diet from 'Recipe/Diet'
import Cals from 'Recipe/Cals'

import DefaultDetail from 'Recipe/Detail/DefaultDetail'

describe('<DefaultDetail />', function() {
	let wrapper
	let menuRecipeDetailVisibilityChangeSpy
	beforeEach(function() {
		menuRecipeDetailVisibilityChangeSpy = sinon.stub()
		wrapper = shallow(<DefaultDetail
			view="detail"
			tag="test"
			media={Immutable.List([{ src: 'src', width: '100' }])}
			title="title"
			count={3}
			average={1}
			per100Grams={Immutable.Map({ id: 1 })}
			perPortion={Immutable.Map({ id: 2 })}
			ingredients={Immutable.List([{}])}
			allergens={Immutable.List(['test'])}
			stock={10}
			inBasket
			id={123}
			useWithin="5 days"
			cookingTime={123}
			availability={Immutable.List([{}])}
			cutoffDate={new Date()}
			description="amazing recipe"
			youWillNeed={Immutable.List(['spoon', 'fork'])}
			cuisine="Hipster"
			diet="vegetarian"
			equipment={Immutable.List(['spoon', 'mixer'])}
			menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChangeSpy}
		/>)
	})

	it('should return a <div>', function() {
		expect(wrapper.type()).to.equal('div')
	})

	it('should return an <Image>', function() {
		expect(wrapper.find(Image).length).to.equal(1)
	})

	it('should return a <Title>', function() {
		expect(wrapper.find(Title).length).to.equal(1)
	})

	it('should return a <Rating>', function() {
		expect(wrapper.find(Rating).length).to.equal(1)
	})

	it('should return a <Nutrition>', function() {
		expect(wrapper.find(Nutrition).length).to.equal(1)
	})

	it('should return a <IngredientsList>', function() {
		expect(wrapper.find(IngredientsList).length).to.equal(1)
	})

	it('should return a <Allergens>', function() {
		expect(wrapper.find(Allergens).length).to.equal(1)
	})

	it('should return a <CookingTime>', function() {
		expect(wrapper.find(CookingTime).length).to.equal(1)
	})

	it('should return a <UseWithin>', function() {
		expect(wrapper.find(UseWithin).length).to.equal(1)
	})

	it('should return a <Availability>', function() {
		expect(wrapper.find(Availability).length).to.equal(1)
	})

	it('should return a <Cuisine>', function() {
		expect(wrapper.find(Cuisine).length).to.equal(1)
	})

	it('should return a <Diet>', function() {
		expect(wrapper.find(Diet).length).to.equal(1)
	})

	it('should return a <Cals>', function() {
		expect(wrapper.find(Cals).length).to.equal(1)
	})

	it('should return 1 p with equipment required label and equipment list if equipment is required', function() {
		expect(wrapper.find('p').at(1).text()).to.equal('Equipment required: spoon, mixer')
	})

	it('should render an x which calls the menuRecipeDetailVisibilityChange function prop on click', function() {
		wrapper.find('span').at(0).simulate('click')
		expect(menuRecipeDetailVisibilityChangeSpy).to.have.been.calledOnce
	})

	describe('Diet', function() {
		const detailProps = {
			view: 'detail',
			tag: 'test',
			media: Immutable.List([{ src: 'src', width: '100' }]),
			title: 'title',
			count: 3,
			average: 1,
			per100Grams: Immutable.Map({ id: 1 }),
			perPortion: Immutable.Map({ id: 2 }),
			ingredients: Immutable.List([{}]),
			allergens: Immutable.List(['test']),
			stock: 10,
			inBasket: true,
			id: 123,
			useWithin: '5 days',
			cookingTime: 123,
			availability: Immutable.List([{}]),
			cutoffDate: new Date(),
			description: 'amazing recipe',
			youWillNeed: Immutable.List(['spoon', 'fork']),
			cuisine: 'Hipster',
		}

		it('should not return a <Diet> if the diet prop is not vegetarian or vegan', function() {
			wrapper = shallow(<DefaultDetail {...detailProps} diet="meat" />)
			expect(wrapper.find(Diet).length).to.equal(0)
		})

		it('should return a <Diet> if the diet prop is vegetarian', function() {
			wrapper = shallow(<DefaultDetail {...detailProps} diet="vegetarian" />)
			expect(wrapper.find(Diet).length).to.equal(1)
		})

		it('should return a <Diet> if the diet prop is vegan', function() {
			wrapper = shallow(<DefaultDetail {...detailProps} diet="vegan" />)
			expect(wrapper.find(Diet).length).to.equal(1)
		})
	})
})
