import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'
chai.use(sinonChai)

describe('MenuContainer', function () {
  let store
  let getCollectionIdWithName
  let MenuContainer

  beforeEach(function() {
    getCollectionIdWithName = sinon.stub().returns('selected-collection')
    MenuContainer = require('inject-loader?./Menu&utils/deliveries&utils/collections!routes/Menu/MenuContainer')({
      './Menu': () => (<div />),
      'utils/deliveries': {
        getCutoffs: sinon.stub().returns([null]),
      },
      'utils/collections': {
        getCollectionIdWithName,
        getDefaultCollectionId: sinon.stub().returns('selected-collection-id'),
      },

    }).default

    store = {
      getState: () => ({
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
          dietaryAttributes: Immutable.Set([]),
        }),
        basket: Immutable.fromJS({
          numPortions: 2,
        }),
        recipes: Immutable.fromJS({
          327: {
            id: '327',
            dietType: 'Meat',
          },
          1589: {
            id: '1589',
            dietType: 'Fish',
          },
          393: {
            id: '393',
            dietType: 'Vegetarian',
          },
          929: {
            id: '929',
            dietType: 'Vegan',
          },
          1651: {
            id: '1651',
            dietType: 'Meat',
          },
        }),
        menuCollectionRecipes: Immutable.fromJS({
          ca8f71be: ['327', '1589', '393'],
          '70c28cb0': ['929', '1651'],
        }),
        menuCollections: Immutable.fromJS({
          ca8f71be: {
            default: true,
            id: 'ca8f71be',
          },
          '70c28cb0': {
            defult: false,
            id: '70c28cb0',
          },
        }),
        features: Immutable.fromJS({
          collections: {
            value: true,
          },
          collectionFreeze: {
            value: 'frozen-collection',
          },
          jfyTutorial: {
            value: false,
          },
        }),
        boxSummaryShow: Immutable.Map({ show: false }),
        pending: Immutable.Map({}),
        auth: Immutable.Map({}),
        persist: Immutable.Map({}),
        isAuthenticated: Immutable.Map({}),
      }),
      subscribe: () => {},
    }
  })

  describe('frozen collections', function () {
    it('should freeze collection', function () {
      const wrapper = shallow(<MenuContainer />, {
        context: {
          store,
        },
      })

      expect(getCollectionIdWithName.getCall(0).args[1]).to.equal('frozen-collection')
    })

    describe('force collections', function() {
      beforeEach(function() {
        store = {
          getState: () => ({
            filters: Immutable.Map({
              currentCollectionId: 'ca8f71be',
              totalTime: '0',
              dietTypes: Immutable.Set([]),
              dietaryAttributes: Immutable.Set([]),
            }),
            basket: Immutable.fromJS({
              numPortions: 2,
            }),
            recipes: Immutable.fromJS({
              327: {
                id: '327',
                dietType: 'Meat',
              },
              1589: {
                id: '1589',
                dietType: 'Fish',
              },
              393: {
                id: '393',
                dietType: 'Vegetarian',
              },
              929: {
                id: '929',
                dietType: 'Vegan',
              },
              1651: {
                id: '1651',
                dietType: 'Meat',
              },
            }),
            menuCollectionRecipes: Immutable.fromJS({
              ca8f71be: ['327', '1589', '393'],
              '70c28cb0': ['929', '1651'],
            }),
            menuCollections: Immutable.fromJS({
              ca8f71be: {
                default: true,
                id: 'ca8f71be',
              },
              '70c28cb0': {
                defult: false,
                id: '70c28cb0',
              },
            }),
            features: Immutable.fromJS({
              collections: {
                value: true,
              },
              collectionFreeze: {
                value: 'frozen-collection',
              },
              forceCollections: {
                value: true,
              },
              jfyTutorial: {
                value: false,
              },
            }),
            basket: Immutable.Map({}),
            boxSummaryShow: Immutable.Map({ show: false }),
            pending: Immutable.Map({}),
            auth: Immutable.Map({}),
            persist: Immutable.Map({}),
            isAuthenticated: Immutable.Map({}),
          }),
          subscribe: () => {},
        }
      })

      it('should not freeze the collection', function() {
        const wrapper = shallow(<MenuContainer />, {
          context: {
            store,
          },
        })
        expect(getCollectionIdWithName.getCall(0).args[1]).not.to.equal('frozen-collection')
      })
    })
  })

  describe('preffered collections', function () {
    beforeEach(function() {
      store = {
        getState: () => ({
          filters: Immutable.Map({
            currentCollectionId: 'ca8f71be',
            totalTime: '0',
            dietTypes: Immutable.Set([]),
            dietaryAttributes: Immutable.Set([]),
          }),
          basket: Immutable.fromJS({
            numPortions: 2,
          }),
          recipes: Immutable.fromJS({
            327: {
              id: '327',
              dietType: 'Meat',
            },
            1589: {
              id: '1589',
              dietType: 'Fish',
            },
            393: {
              id: '393',
              dietType: 'Vegetarian',
            },
            929: {
              id: '929',
              dietType: 'Vegan',
            },
            1651: {
              id: '1651',
              dietType: 'Meat',
            },
          }),
          menuCollectionRecipes: Immutable.fromJS({
            ca8f71be: ['327', '1589', '393'],
            '70c28cb0': ['929', '1651'],
          }),
          menuCollections: Immutable.fromJS({
            ca8f71be: {
              default: true,
              id: 'ca8f71be',
            },
            '70c28cb0': {
              defult: false,
              id: '70c28cb0',
            },
          }),
          features: Immutable.fromJS({
            collections: {
              value: true,
            },
            collectionFreeze: {
              value: '',
            },
            forceCollections: {
              value: false,
            },
            preferredCollection: {
              value: 'a-collection',
            },
            jfyTutorial: {
              value: false,
            },
          }),
          basket: Immutable.Map({}),
          boxSummaryShow: Immutable.Map({ show: false }),
          pending: Immutable.Map({}),
          auth: Immutable.Map({}),
          persist: Immutable.Map({}),
          isAuthenticated: Immutable.Map({}),
          menuCollections: Immutable.OrderedMap({
            123: Immutable.Map({ id: '123', shortTitle: 'a Collection', published: true }),
            456: Immutable.Map({ id: '456', shortTitle: 'all recipes', published: true }),
          }),
        }),
        subscribe: () => {},
      }
    })

    it('should get a Collection id', function() {
      const wrapper = shallow(<MenuContainer />, {
        context: {
          store,
        },
      })
      expect(getCollectionIdWithName.getCall(0).args[1]).to.equal('a-collection')
    })
  })
})
