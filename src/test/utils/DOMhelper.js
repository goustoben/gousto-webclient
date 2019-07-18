import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import ReactDOM from 'react-dom'
import DOMHelper from 'utils/DOMhelper'
chai.use(sinonChai)

describe('DOMhelper', function() {
  describe('getFirstMatchingNode', function() {
    let sandbox
    let findDOMNode

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      findDOMNode = sandbox.stub(ReactDOM, 'findDOMNode')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should return next matching node if getFirstMatchingNode throws an error for an earlier node', function() {
      findDOMNode.withArgs('ref for key0').throws(new Error('dom node not mounted'))
      findDOMNode.withArgs('ref for key2').returns('node for key2')
      const keys = ['key0', 'key2']
      const refs = {
        key0: 'ref for key0',
        key1: 'ref for key1',
        key2: 'ref for key2',
        key4: 'ref for key4',
      }
      const result = DOMHelper.getFirstMatchingNode(keys, refs)
      expect(findDOMNode.callCount).to.equal(2)
      expect(findDOMNode.firstCall).to.be.calledWithExactly('ref for key0')
      expect(findDOMNode.secondCall).to.be.calledWithExactly('ref for key2')
      expect(result).to.equal('node for key2')
    })
  })

})
