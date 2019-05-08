import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Helmet from 'react-helmet'
import DefaultDetail from '../DefaultDetail'
import FineDineInDetail from '../FineDineInDetail'
import Detail from '../Detail'
import { config } from '../config'

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
      wrapper = shallow(<Detail media={media} range={range} />)
    })

    it('should render a DefaultDetail by default', () => {
      expect(wrapper.find(DefaultDetail).length).toEqual(1)
    })

    it('should have a Helmet component', () => {
      expect(wrapper.find(Helmet).length).toEqual(1)
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
        wrapper = shallow(<Detail view={view} range={range} />)

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

  describe('getImageLink', () => {

    it('should get image link', () => {
      wrapper = shallow(<Detail media={media} range={range} />)
      const imageLink = wrapper.instance().getImageLink()
      expect(imageLink).toEqual('testurl')
    })

    it('should return default image link if media is undefined', () => {
      wrapper = shallow(<Detail range={range} />)
      const imageLink = wrapper.instance().getImageLink()
      expect(imageLink).toEqual(config.defaultImageLink)
    })

    it('should return default image link if media does not include 700px image', () => {
      const media500px = Immutable.List([
        Immutable.Map({
          src: 'testurl',
          width: 500
        })
      ])
      wrapper = shallow(<Detail range={range} media={media500px} />)
      const imageLink = wrapper.instance().getImageLink()
      expect(imageLink).toEqual(config.defaultImageLink)
    })
  })

})
