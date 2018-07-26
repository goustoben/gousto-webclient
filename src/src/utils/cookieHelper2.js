import logger from './logger'
import cookieString from './cookieString'
import moment from 'moment'
import goustoStore from 'store'

const versionPrefix = 'v1'

function getKey(key) {
	return `${versionPrefix}_${key}`
}

function deleteWithPath(cookies, key) {
	const state = goustoStore.store.getState()
	const path = state && state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname ? state.routing.locationBeforeTransitions.pathname : '/'

	const paths = path
		.split('/')
		.filter(x => x)
		.reduce((sum, strippedCurrent) => {
			const current = `/${strippedCurrent}`
			if (sum.length === 0) {
				return [current]
			}
			sum.push(sum[sum.length - 1] + current)

			return sum
		}, [])

	paths.push('/')

	paths.forEach(pathSegment => {
		unset(cookies, key, false, pathSegment) // eslint-disable-line no-use-before-define
	})
}

function updateCookie(cookies, key, cookieValue) {
	deleteWithPath(cookies, key)
	set(cookies, key, cookieValue, 1) // eslint-disable-line no-use-before-define
}

export function encode(val) {
	let ret

	if (__CLIENT__) {
		ret = val ? JSON.stringify(val) : ''
	}

	if (__SERVER__) {
		ret = val ? encodeURIComponent(JSON.stringify(val)) : ''
	}

	return ret
}

export function decode(val) {
	let ret

	if (__SERVER__) {
		ret = val ? JSON.parse(decodeURIComponent(val)) : undefined
	}

	if (__CLIENT__) {
		ret = val ? JSON.parse(val) : undefined
	}

	return ret
}

export function get(cookies, key, withVersionPrefix = true) {
	let result
	let oldCookieValue
	let newCookieValue
	const prefixedKey = withVersionPrefix ? getKey(key) : key

	if (cookies) {
		try {
			if (key === 'oauth_token' || key === 'oauth_refresh') {
				let keyWithDeletedValue
				if (cookies.get(key) === 'deleted') {
					keyWithDeletedValue = key
				}
				if (cookies.get(prefixedKey) === 'deleted') {
					keyWithDeletedValue = prefixedKey
				}
				if (keyWithDeletedValue) {
					logger.notice(`'deleted' cookie value for key: ${keyWithDeletedValue}`)

					return null
				}
			}
			oldCookieValue = decode(cookies.get(key))
			newCookieValue = decode(cookies.get(prefixedKey))
			if (oldCookieValue && !newCookieValue) {
				updateCookie(cookies, key, oldCookieValue)
				result = oldCookieValue
			} else {
				if (oldCookieValue) {
					deleteWithPath(cookies, key)
				}
				result = newCookieValue
			}
		} catch (err) {
			logger.notice(`un-parsable cookie value for key: ${key}, value: ${cookies.get(key)}`)
			logger.error(`un-parsable cookie value for key: ${key}`, err)
		}
	}

	return result
}

export function set(cookies, key, val, days, withVersionPrefix = true) {
	const prefixedKey = withVersionPrefix ? getKey(key) : key

	if (cookies) {
		if (days) {
			const expires = moment().add(days * 24, 'hours')
			cookies.set(prefixedKey, encode(val), { expires: expires.toDate(), httpOnly: false })
		} else {
			cookies.set(prefixedKey, encode(val), { httpOnly: false })
		}
	} else {
		logger.error('no cookies to set on')
	}
}

export function unset(cookies, key, withVersionPrefix = true, path = '/') {
	const prefixedKey = withVersionPrefix ? getKey(key) : key

	if (cookies) {
		cookies.set(prefixedKey, null, { expires: new Date('1970-01-01'), httpOnly: false, path })
		if (__ENV__ === 'production') {
			cookies.set(prefixedKey, null, { expires: new Date('1970-01-01'), httpOnly: false, domain: '.gousto.co.uk', path })
		}
	} else {
		logger.error('no cookies to delete on')
	}
}

export function getNamesWithPrefix(reqCookies, prefix) {
	const cookies = cookieString(reqCookies)
	let cookieNames = []
	if (cookies) {
		const match = RegExp('^\\s*' + getKey('') + prefix + '(.*?)=\\s*(.*?)\\s*$') //eslint-disable-line

		let index
		const matches = []
		for (index = 0; index < cookies.length; index++) {
			const entry = cookies[index].match(match)
			if (entry !== null) {
				matches.push(entry[1])
			}
		}

		cookieNames = matches.map(cookieName => `${prefix}${cookieName}`)
	}

	return cookieNames
}
