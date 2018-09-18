import Immutable from 'immutable'

import { contentLoadContentByPageSlug } from 'actions/content'

import { fetchContentOnChange, pathToSlug } from 'routes/fetchContentOnChange'

jest.mock('actions/content', () => ({
	contentLoadContentByPageSlug: jest.fn(),
}))

jest.mock('config/cms', () => ({
	allowedRoutes: [
		'jobs',
		'my-gousto',
		'my-deliveries'
	]
}))

describe('pathToSlug', () => {
	test('maps known paths to their aliases', () => {
		expect(pathToSlug('welcome-to-gousto')).toBe('welcome')
		expect(pathToSlug('')).toBe('homepage')
	})

	test('returns unknown paths as default', () => {
		expect(pathToSlug('my-deliveries')).toBe('my-deliveries')
		expect(pathToSlug('my-gousto')).toBe('my-gousto')
		expect(pathToSlug('jobs')).toBe('jobs')
	})
})

describe('fetchContentOnChange', () => {
	const dispatch = jest.fn()
	const getState = jest.fn()
	const store = {
		dispatch,
		getState,
	}

	test('should not call a route when config allowedRoutes does not contain slug', () => {
		getState.mockReturnValue({
			variants: Immutable.Map({}),
		})

		fetchContentOnChange('/rando', store)

		expect(contentLoadContentByPageSlug).not.toHaveBeenCalled()
	})

	describe('when no variant exists for path in store', () => {
		beforeEach(() => {
			getState.mockReturnValue({
				variants: Immutable.Map({}),
			})
		})

		test('should call load content with the given path', () => {
			fetchContentOnChange('/jobs', store)

			expect(dispatch).toHaveBeenCalled()
			expect(contentLoadContentByPageSlug).toHaveBeenCalledWith(
				'jobs',
				'default',
			)
		})
	})

	describe('when variant exists for path in store', () => {
		beforeEach(() => {
			getState.mockReturnValue({
				variants: Immutable.Map({
					'my-gousto': 'osr-a',
				}),
			})
		})

		test('should call load content with the given path and store variant', () => {
			fetchContentOnChange('/my-gousto', store)

			expect(contentLoadContentByPageSlug).toHaveBeenCalledWith(
				'my-gousto',
				'osr-a',
			)

			fetchContentOnChange('/my-deliveries', store)

			expect(contentLoadContentByPageSlug).toHaveBeenCalledWith(
				'my-deliveries',
				'default',
			)
		})
	})
})
