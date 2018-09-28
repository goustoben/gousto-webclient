import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Loading from 'Loading'
import fetchData from 'routes/Menu/fetchData'
import SubHeader from 'routes/Menu/SubHeader'
import CollectionsNav from 'routes/Menu/CollectionsNav'
import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import { forceCheck } from 'react-lazyload'
import Menu from 'routes/Menu/Menu'


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

describe('Menu', () => {
	let wrapper
	const	menuLoadDays = jest.fn().mockReturnValue(
		new Promise(resolve => {
			resolve()
		})
	)
	const menuLoadBoxPrices = jest.fn()
	afterEach(() => {
		menuLoadBoxPrices.mockClear()
	})
	describe('rendering', () => {
		beforeEach(() => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={menuLoadBoxPrices}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					filteredRecipesNumber={30}
					isLoading={false}
					params={{ orderId: '123' }}
					boxSummaryDeliveryDays={Immutable.List()}
					menuLoadDays={menuLoadDays}
					menuMobileGridViewSet={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
					basketOrderLoaded={jest.fn()}
				/>,
				{ context: { store: {} } }
			)
		})

		describe('initial render', () => {
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

			test('should not show a collections nav', () => {
				expect(wrapper.find(CollectionsNav).length).toBe(0)
			})

			test('should not show as loading', () => {
				expect(wrapper.find(Loading).prop('loading')).toBe(false)
			})
		})

		test('with the isLoading prop set to true it should show a Loading', () => {
			wrapper = shallow(
				<Menu
					menuRecipeDetailShow={''}
					menuMobileGridViewSet={jest.fn()}
					menuLoadBoxPrices={() => {}}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					clearAllFilters={() => {}}
					basketOrderLoaded={() => {}}
					isLoading
					menuLoadDays={menuLoadDays}
					params={{ orderId: '123' }}
					boxSummaryDeliveryDays={Immutable.List()}
					basketRestorePreviousValues={jest.fn()}
				/>,
				{ context: { store: {} } }
			)
			expect(wrapper.find(Loading).prop('loading')).toBe(true)
		})

		test('with the isLoading prop set to true and boxSummaryShow true it should not show a Loading', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					menuMobileGridViewSet={jest.fn()}
					numPortions={2}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					isLoading
					storeOrderId={'1234'}
					boxSummaryShow
					clearAllFilters={() => {}}
					basketOrderLoaded={() => {}}
					params={{ orderId: '123' }}
					boxSummaryDeliveryDays={Immutable.List()}
					menuLoadDays={menuLoadDays}
					basketRestorePreviousValues={jest.fn()}
				/>,
				{ context: { store: {} } }
			)
			expect(wrapper.find(Loading).prop('loading')).toBe(false)
		})

		test('with the isLoading prop set to true and menuBrowseCTAShow true it should not show a Loading', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					menuMobileGridViewSet={jest.fn()}
					stock={Immutable.Map()}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					isLoading
					menuBrowseCTAShow
					clearAllFilters={() => {}}
					basketOrderLoaded={() => {}}
					params={{ orderId: '123' }}
					boxSummaryDeliveryDays={Immutable.List()}
					menuLoadDays={menuLoadDays}
					basketRestorePreviousValues={jest.fn()}
				/>,
				{ context: { store: {} } }
			)
			expect(wrapper.find(Loading).prop('loading')).toBe(false)
		})

		describe('with the collections feature enabled', () => {
			beforeEach(() => {
				wrapper = shallow(
					<Menu
						menuLoadBoxPrices={() => {}}
						menuMobileGridViewSet={jest.fn()}
						menuCollectionRecipes={Immutable.Map({})}
						boxSummaryDeliveryDays={Immutable.List()}
						clearAllFilters={() => {}}
						basketOrderLoaded={() => {}}
						menuLoadDays={menuLoadDays}
						params={{ orderId: '123' }}
						basketRestorePreviousValues={jest.fn()}
						features={Immutable.fromJS({
							collections: {
								value: true,
							},
							filterMenu: {
								value: false,
							}
						})}
					/>,
					{ context: { store: {} } }
				)
			})

			test('should show a collections nav', () => {
				expect(wrapper.find(CollectionsNav).length).toBe(1)
			})

			test('should not show the collections nav bar', () => {
				wrapper = shallow(
					<Menu
						menuMobileGridViewSet={jest.fn()}
						menuLoadBoxPrices={() => {}}
						menuCollectionRecipes={Immutable.Map({})}
						boxSummaryDeliveryDays={Immutable.List()}
						clearAllFilters={() => {}}
						menuLoadDays={menuLoadDays}
						params={{ orderId: '123' }}
						basketOrderLoaded={jest.fn()}
						basketRestorePreviousValues={jest.fn()}
						features={Immutable.fromJS({
							collections: {
								value: true,
							},
							collectionsNav: {
								value: false,
							},
						})}
					/>,
					{ context: { store: {} } }
				)
				expect(wrapper.find(CollectionsNav).length).toBe(0)
			})
		})
	})

	describe('fadeCSS', () => {
		let wrapper

		test('should render fade--recommendations', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					filteredRecipesNumber={30}
					isLoading
					hasRecommendations
				/>,
			)
			const elementWithFadeCSS = wrapper.find('.fade--recommendations')

			expect(elementWithFadeCSS).toHaveLength(1)
		})

		test('should render fadeOut', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					filteredRecipesNumber={30}
					isLoading
					hasRecommendations={false}
				/>,
			)
			const elementWithFadeCSS = wrapper.find('.fadeOut')

			expect(elementWithFadeCSS).toHaveLength(1)
		})

		test('should render willFade', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					filteredRecipesNumber={30}
					isLoading={false}
					hasRecommendations={false}
				/>,
			)
			const elementWithFadeCSS = wrapper.find('.willFade')

			expect(elementWithFadeCSS).toHaveLength(1)
		})
	})

	describe('with the force collections feature enabled', () => {
		beforeEach(() => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					menuCollectionRecipes={Immutable.Map({})}
					clearAllFilters={() => {}}
					menuLoadDays={menuLoadDays}
					boxSummaryDeliveryDays={Immutable.List()}
					params={{ orderId: '233' }}
					menuMobileGridViewSet={jest.fn()}
					basketOrderLoaded={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
					features={Immutable.fromJS({
						collections: {
							value: true,
						},
						forceCollections: {
							value: true,
						},
					})}
				/>,
				{ context: { store: {} } }
			)
		})

		test('should show a collections nav', () => {
			expect(wrapper.find(CollectionsNav).length).toBe(1)
		})

		test('should still show the collections nav bar with the collectionsNav feature disabled', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
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
			expect(wrapper.find(CollectionsNav).length).toBe(1)
		})


		describe('and the collectionsNav feature disabled', () => {
			beforeEach(() => {
				wrapper = shallow(
					<Menu
						menuLoadBoxPrices={() => {}}
						menuMobileGridViewSet={jest.fn()}
						menuCollectionRecipes={Immutable.Map({})}
						clearAllFilters={() => {}}
						menuLoadDays={menuLoadDays}
						boxSummaryDeliveryDays={Immutable.List()}
						params={{ orderId: '123' }}
						basketOrderLoaded={jest.fn()}
						basketRestorePreviousValues={jest.fn()}
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
					{ context: { store: {} } }
				)
			})
			test('should still show the collections nav bar', () => {
				expect(wrapper.find(CollectionsNav).length).toBe(1)
			})
		})
	})

	describe('componentDidMount', () => {
		let boxSummaryDeliveryDaysLoad
		let getStateSpy

		beforeEach(() => {
			getStateSpy = jest.fn().mockReturnValue({
				features: Immutable.Map({
					filterMenu: Immutable.Map({
						value: false,
					})
				})
			})
			boxSummaryDeliveryDaysLoad = jest.fn().mockReturnValue(
				new Promise(resolve => {
					resolve()
				})
			)
		})

		test('should load Box Prices for non admin users', () => {
			wrapper = shallow(
				<Menu
					menuRecipeDetailShow={''}
					boxSummaryDeliveryDays={Immutable.List()}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
					menuLoadBoxPrices={menuLoadBoxPrices}
					disabled={false}
					filteredRecipesNumber={30}
					clearAllFilters={() => {}}
					params={{ orderId: '123' }}
					basketOrderLoaded={jest.fn()}
					menuMobileGridViewSet={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
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
			wrapper = shallow(
				<Menu
					menuRecipeDetailShow={''}
					boxSummaryDeliveryDays={Immutable.List()}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
					menuLoadBoxPrices={menuLoadBoxPrices}
					disabled
					filteredRecipesNumber={30}
					clearAllFilters={() => {}}
					menuMobileGridViewSet={jest.fn()}
					basketOrderLoaded={jest.fn()}
					params={{ orderId: '123' }}
					basketRestorePreviousValues={jest.fn()}
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
			wrapper = shallow(
				<Menu
					menuRecipeDetailShow={''}
					boxSummaryDeliveryDays={Immutable.List()}
					basketRestorePreviousValues={jest.fn()}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					boxSummaryDeliveryDaysLoad={boxSummaryDeliveryDaysLoad}
					menuLoadBoxPrices={menuLoadBoxPrices}
					disabled
					filteredRecipesNumber={30}
					clearAllFilters={() => {}}
					menuMobileGridViewSet={jest.fn()}
					basketOrderLoaded={jest.fn()}
					params={{ orderId: '123' }}
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
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					boxSummaryDeliveryDays={Immutable.List()}
					features={Immutable.Map({})}
					clearAllFilters={() => {}}
					menuLoadDays={menuLoadDays}
					menuMobileGridViewSet={jest.fn()}
					params={{ orderId: '123' }}
					basketOrderLoaded={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
				/>,
				{ context: { store: {} } }
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
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={() => {}}
					boxSummaryDeliveryDays={Immutable.List()}
					features={Immutable.Map({})}
					tariffId={1}
					manuVariation="menuA"
					clearAllFilters={() => {}}
					menuLoadDays={menuLoadDays}
					menuMobileGridViewSet={jest.fn()}
					params={{ orderId: '' }}
					basketOrderLoaded={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
				/>,
				{ context: { store: {} } }
			)
			wrapper.instance().componentWillReceiveProps({ menuVariation: 'menuB' })
			expect(fetchData).toHaveBeenCalledTimes(2)
		})

		test('should call menuLoadBoxPrices once if not disabled & tariffId has changed', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={menuLoadBoxPrices}
					boxSummaryDeliveryDays={Immutable.List()}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					tariffId={1}
					clearAllFilters={() => {}}
					menuMobileGridViewSet={jest.fn()}
					params={{ orderId: '' }}
					basketOrderLoaded={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
				/>,
				{ context: { store: {} } }
			)
			wrapper.instance().componentWillReceiveProps({ tariffId: 2 })
			expect(menuLoadBoxPrices).toHaveBeenCalledTimes(2)
			expect(menuLoadBoxPrices).toHaveBeenCalled()
		})

		test('should NOT call menuLoadBoxPrices if disabled', () => {
			wrapper = shallow(
				<Menu
					menuLoadBoxPrices={menuLoadBoxPrices}
					menuLoadingBoxPrices
					boxSummaryDeliveryDays={Immutable.List()}
					features={Immutable.Map({})}
					menuLoadDays={menuLoadDays}
					tariffId={1}
					clearAllFilters={() => {}}
					menuMobileGridViewSet={jest.fn()}
					params={{ orderId: '' }}
					basketOrderLoaded={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
				/>,
				{ context: { store: {} } }
			)
			wrapper
				.instance()
				.componentWillReceiveProps({ tariffId: 2, disabled: true })
			expect(menuLoadBoxPrices).not.toHaveBeenCalled()
		})
	})

	describe('NoResultsPage', () => {
		let getStateSpy
		beforeEach(() => {
			getStateSpy = jest.fn().mockReturnValue({
				auth: Immutable.Map({ isAuthenticated: true }),
				basket: Immutable.Map({
				}),
				filters: Immutable.Map({
					currentCollectionId: '',
					totalTime: '0',
					dietTypes: Immutable.Set(['meat']),
					dietaryAttributes: Immutable.Set(['gluten-free']),
				}),
				features: Immutable.Map({
					filterMenu: Immutable.Map({
						value: false,
					})
				}),
				content: Immutable.Map({}),
				menu: Immutable.Map({}),
				persist: Immutable.fromJS({
					simpleHeader: false,
				})
			})
		})

		test('should render NoResultsPage', () => {
			wrapper = shallow(
				<Menu
					boxSummaryDeliveryDays={Immutable.List()}
					menuCollectionRecipes={Immutable.Map({})}
					features={Immutable.Map({})}
					disabled
					filteredRecipesNumber={0}
					clearAllFilters={() => {}}
					params={{ orderId: '' }}
					menuMobileGridViewSet={jest.fn()}
					basketOrderLoaded={jest.fn()}
					basketRestorePreviousValues={jest.fn()}
					menuLoadBoxPrices={menuLoadBoxPrices}
					menuLoadDays={menuLoadDays}
				/>,
				{
					context: {
						store: {
							getState: getStateSpy,
							subscribe: () => {},
							dispatch: () => {},
						},
					},
				},
			)
			expect(wrapper.find('Connect(MenuNoResults)')).toHaveLength(1)
		})
	})
})
