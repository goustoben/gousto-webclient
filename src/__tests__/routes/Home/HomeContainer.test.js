import React from 'react'

import { getKnownVariant } from 'routes/Home/HomeContainer'

jest.mock('routes/Home/Home', () => () => <div />)

jest.mock('config/home', () => ({
	defaultVariant: 'default',
	knownVariants: [
		'default',
		'test',
	],
}))

describe('getKnownVariant', () => {
	let variant

	describe('when given a known variant', () => {
		test('should return the given variant', () => {
			variant = getKnownVariant('test')

			expect(variant).toEqual('test')
		})
	})

	describe('when given an unknown variant', () => {
		test('should return the default variant', () => {
			variant = getKnownVariant('alternate')

			expect(variant).toEqual('default')
		})
	})
})
