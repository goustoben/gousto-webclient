import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Overlay from 'Overlay'
import Loading from 'Loading'
import Detail from 'Recipe/Detail'
import Banner from 'routes/Menu/Banner'
import fetchData from 'routes/Menu/fetchData'
import SubHeader from 'routes/Menu/SubHeader'
import RecipeList from 'routes/Menu/RecipeList'
import CollectionsNav from 'routes/Menu/CollectionsNav'
import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import { forceCheck } from 'react-lazyload'

jest.mock('Recipe/Detail')
jest.mock('routes/Menu/Banner')
jest.mock('routes/Menu/SubHeader')
jest.mock('routes/Menu/FilterMenu')
jest.mock('routes/Menu/RecipeList')
jest.mock('BoxSummary/BoxSummaryMobile')
jest.mock('BoxSummary/BoxSummaryDesktop')
jest.mock('react-lazyload', () => ({
	forceCheck: jest.fn(),
}))

jest.mock('routes/Menu/fetchData', () => (
	jest.fn().mockReturnValue(
		new Promise(resolve => {
			resolve()
		})
	)
))

import Menu from 'routes/Menu/Menu'

describe('Menu', () => {
	describe('rendering', () => {
		let wrapper
		beforeEach(() => {
			wrapper = shallow(
				<Menu
					recipes={Immutable.OrderedMap()}
					menuLoadMenu={function() {}}
					menuLoadBoxPrices={function() {}}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					filteredRecipesNumber={30}
				/>,
			)
		})

		test('should return a div', () => {
			expect(wrapper.type()).toBe('div')
		})

		test('should render 1 SubHeader', () => {
			expect(wrapper.find(SubHeader).length).toBe(1)
		})

		test('should render 1 BoxSummaryMobile', () => {
			expect(wrapper.find(BoxSummaryMobile).length).toBe(1)
		})

		test('should render 1 BoxSummaryDesktop', () => {
			expect(wrapper.find(BoxSummaryDesktop).length).toBe(1)
		})

		test('should render 1 Overlay', () => {
			expect(wrapper.find(Overlay).length).toBe(1)
		})

		test('should not show a collections nav', () => {
			expect(wrapper.find(CollectionsNav).length).toBe(0)
		})

		test('should not show a Loading', () => {
			expect(wrapper.find(Loading).length).toBe(0)
		})

		describe('with the isLoading prop set to true it should show a Loading', () => {
			wrapper = shallow(
				<Menu
					recipes={Immutable.OrderedMap()}
					menuLoadMenu={function() {}}
					menuLoadBoxPrices={function() {}}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					clearAllFilters={() => {}}
					isLoading
				/>,
			)
			expect(wrapper.find(Loading).length).toBe(1)
		})

		describe('with the isLoading prop set to true and boxSummaryShow true it should not show a Loading', () => {
			wrapper = shallow(
				<Menu
					recipes={Immutable.OrderedMap()}
					menuLoadMenu={function() {}}
					menuLoadBoxPrices={function() {}}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					isLoading
					boxSummaryShow
					clearAllFilters={() => {}}
				/>,
			)
			expect(wrapper.find(Loading).length).toBe(0)
		})

		describe('with the isLoading prop set to true and menuBrowseCTAShow true it should not show a Loading', () => {
			wrapper = shallow(
				<Menu
					recipes={Immutable.OrderedMap()}
					menuLoadMenu={function() {}}
					menuLoadBoxPrices={function() {}}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					isLoading
					menuBrowseCTAShow
					clearAllFilters={() => {}}
				/>,
			)
			expect(wrapper.find(Loading).length).toBe(0)
		})

		describe('with the collections feature enabled', () => {
			let stock
			let recipesStore
			let recipes

			beforeEach(() => {
				stock = Immutable.fromJS({
					1: { 2: 2 },
					2: { 2: 2 },
					3: { 2: 2 },
				})

				recipes = Immutable.List(['1', '2', '3'])

				recipesStore = Immutable.fromJS({
					1: {
						id: '1',
						availability: [],
						boxType: 'vegetarian',
						dietType: 'Fish',
					},
					2: {
						id: '2',
						availability: [],
						boxType: 'vegetarian',
						dietType: 'Vegetarian',
					},
					3: {
						id: '3',
						availability: [],
						boxType: 'gourmet',
						dietType: 'Meat',
					},
				})
				wrapper = shallow(
					<Menu
						recipes={recipes}
						menuLoadMenu={function() {}}
						menuLoadBoxPrices={function() {}}
						stock={stock}
						cutoffDate="2016-06-26"
						numPortions={2}
						basketRecipeIds={[]}
						recipesStore={recipesStore}
						menuCollectionRecipes={Immutable.Map({})}
						clearAllFilters={() => {}}
						features={Immutable.fromJS({
							collections: {
								value: true,
							},
						})}
					/>,
				)
			})

			test('should show a collections nav', () => {
				expect(wrapper.find(CollectionsNav).length).toBe(1)
			})

			describe('and the collectionsNav feature disabled', () => {
				beforeEach(() => {
					wrapper = shallow(
						<Menu
							recipes={recipes}
							menuLoadMenu={function() {}}
							menuLoadBoxPrices={function() {}}
							stock={stock}
							cutoffDate="2016-06-26"
							numPortions={2}
							basketRecipeIds={[]}
							recipesStore={recipesStore}
							menuCollectionRecipes={Immutable.Map({})}
							clearAllFilters={() => {}}
							features={Immutable.fromJS({
								collections: {
									value: true,
								},
								collectionsNav: {
									value: false,
								},
							})}
						/>,
					)
				})
				test('should not show the collections nav bar', () => {
					expect(wrapper.find(CollectionsNav).length).toBe(0)
				})
			})
		})
	})

	describe('with the force collections feature enabled', () => {
		let stock
		let recipesStore
		let recipes
		let wrapper

		beforeEach(() => {
			stock = Immutable.fromJS({
				1: { 2: 2 },
				2: { 2: 2 },
				3: { 2: 2 },
			})

			recipes = Immutable.List(['1', '2', '3'])

			recipesStore = Immutable.fromJS({
				1: {
					id: '1',
					availability: [],
					boxType: 'vegetarian',
					dietType: 'Fish',
				},
				2: {
					id: '2',
					availability: [],
					boxType: 'vegetarian',
					dietType: 'Vegetarian',
				},
				3: { id: '3', availability: [], boxType: 'gourmet', dietType: 'Meat' },
			})
			wrapper = shallow(
				<Menu
					recipes={recipes}
					menuLoadMenu={function() {}}
					menuLoadBoxPrices={function() {}}
					stock={stock}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					recipesStore={recipesStore}
					menuCollectionRecipes={Immutable.Map({})}
					clearAllFilters={() => {}}
					features={Immutable.fromJS({
						collections: {
							value: true,
						},
						forceCollections: {
							value: true,
						},
					})}
				/>,
			)
		})

		test('should show a collections nav', () => {
			expect(wrapper.find(CollectionsNav).length).toBe(1)
		})

		describe('and the collectionsNav feature disabled', () => {
			beforeEach(() => {
				wrapper = shallow(
					<Menu
						recipes={recipes}
						menuLoadMenu={function() {}}
						menuLoadBoxPrices={function() {}}
						stock={stock}
						cutoffDate="2016-06-26"
						numPortions={2}
						basketRecipeIds={[]}
						recipesStore={recipesStore}
						menuCollectionRecipes={Immutable.Map({})}
						clearAllFilters={() => {}}
						features={Immutable.fromJS({
							collections: {
								value: true,
							},
							forceCollections: {
								value: true,
							},
							collectionsNav: {
								value: false,
							},
						})}
					/>,
				)
			})
			test('should still show the collections nav bar', () => {
				expect(wrapper.find(CollectionsNav).length).toBe(1)
			})
		})
	})

	describe('recipe detail overlay', () => {
		test('should be closed if no recipe id query parameter is set', () => {
			const wrapper = shallow(
				<Menu
					recipes={Immutable.OrderedMap()}
					menuLoadMenu={function() {}}
					menuLoadBoxPrices={function() {}}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					features={Immutable.Map({})}
					filteredRecipesNumber={30}
					clearAllFilters={() => {}}
				/>,
			)

			expect(wrapper.find(Overlay).node.props.open).toBe(false)
		})
	})

	describe('componentDidMount', () => {
		let menuLoadDays
		let boxSummaryDeliveryDaysLoad
		let menuLoadBoxPrices
		let getStateSpy
		let wrapper

		beforeEach(() => {
			getStateSpy = jest.fn().mockReturnValue({
				basket: Immutable.Map({
					orderId: '',
				}),
			})
			menuLoadBoxPrices = jest.fn()
			menuLoadDays = jest.fn().mockReturnValue(
				new Promise(resolve => {
					resolve()
				})
			)
			boxSummaryDeliveryDaysLoad = jest.fn().mockReturnValue(
				new Promise(resolve => {
					resolve()
				})
			)
			BoxSummaryMobile.mockReturnValue(<div />)
			BoxSummaryDesktop.mockReturnValue(<div />)
			RecipeList.mockReturnValue(<div />)
			SubHeader.mockReturnValue(<div />)
			Banner.mockReturnValue(<div />)
			Detail.mockReturnValue(<div />)
		})

		test('should load Box Prices for non admin users', () => {
			wrapper = mount(
				<Menu
					recipes={Immutable.OrderedMap()}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					boxSummaryDeliveryDays={Immutable.List([])}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
					menuLoadBoxPrices={menuLoadBoxPrices}
					disabled={false}
					filteredRecipesNumber={30}
					clearAllFilters={() => {}}
					params={{}}
				/>,
				{
					context: {
						store: {
							getState: getStateSpy,
						},
					},
				},
			)
			expect(menuLoadBoxPrices).toHaveBeenCalledTimes(1)
		})

		test('should not load Box Prices for admin users', () => {
			wrapper = mount(
				<Menu
					recipes={Immutable.OrderedMap()}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					boxSummaryDeliveryDays={Immutable.List([])}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
					menuLoadBoxPrices={menuLoadBoxPrices}
					disabled
					filteredRecipesNumber={30}
					clearAllFilters={() => {}}
					params={{}}
				/>,
				{
					context: {
						store: {
							getState: getStateSpy,
						},
					},
				},
			)
			expect(menuLoadBoxPrices).not.toHaveBeenCalled()
		})

		test('should call fetchData', () => {
			wrapper = mount(
				<Menu
					recipes={Immutable.OrderedMap()}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					boxSummaryDeliveryDays={Immutable.List([])}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
					menuLoadBoxPrices={menuLoadBoxPrices}
					disabled
					filteredRecipesNumber={30}
					clearAllFilters={() => {}}
					params={{}}
				/>,
				{
					context: {
						store: {
							getState: getStateSpy,
						},
					},
				},
			)
			expect(fetchData).toHaveBeenCalled()
		})
	})

	describe('componentDidUpdate', () => {
		beforeEach(() => {
			forceCheck.mockClear()
		})

		test('should call forceCheck', () => {
			const wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					features={Immutable.Map({})}
					clearAllFilters={() => {}}
					params={{}}
				/>
			)

			wrapper.instance().componentDidUpdate()
			expect(forceCheck).toHaveBeenCalledTimes(1)
		})
	})

	describe('componentWillReceiveProps', () => {
		beforeEach(() => {
			fetchData.mockClear()
		})

		test('should call Menu.fetchData once if menuVariation has changed', () => {
			const wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					features={Immutable.Map({})}
					tariffId={1}
					manuVariation="menuA"
					clearAllFilters={() => {}}
					params={{}}
				/>,
			)
			wrapper.instance().componentWillReceiveProps({ menuVariation: 'menuB' })
			expect(fetchData).toHaveBeenCalledTimes(1)
		})

		test('should call menuLoadBoxPrices once if not disabled & tariffId has changed', () => {
			const menuLoadBoxPrices = jest.fn()
			const wrapper = shallow(
				<Menu
					menuLoadBoxPrices={menuLoadBoxPrices}
					features={Immutable.Map({})}
					tariffId={1}
					clearAllFilters={() => {}}
					params={{}}
				/>,
			)
			wrapper.instance().componentWillReceiveProps({ tariffId: 2 })
			expect(menuLoadBoxPrices).toHaveBeenCalledTimes(1)
			expect(menuLoadBoxPrices).toHaveBeenCalledWith()
		})

		test('should NOT call menuLoadBoxPrices if disabled', () => {
			const menuLoadBoxPrices = jest.fn()
			const wrapper = shallow(
				<Menu
					menuLoadBoxPrices={menuLoadBoxPrices}
					features={Immutable.Map({})}
					tariffId={1}
					clearAllFilters={() => {}}
					params={{}}
				/>,
			)
			wrapper
				.instance()
				.componentWillReceiveProps({ tariffId: 2, disabled: true })
			expect(menuLoadBoxPrices).not.toHaveBeenCalled()
		})
	})

	describe('NoResultsPage', () => {
		let wrapper
		let getStateSpy
		beforeEach(() => {
			getStateSpy = jest.fn().mockReturnValue({
				basket: Immutable.Map({
				}),
				content: Immutable.Map({}),
			})
		})

		test('should render NoResultsPage', () => {
			wrapper = mount(
				<Menu
					recipes={Immutable.OrderedMap()}
					stock={Immutable.Map()}
					cutoffDate="2016-06-26"
					numPortions={2}
					basketRecipeIds={[]}
					boxSummaryDeliveryDays={Immutable.List([])}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					disabled
					filteredRecipesNumber={0}
					clearAllFilters={() => {}}
					params={{}}
				/>,
				{
					context: {
						store: {
							getState: getStateSpy,
							subscribe: () => {},
						},
					},
				},
			)
			expect(wrapper.find('NoResultsPage')).toHaveLength(1)
		})
	})
})
