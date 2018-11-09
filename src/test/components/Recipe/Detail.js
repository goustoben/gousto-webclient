import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import DefaultDetail from 'Recipe/Detail/DefaultDetail'
import FineDineInDetail from 'Recipe/Detail/FineDineInDetail'

import Detail from 'Recipe/Detail/Detail'

describe('Detail', function() {
  describe('rendering', function() {
    let wrapper

    it('should render a DefaultDetail by default', function () {
      wrapper = shallow(<Detail />)
      console.log('DEFAULT DETAIL COMPONENT:', DefaultDetail)
      expect(wrapper.find(DefaultDetail).length).to.equal(1)
    })

    describe('views', function() {
      const views = new Map(
        Object.entries({
          detail: DefaultDetail,
          fineDineInDetail: FineDineInDetail,
        }
        ))

      it('should render a different component based on view', function() {
        for (const [view, component] of views.entries()) {
          wrapper = shallow(<Detail view={view} />)

          expect(wrapper.find(component).length).to.equal(1)
        }
      })
    })

    it('should render an overlay which calls the menuRecipeDetailVisibilityChange function prop on click', function() {
      const menuRecipeDetailVisibilityChangeSpy = sinon.stub()
      wrapper = shallow(<Detail menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChangeSpy} />)
      wrapper.find('div').at(0).simulate('click')

      expect(menuRecipeDetailVisibilityChangeSpy).to.have.been.calledOnce
    })
  })
})
