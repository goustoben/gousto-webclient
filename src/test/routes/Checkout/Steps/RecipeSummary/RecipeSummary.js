import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable' // eslint-disable-line no-caps
import RecipeSummary from 'routes/Checkout/Components/RecipeSummary/RecipeSummary'

describe('RecipeSummary', function() {
  let recipes
  let menuRecipeStock
  let menuRecipesStore
  let numPortions

  beforeEach(function() {
    recipes = Immutable.fromJS({ 1: 1, 2: 1, 3: 1, 4: 1 })
    menuRecipesStore = Immutable.fromJS({
      1: {
        basics: ['test'],
        title: 'test',
        media: {
          images: [{ urls: [] }],
        },
      },
      2: {
        basics: ['test'],
        title: 'test',
        media: {
          images: [{ urls: [] }],
        },
      },
      3: {
        basics: ['test'],
        title: 'test',
        media: {
          images: [{ urls: [] }],
        },
      },
      4: {
        basics: ['test'],
        title: 'test',
        media: {
          images: [{ urls: [] }],
        },
      },
    })
    menuRecipeStock = Immutable.fromJS({ 1: { 2: 1, 4: 0 }, 2: { 2: 1, 4: 0 }, 3: { 2: 1, 4: 0 }, 4: { 2: 1, 4: 0 } })
    numPortions = 2
  })

  it('should return a div', function() {
    const wrapper = shallow(<RecipeSummary recipes={recipes} menuRecipesStore={menuRecipesStore} menuRecipeStock={menuRecipeStock} numPortions={numPortions} />)
    expect(wrapper.type()).to.equal('div')
  })

  it('should render a <div> with no props', function() {
    const wrapper = shallow(
      <RecipeSummary />
    )
    expect(wrapper.type()).to.equal('div')
  })

  describe('componentDidMount', function() {
    let RecipeSummaryComponent
    let wrapper
    let context
    let getState
    let dispatch
    let subscribe
    let recipesLoadRecipesById
    let store
    let basket
    let menuRecipeStock

    beforeEach(function() {
      dispatch = sinon.stub().returns(new Promise(resolve => { resolve() }))
      subscribe = sinon.spy()
      basket = Immutable.Map({ recipes: Immutable.Map({ 45: 1, 56: 1 }) })
      menuRecipeStock = Immutable.Map([])
      store = {
        menuRecipeStock,
        basket
      }
      getState = sinon.stub().returns(store)
      recipesLoadRecipesById = sinon.stub().returns(() => new Promise(resolve => { resolve() }))
      context = {
        store: {
          getState,
          dispatch,
          subscribe,
        },
      }
      RecipeSummaryComponent = require('inject-loader?actions!routes/Checkout/Components/RecipeSummary/RecipeSummary')({
        actions: {recipesLoadRecipesById},
      }).default
      RecipeSummaryComponent.fetchData = sinon.stub().returns(object => object)
    })

    it('should call fetchData', function() {
      wrapper = mount(
        <RecipeSummaryComponent menuRecipeStock={menuRecipeStock} recipes={Immutable.Map({ 45: 1, 56: 1 })} basket={basket} />, { context })
      expect(RecipeSummaryComponent.fetchData.calledOnce).to.be.true
    })
  })
})
