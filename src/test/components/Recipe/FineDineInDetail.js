import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'

import Title from 'Recipe/Title'
import Rating from 'Recipe/Rating'
import Nutrition from 'Recipe/Detail/Nutrition'
import IngredientsList from 'Recipe/Detail/IngredientsList'
import Allergens from 'Recipe/Detail/Allergens'
import { RecipeAttribute } from 'Recipe/RecipeAttribute'
import Immutable from 'immutable'
import AddButton from 'Recipe/AddButton'
import Carousel from 'Recipe/Detail/Carousel'
chai.use(sinonChai)

const FineDineInDetail = require('inject-loader?config!Recipe/Detail/FineDineInDetail')({
  config: {
    basket: {
      maxRecipesNum: 4,
      minRecipesNum: 2,

      portions: {
        default: 2,
        allowed: [2, 4],
      },

      minRecipes: 2,

      offsetDays: 3,
    },
    menu: {
      stockThreshold: 0,
    },
  },
}).default

describe('<FineDineInDetail />', function() {
  let wrapper
  let menuRecipeDetailVisibilityChangeSpy
  beforeEach(function() {
    menuRecipeDetailVisibilityChangeSpy = sinon.stub()
    wrapper = shallow(<FineDineInDetail
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

  it('should return a <Carousel>', function() {
    expect(wrapper.find(Carousel).length).to.equal(1)
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

  it('should contain one "cooking time" recipe attribute component', () => {
    expect(wrapper.find(RecipeAttribute).find({name:'cookingTime'}).length).to.equal(1)
  })

  it('should contain one "use within" recipe attribute component', () => {
    expect(wrapper.find(RecipeAttribute).find({name:'useWithin'}).length).to.equal(1)
  })

  it('should contain one "cuisine" recipe attribute component', () => {
    expect(wrapper.find(RecipeAttribute).find({name:'cuisine'}).length).to.equal(1)
  })

  it('should contain one "diet" recipe attribute component', () => {
    expect(wrapper.find(RecipeAttribute).find({name:'diet'}).length).to.equal(1)
  })

  it('should contain one "cals" recipe attribute component', () => {
    expect(wrapper.find(RecipeAttribute).find({name:'cals'}).length).to.equal(1)
  })

  it('should return a <AddButton />', function() {
    expect(wrapper.find(AddButton).length).to.be.at.least(1)
  })

  it('should return 1 p with equipment required label and equipment list if equipment is required', function() {
    expect(wrapper.text()).to.contain('Equipment required:')
    expect(wrapper.text()).to.contain('spoon, mixer')
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
      cutoffDate: new Date(),
      description: 'amazing recipe',
      youWillNeed: Immutable.List(['spoon', 'fork']),
      cuisine: 'Hipster',
    }

    it('should not return a <Diet> if the diet prop is not vegetarian or vegan', function() {
      wrapper = shallow(<FineDineInDetail {...detailProps} diet="meat" />)
      expect(wrapper.find(RecipeAttribute).find({name:'diet'}).length).to.equal(0)
    })

    it('should return a <Diet> if the diet prop is vegetarian', function() {
      wrapper = shallow(<FineDineInDetail {...detailProps} diet="vegetarian" />)
      expect(wrapper.find(RecipeAttribute).find({name:'diet'}).length).to.equal(1)
    })

    it('should return a <Diet> if the diet prop is vegan', function() {
      wrapper = shallow(<FineDineInDetail {...detailProps} diet="vegan" />)
      expect(wrapper.find(RecipeAttribute).find({name:'diet'}).length).to.equal(1)
    })
  })

})
