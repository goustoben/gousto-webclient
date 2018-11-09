import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { cookieExpiries } from 'config/storePersistence'
chai.use(sinonChai)

import Immutable from 'immutable'

describe('persistStore', function() {
  const cookiePrefix = 'prefix'
  let persistStore
  let cookieHelper2
  let set
  let unset
  let getNamesWithPrefix

  beforeEach(function() {
    set = sinon.spy()
    unset = sinon.spy()
    getNamesWithPrefix = sinon.stub().returns([`${cookiePrefix}_cookie1`, `${cookiePrefix}_cookie2`])

    cookieHelper2 = { set, unset, getNamesWithPrefix }

    persistStore = require('inject-loader?utils/cookieHelper2&config/storePersistence!middlewares/persist/persistStore')({
      'utils/cookieHelper2': cookieHelper2,
      'config/storePersistence': {
        cookiePrefix,
        cookieExpiries,
      },
    })
  })

  describe('persist', function() {
    let genWhitelist
    let state
    let whitelist
    const cookies = {
      [`${cookiePrefix}_cookie1`]: 'cookie1-value',
      [`${cookiePrefix}_cookie2`]: 'cookie2-value',
    }
    beforeEach(function() {
      whitelist = {
        something: false,
        nested: {
          obj: true,
        },
        emptyVal: true,
        emptyArray: false,
        emptyObj: false,
        emptyNested: { nestedEmtpyVal: true },
        emptyImmutable: false,
      }
      genWhitelist = sinon.stub().returns(whitelist)
      state = {
        something: [
          'so', 'many', 'things',
        ],
        nested: {
          obj: 'hello',
        },
        emptyVal: '',
        emptyArray: [],
        emptyObj: {},
        emptyNested: { nestedEmtpyVal: '' },
        emptyImmutable: Immutable.fromJS({}),
      }
    })

    describe('with whitelist', function() {
      it('should call genWhitelist, serialiseStore, persistStore and saveStoreAsCookie with right values', function() {
        persistStore.persist(state, genWhitelist, cookies)

        expect(genWhitelist).to.have.been.calledOnce
        expect(genWhitelist.getCall(0).args[0]).to.equal(state)

        expect(getNamesWithPrefix).to.have.been.calledOnce
        expect(getNamesWithPrefix.getCall(0).args).to.deep.equal([cookies, cookiePrefix])

        expect(unset).to.have.been.calledTwice
        expect(unset.getCall(0).args).to.deep.equal([cookies, `${cookiePrefix}_cookie1`])
        expect(unset.getCall(1).args).to.deep.equal([cookies, `${cookiePrefix}_cookie2`])

        expect(set).to.have.been.calledTwice
        expect(set.getCall(0).args).to.deep.equal([cookies, 'prefix_something', JSON.stringify(['so', 'many', 'things']), 2 / 24])
        expect(set.getCall(1).args).to.deep.equal([cookies, 'prefix_nested_obj', 'hello', 2 / 24])
      })
    })

    describe('with a features cookie', function() {
      beforeEach(function() {
        state = {
          features: {
            a: { value: 'b' },
            c: { value: 'd' },
          },
        }
        whitelist = {
          features: false,
        }
        genWhitelist = sinon.stub().returns(whitelist)
      })
      it('should set it for 7 days', function() {
        persistStore.persist(state, genWhitelist, cookies)
        expect(set).to.have.been.calledOnce
        expect(set.getCall(0).args).to.deep.equal([cookies, 'prefix_features', JSON.stringify({ a: { value: 'b' }, c: { value: 'd' } }), 7])
      })
    })

    describe('with a tracking cookie', function() {
      beforeEach(function() {
        state = {
          tracking: {
            a: 'b',
            c: 'd',
          },
        }
        whitelist = {
          tracking: false,
        }
        genWhitelist = sinon.stub().returns(whitelist)
      })
      it('should set it for 30 days', function() {
        persistStore.persist(state, genWhitelist, cookies)
        expect(set).to.have.been.calledOnce
        expect(set.getCall(0).args).to.deep.equal([cookies, 'prefix_tracking', JSON.stringify({ a: 'b', c: 'd' }), 30])
      })
    })
  })
})

