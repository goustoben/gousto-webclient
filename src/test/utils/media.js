import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('media utils', function() {
  const s3Url = 'https://test.com/build/latest'

  describe('newAssetPath', function() {
    function newAssetPathMocked(manifest) {
      const readFileSync = sinon.stub().returns(manifest)
      const newAssetPathInjected = require('inject-loader?jsonfile!utils/media')({ // eslint-disable-line global-require
        jsonfile: { readFileSync },
      }).newAssetPath

      return newAssetPathInjected
    }

    it('should return matching asset file from the new manifest', function() {
      const newAssetPathLocal = newAssetPathMocked({
        testfile: 'testfile-12345',
      })
      expect(newAssetPathLocal('testfile')).to.equal(`${s3Url}/testfile-12345`)
    })

    it('should return appended file url when manifest is not found', function() {
      const newAssetPathLocal = newAssetPathMocked({})
      expect(newAssetPathLocal('testfile')).to.equal(`${s3Url}/testfile`)
    })
  })
})
