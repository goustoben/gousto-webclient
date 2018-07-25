export function redirect(path) {
	window.location.assign(path)
}

export function replace(path) {
	window.location.replace(path)
}

export function documentLocation() {
	let location = {}
	if (document) {
		location = document.location
	}

	return location
}

export function getDocumentElement(id) {
	return document.getElementById(id)
}

export function getWindow() {
	return window
}

export function windowLocation() {
	return window.location
}


export default {
	getWindow,
	documentLocation,
	redirect,
	windowLocation,
	getDocumentElement,
}
