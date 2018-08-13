import sinon from 'sinon'

const { processRequest } = require('../../server/processRequest')

describe('router', () => {
	test('should 404 when given an unknown route', async () => {
		const ctx = {
			request: {
				url: '/apagethatwillneverexist',
				path: '/apagethatwillneverexist',
			},
			req: {
				headers: {
					'user-agent': 'apagethatwillneverexist',
				},
			},
		}
		await processRequest(ctx, function() {
			expect(
				ctx.body.indexOf('We can&#x27;t find the page you&#x27;re looking for'),
			).not.toBe(-1)
			expect(ctx.status).toEqual(404)
		})
	})

	test('should 200 when given a known route', async () => {
		const ctx = {
			request: {
				url: '/login',
				path: '/login',
			},
			req: {
				headers: {
					'user-agent': 'login',
				},
			},
		}
		await processRequest(ctx, function() {
			expect(ctx.body.indexOf('Nothing to see here')).toEqual(-1)
			expect(ctx.status).toEqual(200)
		})
	})

	test('should throw an error to the server-side handler on error', async () => {
		const ctx = {
			request: {
				url: '/500pagetest',
				path: '/500pagetest',
			},
			req: {
				headers: {
					'user-agent': '500pagetest',
				},
			},
		}

		await processRequest(ctx, function() {}).catch(err => {
			expect(err).toBeDefined()
		})
	})
})
