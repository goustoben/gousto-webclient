import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actions from 'actions'
import globals from 'config/globals'
import windowUtils from 'utils/window'
import loadFeatures from 'utils/loadFeatures'

describe('loadFeatures', function() {
  let dispatchSpy
  let store
  let sandbox
  let __snowPlowTrackedExperiments
  let __snowPlowGetOptimizelyExperimentsData
  let snowplow

  beforeEach(function() {
    sandbox = sinon.sandbox.create()

    dispatchSpy = sinon.spy()
    __snowPlowTrackedExperiments = sinon.spy()
    __snowPlowGetOptimizelyExperimentsData = sinon.stub()
    __snowPlowGetOptimizelyExperimentsData.onCall(0).returns([
      {
        data: {
          experiment_id: 'experiment1',
        },
      },
    ])
    __snowPlowGetOptimizelyExperimentsData.onCall(1).returns([
      {
        data: {
          experiment_id: 'experiment1',
        },
      },
      {
        data: {
          experiment_id: 'experiment2',
        },
      },
    ])
    snowplow = sinon.spy()
    sandbox.stub(globals, 'client', true)

    store = {
      dispatch: dispatchSpy,
    }

    sandbox.stub(windowUtils, 'getWindow').returns({ snowplow, __snowPlowTrackedExperiments, __snowPlowGetOptimizelyExperimentsData })
    sandbox.spy(actions, 'featureSet')
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('should call store.dispatch with featureSet action with correct parameters for each "enable" item passed in first param', function() {
    const features = {
      enable: ['feature-1', 'feature-2'],
    }

    loadFeatures(features, store)

    expect(dispatchSpy).to.have.callCount(2)
    expect(actions.featureSet).to.have.callCount(2)

    expect(actions.featureSet.firstCall).to.be.calledWithExactly('feature-1', true)
    expect(actions.featureSet.secondCall).to.be.calledWithExactly('feature-2', true)
  })

  it('should call store.dispatch with featureSet action with correct parameters for each "disable" item passed in first param', function() {
    const features = {
      disable: ['feature-4', 'feature-3'],
    }

    loadFeatures(features, store)

    expect(dispatchSpy).to.have.callCount(2)
    expect(actions.featureSet).to.have.callCount(2)

    expect(actions.featureSet.firstCall).to.be.calledWithExactly('feature-4', false)
    expect(actions.featureSet.secondCall).to.be.calledWithExactly('feature-3', false)
  })

  it('should call store.dispatch with featureSet action with correct parameters for each "set" passed in first param', function() {
    const features = {
      set: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
    }

    loadFeatures(features, store)

    expect(dispatchSpy).to.have.callCount(2)
    expect(actions.featureSet).to.have.callCount(2)

    expect(actions.featureSet.firstCall).to.be.calledWithExactly('keyX', 'valueX')
    expect(actions.featureSet.secondCall).to.be.calledWithExactly('keyY', 'valueY')
  })

  it('should call store.dispatch with featureSet action with correct parameters for each "features" passed in first param', function() {
    const features = {
      features: {
        keyA: 'valueA',
        keyB: 'valueB',
      },
    }

    loadFeatures(features, store)

    expect(dispatchSpy).to.have.callCount(2)
    expect(actions.featureSet).to.have.callCount(2)

    expect(actions.featureSet.firstCall).to.be.calledWithExactly('keyA', 'valueA')
    expect(actions.featureSet.secondCall).to.be.calledWithExactly('keyB', 'valueB')
  })

  it('should call store.dispatch with featureSet action with correct parameters for each "experiments" passed in first param', function() {
    const features = {
      experiments: {
        keyC: 'valueC',
        keyD: 'valueD',
      },
    }

    loadFeatures(features, store)

    expect(dispatchSpy).to.have.callCount(2)
    expect(actions.featureSet).to.have.callCount(2)

    expect(actions.featureSet.firstCall).to.be.calledWithExactly('keyC', 'valueC', true)
    expect(actions.featureSet.secondCall).to.be.calledWithExactly('keyD', 'valueD', true)
  })

  it('should call "window.snowplow(`trackSelfDescribingEvent`, <experiment data>)" when loaoding new features, and call only once', function () {
    const features = {
      enable: ['feature-1', 'feature-2'],
    }

    loadFeatures(features, store)
    expect(snowplow.firstCall).to.be.calledWithExactly('trackSelfDescribingEvent', { data: { experiment_id: 'experiment1' } })

    loadFeatures(features, store)
    expect(snowplow.secondCall).to.be.calledWithExactly('trackSelfDescribingEvent', { data: { experiment_id: 'experiment2' } })

    expect(snowplow).to.be.calledTwice
  })
})
