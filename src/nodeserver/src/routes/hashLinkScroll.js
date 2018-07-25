import { windowLocation, getDocumentElement } from 'utils/window'
import globals from 'config/globals'

function hashLink() {
	if (globals.client) {
		const hash = windowLocation().hash
		if (hash) {
			const id = hash.replace('#', '')
			const element = getDocumentElement(id)
			if (element) {
				element.scrollIntoView()

				return true
			}
		}
	}

	return false
}

export default hashLink
