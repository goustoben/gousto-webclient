import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'

describe('home actions', function() {
  let fetchRecipesMock
  let cutoffDateTimeNowMock
  let homeLoadCarousel
  let dispatchSpy

  beforeEach(function() {
    const recipes = [
      {
        id: '123',
        media: 'media',
        title: 'title',
        rating: 'rating',
        dietType: 'dietType',
        availability: 'availability',
        boxType: 'boxType',
        url: 'url',
        shelfLifeDays: 'shelfLifeDays',
        cookingTime: 'cookingTime',
        some: 'extra',
        properties: 'here',
      },
      {
        id: '234',
        media: 'media',
        title: 'title',
        rating: 'rating',
        dietType: 'dietType',
        availability: 'availability',
        boxType: 'boxType',
        url: 'url',
        shelfLifeDays: 'shelfLifeDays',
        cookingTime: 'cookingTime',
        some: 'extra',
        properties: 'here',
      },
    ]
    const cutoffDateTime = '2017-01-01'
    fetchRecipesMock = sinon.stub().returns(new Promise(resolve => resolve({ data: recipes })))
    cutoffDateTimeNowMock = sinon.stub().returns(cutoffDateTime)
    homeLoadCarousel = require('inject-loader!actions/home')({
      'apis/recipes': {
        fetchRecipes: fetchRecipesMock,
      },
      'utils/deliveries': {
        cutoffDateTimeNow: cutoffDateTimeNowMock,
      },
    }).default.homeLoadCarousel
    dispatchSpy = sinon.spy()
  })

  it('should call fetchRecipes with the filters[available_on] set to the result of the cutoffDateTimeNow call', async function() {
    await homeLoadCarousel()(dispatchSpy)
    expect(cutoffDateTimeNowMock).to.have.been.calledOnce
    expect(fetchRecipesMock).to.have.been.calledOnce
    expect(fetchRecipesMock.getCall(0).args[0]).to.be.null
    expect(fetchRecipesMock.getCall(0).args[1]).to.equal('')
    expect(fetchRecipesMock.getCall(0).args[2]).to.deep.equal({ 'filters[available_on]': '2017-01-01' })
  })

  it('should dispatch an HOME_CAROUSEL_LOADED action with filtered recipes', async function() {
    await homeLoadCarousel()(dispatchSpy)
    expect(dispatchSpy).to.have.been.calledOnce
    expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
      type: actionTypes.HOME_CAROUSEL_LOADED,
      recipes: [
        {
          id: '123',
          media: 'media',
          title: 'title',
          rating: 'rating',
          dietType: 'dietType',
          availability: 'availability',
          boxType: 'boxType',
          url: 'url',
          shelfLifeDays: 'shelfLifeDays',
          cookingTime: 'cookingTime',
        },
        {
          id: '234',
          media: 'media',
          title: 'title',
          rating: 'rating',
          dietType: 'dietType',
          availability: 'availability',
          boxType: 'boxType',
          url: 'url',
          shelfLifeDays: 'shelfLifeDays',
          cookingTime: 'cookingTime',
        },
      ],
    })
  })
})
