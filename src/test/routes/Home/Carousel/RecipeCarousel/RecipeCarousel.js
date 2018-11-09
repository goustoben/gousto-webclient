import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import CTA from 'routes/Home/CTA'
import Recipe from 'Recipe'

describe('RecipeCarousel', function() {
  let recipes
  let RecipeCarousel
  beforeEach(function() {
    RecipeCarousel = require('inject-loader!routes/Home/Carousel//RecipeCarousel/RecipeCarousel')({
      './orderRecipes': a => a,
    }).default
    recipes = Immutable.OrderedMap({})
    recipes = recipes.set(1, Immutable.fromJS({ id: 1, availability: [] }))
    recipes = recipes.set(2, Immutable.fromJS({ id: 2, availability: [] }))
    recipes = recipes.set(3, Immutable.fromJS({ id: 3, availability: [] }))
    recipes = recipes.set(4, Immutable.fromJS({ id: 4, availability: [] }))
  })

  it('should render the same number of Recipes as are in homeCarouselRecipes', function() {
    const wrapper = shallow(<RecipeCarousel homeCarouselRecipes={recipes} />)
    expect(wrapper.find(Recipe)).to.have.length(4)
  })

  it('should render all recipes as simple', function() {
    const wrapper = shallow(<RecipeCarousel homeCarouselRecipes={recipes} />)
    expect(wrapper.find(Recipe)).to.have.length(4)
    expect(wrapper.find(Recipe).at(0).prop('view')).to.equal('simple')
    expect(wrapper.find(Recipe).at(1).prop('view')).to.equal('simple')
    expect(wrapper.find(Recipe).at(2).prop('view')).to.equal('simple')
    expect(wrapper.find(Recipe).at(3).prop('view')).to.equal('simple')
  })

  it('should map the cutoffDate prop through to the rendered recipes', function() {
    const wrapper = shallow(<RecipeCarousel homeCarouselRecipes={recipes} cutoffDate="the cutoff date" />)
    expect(wrapper.find(Recipe)).to.have.length(4)
    expect(wrapper.find(Recipe).at(0).prop('cutoffDate')).to.equal('the cutoff date')
    expect(wrapper.find(Recipe).at(1).prop('cutoffDate')).to.equal('the cutoff date')
    expect(wrapper.find(Recipe).at(2).prop('cutoffDate')).to.equal('the cutoff date')
    expect(wrapper.find(Recipe).at(3).prop('cutoffDate')).to.equal('the cutoff date')
  })
})
