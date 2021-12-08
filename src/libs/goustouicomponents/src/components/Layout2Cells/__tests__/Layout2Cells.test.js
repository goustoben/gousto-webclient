import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import { Layout2Cells } from '..'

describe('<Layout2Cells />', () => {
  const CHILDREN = [
    <div key="1">Child 1</div>,
    <div key="2">Child 2</div>,
  ]

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Layout2Cells>
        {CHILDREN}
      </Layout2Cells>,
      div,
    )
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <Layout2Cells>
          {CHILDREN}
        </Layout2Cells>,
      )
    })

    test('the children are rendered', () => {
      expect(wrapper.text()).toContain('Child 1')
      expect(wrapper.text()).toContain('Child 2')
    })

    test('each child is wrapped', () => {
      CHILDREN.forEach((child, index) => {
        expect(wrapper.find('.wrapper').children().at(index).html()).toBe(
          `<div class="item-${index}">${shallow(child).html()}</div>`,
        )
      })
    })

    describe('and only 1 child is passed', () => {
      const CHILD = CHILDREN[0]

      beforeEach(() => {
        wrapper.setProps({ children: CHILD })
      })

      test('the child is rendered', () => {
        expect(wrapper.text()).toBe('Child 1')
      })

      test('the child is wrapped', () => {
        expect(wrapper.find('.wrapper').children().at(0).html()).toBe(
          `<div class="item-0">${shallow(CHILD).html()}</div>`,
        )
      })
    })

    describe('and more than 2 children are passed', () => {
      const MORE_THAN_2_CHILDREN = [...CHILDREN, <div key="3">Child 3</div>]

      beforeEach(() => {
        wrapper.setProps({ children: MORE_THAN_2_CHILDREN })
      })

      test('the children are rendered', () => {
        expect(wrapper.text()).toContain('Child 1')
        expect(wrapper.text()).toContain('Child 2')
        expect(wrapper.text()).toContain('Child 3')
      })

      test('the children are wrapped', () => {
        MORE_THAN_2_CHILDREN.forEach((child, index) => {
          expect(wrapper.find('.wrapper').children().at(index).html()).toBe(
            `<div class="item-${index}">${shallow(child).html()}</div>`,
          )
        })
      })
    })
  })
})
