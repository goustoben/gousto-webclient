import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { Item } from 'components/Item'
import { Image } from 'Image/Image'

describe('Item', () => {
  test('should render title', () => {
    const wrapper = shallow(
      <Item
        type="recipe"
        available
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        title="Chicken Curry"
        quantity={2}
        onRemove={() => { }}
      />,
    )
    expect(wrapper.text().indexOf('Chicken Curry') > -1).toEqual(true)
  })

  test('should render portion info', () => {
    const wrapper = shallow(
      <Item
        type="recipe"
        available
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        title="Chicken Curry"
        quantity={2}
        onRemove={() => { }}
      />,
    )
    expect(wrapper.text().indexOf('2 servings') > -1).toEqual(true)
  })

  test('should show me a minus button if has onRemove function', () => {
    const wrapper = shallow(
      <Item
        type="recipe"
        available
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        title="Chicken Curry"
        quantity={2}
        onRemove={() => { }}
      />,
    )
    expect(wrapper.find('span').length).toEqual(1)
  })

  test('should not show me a minus button if doesnt have a onRemove function', () => {
    const wrapper = shallow(
      <Item
        type="recipe"
        available
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        title="Chicken Curry"
        quantity={2}
      />,
    )
    expect(wrapper.find('span').length).toEqual(0)
  })

  test('should show me a link if a url is set', () => {
    const wrapper = shallow(
      <Item
        type="recipe"
        available
        url="http://test.com"
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        title="Chicken Curry"
        quantity={2}
        onRemove={() => { }}
      />,
    )
    expect(
      wrapper
        .find('a')
        .first()
        .prop('href'),
    ).toEqual('http://test.com')
  })

  test('should show me a minus button which when clicked calls the onRemove function prop ', () => {
    const onRemoveSpy = jest.fn()
    const wrapper = shallow(
      <Item
        type="recipe"
        available
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        title="Chicken Curry"
        quantity={2}
        onRemove={onRemoveSpy}
      />,
    )
    wrapper.find('span').simulate('click')
    expect(onRemoveSpy).toHaveBeenCalled()
  })

  test('should pass onImageClick to Image', () => {
    const onImageClick = jest.fn()
    const wrapper = shallow(
      <Item
        type="recipe"
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        available
        title="test recipe"
        onImageClick={onImageClick}
      />,
    )
    expect(wrapper.find(Image).prop('onClick')).toEqual(onImageClick)
    expect(wrapper.find('.arrowRight')).toHaveLength(1)
  })

  test('should make title clickable', () => {
    const onImageClick = jest.fn()
    const wrapper = shallow(
      <Item
        type="recipe"
        media={Immutable.fromJS({
          images: [{ urls: ['', '', { src: 'image_path' }] }],
        })}
        available
        title="test recipe"
        onImageClick={onImageClick}
      />,
    )
    expect(wrapper.find('.title').prop('onClick')).toEqual(onImageClick)
    expect(wrapper.find('.arrowRight')).toHaveLength(1)
  })

  describe('gift', () => {
    test('should show me free gift if the gift prop is set', () => {
      const wrapper = shallow(
        <Item
          type="recipe"
          available
          gift
          url="http://test.com"
          media={Immutable.fromJS({
            images: [{ urls: ['', '', { src: 'image_path' }] }],
          })}
          title="Chicken Curry"
          quantity={2}
          onRemove={() => { }}
        />,
      )
      expect(wrapper.text()).toContain('Free Gift')
    })

    test('should not show me quantity if its a free gift and quantity is 1', () => {
      const wrapper = shallow(
        <Item
          type="recipe"
          available
          gift
          url="http://test.com"
          media={Immutable.fromJS({
            images: [{ urls: ['', '', { src: 'image_path' }] }],
          })}
          title="Chicken Curry"
          quantity={1}
          onRemove={() => { }}
        />,
      )
      expect(wrapper.text()).not.toContain('servings')
    })

    test('should show me quantity if its a free gift and quantity is greater then 1', () => {
      const wrapper = shallow(
        <Item
          type="recipe"
          available
          gift
          url="http://test.com"
          media={Immutable.fromJS({
            images: [{ urls: ['', '', { src: 'image_path' }] }],
          })}
          title="Chicken Curry"
          quantity={2}
          onRemove={() => { }}
        />,
      )
      expect(wrapper.text()).toContain('servings')
    })
  })

  describe('type', () => {
    test('should show me the word servings if its a recipe', () => {
      const wrapper = shallow(
        <Item
          type="recipe"
          available
          url="http://test.com"
          media={Immutable.fromJS({
            images: [{ urls: ['', '', { src: 'image_path' }] }],
          })}
          title="Chicken Curry"
          quantity={2}
          onRemove={() => { }}
        />,
      )
      expect(wrapper.text().indexOf('2 servings') > -1).toEqual(true)
    })

    test('should show me the word items if its a product', () => {
      const wrapper = shallow(
        <Item
          type="product"
          available
          url="http://test.com"
          media={Immutable.fromJS({
            images: [{ urls: ['', '', { src: 'image_path' }] }],
          })}
          title="Chicken Curry"
          quantity={2}
          onRemove={() => { }}
        />,
      )
      expect(wrapper.text().indexOf('2 items') > -1).toEqual(true)
    })
  })

  describe('unavailable Item', () => {
    test('should not show me a minus button', () => {
      const wrapper = shallow(
        <Item
          type="recipe"
          media={Immutable.fromJS({
            images: [{ urls: ['', '', { src: 'image_path' }] }],
          })}
          title="Chicken Curry"
          quantity={2}
          onRemove={() => { }}
        />,
      )
      expect(wrapper.find('span').length).toEqual(0)
    })
  })

  describe('image', () => {
    test('should render image', () => {
      const wrapper = shallow(
        <Item
          type="recipe"
          available
          media={Immutable.fromJS({
            images: [{ urls: ['', '', { src: 'image_path' }] }],
          })}
          title="Chicken Curry"
          quantity={2}
          onRemove={() => { }}
        />,
      )

      expect(wrapper.find('Image').length).toEqual(1)
    })
  })
})
