import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { shallow, mount } from 'enzyme'
import CategoryList from '../../../js/products/components/category/CategoryList'
import CategoryItem from '../../../js/products/components/category/CategoryItem'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('CategoryList', () => {
	let shallowRenderer
	let mountRenderer

	beforeEach(() => {
		shallowRenderer = shallow
		mountRenderer = mount
	})

	it('should return a <div> with two children', () => {
		const categories = Immutable.OrderedMap({
			cat1: Immutable.Map({ id: 'cat1' }),
			cat2: Immutable.Map({ id: 'cat2' }),
		})

		const result = shallowRenderer(<CategoryList categories={categories} productCount={Immutable.Map({})} />)


		expect(result.type()).to.equal('div')
		expect(result.children().length).to.equal(2)
	})

	it('should have 2 x the number of category items as children of category item type (desktop and mobile)', () => {
		const categories = Immutable.OrderedMap({
			cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
			cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: {} }),
			cat3: Immutable.Map({ id: 'cat3', productCount: 1, relationships: {} }),
		})

		const productCount = Immutable.Map({
			cat1: 1,
			cat2: 1,
			cat3: 1,
		})

		const result = shallowRenderer(<CategoryList categories={categories} productCount={productCount} />)

		const categoryItems = result.find(CategoryItem)

		expect(categoryItems.length).to.equal(6)
	})

	it('should not show empty categories', () => {
		const categories = Immutable.OrderedMap({
			cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
			cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: {} }),
			cat3: Immutable.Map({ id: 'cat3', productCount: 0, relationships: {} }),
		})

		const productCount = Immutable.Map({
			cat1: 1,
			cat2: 1,
		})

		const result = shallowRenderer(<CategoryList categories={categories} productCount={productCount} />)

		const categoryItems = result.find(CategoryItem)

		expect(categoryItems.length).to.equal(4)
	})

	it('should not show subcategories', () => {
		const categories = Immutable.OrderedMap({
			cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
			cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: { parent_id: 1 } }),
			cat3: Immutable.Map({ id: 'cat3', productCount: 0, relationships: { parent_id: 2 } }),
		})

		const productCount = Immutable.Map({
			cat1: 1,
			cat2: 1,
		})

		const result = shallowRenderer(<CategoryList categories={categories} productCount={productCount} />)

		const categoryItems = result.find(CategoryItem)

		expect(categoryItems.length).to.equal(2)
	})

	it('should pass selected flag to child if category is selected', () => {
		const categories = Immutable.OrderedMap({
			cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
			cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: {} }),
			cat3: Immutable.Map({ id: 'cat3', productCount: 1, relationships: {} }),
		})

		const productCount = Immutable.Map({
			cat1: 1,
			cat2: 1,
			cat3: 1,
		})

		const result = shallowRenderer(<CategoryList categories={categories} selectedCategory="cat2" productCount={productCount} />)

		const categoryItem = result.childAt(1)
		expect(categoryItem.props().value).to.equal('cat2')
	})

	it('should set first category with stock to selected category if there is no selected category when component receieves props', () => {
		const nextProps = {
			categories: Immutable.OrderedMap({
				cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
				cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: {} }),
				cat3: Immutable.Map({ id: 'cat3', productCount: 1, relationships: {} }),
			}),
			productCount: Immutable.Map({
				cat3: 8,
				cat2: 1,
			}),
			selectedCategory: undefined,
		}

		const onCategoryChangeSpy = sinon.spy()

		const result = mountRenderer(
			<CategoryList
				categories={Immutable.Map()}
				productCount={Immutable.Map()}
				onCategoryChange={onCategoryChangeSpy}
			/>
		).instance()

		result.componentWillReceiveProps(nextProps)
		expect(onCategoryChangeSpy).to.have.been.calledWith('cat2')
	})

	it('should NOT set selected category if there is already a category selected with products in stock when component receieves props', () => {
		const nextProps = {
			categories: Immutable.OrderedMap({
				cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
				cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: {} }),
				cat3: Immutable.Map({ id: 'cat3', productCount: 1, relationships: {} }),
			}),
			productCount: Immutable.Map({
				cat3: 8,
				cat2: 1,
			}),
			selectedCategory: 'cat2',
		}

		const onCategoryChangeSpy = sinon.spy()

		const result = mountRenderer(
			<CategoryList
				categories={Immutable.Map()}
				onCategoryChange={onCategoryChangeSpy}
				productCount={Immutable.Map()}
			/>
		).instance()

		result.componentWillReceiveProps(nextProps)
		expect(onCategoryChangeSpy.notCalled).to.be.true
	})

	it('should set first category with stock to selected category if there is a selected category but that category has no stock when component receieves props', () => {
		const nextProps = {
			categories: Immutable.OrderedMap({
				cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
				cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: {} }),
				cat3: Immutable.Map({ id: 'cat3', productCount: 1, relationships: {} }),
			}),
			productCount: Immutable.Map({
				cat3: 8,
				cat2: 1,
			}),
			selectedCategory: 'cat1',
		}

		const onCategoryChangeSpy = sinon.spy()

		const result = mountRenderer(
			<CategoryList
				categories={Immutable.Map()}
				onCategoryChange={onCategoryChangeSpy}
				productCount={Immutable.Map()}
			/>
		).instance()

		result.componentWillReceiveProps(nextProps)
		expect(onCategoryChangeSpy).to.have.been.calledWith('cat2')
	})


	describe('getFirstCategoryWithStock', () => {
		it('should return first category which has stock given categories & stock', () => {
			const categories = Immutable.OrderedMap({
				cat1: Immutable.Map({ id: 'cat1', productCount: 1, relationships: {} }),
				cat2: Immutable.Map({ id: 'cat2', productCount: 1, relationships: {} }),
				cat3: Immutable.Map({ id: 'cat3', productCount: 1, relationships: {} }),
			})

			const productCount = Immutable.Map({
				cat2: 8,
				cat3: 1,
			})

			const result = mountRenderer(
				<CategoryList
					categories={Immutable.Map()}
					productCount={Immutable.Map()}
				/>
			).instance()

			const output = result.getFirstCategoryWithStock(categories, productCount)
			expect(Immutable.is(output, categories.get('cat2'))).to.be.true
		})
	})
})
