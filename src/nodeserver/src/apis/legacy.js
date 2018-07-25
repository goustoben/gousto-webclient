import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

export function legacyVerifyAge() {
	const data = fetch(null, `${endpoint('frontend')}/user/public-age-verified`, {}, 'POST', 'default', {}, null, true)

	return data
}
