import React from 'react'
import { mount } from 'enzyme'
import { OrderDetails } from '..'

describe('<OrderDetails />', () => {
  let wrapper
  const PROPS = {
    deliveryDate: 'Saturday 16th May',
    deliveryStartTime: '10:15:00',
    deliveryEndTime: '20:59:59',
    orderState: 'delivered',
    price: '25.651',
    recipeImages: [
      {
        alt: '10-Min Spiced Lentil Stew & Chilli-Peanut Crumb',
        src: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/2294---10-Min-Spiced-Lentil-Stew--Chilli-Peanut-Crumb-0517-x400.jpg',
      },
      {
        alt: '10-Min Meat-Free Bulgogi With Spicy Carrot Pickle',
        src: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/2541-meatless-bulgogi-bowl-4625-1574080468086-x400.jpg',
      },
      {
        alt: 'Joe\'s 10-Min Cheeky Chicken Satay ',
        src: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/2510---JW-chicken-satay-4729-1574555844257-x400.jpg',
      },
    ],
  }

  beforeEach(() => {
    wrapper = mount(<OrderDetails {...PROPS} />)
  })

  test('renders without crashing', () => {})

  test('renders the delivery date', () => {
    expect(wrapper.find('.title').text()).toContain(PROPS.deliveryDate)
  })

  test('renders the price correctly', () => {
    expect(wrapper.find('[data-testing="price"]').text()).toBe('£25.65')
  })

  test('renders the delivery time correctly', () => {
    expect(wrapper.find('[data-testing="delivery-time"]')
      .text())
      .toBe('10am - 9pm')
  })

  test('passes the state prop to OrderState', () => {
    expect(wrapper.find('OrderState').prop('state')).toBe(PROPS.orderState)
  })

  test('passes the images prop to RecipesImagery', () => {
    expect(wrapper.find('RecipesImagery').prop('items')).toBe(PROPS.recipeImages)
  })
})
