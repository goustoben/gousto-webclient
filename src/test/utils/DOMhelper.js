import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import ReactDOM from 'react-dom'
import DOMHelper from 'utils/DOMhelper'
chai.use(sinonChai)

describe('DOMhelper', function() {
	describe('getBoundingClientRect', function() {
		it('should return an empty object when ref is falsy', function() {
			expect(DOMHelper.getBoundingClientRect()).to.deep.equal({})
		})

		it('should call getBoundingClientRect function when available', function() {
			const ref = {
				getBoundingClientRect: () => ({ width: 100, height: 200 }),
			}

			expect(DOMHelper.getBoundingClientRect(ref)).to.deep.equal({ width: 100, height: 200 })
		})
	})

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

		it('should return undefined if no keys available', function() {
			expect(DOMHelper.getFirstMatchingNode(undefined, { x: 'something' })).to.deep.equal(undefined)
		})

		it('should return undefined if no refs available', function() {
			expect(DOMHelper.getFirstMatchingNode(['x'], undefined)).to.deep.equal(undefined)
		})

		it('should return matching node for first found key in list', function() {
			findDOMNode.withArgs('ref for key2').returns('node for key2')
			const keys = ['key1', 'key2', 'key3']
			const refs = {
				key0: 'ref for key0',
				key4: 'ref for key4',
				key2: 'ref for key2',
				key6: 'ref for key6',
			}
			const result = DOMHelper.getFirstMatchingNode(keys, refs)
			expect(findDOMNode.callCount).to.equal(1)
			expect(findDOMNode.firstCall).to.be.calledWithExactly('ref for key2')
			expect(result).to.equal('node for key2')
		})

		it('should return undefined if no matches found', function() {
			const keys = ['key3', 'key4', 'key5']
			const refs = {
				key0: 'ref for key0',
				key1: 'ref for key1',
				key2: 'ref for key2',
			}
			expect(DOMHelper.getFirstMatchingNode(keys, refs)).to.equal(undefined)
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

	describe('scrollToFirstMatchingNode', function() {
		let sandbox
		let getFirstMatchingNode

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			getFirstMatchingNode = sandbox.stub(DOMHelper, 'getFirstMatchingNode')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should call getFirstMatchingNode once with keys & refs', function() {
			DOMHelper.scrollToFirstMatchingNode()
			DOMHelper.scrollToFirstMatchingNode(['key1'], { key1: 'ref1' })
			expect(getFirstMatchingNode.callCount).to.equal(2)
			expect(getFirstMatchingNode.firstCall).to.be.calledWithExactly([], {})
			expect(getFirstMatchingNode.lastCall).to.be.calledWithExactly(['key1'], { key1: 'ref1' })
		})
	})
})
