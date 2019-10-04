import React from 'react'
import { shallow } from 'enzyme'
import { ProductsNavBar } from '.'

describe('The ProductsNavBar component', () => {
  const categories = {
    'all-products': {
      id: 'all-products',
      label: 'All Products',
      count: 10,
    },
    'category1': {
      id: 'category1',
      label: 'Category 1',
      count: 2,
    },
    'category2': {
      id: 'category2',
      label: 'Category 2',
      count: 1,
    }
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <ProductsNavBar
        categories={categories}
        onSelectCategory={() => {}}
      />
    )
  })

  test('renders a CollectionsNavigation wrapper', () => {
    expect(wrapper.find('CollectionsNavigation').exists()).toBe(true)
  })

  test('renders a CollectionsNavigationItem for each category', () => {
    expect(wrapper.find('CollectionsNavigationItem')).toHaveLength(3)
  })

  test('displays the category name and count on each item', () => {
    expect(wrapper.find('CollectionsNavigationItem').at(0).prop('children')).toBe('All Products (10)')
  })

  test('calls the onClick function when a category item is clicked', () => {
    const onSelectCategoryMock = jest.fn()
    wrapper.setProps({ onSelectCategory: onSelectCategoryMock })
    wrapper.find('CollectionsNavigationItem').at(0).simulate('click')
    expect(onSelectCategoryMock).toHaveBeenCalledWith('all-products')
  })
})
