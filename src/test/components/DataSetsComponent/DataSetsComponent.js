import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import DataSetsComponent, { addDataSets } from 'DataSetsComponent'
const Component = () => (<div />)

describe('DataSetsComponent', function() {
  describe('rendering', function() {
    let wrapper

    beforeEach(function() {
      wrapper = shallow(<DataSetsComponent Component={Component} />)
    })

    it('should return wrapped component', function() {
      expect(wrapper.type()).to.equal(Component)
    })

    it('should have fetchSetData method', function() {
      expect(typeof wrapper.prop('fetchSetData')).to.equal('function')
    })

    it('should have loadNextSet method', function() {
      expect(typeof wrapper.prop('loadNextSet')).to.equal('function')
    })
  })

  describe('addDataSets decorator', function() {
    let DecoratedComponent
    let wrapper

    beforeEach(function() {
      DecoratedComponent = addDataSets(Component)
      wrapper = shallow(<DecoratedComponent prop1 prop2="2" />)
    })

    it('should return DataSetsComponent', function() {
      expect(wrapper.type()).to.equal(DataSetsComponent)
    })

    it('should pass Component to DataSetsComponent', function() {
      expect(wrapper.prop('Component')).to.equal(Component)
    })

    it('should pass props to DataSetsComponent', function() {
      expect(wrapper.prop('prop1')).to.equal(true)
      expect(wrapper.prop('prop2')).to.equal('2')
    })
  })

  describe('fetchSetData', function() {
    let wrapper
    let fetchSetDataIfAvailable

    beforeEach(function() {
      wrapper = shallow(
				<DataSetsComponent
				  Component={Component}
				  endSet={3}
				  limit={10}
				  startSet={1}
				  totalSets={3}
				  randomProp
				/>,
				{
				  context: {
				    store: {},
				  },
				}
      )
      fetchSetDataIfAvailable = sinon.stub(wrapper.instance(), 'fetchSetDataIfAvailable').returns(1)
      wrapper.instance().forceUpdate()
      wrapper.update().instance().forceUpdate()
    })

    it('should call fetchSetDataIfAvailable once with arguments', function() {
      wrapper.prop('fetchSetData')(2)
      expect(fetchSetDataIfAvailable).to.have.been.calledOnce
      expect(fetchSetDataIfAvailable).to.have.been.calledWithExactly(2)
    })
  })

  describe('fetchSetDataIfAvailable', function() {
    let wrapper
    let fetchSetData

    beforeEach(function() {
      fetchSetData = sinon.spy()
      wrapper = shallow(
				<DataSetsComponent
				  Component={Component}
				  endSet={3}
				  fetchSetData={fetchSetData}
				  limit={10}
				  startSet={1}
				  totalSets={3}
				  params={{ query: 'x' }}
				  randomProp
				/>,
				{
				  context: {
				    store: {},
				  },
				}
      )
    })

    it('should call fetchSetData prop once with params, store, & setNum if provided setNum is not greater than totalSetNum', function() {
      wrapper.instance().fetchSetDataIfAvailable(2)
      expect(fetchSetData).to.have.been.calledOnce
      expect(fetchSetData).to.have.been.calledWithExactly({
        params: { query: 'x' },
        store: {},
        setNum: 2,
      })
      fetchSetData.reset()

      wrapper.prop('fetchSetData')(3)
      expect(fetchSetData).to.have.been.calledOnce
      expect(fetchSetData).to.have.been.calledWithExactly({
        params: { query: 'x' },
        store: {},
        setNum: 3,
      })
    })

    it('should NOT call fetchSetData if provided setNum is greater than totalSetNum', function() {
      wrapper.instance().fetchSetDataIfAvailable(4)
      expect(fetchSetData).to.have.not.been.called
    })
  })

  describe('loadNextSet', function() {
    let sandbox
    let fetchSetDataIfAvailable
    let loadNextSet
    let loadSets
    let wrapper

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      loadNextSet = sandbox.spy()
      loadSets = sandbox.spy()
      wrapper = shallow(
				<DataSetsComponent
				  Component={Component}
				  endSet={2}
				  limit={10}
				  loadSets={loadSets}
				  loadNextSet={loadNextSet}
				  randomProp
				  totalSets={4}
				/>,
				{
				  context: {
				    store: 'fake store',
				  },
				}
      )
      fetchSetDataIfAvailable = sandbox.stub(wrapper.instance(), 'fetchSetDataIfAvailable').returns()
      wrapper.instance().forceUpdate()
      wrapper.update().instance().forceUpdate()
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call passed in loadSets once with endSet equal to next set number if endSet + 1 is not greater than totalSetNum', function() {
      wrapper.prop('loadNextSet')()
      expect(loadSets).to.have.been.calledOnce
      expect(loadSets).to.have.been.calledWithExactly({ endSet: 3 })
    })

    it('should NOT call passed in loadSets if endSet + 1 is greater than totalSetNum', function() {
      wrapper = shallow(
				<DataSetsComponent
				  Component={Component}
				  endSet={4}
				  limit={10}
				  loadSets={loadSets}
				  loadNextSet={loadNextSet}
				  randomProp
				  totalSets={4}
				/>
      )
      wrapper.prop('loadNextSet')()
      expect(loadSets).to.have.not.been.called
    })

    it('should call fetchSetDataIfAvailable once with endSet + 2 if expected next set is not greater than totalSetNum', function() {
      wrapper.prop('loadNextSet')()
      expect(fetchSetDataIfAvailable).to.have.been.calledOnce
      expect(fetchSetDataIfAvailable).to.have.been.calledWithExactly(4)
    })

    it('should NOT call fetchSetDataIfAvailable if expected next set is greater than totalSetNum', function() {
      wrapper = shallow(
				<DataSetsComponent
				  Component={Component}
				  endSet={4}
				  limit={10}
				  loadSets={loadSets}
				  loadNextSet={loadNextSet}
				  randomProp
				  totalSets={4}
				/>
      )
      wrapper.prop('loadNextSet')()
      expect(fetchSetDataIfAvailable).to.have.not.been.called
    })
  })
})
