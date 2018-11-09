import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Helmet from 'react-helmet'
import Hubs from 'routes/Cookbook/Hubs/Hubs'
import CollectionList from 'routes/Cookbook/Hubs/CollectionListContainer'
import { Section } from 'Page/Elements'
import { PageContent, PageHeader } from 'Page'
import cookbookActions from 'actions/cookbook'
import LoadMoreLink from 'LoadMoreLink'

describe('Hubs', function () {
  describe('rendering', function() {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(
				<Hubs />
      )
    })

    it('should render a <Section> by default', function () {
      expect(wrapper.type()).to.equal(Section)
    })

    it('should have a Helmet child', function () {
      expect(wrapper.children(Helmet)).to.have.length(1)
    })

    it('should have a PageHeader child', function () {
      expect(wrapper.children(PageHeader)).to.have.length(1)
    })

    it('should have 1 p in PageHeader', function () {
      expect(wrapper.children(PageHeader).children('p')).to.have.length(1)
    })

    it('should have a PageContent child', function () {
      expect(wrapper.children(PageContent)).to.have.length(1)
    })

    it('should have 1 CollectionList in PageContent', function () {
      expect(wrapper.children(PageContent).children(CollectionList)).to.have.length(1)
    })

    it('should have 1 LoadMoreLink if NOT on last set', function () {
      wrapper = shallow(<Hubs endSet={2} totalSets={3} />)
      wrapper.instance().setState({ setNum: 1 })
      wrapper.update()
      expect(wrapper.find(LoadMoreLink)).to.have.length(1)
    })

    it('should call loadNextSet once when LoadMoreLink is clicked', function () {
      const loadNextSet = sinon.spy()
      wrapper = shallow(<Hubs endSet={2} totalSets={3} loadNextSet={loadNextSet} />)
      wrapper.find(LoadMoreLink).simulate('click')
      expect(loadNextSet).to.be.calledOnce
    })

    it('should NOT have a LoadMoreLink if on last set', function () {
      wrapper = shallow(<Hubs endSet={2} totalSets={2} />)
      wrapper.instance().setState({ setNum: 2 })
      wrapper.update()
      expect(wrapper.find(LoadMoreLink)).to.have.length(0)
    })
  })

  describe('fetchData', function() {
    let sandbox
    let cookbookLoadCollections
    let store

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      cookbookLoadCollections = sandbox.stub(cookbookActions, 'cookbookLoadCollections')
      store = {
        dispatch: sandbox.spy(),
      }
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call cookbookLoadCollections once with correct limit & setNum', function() {
      Hubs.fetchData({ store, limit: 20, setNum: 1 })
      expect(cookbookLoadCollections).to.have.been.calledOnce
      expect(cookbookLoadCollections).to.have.been.calledWithExactly({
        limit: 20,
        setNum: 1,
      })

      cookbookLoadCollections.reset()
      Hubs.fetchData({ store, limit: 20, setNum: 2 })
      expect(cookbookLoadCollections).to.have.been.calledOnce
      expect(cookbookLoadCollections).to.have.been.calledWithExactly({
        limit: 20,
        setNum: 2,
      })

      cookbookLoadCollections.reset()
      Hubs.fetchData({ store, limit: 20, setNum: 3 })
      expect(cookbookLoadCollections).to.have.been.calledOnce
      expect(cookbookLoadCollections).to.have.been.calledWithExactly({
        limit: 20,
        setNum: 3,
      })
    })
  })
})
