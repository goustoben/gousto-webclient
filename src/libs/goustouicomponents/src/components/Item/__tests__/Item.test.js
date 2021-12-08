import React from 'react'
import { mount } from 'enzyme'

import { Item } from '..'

describe('<Item />', () => {
  let wrapper
  const trackClick = jest.fn()
  const onClick = jest.fn()
  const HREF = 'a-link.to/somewhere'

  beforeEach(() => {
    wrapper = mount(<Item
      label="item label"
      trackClick={trackClick}
      onClick={onClick}
    />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('label is rendering correctly', () => {
    expect(wrapper.text()).toContain('item label')
  })

  test('label is rendered without the Heading', () => {
    expect(wrapper.find('Heading').exists()).toBe(false)
  })

  test('displays a right-pointing chevron', () => {
    expect(
      wrapper.find('.item').find('.itemArrowRight'),
    ).toHaveLength(1)

    expect(
      wrapper.find('.item').find('.itemArrowDown'),
    ).toHaveLength(0)
  })

  describe('when the isLabelHeading is passed', () => {
    describe('and it is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ isLabelHeading: true })
      })

      test('label is rendered inside the Heading', () => {
        expect(wrapper.find('Heading').exists()).toBe(true)
      })
    })

    describe('and it is set to false', () => {
      beforeEach(() => {
        wrapper.setProps({ isLabelHeading: false })
      })

      test('label is rendered without the Heading', () => {
        expect(wrapper.find('Heading').exists()).toBe(false)
      })
    })
  })

  describe('items that can expand', () => {
    beforeEach(() => {
      wrapper.setProps({ canExpand: true })
    })

    test('displays a down-pointing chevron when not expanded', () => {
      expect(
        wrapper.find('.item').find('.itemArrowDown'),
      ).toHaveLength(1)
    })

    test('displays an up-pointing chevron when expanded', () => {
      wrapper.setProps({ isExpanded: true })
      expect(
        wrapper.find('.item').find('.itemArrowUp'),
      ).toHaveLength(1)
    })
  })

  test('item contains hiddenOnMobile when isHiddenOnMobile is passed', () => {
    wrapper = mount(
      <Item
        label="item label"
        isHiddenOnMobile
      />,
    )

    expect(wrapper.find('.hiddenOnMobile')).toHaveLength(1)
  })

  test('item not contains hiddenOnMobile when isHiddenOnMobile is set to false', () => {
    wrapper = mount(
      <Item
        label="item label"
        isHiddenOnMobile={false}
      />,
    )

    expect(wrapper.find('.hiddenOnMobile')).toHaveLength(0)
  })

  describe('when isLinkStyled prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isLinkStyled: true })
    })

    test('the item has the class linkStyle', () => {
      expect(wrapper.find('.item').hasClass('linkStyle')).toBe(true)
    })
  })

  describe('when isLinkStyled prop is false', () => {
    beforeEach(() => {
      wrapper.setProps({ isLinkStyled: false })
    })

    test('the item does not have the class linkStyle', () => {
      expect(wrapper.find('.item').hasClass('linkStyle')).toBe(false)
    })
  })

  describe.each([true, false])('when isLabelHeading is %s', (isLabelHeading) => {
    beforeEach(() => {
      wrapper.setProps({ isLabelHeading })
    })

    describe('when subText prop is passed', () => {
      const SUB_TEXT = 'I am a subtext'
      beforeEach(() => {
        wrapper.setProps({ subText: SUB_TEXT })
      })

      test('the subtext renders correctly', () => {
        expect(wrapper.find('.subText').text()).toBe(SUB_TEXT)
      })
    })
  })

  describe('when an icon path is passed', () => {
    const ICON_PATH = 'path/to/icon'

    beforeEach(() => {
      wrapper.setProps({ iconPath: ICON_PATH })
    })

    test('renders the icon', () => {
      expect(wrapper.find('.icon').find('img').prop('src')).toBe(ICON_PATH)
    })
  })

  describe('when an icon path is not passed', () => {
    beforeEach(() => {
      wrapper.setProps({ iconPath: null })
    })

    test('does not render the icon container', () => {
      expect(wrapper.find('.icon')).toHaveLength(0)
    })
  })

  describe('when an href prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ href: HREF })
    })

    test('renders an <a> with the correct href', () => {
      expect(wrapper.find('a').prop('href')).toBe(HREF)
    })

    describe('and the item is clicked', () => {
      beforeEach(() => {
        wrapper.simulate('click')
      })

      test('track click handler works correctly', () => {
        expect(trackClick).toHaveBeenCalledTimes(1)
      })

      test('callback click handler works correctly', () => {
        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when an href prop is not passed', () => {
    beforeEach(() => {
      wrapper.setProps({ href: null })
    })

    test('does not render an <a>', () => {
      expect(wrapper.find('a').exists()).toBe(false)
    })
  })

  describe('when the item is clicked', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('track click handler works correctly', () => {
      expect(trackClick).toHaveBeenCalledTimes(1)
    })

    test('callback click handler works correctly', () => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
