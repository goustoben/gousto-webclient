import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import immutableChai from 'chai-immutable'
chai.use(sinonChai)
chai.use(immutableChai)

import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import actions from 'actions'
import config from 'config/signup'
import { shallow, mount } from 'enzyme'
import Dots from 'routes/Signup/Dots'

describe('Signup', function() {
  let Signup
  let signupStepsReceiveSpy
  let redirectSpy
  let menuLoadDaysSpy

  let sandbox
  let stepName
  let steps
  let goToStepSpy
  let wrapper
  let store
  let getStateSpy
  let dispatchSpy
  let signupSetStep

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
    signupStepsReceiveSpy = sandbox.stub()
    signupSetStep = sandbox.stub()
    redirectSpy = sandbox.stub(actions, 'redirect')
    menuLoadDaysSpy = sandbox.stub(actions, 'menuLoadDays').returns(new Promise(resolve => resolve()))
    goToStepSpy = sandbox.stub()
    stepName = 'welcome'

    steps = Immutable.fromJS([
      'welcome',
      'delivery',
      'foodPref',
      'finish',
    ])

    Signup = require('inject-loader!routes/Signup/Signup')({
      actions: {
        signupStepsReceive: signupStepsReceiveSpy,
        redirect: redirectSpy,
        menuLoadDays: menuLoadDaysSpy,
        signupSetStep: signupSetStep,
      },
      'config/routes': {
        client: {
          signup: '/configured-signup-path',
        },
      },
      './Steps/Welcome': () => <span id="WelcomeStep" className="step" />,
      './Steps/BoxSize': () => <span id="BoxSizeStep" className="step" />,
      './Steps/Postcode': () => <span id="PostcodeStep" className="step" />,
      './Steps/Delivery': () => <span id="DeliveryStep" className="step" />,
      './Steps/Recipes': () => <span id="FoodPrefStep" className="step" />,
      './Steps/Finish': () => <span id="FinishStep" className="step" />,
      'react-helmet': () => <span id="Helmet" />,
    }).default

    wrapper = shallow(<Signup stepName={stepName} steps={steps} goToStep={goToStepSpy} />)

    getStateSpy = sandbox.stub().returns({
      menuCutoffUntil: '2016-01-01',
      signup: Immutable.fromJS({
        wizard: {
          steps,
        }
      }),
      features: Immutable.fromJS({}),
    })
    dispatchSpy = sandbox.stub().returns(new Promise(resolve => resolve()))
    store = {
      getState: getStateSpy,
      dispatch: dispatchSpy,
    }
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('should render a div', function() {
    expect(wrapper.type()).to.equal('div')
  })

  it('should render a Dots with the correct props', function() {
    expect(wrapper.find(Dots).length).to.equal(1)
    expect(wrapper.find(Dots).prop('steps')).to.equal(4)
    expect(wrapper.find(Dots).prop('stepNo')).to.equal(0)
  })

  it('should render the steps in the correct order', function() {
    wrapper = mount(<Signup stepName={stepName} steps={steps} goToStep={goToStepSpy} />, { context: { store } })
    expect(wrapper.find('.step').at(0).prop('id')).to.equal('WelcomeStep')
    expect(wrapper.find('.step').at(1).prop('id')).to.equal('DeliveryStep')
    expect(wrapper.find('.step').at(2).prop('id')).to.equal('FoodPrefStep')
    expect(wrapper.find('.step').at(3).prop('id')).to.equal('FinishStep')

    expect(wrapper.find('.step')).to.have.length(4)
  })

  it('should exclude invalid steps and render the rest in the correct order', function() {
    steps = Immutable.List(['welcome', 'delivery', 'x', 'postcode', 'foodPref', 'recipes', 'boxSize', 'finish'])
    wrapper = mount(<Signup stepName={stepName} steps={steps} goToStep={goToStepSpy} />, { context: { store } })
    expect(wrapper.find('.step').at(0).prop('id')).to.equal('WelcomeStep')
    expect(wrapper.find('.step').at(1).prop('id')).to.equal('DeliveryStep')
    expect(wrapper.find('.step').at(2).prop('id')).to.equal('PostcodeStep')
    expect(wrapper.find('.step').at(3).prop('id')).to.equal('FoodPrefStep')
    expect(wrapper.find('.step').at(4).prop('id')).to.equal('BoxSizeStep')
    expect(wrapper.find('.step').at(5).prop('id')).to.equal('FinishStep')

    expect(wrapper.find('.step')).to.have.length(6)
  })

  describe('fetchData', function() {
    it('should dispatch redirect action sending user back to step 1 if stepName is set in url', async function() {
      await Signup.fetchData({
        store,
        params: {
          stepName: 2,
        },
      })
      expect(redirectSpy.called).to.equal(true)
      expect(redirectSpy.firstCall).to.be.calledWithExactly('/configured-signup-path/welcome')
    })

    it('should not dispatch menuLoadDays if state.menuCutoffUntil is set', async function() {
      await Signup.fetchData({ store })
      expect(menuLoadDaysSpy.called).to.equal(false)
    })

    it('should dispatch menuLoadDays if state.menuCutoffUntil is not set', async function() {
      getStateSpy = sinon.stub().returns({
        menuCutoffUntil: null,
        features: Immutable.fromJS({}),
        signup: Immutable.fromJS({
          wizard: {
            steps,
          }
        }),
      })
      store = {
        getState: getStateSpy,
        dispatch: dispatchSpy,
      }
      await Signup.fetchData({ store, params: { stepName } })
      expect(menuLoadDaysSpy.calledOnce).to.equal(true)
    })

    it('should dispatch signupStepsReceive with steps from query if available', async function() {
      await Signup.fetchData({
        store: {
          dispatch: sinon.spy(),
          getState: () => ({
            signup: Immutable.fromJS({
              wizard: {
                steps: [],
              }
            }),
            menuCutoffUntil: new Date(),
            features: Immutable.fromJS({
              signupSteps: {
                value: 'welcome,delivery',
              },
            }),
          }),
        },
        params: { stepName: 'welcome' },
        query: {
          steps: 'welcome,finish',
        },
      })

      expect(signupStepsReceiveSpy.calledOnce).to.equal(true)
      expect(signupStepsReceiveSpy.getCall(0).args[0]).to.be.equal(Immutable.List(['welcome', 'finish']))
    })

    it('should dispatch signupStepsReceive with steps from "signupSteps" feature if available and query does not have steps', async function() {
      await Signup.fetchData({
        store: {
          dispatch: sinon.spy(),
          getState: () => ({
            signup: Immutable.fromJS({
              wizard: {
                steps: [],
              }
            }),
            features: Immutable.fromJS({
              menuCutoffUntil: new Date(),
              signupSteps: {
                value: 'welcome,finish,delivery',
              },
            }),
          }),
        },
        params: { stepName: 'welcome' },
        query: {},
      })
      expect(signupStepsReceiveSpy.calledOnce).to.equal(true)
      expect(signupStepsReceiveSpy).to.be.calledOnce
      expect(signupStepsReceiveSpy.getCall(0).args[0]).to.be.equal(Immutable.fromJS(['welcome', 'finish', 'delivery']))
    })

    it('should dispatch signupStepsReceive with steps from default config if query does not have steps & signupSteps feature is not set', async function() {
      await Signup.fetchData({
        store: {
          dispatch: sinon.spy(),
          getState: () => ({
            signup: Immutable.fromJS({
              wizard: {
                steps: [],
              }
            }),
            menuCutoffUntil: new Date(),
            features: Immutable.fromJS({}),
          }),
        },
        params: { stepName: 'welcome' },
        query: {},
      })
      expect(signupStepsReceiveSpy.calledOnce).to.equal(true)
      expect(signupStepsReceiveSpy).to.be.calledOnce
      expect(signupStepsReceiveSpy.getCall(0).args[0]).to.be.equal(Immutable.fromJS(config.defaultSteps))
    })
  })
})
