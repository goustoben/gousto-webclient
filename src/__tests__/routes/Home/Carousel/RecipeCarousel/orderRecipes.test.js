import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import orderRecipes from 'routes/Home/Carousel/RecipeCarousel/orderRecipes'

describe('orderRecipes', () => {
	let recipes
	let cutoffDateStr

	beforeEach(() => {
		recipes = Immutable.OrderedMap({
			'901': Immutable.fromJS({
				id: '901',
				availability: [],
				dietType: 'Meat',
				rating: { average: 3 },
			}),
			'987': Immutable.fromJS({
				id: '987',
				availability: [],
				dietType: 'Fish',
				rating: { average: 2 },
			}),
			'876': Immutable.fromJS({
				id: '876',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 2 },
			}),
			'765': Immutable.fromJS({
				id: '765',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
			'654': Immutable.fromJS({
				id: '654',
				availability: [],
				dietType: 'Fish',
				rating: { average: 1 },
			}),
			'678': Immutable.fromJS({
				id: '678',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
			'789': Immutable.fromJS({
				id: '789',
				availability: [],
				dietType: 'Fish',
				rating: { average: 3 },
			}),
			'890': Immutable.fromJS({
				id: '890',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 3 },
			}),
			'321': Immutable.fromJS({
				id: '321',
				availability: [],
				dietType: 'Fish',
				rating: { average: 0 },
			}),
			'210': Immutable.fromJS({
				id: '210',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
			'109': Immutable.fromJS({
				id: '109',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
			'123': Immutable.fromJS({
				id: '123',
				availability: [],
				dietType: 'Fish',
				rating: { average: 5 },
			}),
			'234': Immutable.fromJS({
				id: '234',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 5 },
			}),
			'345': Immutable.fromJS({
				id: '345',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
			'456': Immutable.fromJS({
				id: '456',
				availability: [],
				dietType: 'Fish',
				rating: { average: 4 },
			}),
			'567': Immutable.fromJS({
				id: '567',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 4 },
			}),
			'543': Immutable.fromJS({
				id: '543',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 1 },
			}),
			'432': Immutable.fromJS({
				id: '432',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
		})
		cutoffDateStr = '2017-01-01'
	})

	test('should order the recipes as Meat (Highest Rated), Fish (Highest Rated), Veg (Highest Rated)...', () => {
		const result = orderRecipes(recipes, cutoffDateStr)

		let expected = Immutable.OrderedMap()
		expected = expected.set(
			'345',
			Immutable.fromJS({
				id: '345',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'123',
			Immutable.fromJS({
				id: '123',
				availability: [],
				dietType: 'Fish',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'234',
			Immutable.fromJS({
				id: '234',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'678',
			Immutable.fromJS({
				id: '678',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'456',
			Immutable.fromJS({
				id: '456',
				availability: [],
				dietType: 'Fish',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'567',
			Immutable.fromJS({
				id: '567',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'901',
			Immutable.fromJS({
				id: '901',
				availability: [],
				dietType: 'Meat',
				rating: { average: 3 },
			}),
		)
		expected = expected.set(
			'789',
			Immutable.fromJS({
				id: '789',
				availability: [],
				dietType: 'Fish',
				rating: { average: 3 },
			}),
		)
		expected = expected.set(
			'890',
			Immutable.fromJS({
				id: '890',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 3 },
			}),
		)
		expected = expected.set(
			'765',
			Immutable.fromJS({
				id: '765',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'987',
			Immutable.fromJS({
				id: '987',
				availability: [],
				dietType: 'Fish',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'876',
			Immutable.fromJS({
				id: '876',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'432',
			Immutable.fromJS({
				id: '432',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'654',
			Immutable.fromJS({
				id: '654',
				availability: [],
				dietType: 'Fish',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'543',
			Immutable.fromJS({
				id: '543',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'109',
			Immutable.fromJS({
				id: '109',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'321',
			Immutable.fromJS({
				id: '321',
				availability: [],
				dietType: 'Fish',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'210',
			Immutable.fromJS({
				id: '210',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
		)

		expect(Immutable.is(result, expected)).toEqual(true)
	})

	test('with an off-balanced set of recipes should still order correctly', () => {
		recipes = Immutable.OrderedMap({
			'901': Immutable.fromJS({
				id: '901',
				availability: [],
				dietType: 'Meat',
				rating: { average: 3 },
			}),
			'987': Immutable.fromJS({
				id: '987',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
			'876': Immutable.fromJS({
				id: '876',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 2 },
			}),
			'765': Immutable.fromJS({
				id: '765',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
			'654': Immutable.fromJS({
				id: '654',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
			'678': Immutable.fromJS({
				id: '678',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
			'789': Immutable.fromJS({
				id: '789',
				availability: [],
				dietType: 'Meat',
				rating: { average: 3 },
			}),
			'890': Immutable.fromJS({
				id: '890',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 3 },
			}),
			'321': Immutable.fromJS({
				id: '321',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
			'210': Immutable.fromJS({
				id: '210',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
			'109': Immutable.fromJS({
				id: '109',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
			'123': Immutable.fromJS({
				id: '123',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
			'234': Immutable.fromJS({
				id: '234',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 5 },
			}),
			'345': Immutable.fromJS({
				id: '345',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
			'456': Immutable.fromJS({
				id: '456',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
			'567': Immutable.fromJS({
				id: '567',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 4 },
			}),
			'543': Immutable.fromJS({
				id: '543',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 1 },
			}),
			'432': Immutable.fromJS({
				id: '432',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
		})

		const result = orderRecipes(recipes, cutoffDateStr)

		let expected = Immutable.OrderedMap()
		expected = expected.set(
			'123',
			Immutable.fromJS({
				id: '123',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'234',
			Immutable.fromJS({
				id: '234',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'345',
			Immutable.fromJS({
				id: '345',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'567',
			Immutable.fromJS({
				id: '567',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'456',
			Immutable.fromJS({
				id: '456',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'890',
			Immutable.fromJS({
				id: '890',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 3 },
			}),
		)
		expected = expected.set(
			'678',
			Immutable.fromJS({
				id: '678',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'876',
			Immutable.fromJS({
				id: '876',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'789',
			Immutable.fromJS({
				id: '789',
				availability: [],
				dietType: 'Meat',
				rating: { average: 3 },
			}),
		)
		expected = expected.set(
			'543',
			Immutable.fromJS({
				id: '543',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'901',
			Immutable.fromJS({
				id: '901',
				availability: [],
				dietType: 'Meat',
				rating: { average: 3 },
			}),
		)
		expected = expected.set(
			'210',
			Immutable.fromJS({
				id: '210',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'765',
			Immutable.fromJS({
				id: '765',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'987',
			Immutable.fromJS({
				id: '987',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'432',
			Immutable.fromJS({
				id: '432',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'654',
			Immutable.fromJS({
				id: '654',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'109',
			Immutable.fromJS({
				id: '109',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'321',
			Immutable.fromJS({
				id: '321',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
		)

		expect(Immutable.is(result, expected)).toEqual(true)
	})

	test('with an off-balanced un-rated set of recipes should still order correctly', () => {
		recipes = Immutable.OrderedMap({
			'901': Immutable.fromJS({
				id: '901',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
			'987': Immutable.fromJS({
				id: '987',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
			'876': Immutable.fromJS({
				id: '876',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 2 },
			}),
			'765': Immutable.fromJS({
				id: '765',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
			'654': Immutable.fromJS({
				id: '654',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
			'678': Immutable.fromJS({
				id: '678',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
			'789': Immutable.fromJS({
				id: '789',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
			'890': Immutable.fromJS({
				id: '890',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
			'321': Immutable.fromJS({
				id: '321',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
			'210': Immutable.fromJS({
				id: '210',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
			'109': Immutable.fromJS({
				id: '109',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
			'123': Immutable.fromJS({
				id: '123',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
			'234': Immutable.fromJS({
				id: '234',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 5 },
			}),
			'345': Immutable.fromJS({
				id: '345',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
			'456': Immutable.fromJS({
				id: '456',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
			'567': Immutable.fromJS({
				id: '567',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 4 },
			}),
			'543': Immutable.fromJS({
				id: '543',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 1 },
			}),
			'432': Immutable.fromJS({
				id: '432',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
			'12345': Immutable.fromJS({
				id: '12345',
				availability: [
					{ from: '2017-01-01', until: '2017-10-01', featured: true },
				],
				dietType: 'anything',
				rating: { average: 0 },
			}),
		})

		const result = orderRecipes(recipes, cutoffDateStr)

		let expected = Immutable.OrderedMap()
		expected = expected.set(
			'12345',
			Immutable.fromJS({
				id: '12345',
				availability: [
					{ from: '2017-01-01', until: '2017-10-01', featured: true },
				],
				dietType: 'anything',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'123',
			Immutable.fromJS({
				id: '123',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'234',
			Immutable.fromJS({
				id: '234',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'345',
			Immutable.fromJS({
				id: '345',
				availability: [],
				dietType: 'Meat',
				rating: { average: 5 },
			}),
		)
		expected = expected.set(
			'567',
			Immutable.fromJS({
				id: '567',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'456',
			Immutable.fromJS({
				id: '456',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'876',
			Immutable.fromJS({
				id: '876',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'678',
			Immutable.fromJS({
				id: '678',
				availability: [],
				dietType: 'Meat',
				rating: { average: 4 },
			}),
		)
		expected = expected.set(
			'543',
			Immutable.fromJS({
				id: '543',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'765',
			Immutable.fromJS({
				id: '765',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'210',
			Immutable.fromJS({
				id: '210',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'987',
			Immutable.fromJS({
				id: '987',
				availability: [],
				dietType: 'Meat',
				rating: { average: 2 },
			}),
		)
		expected = expected.set(
			'890',
			Immutable.fromJS({
				id: '890',
				availability: [],
				dietType: 'Vegetarian',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'432',
			Immutable.fromJS({
				id: '432',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'654',
			Immutable.fromJS({
				id: '654',
				availability: [],
				dietType: 'Meat',
				rating: { average: 1 },
			}),
		)
		expected = expected.set(
			'109',
			Immutable.fromJS({
				id: '109',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'321',
			Immutable.fromJS({
				id: '321',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'789',
			Immutable.fromJS({
				id: '789',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
		)
		expected = expected.set(
			'901',
			Immutable.fromJS({
				id: '901',
				availability: [],
				dietType: 'Meat',
				rating: { average: 0 },
			}),
		)

		expect(Immutable.is(result, expected)).toEqual(true)
	})

	describe('with a featured recipe', () => {
		beforeEach(() => {
			recipes = Immutable.OrderedMap({
				'901': Immutable.fromJS({
					id: '901',
					availability: [],
					dietType: 'Meat',
					rating: { average: 3 },
				}),
				'987': Immutable.fromJS({
					id: '987',
					availability: [],
					dietType: 'Fish',
					rating: { average: 2 },
				}),
				'876': Immutable.fromJS({
					id: '876',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 2 },
				}),
				'765': Immutable.fromJS({
					id: '765',
					availability: [],
					dietType: 'Meat',
					rating: { average: 2 },
				}),
				'654': Immutable.fromJS({
					id: '654',
					availability: [],
					dietType: 'Fish',
					rating: { average: 1 },
				}),
				'678': Immutable.fromJS({
					id: '678',
					availability: [],
					dietType: 'Meat',
					rating: { average: 4 },
				}),
				'789': Immutable.fromJS({
					id: '789',
					availability: [],
					dietType: 'Fish',
					rating: { average: 3 },
				}),
				'890': Immutable.fromJS({
					id: '890',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 3 },
				}),
				'321': Immutable.fromJS({
					id: '321',
					availability: [],
					dietType: 'Fish',
					rating: { average: 0 },
				}),
				'210': Immutable.fromJS({
					id: '210',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 0 },
				}),
				'109': Immutable.fromJS({
					id: '109',
					availability: [],
					dietType: 'Meat',
					rating: { average: 0 },
				}),
				'123': Immutable.fromJS({
					id: '123',
					availability: [],
					dietType: 'Fish',
					rating: { average: 5 },
				}),
				'234': Immutable.fromJS({
					id: '234',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 5 },
				}),
				'345': Immutable.fromJS({
					id: '345',
					availability: [],
					dietType: 'Meat',
					rating: { average: 5 },
				}),
				'456': Immutable.fromJS({
					id: '456',
					availability: [],
					dietType: 'Fish',
					rating: { average: 4 },
				}),
				'567': Immutable.fromJS({
					id: '567',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 4 },
				}),
				'543': Immutable.fromJS({
					id: '543',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 1 },
				}),
				'432': Immutable.fromJS({
					id: '432',
					availability: [
						{ from: '2017-01-01', until: '2017-10-01', featured: true },
					],
					dietType: 'Meat',
					rating: { average: 1 },
				}),
			})
			cutoffDateStr = '2017-01-01'
		})

		test('should order the recipes as Featured, Meat (Highest Rated), Fish (Highest Rated), Veg (Highest Rated)...', () => {
			const result = orderRecipes(recipes, cutoffDateStr)

			let expected = Immutable.OrderedMap()
			expected = expected.set(
				'432',
				Immutable.fromJS({
					id: '432',
					availability: [
						{ from: '2017-01-01', until: '2017-10-01', featured: true },
					],
					dietType: 'Meat',
					rating: { average: 1 },
				}),
			)
			expected = expected.set(
				'345',
				Immutable.fromJS({
					id: '345',
					availability: [],
					dietType: 'Meat',
					rating: { average: 5 },
				}),
			)
			expected = expected.set(
				'123',
				Immutable.fromJS({
					id: '123',
					availability: [],
					dietType: 'Fish',
					rating: { average: 5 },
				}),
			)
			expected = expected.set(
				'234',
				Immutable.fromJS({
					id: '234',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 5 },
				}),
			)
			expected = expected.set(
				'678',
				Immutable.fromJS({
					id: '678',
					availability: [],
					dietType: 'Meat',
					rating: { average: 4 },
				}),
			)
			expected = expected.set(
				'456',
				Immutable.fromJS({
					id: '456',
					availability: [],
					dietType: 'Fish',
					rating: { average: 4 },
				}),
			)
			expected = expected.set(
				'567',
				Immutable.fromJS({
					id: '567',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 4 },
				}),
			)
			expected = expected.set(
				'901',
				Immutable.fromJS({
					id: '901',
					availability: [],
					dietType: 'Meat',
					rating: { average: 3 },
				}),
			)
			expected = expected.set(
				'789',
				Immutable.fromJS({
					id: '789',
					availability: [],
					dietType: 'Fish',
					rating: { average: 3 },
				}),
			)
			expected = expected.set(
				'890',
				Immutable.fromJS({
					id: '890',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 3 },
				}),
			)
			expected = expected.set(
				'765',
				Immutable.fromJS({
					id: '765',
					availability: [],
					dietType: 'Meat',
					rating: { average: 2 },
				}),
			)
			expected = expected.set(
				'987',
				Immutable.fromJS({
					id: '987',
					availability: [],
					dietType: 'Fish',
					rating: { average: 2 },
				}),
			)
			expected = expected.set(
				'876',
				Immutable.fromJS({
					id: '876',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 2 },
				}),
			)
			expected = expected.set(
				'109',
				Immutable.fromJS({
					id: '109',
					availability: [],
					dietType: 'Meat',
					rating: { average: 0 },
				}),
			)
			expected = expected.set(
				'654',
				Immutable.fromJS({
					id: '654',
					availability: [],
					dietType: 'Fish',
					rating: { average: 1 },
				}),
			)
			expected = expected.set(
				'543',
				Immutable.fromJS({
					id: '543',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 1 },
				}),
			)
			expected = expected.set(
				'321',
				Immutable.fromJS({
					id: '321',
					availability: [],
					dietType: 'Fish',
					rating: { average: 0 },
				}),
			)
			expected = expected.set(
				'210',
				Immutable.fromJS({
					id: '210',
					availability: [],
					dietType: 'Vegetarian',
					rating: { average: 0 },
				}),
			)

			expect(Immutable.is(result, expected)).toEqual(true)
		})
	})
})
