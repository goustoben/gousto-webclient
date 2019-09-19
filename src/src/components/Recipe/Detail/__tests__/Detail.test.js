import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Helmet from 'react-helmet'
import DefaultDetail from '../DefaultDetail'
import FineDineInDetail from '../FineDineInDetail'
import { Detail } from '../Detail'

describe('Detail', () => {
  let wrapper
  const media = Immutable.List([
    Immutable.Map({
      src: 'testurl',
      width: 700
    })
  ])
  const range = Immutable.Map({
    name: 'testBrand'
  })

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<Detail media={media} range={range} useWithin="5 days" cookingTime={123} />)
    })

    it('should render a DefaultDetail by default', () => {
      expect(wrapper.find(DefaultDetail).length).toEqual(1)
    })
  })

  describe('views', () => {
    const views = new Map(
      Object.entries({
        detail: DefaultDetail,
        fineDineInDetail: FineDineInDetail,
      }
      ))

    it('should render a different component based on view', () => {
      for (const [view, component] of views.entries()) {
        wrapper = shallow(<Detail view={view} range={range} useWithin="5 days" cookingTime={123} />)

        expect(wrapper.find(component).length).toEqual(1)
      }
    })
  })

  it('should render an overlay which calls the menuRecipeDetailVisibilityChange function prop on click', () => {
    const menuRecipeDetailVisibilityChangeSpy = jest.fn()
    wrapper = shallow(<Detail menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChangeSpy} range={range} />)
    wrapper.find('div').at(0).simulate('click')

    expect(menuRecipeDetailVisibilityChangeSpy).toHaveBeenCalledTimes(1)
  })

})
