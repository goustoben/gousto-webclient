import fetch from 'utils/fetch'

function saveBasket(accessToken, path, reqData) {
	return fetch(accessToken, `/checkout/${path}`, reqData, 'POST')
}

export { saveBasket }
