/* eslint no-use-before-define: ["error", { "functions": false }] */
import ReactDOM from 'react-dom'
import scrollIntoView from 'scroll-into-view'
import logger from 'utils/logger'

const DOMHelper = {
	getBoundingClientRect,
	getFirstMatchingNode,
	scrollToFirstMatchingNode,
}

export function getBoundingClientRect(ref) {
	let size = {}
	if (ref && ref.getBoundingClientRect) {
		size = ref.getBoundingClientRect()
	}

	return size
}

export function getFirstMatchingNode(keys = [], refs = {}) {
	let matchingNode

	const matchFound = keys.some(key => {
		if (refs[key]) {
			try {
				matchingNode = ReactDOM.findDOMNode(refs[key])
			} catch (err) {
				logger.warning(`getFirstMatchingNode: ${err}`)
			}
		}

		return matchingNode
	})

	return matchFound ? matchingNode : undefined
}

export function scrollToFirstMatchingNode(keys = [], refs = {}) {
	const firstFoundErrorEl = DOMHelper.getFirstMatchingNode(keys, refs)

	if (firstFoundErrorEl) {
		scrollIntoView(firstFoundErrorEl)
	} else {
		logger.warning('scrollToFirstMatchingNode: no matches found in refs')
	}
}

export default DOMHelper
