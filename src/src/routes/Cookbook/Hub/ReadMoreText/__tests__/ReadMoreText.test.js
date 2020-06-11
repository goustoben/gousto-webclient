import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ReadMoreText } from '../ReadMoreText'

const createComponent = (text) => <ReadMoreText lines={3} text={text} />

describe('ReadMoreText', () => {
  let wrapper
  const text = 'Succulent, juicy and always delicious, chicken breasts are a versatile meat that compliment a variety '
    + 'of cuisines. A firm fridge favourite, chicken breasts are easy to cook and work in everything from sizzling '
    + 'stir fries and warming curries to soups and sandwiches. So, whether you want to dice it, fry it or find a new '
    + 'way to try it - we’ve got the best chicken breast recipes to tickle your taste buds. Get the most out of this '
    + 'lean meat and learn new cooking techniques to enhance the flavour. Our chicken breast recipes include '
    + 'asian-inspired stir fries, where the meat is hit first to tenderise it, as well as firm staples like '
    + 'stringy pulled chicken in a juicy poutine sauce. It may be a staple to your diet, but this is chicken like '
    + 'you’ve never tasted before.'

  test('should render paragraph', () => {
    wrapper = shallow(createComponent(text))

    expect(wrapper.find('p')).toHaveLength(1)
  })

  test('should not make breakpoints if text is short', () => {
    const shortText = text.substr(0, 30)

    wrapper = shallow(createComponent(shortText))

    expect(wrapper.html()).toEqual(`<p>${shortText}</p>`)
  })

  it('should create one breakpoint if text does not fit in the first breakpoint boundaries', () => {
    const shortText = text.substr(0, 150)

    const tree = renderer.create(createComponent(shortText)).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should create two breakpoints if text does not fit in the second breakpoint boundaries', () => {
    const shortText = text.substr(0, 200)

    const tree = renderer.create(createComponent(shortText)).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should create three breakpoints if text does not fit in the third breakpoint boundaries', () => {
    const shortText = text.substr(0, 250)

    const tree = renderer.create(createComponent(shortText)).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should create four breakpoints if text does not fit in the forth breakpoint boundaries', () => {
    const tree = renderer.create(createComponent(text)).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should show all text when "read more" is clicked', () => {
    wrapper = shallow(createComponent(text))
    wrapper.find('a').simulate('click', { preventDefault() {} })

    expect(wrapper.html()).toEqual(`<p>${text}</p>`)
  })
})
