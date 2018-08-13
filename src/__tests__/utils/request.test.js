import { isFacebookUserAgent } from 'utils/request'

describe('request helpers/utilities', () => {
	test('should detect a wrong facebook user agent', () => {
		const wrongUserAgent =
			'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405'

		expect(isFacebookUserAgent(wrongUserAgent)).toBe(false)
	})

	test('should detect a valid facebook user agent (Faceboot)', () => {
		const righUserAgent =
			'Mozilla/5.0 (compatible; Facebot 1.0; https://developers.facebook.com/docs/sharing/webmasters/crawler)'

		expect(isFacebookUserAgent(righUserAgent)).toBe(true)
	})

	test('should detect a valid facebook user agent (Faceboot)', () => {
		const righUserAgent =
			'Mozilla/5.0 (compatible; Facebot 1.0; https://developers.facebook.com/docs/sharing/webmasters/crawler)'

		expect(isFacebookUserAgent(righUserAgent)).toBe(true)
	})

	test('should detect a valid facebook user agent (facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php))', () => {
		const righUserAgent =
			'Mozilla/5.0 (compatible; facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php); https://developers.facebook.com/docs/sharing/webmasters/crawler)'

		expect(isFacebookUserAgent(righUserAgent)).toBe(true)
	})

	test('should detect a valid facebook user agent (facebookexternalhit/1.1)', () => {
		const righUserAgent =
			'Mozilla/5.0 (compatible; facebookexternalhit/1.1; https://developers.facebook.com/docs/sharing/webmasters/crawler)'

		expect(isFacebookUserAgent(righUserAgent)).toBe(true)
	})
})
