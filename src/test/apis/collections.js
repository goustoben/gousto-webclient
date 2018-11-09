import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('collections', function() {
  describe('fetchCollections', function() {
    let fetchCollections
    let fetchSpy

    beforeEach(function() {
      const collections = [{
        id: '1',
        short_title: 'burgers',
        long_title: '',
        description: 'all the burgers',
        automatic: true,
        published: true,
        featured_item: '',
        limit: -1,
        schedule_start: '',
        schedule_end: '',
        colour: '#938D88',
        order_key: 'rating_count',
        order_direction: 'desc',
        media: {
          images: null,
        },
      }]

      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(collections) }))

      fetchCollections = require('inject-loader?utils/fetch!apis/collections')({
        'utils/fetch': fetchSpy,
      }).fetchCollections
    })

    it('should call the endpoint with passed path', async function() {
      await fetchCollections('123', 'random/endpoint', { promocode: 'hello', tariff: '4' })

      expect(fetchSpy.args[0][1].indexOf('random/endpoint')).not.to.equal(-1)
    })

    it('should call the endpoint with passed data', async function() {
      await fetchCollections('123', 'random/endpoint', { tag: 'something', limit: 4 })

      expect(fetchSpy.args[0][2]).to.deep.equal({ tag: 'something', limit: 4 })
    })

    it('should return the results unchanged', async function() {
      const data = await fetchCollections('123', { promocode: 'hello', tariff: '4' })

      const expected = [{
        id: '1',
        short_title: 'burgers',
        long_title: '',
        description: 'all the burgers',
        automatic: true,
        published: true,
        featured_item: '',
        limit: -1,
        schedule_start: '',
        schedule_end: '',
        colour: '#938D88',
        order_key: 'rating_count',
        order_direction: 'desc',
        media: {
          images: null,
        },
      }]
      expect(data).to.deep.equal(expected)
    })
  })
})
