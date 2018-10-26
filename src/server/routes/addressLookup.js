import addressLookup from '../service/addressLookup'

function isValidPayload(ctx) {
	return ctx.query && ctx.query.postcode
}

function routeMatches(ctx) {
	return ctx.path === '/address/postcode-lookup'
}

function isValidMethod(ctx) {
	return ctx.method === 'GET'
}

/* eslint-disable no-param-reassign */
export default async (ctx, next) => {
	if (! routeMatches(ctx)) {
		await next()
	} else if (! isValidMethod(ctx)) {
		ctx.throw(405)
	} else if (! isValidPayload(ctx)) {
		ctx.throw(400, 'postcode query parameter is required')
	} else {
		await new Promise(async (resolve, reject) => {
			try {
				const results = await addressLookup(ctx.query.postcode)

				ctx.body = results.data
				resolve()
			} catch (err) {
				reject(err)
			}
		})
	}
}
