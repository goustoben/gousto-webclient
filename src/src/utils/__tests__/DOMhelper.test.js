import ReactDOM from 'react-dom'
import * as DOMHelper from 'utils/DOMhelper'

const { getBoundingClientRect, getElementHeight, getElementOffsetTop, getFirstMatchingNode, scrollToFirstMatchingNode } = DOMHelper

jest.mock('react-dom',() => ({
  findDOMNode: jest.fn()
}))

describe('DOMhelper', () => {
  describe('getBoundingClientRect',() => {
    test('should return an empty object when ref is falsy', () => {
      expect(getBoundingClientRect()).toEqual({})
    })

    test('should call getBoundingClientRect function when available', () => {
      const ref = {
        getBoundingClientRect: () => ({ width: 100, height: 200 }),
      }

      expect(getBoundingClientRect(ref)).toEqual({ width: 100, height: 200 })
    })
  })

  describe('getFirstMatchingNode', () => {
    let findDOMNodeSpy

    beforeEach(() => {
      findDOMNodeSpy = jest.spyOn(ReactDOM, 'findDOMNode')
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should return undefined if no keys available', () => {
      expect(getFirstMatchingNode(undefined, { x: 'something' })).toEqual(undefined)
    })

    test('should return undefined if no refs available', () => {
      expect(getFirstMatchingNode(['x'], undefined)).toEqual(undefined)
    })

    test('should return matching node for first found key in list', () => {
      ReactDOM.findDOMNode.mockReturnValue('node for key2')//eslint-disable-line
      const keys = ['key1', 'key2', 'key3']
      const refs = {
        key0: 'ref for key0',
        key4: 'ref for key4',
        key2: 'ref for key2',
        key6: 'ref for key6',
      }
      const result = getFirstMatchingNode(keys, refs)
      expect(findDOMNodeSpy.mock.calls).toHaveLength(1)
      expect(findDOMNodeSpy).toBeCalledWith('ref for key2')
      expect(result).toEqual('node for key2')
    })

    test('should return undefined if no matches found', () => {
      const keys = ['key3', 'key4', 'key5']
      const refs = {
        key0: 'ref for key0',
        key1: 'ref for key1',
        key2: 'ref for key2',
      }
      expect(getFirstMatchingNode(keys, refs)).toEqual(undefined)
    })

    // there is another test in sinon that needs to be migrated but it was taking too long in the current ticket to move - in this file src/test/utils/DOMhelper.js - 15 Jul 2019
  })

  describe('scrollToFirstMatchingNode', () => {
    let getFirstMatchingNodeSpy

    beforeEach(() => {
      getFirstMatchingNodeSpy = jest.spyOn(DOMHelper, 'getFirstMatchingNode')
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should call getFirstMatchingNode once with keys & refs', () => {
      scrollToFirstMatchingNode()
      scrollToFirstMatchingNode(['key1'], { key1: 'ref1' })
      expect(getFirstMatchingNodeSpy.mock.calls).toHaveLength(2)
      expect(getFirstMatchingNodeSpy.mock.calls[0]).toEqual([[], {}])
      expect(getFirstMatchingNodeSpy.mock.calls[1]).toEqual([['key1'], { key1: 'ref1' }])
    })
  })

  describe('getElementHeight', () => {
    test('should query the document correctly', () => {
      const doc = {
        querySelector: jest.fn().mockReturnValue({
          offsetHeight: '50px'
        })
      }

      expect(getElementHeight(doc, '#testdiv')).toBe('50px')
      expect(doc.querySelector).toBeCalledWith('#testdiv')
    })
  })

  describe('getElementOffsetTop', () => {
    test('should query the document correctly', () => {
      const doc = {
        querySelector: jest.fn().mockReturnValue({
          offsetTop: '50'
        })
      }

      expect(getElementOffsetTop(doc, '#testdiv')).toBe('50')
      expect(doc.querySelector).toBeCalledWith('#testdiv')
    })
  })
})
